import { CategoryForm } from "../_components/CategoryForm";

export default async function NewCategoryPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CategoryForm />
      </div>
    </div>
  );
}
