import * as React from "react";
import { cn } from "@/lib/cn";

export type AmountInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  error?: boolean;
};

export const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-start gap-[10px] rounded-[20px] border transition-colors",
          error
            ? "border-[#EE1D52]"
            : "border-[rgba(13,13,13,0.2)] focus-within:border-[#007F5E]",
          className || "h-[60px]",
        )}
      >
        {/* $ symbol frame - fixed width, align-self: stretch - positioned before placeholder in RTL */}
        <div className="flex h-full w-[36px] flex-col items-center justify-center px-2 shrink-0 self-stretch">
          <span
            className="font-alexandria w-full text-center"
            style={{
              alignSelf: "stretch",
              color: "rgba(13, 13, 13, 0.70)",
              fontFamily: "Alexandria",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "normal",
            }}
          >
            $
          </span>
        </div>

        {/* Input field frame - flexible width */}
        <div className="flex h-full flex-1 flex-col items-center justify-center px-3 shrink-0">
          <input
            ref={ref}
            type="text"
            inputMode="decimal"
            dir="rtl"
            className="h-full w-full bg-transparent text-right text-sm font-light leading-normal text-[#0D0D0D]/70 placeholder:opacity-[0.85] placeholder:font-normal outline-none font-alexandria"
            {...props}
          />
        </div>
      </div>
    );
  },
);
AmountInput.displayName = "AmountInput";

