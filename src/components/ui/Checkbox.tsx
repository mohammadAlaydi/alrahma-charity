import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: React.ReactNode;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    const [isChecked, setIsChecked] = React.useState(checked ?? false);

    React.useEffect(() => {
      setIsChecked(checked ?? false);
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
      onChange?.(e);
    };

    return (
      <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-3">
        <div className="relative inline-block h-5 w-5 flex-shrink-0">
          {/* Visual checkbox representation */}
          <div className="relative h-full w-full pointer-events-none">
            {/* Checkmark border SVG - always visible */}
            <Image
              src="/figma/Checkmark.svg"
              alt=""
              width={16}
              height={16}
              className="absolute inset-0 h-full w-full"
            />
            {/* Check icon - visible when checked */}
            {isChecked && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-500 rounded-[2.5px]">
                <svg
                  width="12"
                  height="9"
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.8125 0.40625C14.2188 0.78125 14.2188 1.4375 13.8125 1.8125L5.8125 9.8125C5.4375 10.2188 4.78125 10.2188 4.40625 9.8125L0.40625 5.8125C0 5.4375 0 4.78125 0.40625 4.40625C0.78125 4 1.4375 4 1.8125 4.40625L5.09375 7.6875L12.4062 0.40625C12.7812 0 13.4375 0 13.8125 0.40625Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
            )}
          </div>
          {/* Input overlay - receives clicks directly */}
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10"
            {...props}
          />
        </div>
        {label ? <span className="text-sm text-zinc-700 dark:text-zinc-200">{label}</span> : null}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
