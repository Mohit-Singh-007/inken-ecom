"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Settings,
  ArrowLeft
} from "lucide-react";
import LogoutButton from "@/app/_components/auth/LogoutButton";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-64 border-r bg-white px-4 py-8 dark:bg-slate-900">
      <div className="mb-10 px-2 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <Package className="h-5 w-5 text-white" />
        </div>
        <span className="font-black italic tracking-tighter text-xl text-primary">ECOM <span className="text-slate-400 text-[10px] uppercase not-italic font-bold tracking-widest ml-1">Admin</span></span>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
              pathname === item.href
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-8 left-0 w-full px-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Store
        </Link>
        <div className="mt-4 border-t pt-4 px-2 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Settings</span>
            <button className="w-full flex items-center gap-3 px-2 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all">
                <Settings className="h-5 w-5" />
                Control Center
            </button>
            <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
