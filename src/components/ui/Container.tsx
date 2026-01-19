import * as React from "react";

import { cn } from "@/lib/cn";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
};

export function Container({ className, size = "lg", ...props }: ContainerProps) {
  const max = size === "sm" ? "max-w-3xl" : size === "md" ? "max-w-5xl" : "max-w-7xl";

  return <div className={cn("mx-auto w-full px-4", max, className)} {...props} />;
}
