"use server";

import { prisma } from "@/lib/prisma";
import { categorySchema, CategorySchemaType } from "@/utils/zodSchema";
import { getRequiredAdminSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

/**
 * Creates a new category.
 */
export async function createCategory(data: CategorySchemaType) {
  await getRequiredAdminSession();

  const validated = categorySchema.parse(data);

  try {
    const category = await prisma.category.create({
      data: {
        name: validated.name,
        slug: validated.slug,
        description: validated.description,
        image: validated.image,
      },
    });

    revalidatePath("/");
    return { success: true, category };
  } catch (error) {
    console.error("Create category error:", error);
    return { success: false, error: "Failed to create category" };
  }
}

/**
 * Updates an existing category.
 */
export async function updateCategory(id: string, data: CategorySchemaType) {
  await getRequiredAdminSession();

  const validated = categorySchema.parse(data);

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: validated.name,
        slug: validated.slug,
        description: validated.description,
        image: validated.image,
      },
    });

    revalidatePath("/");
    revalidatePath(`/category/${validated.slug}`);
    return { success: true, category };
  } catch (error) {
    console.error("Update category error:", error);
    return { success: false, error: "Failed to update category" };
  }
}

/**
 * Deletes a category.
 */
export async function deleteCategory(id: string) {
  await getRequiredAdminSession();

  try {
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete category error:", error);
    return { success: false, error: "Failed to delete category" };
  }
}
