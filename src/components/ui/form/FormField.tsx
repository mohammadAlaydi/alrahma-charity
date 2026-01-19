import * as React from "react";

import { cn } from "@/lib/cn";
import { FormError } from "./FormError";

export function FormField({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
  labelRight,
  labelClassName,
}: {
  label?: string;
  htmlFor?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  labelRight?: React.ReactNode;
  labelClassName?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between gap-3">
          {label ? (
            <label
              htmlFor={htmlFor}
              className={cn("text-sm font-medium text-zinc-600 dark:text-zinc-300", labelClassName)}
            >
              {label}
            </label>
          ) : (
            <span />
          )}
          {labelRight ? (
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{labelRight}</div>
          ) : null}
        </div>
      )}
      {children}
      {hint ? <div className="text-sm text-zinc-500 dark:text-zinc-400">{hint}</div> : null}
      <FormError>{error}</FormError>
    </div>
  );
}
