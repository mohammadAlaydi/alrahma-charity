/**
 * Unified storage service
 * Provides type-safe access to localStorage with error handling
 * Prevents SSR issues and centralizes storage logic
 */

import { STORAGE_KEYS } from "@/config/constants";

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Check if we're in a browser environment
 */
const isBrowser = (): boolean => typeof window !== "undefined";

/**
 * Generic storage service
 */
class StorageService {
  /**
   * Get item from localStorage
   */
  get<T = string>(key: StorageKey): T | null {
    if (!isBrowser()) return null;

    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      // Try to parse as JSON, otherwise return as string
      try {
        return JSON.parse(item) as T;
      } catch {
        return item as T;
      }
    } catch (error) {
      console.error(`Error reading from localStorage [${key}]:`, error);
      return null;
    }
  }

  /**
   * Set item in localStorage
   */
  set<T = unknown>(key: StorageKey, value: T): boolean {
    if (!isBrowser()) return false;

    try {
      const serialized = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage [${key}]:`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   */
  remove(key: StorageKey): boolean {
    if (!isBrowser()) return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage [${key}]:`, error);
      return false;
    }
  }

  /**
   * Clear all items from localStorage
   */
  clear(): boolean {
    if (!isBrowser()) return false;

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  }

  /**
   * Check if key exists in localStorage
   */
  has(key: StorageKey): boolean {
    if (!isBrowser()) return false;
    return localStorage.getItem(key) !== null;
  }
}

// Export singleton instance
export const storage = new StorageService();

// Specialized storage methods for common use cases
export const tokenStorage = {
  getAccessToken: () => storage.get(STORAGE_KEYS.ACCESS_TOKEN),
  getRefreshToken: () => storage.get(STORAGE_KEYS.REFRESH_TOKEN),
  
  setAccessToken: (token: string) => storage.set(STORAGE_KEYS.ACCESS_TOKEN, token),
  setRefreshToken: (token: string) => storage.set(STORAGE_KEYS.REFRESH_TOKEN, token),
  
  setTokens: (accessToken: string, refreshToken: string) => {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },
  
  clearTokens: () => {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },
  
  hasTokens: () => 
    storage.has(STORAGE_KEYS.ACCESS_TOKEN) && 
    storage.has(STORAGE_KEYS.REFRESH_TOKEN),
};
