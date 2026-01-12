/**
 * Validation utility functions
 * Centralizes common validation logic
 */

import { VALIDATION } from "@/config/constants";

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(phone);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
};

/**
 * Check if passwords match
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Sanitize string input (remove special characters)
 */
export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};

/**
 * Validate required field
 */
export const isRequired = (value: unknown): boolean => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value != null;
};
