import { z } from "zod";
import { VALIDATION, ERROR_MESSAGES } from "@/config/constants";

export const loginSchema = z.object({
  email: z.string().email(ERROR_MESSAGES.EMAIL_INVALID),
  password: z.string().min(VALIDATION.PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_SHORT),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email(ERROR_MESSAGES.EMAIL_INVALID),
    password: z.string().min(VALIDATION.PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_SHORT),
  });

export type SignupValues = z.infer<typeof signupSchema>;
