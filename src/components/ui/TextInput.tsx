import * as React from "react";

import { cn } from "@/lib/cn";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  rightAdornment?: React.ReactNode;
  leftAdornment?: React.ReactNode;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, error, rightAdornment, leftAdornment, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-[56px] items-center gap-0 rounded-[12px] border px-6",
          error ? "border-[#EE1D52]" : "border-[#666666]/35",
          "bg-white text-[#111111]",
          "focus-within:border-[#666666]/50",
          className,
        )}
      >
        {leftAdornment ? <div className="mr-3 ml-0 text-[#111111]">{leftAdornment}</div> : null}
        <input
          ref={ref}
          dir="rtl"
          className={cn("h-full w-full bg-transparent text-[20px] leading-[24px] outline-none")}
          {...props}
        />
        {rightAdornment ? (
          <div className="mr-0 ml-3 flex items-center">{rightAdornment}</div>
        ) : null}
      </div>
    );
  },
);
TextInput.displayName = "TextInput";
