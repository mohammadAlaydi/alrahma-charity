import * as React from "react";

import { cn } from "@/lib/cn";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, label, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-xl",
          "border border-zinc-200 bg-white text-zinc-800 shadow-sm",
          "hover:bg-zinc-50",
          "focus-visible:ring-brand-500/40 focus-visible:ring-2 focus-visible:outline-none",
          "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
          className,
        )}
        {...props}
      />
    );
  },
);
IconButton.displayName = "IconButton";
