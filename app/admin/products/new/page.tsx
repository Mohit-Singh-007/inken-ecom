import { getCategories } from "@/lib/dal/category";
import { ProductForm } from "../_components/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
