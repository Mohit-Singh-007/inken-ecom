"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Layers
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteCategory } from "@/lib/actions/category";
import { toast } from "sonner";
import Link from "next/link";

export type CategoryColumn = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => (
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 relative flex items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10 overflow-hidden">
                {row.original.image ? (
                    <Image 
                        src={row.original.image}
                        alt={row.original.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <Layers className="h-5 w-5" />
                )}
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{row.original.name}</span>
        </div>
    )
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <code className="text-[10px] font-black italic bg-slate-100 px-2 py-1 rounded-md text-slate-500">{row.original.slug}</code>
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <span className="text-xs font-bold text-slate-500">{row.getValue("createdAt") as string}</span>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      const onDelete = async () => {
        if (confirm("Are you sure you want to delete this category? All products in it may become uncategorized.")) {
            const res = await deleteCategory(category.id);
            if (res.success) {
                toast.success("Category deleted successfully");
            } else {
                toast.error("Failed to delete category");
            }
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 rounded-lg">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 border-slate-100 shadow-xl">
            <DropdownMenuLabel className="text-[10px] uppercase font-black tracking-widest text-slate-400 px-2 py-1.5">Manage</DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link href={`/admin/categories/${category.id}`} className="flex items-center gap-2 font-bold text-sm cursor-pointer rounded-lg px-2 py-2">
                    <Edit className="mr-2 h-4 w-4" /> Edit Category
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem onClick={onDelete} className="flex items-center gap-2 font-bold text-sm cursor-pointer rounded-lg px-2 py-2 text-rose-500 focus:text-rose-600 focus:bg-rose-50">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
