import * as React from "react";

import { cn } from "@/lib/cn";

export function Divider({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-[23px]", className)}>
      <div className="h-[2px] flex-1 bg-[#666666]/25" />
      {label ? <div className="text-[29px] leading-[29px] text-[#666666]">{label}</div> : null}
      <div className="h-[2px] flex-1 bg-[#666666]/25" />
    </div>
  );
}
