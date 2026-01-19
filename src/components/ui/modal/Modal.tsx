"use client";

import * as React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { cn } from "@/lib/cn";

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20" />
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel
          className={cn(
            "w-full max-w-[720px] max-h-[90vh] bg-transparent border-none shadow-none p-0 mx-auto my-auto",
            className
          )}
        >
          {title ? (
            <DialogTitle className="sr-only">
              {title}
            </DialogTitle>
          ) : null}
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
