"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/utils/zodSchema";
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

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (val: LoginSchemaType) => {
    await authClient.signIn.email(
      {
        email: val.email,
        password: val.password,
      },
      {
        onSuccess: (ctx) => {
          const user = ctx.data.user;

          // Redirect immediately to start the transition
          if (user?.isOnboarded === false || user?.isOnboarded === undefined) {
            router.push("/onboarding");
          } else {
            router.push("/");
          }
          router.refresh();

          toast.success("Logged in successfully!");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Something went wrong during login");
        },
      },
    );
  };

  return (
    <Card className="border-none bg-white/70 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:bg-slate-900/70 dark:shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Login
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">
                    Password
                  </FormLabel>
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
              className="h-11 w-full bg-primary font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Button
            variant="link"
            className="p-0 font-bold text-primary transition-colors hover:text-primary/80"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
