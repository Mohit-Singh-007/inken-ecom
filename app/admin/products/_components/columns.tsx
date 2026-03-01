"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Star
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
import { deleteProduct } from "@/lib/actions/product";
import { toast } from "sonner";
import Link from "next/link";

export type ProductColumn = {
  id: string;
  name: string;
  slug: string;
  price: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
  image?: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "image",
    header: "Product",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-xl bg-slate-100 border">
            {image ? (
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-slate-400 uppercase">No Img</div>
            )}
          </div>
          <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">{row.original.name}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{row.original.category}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span className="text-sm font-black italic tracking-tighter">₹{row.getValue("price") as string}</span>
  },
  {
    accessorKey: "isFeatured",
    header: "Status",
    cell: ({ row }) => {
      const isFeatured = row.getValue("isFeatured") as boolean;
      const isArchived = row.original.isArchived;

      return (
        <div className="flex gap-2">
          {isFeatured && (
            <Badge className="bg-amber-500/10 text-amber-600 border-none shadow-none font-black italic text-[10px] uppercase">
              <Star className="mr-1 h-3 w-3 fill-current" /> Featured
            </Badge>
          )}
          {isArchived ? (
            <Badge variant="destructive" className="font-black italic text-[10px] uppercase">Archived</Badge>
          ) : (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-none shadow-none font-black italic text-[10px] uppercase">Active</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Added On",
    cell: ({ row }) => <span className="text-xs font-bold text-slate-500">{row.getValue("createdAt") as string}</span>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      const onDelete = async () => {
        if (confirm("Are you sure you want to delete this product?")) {
            const res = await deleteProduct(product.id);
            if (res.success) {
                toast.success("Product deleted successfully");
            } else {
                toast.error("Failed to delete product");
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
                <Link href={`/admin/products/${product.id}`} className="flex items-center gap-2 font-bold text-sm cursor-pointer rounded-lg px-2 py-2">
                    <Edit className="mr-2 h-4 w-4" /> Edit Product
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href={`/product/${product.slug}`} target="_blank" className="flex items-center gap-2 font-bold text-sm cursor-pointer rounded-lg px-2 py-2">
                    <Eye className="mr-2 h-4 w-4" /> View Live
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
