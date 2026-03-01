import { prisma } from "@/lib/prisma";
import { Package, Users, Layers, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  // Real stats from DB
  const [productCount, categoryCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { label: "Total Products", value: productCount, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Categories", value: categoryCount, icon: Layers, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Total Customers", value: userCount, icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Total Orders", value: 0, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black italic tracking-tighter uppercase sm:text-4xl">
          Admin <span className="text-primary underline decoration-primary/30 underline-offset-8">Overview</span>
        </h1>
        <p className="mt-2 text-slate-500">Welcome back. Here's a quick look at your store's performance.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">
                {stat.label}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black italic tracking-tighter">{stat.value}</div>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                <span className="text-emerald-500">+0%</span> since last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions or charts can go here later */}
          <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900">
              <CardHeader>
                  <CardTitle className="text-lg font-black italic tracking-tighter uppercase">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex flex-col gap-4">
                      <div className="text-sm text-slate-500 py-10 text-center border-2 border-dashed rounded-xl">
                          No recent activity recorded yet.
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}

// Internal cn for this specific file if needed, or import from lib
import { cn } from "@/lib/utils";
