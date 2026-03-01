import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const onboardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  street: z.string().min(5, "Street is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
  country: z.string().min(2, "Country is required"),
});

export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;

// Category Schemas
export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

// Product Schemas
export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  discountPrice: z.coerce.number().positive().optional().nullable(),
  categoryId: z.string().min(1, "Category is required"),
  isFeatured: z.boolean().default(false),
  images: z.array(z.object({
    url: z.string().url(),
    altText: z.string().optional(),
    order: z.number().default(0),
  })).min(1, "At least one image is required"),
  variants: z.array(z.object({
    size: z.string().optional(),
    color: z.string().optional(),
    stock: z.number().int().nonnegative(),
    sku: z.string().optional(),
  })).optional(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
