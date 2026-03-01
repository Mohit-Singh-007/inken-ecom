import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

export interface ProductQueryPayload {
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price_asc" | "price_desc" | "newest" | "featured";
  page?: number;
  pageSize?: number;
}

/**
 * Industry-standard product fetching with search, filter, sort, and pagination.
 */
export async function getProducts(params: ProductQueryPayload = {}) {
  const {
    search,
    categorySlug,
    minPrice,
    maxPrice,
    sortBy = "newest",
    page = 1,
    pageSize = 12,
  } = params;

  const skip = (page - 1) * pageSize;

  // Build the where clause
  const where: Prisma.ProductWhereInput = {
    isArchived: false,
    AND: [
      search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      categorySlug ? { category: { slug: categorySlug } } : {},
      {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    ],
  };

  // Build the orderBy clause
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };

  if (sortBy === "price_asc") orderBy = { price: "asc" };
  if (sortBy === "price_desc") orderBy = { price: "desc" };
  if (sortBy === "featured") orderBy = { isFeatured: "desc" };

  // Execute transaction to get both count and data for pagination
  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: {
        images: {
          orderBy: { order: "asc" },
          take: 1,
        },
        category: true,
      },
      orderBy,
      skip,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map(p => ({
      ...p,
      price: p.price.toNumber(),
      discountPrice: p.discountPrice?.toNumber() ?? null,
    })),
    pagination: {
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      pageSize,
    },
  };
}

/**
 * Fetches a single product by its slug with detailed relations.
 */
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      variants: true,
      category: true,
    },
  });

  if (!product) return null;

  return {
    ...product,
    price: product.price.toNumber(),
    discountPrice: product.discountPrice?.toNumber() ?? null,
  };
}

/**
 * Fetches featured products for the homepage.
 */
export async function getFeaturedProducts(limit = 4) {
  const products = await prisma.product.findMany({
    where: { isFeatured: true, isArchived: false },
    include: {
      images: { take: 1, orderBy: { order: "asc" } },
      category: true,
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return products.map(p => ({
    ...p,
    price: p.price.toNumber(),
    discountPrice: p.discountPrice?.toNumber() ?? null,
  }));
}
