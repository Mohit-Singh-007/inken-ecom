import { redirect } from "next/navigation";
import { getRequiredAdminSession } from "@/lib/session";
import { AdminSidebar } from "./_components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Security check at the layout level
  try {
    await getRequiredAdminSession();
  } catch (error: any) {
    if (error.message.includes("Forbidden")) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <h1 className="text-4xl font-black text-slate-900 italic">403</h1>
            <p className="mt-2 text-slate-500 font-bold">Access Denied: Admin privileges required.</p>
            <p className="mt-1 text-xs text-slate-400">Current Role: Check Console Logs</p>
          </div>
        </div>
      );
    }
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* Sidebar - Fixed width */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
