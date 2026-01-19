/**
 * Environment variable validation and type-safe access
 * Centralizes all environment variable access with runtime validation
 */

import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  // Next.js
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  
  // NextAuth
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  
  // API
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default("http://localhost:3000"),
});

// Parse and validate environment variables
const parseEnv = () => {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
};

// Export validated environment variables
export const env = parseEnv();

// Type-safe environment variable access
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";
