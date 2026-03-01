import { CategoryForm } from "../_components/CategoryForm";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface EditCategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { categoryId } = await params;

  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
