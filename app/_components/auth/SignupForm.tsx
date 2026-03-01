"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchemaType } from "@/utils/zodSchema";

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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
     
    },
  });

  const onSubmit = async (val: SignupSchemaType) => {
    await authClient.signUp.email(
      {
        email: val.email,
        name: val.name,
        password: val.password,
      },
      {
        onSuccess: () => {
          router.push("/onboarding");
          toast.success("Account created! Welcome.");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <Card className="border-none bg-white/70 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:bg-slate-900/70 dark:shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Create your account</CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Name</FormLabel>
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

            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                      className="h-11 bg-white/50 transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      {...field} 
                      className="h-11 bg-white/50 transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CONFIRM PASSWORD */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      {...field} 
                      className="h-11 bg-white/50 transition-all focus:ring-2 focus:ring-primary/20 dark:bg-slate-800/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-11 w-full bg-primary font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {form.formState.isSubmitting ? "Creating..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Button 
            variant="link" 
            className="p-0 font-bold text-primary transition-colors hover:text-primary/80" 
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
