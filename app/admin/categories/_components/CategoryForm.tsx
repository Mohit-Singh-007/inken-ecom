"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategorySchemaType } from "@/utils/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";
import { createCategory, updateCategory } from "@/lib/actions/category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Save, X, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { slugify } from "@/lib/utils";

interface CategoryFormProps {
  initialData?: any;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const title = initialData ? "Edit Category" : "New Category";
  const description = initialData ? "Update category details and vibe." : "Add a new style category to your store.";
  const action = initialData ? "Save Changes" : "Create Category";

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      description: "",
      image: "",
    },
  });

  // Manual slug generation
  const onGenerateSlug = () => {
    const name = form.getValues("name");
    if (name) {
      form.setValue("slug", slugify(name), { shouldValidate: true });
    } else {
      toast.error("Please enter a name first");
    }
  };

  const onSubmit = async (data: CategorySchemaType) => {
      startTransition(async () => {
        let res;
        if (initialData) {
          res = await updateCategory(initialData.id, data);
        } else {
          res = await createCategory(data);
        }

        if (res.success) {
          toast.success(initialData ? "Category updated successfully" : "Category created successfully");
          router.push("/admin/categories");
        } else {
          toast.error(res.error || "Something went wrong");
        }
      });
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter uppercase">{title}</h1>
              <p className="text-sm text-slate-500">{description}</p>
            </div>
            <div className="flex gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()} className="h-12 px-6 rounded-2xl font-bold">
                    <X className="mr-2 h-5 w-5" /> Cancel
                </Button>
                <Button disabled={isPending} type="submit" className="h-12 px-8 rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    <Save className="mr-2 h-5 w-5" /> {action}
                </Button>
            </div>
          </div>

          <Separator className="bg-slate-100" />
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Category Name</FormLabel>
                                <FormControl>
                                <Input disabled={isPending} placeholder="e.g. Streetwear" {...field} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Slug</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                        disabled={isPending} 
                                        placeholder="e.g. streetwear" 
                                        {...field} 
                                        className="h-12 rounded-xl bg-slate-50 border-none font-bold italic pr-24 focus:bg-white transition-all" 
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={onGenerateSlug}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 rounded-lg text-[9px] font-black uppercase tracking-widest bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all border-none"
                                    >
                                        <Sparkles className="h-3 w-3 mr-1" />
                                        Generate
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Description</FormLabel>
                            <FormControl>
                            <Textarea disabled={isPending} placeholder="What is this vibe about?" {...field} className="min-h-[100px] rounded-xl bg-slate-50 border-none font-bold" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Banner Image</FormLabel>
                            <FormControl>
                                <ImageUpload 
                                    value={field.value ? [field.value] : []} 
                                    disabled={isPending} 
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </CardContent>
            </Card>
        </form>
      </Form>
    </div>
  );
}
