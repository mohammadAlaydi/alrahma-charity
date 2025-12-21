import * as React from "react";

import { cn } from "@/lib/cn";

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: React.ReactNode;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    return (
      <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-3">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            "text-brand-600 h-5 w-5 rounded border-zinc-300",
            "focus:ring-brand-500/40",
            "dark:text-brand-500 dark:border-zinc-700 dark:bg-zinc-900",
            className,
          )}
          {...props}
        />
        {label ? <span className="text-sm text-zinc-700 dark:text-zinc-200">{label}</span> : null}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
