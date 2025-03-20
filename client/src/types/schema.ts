import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(50),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(50),
});

export const StoreUrlSchema = z.object({
  originalUrl: z.string().min(3, "Url must be at least 3 characters").max(50),
});
