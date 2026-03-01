"use client";

import { useTransition } from "react";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductSchemaType } from "@/utils/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";
import { createProduct, updateProduct } from "@/lib/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Save, X, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { slugify } from "@/lib/utils";

interface ProductFormProps {
  initialData?: any; // Simplified for now, should be properly typed
  categories: { id: string; name: string }[];
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const title = initialData ? "Edit Product" : "New Product";
  const description = initialData ? "Update product details and stock." : "Add a new fashion item to your store.";
  const action = initialData ? "Save Changes" : "Create Product";

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData ? {
      name: initialData.name,
      slug: initialData.slug,
      description: initialData.description,
      price: parseFloat(initialData.price),
      discountPrice: initialData.discountPrice ? parseFloat(initialData.discountPrice) : null,
      categoryId: initialData.categoryId,
      isFeatured: initialData.isFeatured,
      images: initialData.images || [],
      variants: initialData.variants?.map((v: any) => ({
        size: v.size,
        color: v.color,
        stock: v.stock,
      })) || [],
    } : {
      name: "",
      slug: "",
      description: "",
      price: 0,
      discountPrice: null,
      categoryId: "",
      isFeatured: false,
      images: [],
      variants: [{ size: "", color: "", stock: 0 }],
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

  const onSubmit = async (data: ProductSchemaType) => {
      startTransition(async () => {
        let res;
        if (initialData) {
          res = await updateProduct(initialData.id, data);
        } else {
          res = await createProduct(data);
        }

        if (res.success) {
          toast.success(initialData ? "Product updated successfully" : "Product created successfully");
          router.push("/admin/products");
        } else {
          toast.error(res.error || "Something went wrong");
        }
      });
  };

  const control = form.control as unknown as Control<ProductSchemaType>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
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
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-14 rounded-2xl bg-slate-100/50 p-1 mb-8">
              <TabsTrigger value="general" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm uppercase text-[10px] tracking-widest">General Info</TabsTrigger>
              <TabsTrigger value="pricing" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm uppercase text-[10px] tracking-widest">Pricing & Cat</TabsTrigger>
              <TabsTrigger value="media" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm uppercase text-[10px] tracking-widest">Media</TabsTrigger>
              <TabsTrigger value="variants" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm uppercase text-[10px] tracking-widest">Variants</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Product Name</FormLabel>
                                <FormControl>
                                <Input disabled={isPending} placeholder="e.g. Oversized Heavyweight Tee" {...field} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Product Slug</FormLabel>
                                    <FormControl>
                                      <div className="relative group/slug">
                                        <Input 
                                            disabled={isPending} 
                                            placeholder="e.g. oversized-heavyweight-tee" 
                                            {...field} 
                                            className="h-12 rounded-xl bg-slate-50 border-none font-bold italic pr-24 transition-all focus:bg-white" 
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
                            <Textarea disabled={isPending} placeholder="Tell the vibe of this product..." {...field} className="min-h-[150px] rounded-xl bg-slate-50 border-none font-bold" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border p-4 bg-slate-50/50">
                            <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                            <FormLabel className="font-black uppercase text-[10px] tracking-widest leading-none">
                                Featured Product
                            </FormLabel>
                            <FormDescription className="text-[10px] font-medium leading-none text-slate-400">
                                This product will appear on the homepage slider.
                            </FormDescription>
                            </div>
                        </FormItem>
                        )}
                    />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                    <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={control}
                                name="price"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Base Price (₹)</FormLabel>
                                    <FormControl>
                                    <Input type="number" step="0.01" disabled={isPending} placeholder="999.00" {...field} className="h-12 rounded-xl bg-slate-50 border-none font-black italic text-lg" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="discountPrice"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Discount Price (Optional)</FormLabel>
                                    <FormControl>
                                    <Input type="number" step="0.01" disabled={isPending} placeholder="799.00" value={field.value || ""} onChange={(e) => field.onChange(e.target.value === "" ? null : e.target.value)} className="h-12 rounded-xl bg-slate-50 border-none font-black italic text-lg text-emerald-600" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={control}
                            name="categoryId"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Category / Vibe</FormLabel>
                                <Select disabled={isPending} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold">
                                    <SelectValue defaultValue={field.value} placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                    {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id} className="font-bold cursor-pointer rounded-lg uppercase text-[10px] tracking-widest">
                                        {category.name}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                    <CardContent className="p-8">
                        <FormField
                            control={control}
                            name="images"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-slate-400">Product Shots</FormLabel>
                                <FormControl>
                                <ImageUpload 
                                    value={field.value.map((image) => image.url)} 
                                    disabled={isPending} 
                                    onChange={(url) => field.onChange([...field.value, { url, order: field.value.length }])}
                                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="variants" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-black uppercase text-xs tracking-widest text-slate-400">Sizes & Stock</h3>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => form.setValue("variants", [...(form.getValues("variants") || []), { size: "", color: "", stock: 0 }])}
                                className="h-8 rounded-lg font-bold"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add Variant
                            </Button>
                        </div>
                        
                        <div className="space-y-4">
                            {form.watch("variants")?.map((_, index) => (
                                <div key={index} className="flex gap-4 items-end p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group">
                                    <div className="flex-1 grid grid-cols-3 gap-4">
                                        <FormField
                                            control={control}
                                            name={`variants.${index}.size`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[9px] font-black uppercase text-slate-400">Size</FormLabel>
                                                    <Input disabled={isPending} placeholder="S, M, L..." {...field} className="h-10 rounded-lg bg-white border-slate-200 font-bold uppercase" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name={`variants.${index}.color`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[9px] font-black uppercase text-slate-400">Color</FormLabel>
                                                    <Input disabled={isPending} placeholder="Black, Grey..." {...field} className="h-10 rounded-lg bg-white border-slate-200 font-bold" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`variants.${index}.stock`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[9px] font-black uppercase text-slate-400">Stock</FormLabel>
                                                    <Input disabled={isPending} type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} className="h-10 rounded-lg bg-white border-slate-200 font-bold" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => form.setValue("variants", form.getValues("variants")?.filter((_, i) => i !== index))}
                                        className="h-10 w-10 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
