import OnboardingForm from "@/app/_components/auth/OnboardingForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.isOnboarded) {
    redirect("/");
  }

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-slate-50 p-6 md:p-10 dark:bg-slate-950">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[150px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[150px]" />

      <div className="relative z-10 flex w-full max-w-lg flex-col gap-8">
        <OnboardingForm />
      </div>
    </div>
  );
}
