"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, OnboardingSchemaType } from "@/utils/zodSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { completeOnboarding } from "@/lib/actions/auth";

export default function OnboardingForm() {
  const router = useRouter();
  const form = useForm<OnboardingSchemaType>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const onSubmit = async (val: OnboardingSchemaType) => {
    console.log("Submitting onboarding data:", val);
    const res = await completeOnboarding(val);
    console.log("Onboarding response:", res);

    if (res.success) {
      router.push("/");
      router.refresh();
      toast.success("Onboarding completed!");
     
    } else {
      toast.error(res.error || "Failed to complete onboarding");
    }
  };

  return (
    <Card className="border-none bg-white/70 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:bg-slate-900/70 dark:shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Welcome!</CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Please complete your profile and add your primary address to unlock full access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      className="h-11 bg-white/50 transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Street Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123 Main St" 
                        {...field} 
                        className="h-11 bg-white/50 transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">City</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="New York" 
                        {...field} 
                        className="h-11 bg-white/50 transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">State / Province</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="NY" 
                        {...field} 
                        className="h-11 bg-white/50 transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Zip / Postal Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="10001" 
                        {...field} 
                        className="h-11 bg-white/50 transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Country</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="United States" 
                        {...field} 
                        className="h-11 bg-white/50 transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-primary text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving Detail..." : "Complete Onboarding"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
