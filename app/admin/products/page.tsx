import { getProducts } from "@/lib/dal/product";
import { DataTable } from "../_components/DataTable";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";
import { AdminSearch } from "./_components/AdminSearch";


interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const page = Number(params.page) || 1;

  const { products, pagination } = await getProducts({
    search: query,
    page: page,
    pageSize: 10,
  });

  const formattedProducts = products.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    price: item.price.toString(),
    category: item.category.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: item.createdAt.toLocaleDateString(),
    image: item.images[0]?.url,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase sm:text-4xl">
            Store <span className="text-primary underline decoration-primary/30 underline-offset-8">Products</span>
          </h1>
          <p className="mt-2 text-slate-500">Manage your fashion catalog and stock levels.</p>
        </div>
        <Button asChild className="h-12 px-6 font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-5 w-5" /> Add New Product
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <AdminSearch placeholder="Search products by name or description..." />
          </div>
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none font-bold text-slate-500">
              <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={formattedProducts} 
        pageCount={pagination.totalPages} 
        currentPage={page}
      />
    </div>
  );
}
