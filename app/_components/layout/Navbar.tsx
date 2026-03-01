"use client";

import Link from "next/link";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  LogOut,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
            <span className="text-lg font-bold text-primary-foreground italic">
              E
            </span>
          </div>
          <span className="hidden text-xl font-bold tracking-tight sm:block uppercase italic">
            Ecom
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden max-w-sm flex-1 px-8 lg:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search products..."
              className="h-9 w-full rounded-full bg-slate-100/50 pl-10 transition-all focus:bg-white focus:ring-2 focus:ring-primary/10 dark:bg-slate-900/50 dark:focus:bg-slate-900"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2 text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
          >
            <ShoppingCart className="h-6 w-6" />
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-[10px] font-bold text-primary-foreground shadow-lg shadow-primary/20">
              3
            </Badge>
          </Link>

          {/* User Section */}
          {!isPending && (
            <>
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <Avatar className="h-9 w-9 border-2 border-primary/10 transition-all hover:border-primary/50">
                        <AvatarImage
                          src={session.user.image || ""}
                          alt={session.user.name}
                        />
                        <AvatarFallback className="bg-primary/5 font-bold text-primary italic">
                          {session.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-slate-500">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/admin" className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    asChild
                    className="hidden sm:inline-flex"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu - Simplified for now */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
