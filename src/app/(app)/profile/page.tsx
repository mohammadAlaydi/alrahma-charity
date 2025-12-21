"use client";

import { useSession } from "next-auth/react";

import { AppShell } from "@/components/layout/AppShell";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export default function ProfilePage() {
  const { data } = useSession();

  return (
    <AppShell>
      <Container>
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">الملف الشخصي</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            بيانات المستخدم من NextAuth (placeholder).
          </p>
          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
            <pre className="overflow-auto">{JSON.stringify(data?.user ?? null, null, 2)}</pre>
          </div>
        </Card>
      </Container>
    </AppShell>
  );
}
