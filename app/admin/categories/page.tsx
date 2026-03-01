import { getCategories } from "@/lib/dal/category";
import { DataTable } from "../_components/DataTable";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getCategories();

  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: item.image,
    createdAt: item.createdAt.toLocaleDateString(),
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase sm:text-4xl">
            Store <span className="text-primary underline decoration-primary/30 underline-offset-8">Categories</span>
          </h1>
          <p className="mt-2 text-slate-500">Manage your product groupings and "Vibes".</p>
        </div>
        <Button asChild className="h-12 px-6 font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-5 w-5" /> Add New Category
          </Link>
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={formattedCategories} 
        pageCount={1} // Categories are fewer, usually don't need paginating yet
        currentPage={1}
      />
    </div>
  );
}
