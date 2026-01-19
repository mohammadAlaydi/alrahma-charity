/**
 * Custom hook for managing toasts/notifications
 * Provides a simple API for showing success, error, info, and warning toasts
 */

import { useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addToast, type ToastType } from "@/store/slices/notificationsSlice";

export interface ShowToastOptions {
  title?: string;
  message: string;
  durationMs?: number;
}

export const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = useCallback(
    (type: ToastType, options: ShowToastOptions) => {
      dispatch(
        addToast({
          type,
          title: options.title,
          message: options.message,
          durationMs: options.durationMs,
        }),
      );
    },
    [dispatch],
  );

  return {
    success: useCallback(
      (options: ShowToastOptions) => showToast("success", options),
      [showToast],
    ),
    error: useCallback((options: ShowToastOptions) => showToast("error", options), [showToast]),
    info: useCallback((options: ShowToastOptions) => showToast("info", options), [showToast]),
    warning: useCallback((options: ShowToastOptions) => showToast("warning", options), [showToast]),
    show: showToast,
  };
};
