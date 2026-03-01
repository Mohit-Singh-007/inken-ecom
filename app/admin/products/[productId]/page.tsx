import { getProductBySlug } from "@/lib/dal/product";
import { getCategories } from "@/lib/dal/category";
import { ProductForm } from "../_components/ProductForm";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface EditProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { productId } = await params;

  // Since DAL uses slug, we need to find by ID for the admin edit page specifically
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: true,
      variants: true,
      category: true,
    }
  });

  if (!product) {
    notFound();
  }

  // Convert Decimal to number for safe serialization to Client Component
  const formattedProduct = {
    ...product,
    price: product.price.toNumber(),
    discountPrice: product.discountPrice?.toNumber() ?? null,
  };

  const categories = await getCategories();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <ProductForm initialData={formattedProduct} categories={categories} />
      </div>
    </div>
  );
}
