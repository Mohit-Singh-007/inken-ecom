import { prisma } from "@/lib/prisma";

/**
 * Fetches all categories for the store.
 * Used for the homepage category scroll and navigation.
 */
export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Fetches a single category by its unique slug.
 */
export async function getCategoryBySlug(slug: string) {
  return await prisma.category.findUnique({
    where: { slug },
  });
}
