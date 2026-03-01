import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  rateLimit: {
    enabled: true,
    window: 60, // 60 seconds
    max: 100, // 100 requests per window by default
    customRules: {
      // Internal API path for email sign-in
      "/sign-in/email": {
        window: 10,
        max: 5, // 5 attempts per 10 seconds
      },
      // Internal API path for email sign-up
      "/sign-up/email": {
        window: 60,
        max: 3, // 3 signups per minute per IP
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
      },
      isOnboarded: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
});
