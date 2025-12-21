"use client";

import * as React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { cn } from "@/lib/cn";

export function Dropdown({
  button,
  children,
  align = "start",
}: {
  button: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
}) {
  return (
    <Menu as="div" className="relative inline-block text-right">
      <MenuButton as="div" className="inline-block">
        {button}
      </MenuButton>
      <MenuItems
        className={cn(
          "absolute z-50 mt-2 w-56 rounded-2xl border border-zinc-200 bg-white p-1 shadow-lg",
          "dark:border-zinc-700 dark:bg-zinc-900",
          align === "start" ? "left-0" : "right-0",
        )}
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

export function DropdownItem({
  children,
  onClick,
  destructive,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
}) {
  return (
    <MenuItem>
      {({ active }) => (
        <button
          type="button"
          onClick={onClick}
          className={cn(
            "flex w-full items-center rounded-xl px-3 py-2 text-sm",
            active ? "bg-zinc-950/5 dark:bg-white/10" : "",
            destructive ? "text-rose-600 dark:text-rose-400" : "text-zinc-900 dark:text-zinc-50",
          )}
        >
          {children}
        </button>
      )}
    </MenuItem>
  );
}
