"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { AppShell } from "@/components/layout/AppShell";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { queryKeys } from "@/services/queryKeys";
import { getHealth } from "@/services/api";

type DonationRow = {
  id: string;
  donor: string;
  amount: number;
  status: "paid" | "pending";
};

export default function DashboardPage() {
  const { data, error } = useQuery({
    queryKey: queryKeys.health(),
    queryFn: getHealth,
  });

  const rows: DonationRow[] = useMemo(
    () => [
      { id: "1", donor: "أحمد", amount: 120, status: "paid" },
      { id: "2", donor: "سارة", amount: 60, status: "pending" },
      { id: "3", donor: "محمد", amount: 300, status: "paid" },
    ],
    [],
  );

  const columns = useMemo<ColumnDef<DonationRow>[]>(
    () => [
      { header: "المتبرع", accessorKey: "donor" },
      {
        header: "المبلغ",
        accessorKey: "amount",
        cell: (ctx) => `${ctx.getValue<number>()} ر.س`,
      },
      {
        header: "الحالة",
        accessorKey: "status",
        cell: (ctx) => (
          <span className="rounded-full border px-3 py-1 text-xs">
            {ctx.getValue<string>() === "paid" ? "مدفوع" : "قيد الانتظار"}
          </span>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AppShell>
      <Container>
        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">لوحة التحكم</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              مثال TanStack Query (قد يفشل إذا لم يوجد endpoint /health في الباك-إند).
            </p>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              {error ? (
                <div className="text-rose-600 dark:text-rose-400">
                  فشل الطلب: {(error as Error).message}
                </div>
              ) : data ? (
                <pre className="overflow-auto">{JSON.stringify(data, null, 2)}</pre>
              ) : (
                <div>جارٍ التحميل...</div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              جدول (TanStack Table)
            </h3>
            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                      {hg.headers.map((h) => (
                        <th key={h.id} className="px-4 py-3 text-right font-medium">
                          {flexRender(h.column.columnDef.header, h.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((r) => (
                    <tr key={r.id} className="border-t border-zinc-200 dark:border-zinc-800">
                      {r.getVisibleCells().map((c) => (
                        <td key={c.id} className="px-4 py-3 text-zinc-900 dark:text-zinc-50">
                          {flexRender(c.column.columnDef.cell, c.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </Container>
    </AppShell>
  );
}
