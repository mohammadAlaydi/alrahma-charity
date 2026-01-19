import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/cn";
import { TextInput, type TextInputProps } from "./TextInput";

export type PasswordInputProps = Omit<TextInputProps, "type" | "rightAdornment"> & {
  showLabel?: string;
  hideLabel?: string;
};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showLabel = "إظهار", hideLabel = "إخفاء", className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    return (
      <TextInput
        ref={ref}
        type={visible ? "text" : "password"}
        className={className}
        rightAdornment={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 text-[22px] leading-[22px]",
              "text-[#666666]/80 hover:text-[#666666]",
            )}
            aria-label={visible ? hideLabel : showLabel}
          >
            <span className="text-[22px] leading-[22px] text-[#666666]/80">
              {visible ? hideLabel : showLabel}
            </span>
            {visible ? (
              <EyeOff className="h-6 w-6 shrink-0 text-[#666666]/80" strokeWidth={1} />
            ) : (
              <Eye className="h-6 w-6 shrink-0 text-[#666666]/80" strokeWidth={1} />
            )}
          </button>
        }
        {...props}
      />
    );
  },
);
PasswordInput.displayName = "PasswordInput";
