"use client";

import * as React from "react";
import { Tab } from "@headlessui/react";

import { cn } from "@/lib/cn";

export function Tabs({
  tabs,
  className,
}: {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
  className?: string;
}) {
  return (
    <Tab.Group>
      <Tab.List
        className={cn(
          "inline-flex rounded-full border border-zinc-200 bg-white p-1",
          "dark:border-zinc-700 dark:bg-zinc-900",
          className,
        )}
      >
        {tabs.map((t) => (
          <Tab key={t.label} className={({ selected }) => tabClass(selected)}>
            {t.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {tabs.map((t) => (
          <Tab.Panel key={t.label}>{t.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

function tabClass(selected: boolean) {
  return cn(
    "rounded-full px-4 py-2 text-sm font-medium outline-none",
    selected
      ? "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950"
      : "text-zinc-700 hover:bg-zinc-950/5 dark:text-zinc-200 dark:hover:bg-white/10",
  );
}
