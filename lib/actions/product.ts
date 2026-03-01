"use server";

import { prisma } from "@/lib/prisma";
import { productSchema, ProductSchemaType } from "@/utils/zodSchema";
import { getRequiredAdminSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

/**
 * Creates a new product with images and variants.
 */
export async function createProduct(data: ProductSchemaType) {
  await getRequiredAdminSession();

  const validated = productSchema.parse(data);

  try {
    const product = await prisma.product.create({
      data: {
        name: validated.name,
        slug: validated.slug,
        description: validated.description,
        price: validated.price,
        discountPrice: validated.discountPrice,
        isFeatured: validated.isFeatured,
        categoryId: validated.categoryId,
        images: {
          create: validated.images,
        },
        variants: {
          create: validated.variants || [],
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error) {
    console.error("Create product error:", error);
    return { success: false, error: "Failed to create product" };
  }
}

/**
 * Updates an existing product, including images and variants.
 */
export async function updateProduct(id: string, data: ProductSchemaType) {
  await getRequiredAdminSession();

  const validated = productSchema.parse(data);

  try {
    const product = await prisma.$transaction(async (tx) => {
      // 1. Delete existing relations (simplest way to handle updates for complex nested lists)
      await tx.productImage.deleteMany({ where: { productId: id } });
      await tx.productVariant.deleteMany({ where: { productId: id } });

      // 2. Update product and recreate relations
      return await tx.product.update({
        where: { id },
        data: {
          name: validated.name,
          slug: validated.slug,
          description: validated.description,
          price: validated.price,
          discountPrice: validated.discountPrice,
          isFeatured: validated.isFeatured,
          categoryId: validated.categoryId,
          images: {
            create: validated.images,
          },
          variants: {
            create: validated.variants || [],
          },
        },
      });
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    return { success: true, product };
  } catch (error) {
    console.error("Update product error:", error);
    return { success: false, error: "Failed to update product" };
  }
}

/**
 * Archives a product instead of hard deleting (standard practice).
 */
export async function archiveProduct(id: string) {
  await getRequiredAdminSession();

  try {
    await prisma.product.update({
      where: { id },
      data: { isArchived: true },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Archive product error:", error);
    return { success: false, error: "Failed to archive product" };
  }
}

/**
 * Permanently deletes a product.
 */
export async function deleteProduct(id: string) {
  await getRequiredAdminSession();

  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete product error:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
