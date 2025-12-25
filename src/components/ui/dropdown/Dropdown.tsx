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
          "absolute z-50 mt-2 w-56 rounded-lg border border-[#007F5E]/20 bg-white p-1 shadow-lg",
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
            "dropdown-item flex w-full items-center rounded-lg px-3 py-2 transition-colors",
            active ? "bg-[#007F5E]/10 text-[#007F5E]" : "text-[#0D0D0D]",
            destructive ? "text-rose-600" : "",
          )}
        >
          {children}
        </button>
      )}
    </MenuItem>
  );
}
