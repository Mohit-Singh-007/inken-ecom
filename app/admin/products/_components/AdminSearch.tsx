"use client";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useDebouncedCallback } from "@/hooks/use-debounce";

export function AdminSearch({ placeholder }: { placeholder?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("q") || "");

  const handleSearch = useDebouncedCallback((term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      params.set("page", "1");
      
      router.push(`?${params.toString()}`);
    });
  }, 2000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleSearch(newValue);
  };

  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </div>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 pl-12 rounded-2xl border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none placeholder:text-slate-400 placeholder:font-bold font-bold transition-all focus:ring-2 focus:ring-primary/10"
      />
    </div>
  );
}
