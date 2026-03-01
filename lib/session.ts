import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Gets the current session or throws an error if not authenticated.
 * Used in Server Actions for secure CRUD operations.
 */
export async function getRequiredSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("Unauthorized: You must be logged in to perform this action.");
  }

  // Debugging: Log the user to see their role
  console.log("DEBUG - Current User Session:", {
    id: session.user.id,
    email: session.user.email,
    role: session.user.role,
    isOnboarded: session.user.isOnboarded
  });

  return session;
}

/**
 * Gets the current session and verifies the user is an Admin.
 * Throws an error if not authenticated or not an admin.
 */
export async function getRequiredAdminSession() {
  const session = await getRequiredSession();

  if (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN") {
    throw new Error("Forbidden: You do not have permission to perform this action.");
  }

  return session;
}

/**
 * Optional: A version that redirects instead of throwing (for use in Page components)
 */
export async function protectPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
     redirect("/login");
  }

  if (!session.user.isOnboarded) {
     redirect("/onboarding");
  }

  return session;
}
