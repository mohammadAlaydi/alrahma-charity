import * as React from "react";

import { cn } from "@/lib/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-950/10 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04)]",
        "dark:border-white/10 dark:bg-zinc-950",
        className,
      )}
      {...props}
    />
  );
}
