import SignupForm from "@/app/_components/auth/SignupForm";
import { GalleryVerticalEnd } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-slate-50 p-6 md:p-10 dark:bg-slate-950">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
            <GalleryVerticalEnd className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight uppercase italic">Ecom</h1>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
