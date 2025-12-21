"use client";

import * as React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { cn } from "@/lib/cn";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-white/25 backdrop-blur-sm dark:bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className={cn(
            "w-full max-w-lg rounded-2xl border border-zinc-950/10 bg-white p-6 shadow-xl",
            "dark:border-white/10 dark:bg-zinc-950",
          )}
        >
          {title ? (
            <DialogTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </DialogTitle>
          ) : null}
          <div className={title ? "mt-4" : ""}>{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
