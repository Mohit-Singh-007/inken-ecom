"use server";

import { prisma } from "@/lib/prisma";
import { onboardingSchema, OnboardingSchemaType } from "@/utils/zodSchema";
import { getRequiredSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function completeOnboarding(data: OnboardingSchemaType) {
  const session = await getRequiredSession();

  const userId = session.user.id;

  // Validate data
  const validated = onboardingSchema.parse(data);

  try {
    // Perform updates in a transaction
    await prisma.$transaction([
      // Update user name and onboarding status
      prisma.user.update({
        where: { id: userId },
        data: {
          name: validated.name,
          isOnboarded: true,
        },
      }),
      // Create initial address
      prisma.address.create({
        data: {
          userId: userId,
          street: validated.street,
          city: validated.city,
          state: validated.state,
          zipCode: validated.zipCode,
          country: validated.country,
          isDefault: true,
        },
      }),
    ]);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Onboarding error:", error);
    return { success: false, error: "Failed to save onboarding data" };
  }
}
