import * as React from "react";

import { cn } from "@/lib/cn";

export function FormError({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return <p className={cn("text-sm text-rose-600 dark:text-rose-400", className)}>{children}</p>;
}
