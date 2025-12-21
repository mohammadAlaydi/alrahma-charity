import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen">
      <Container className="py-10">
        <Card className="p-8">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            مرحباً بك في الرحمة
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            هذا مشروع الواجهة الأمامية جاهز للربط مع الـ API.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button>الذهاب إلى لوحة التحكم</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">تسجيل الدخول</Button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
