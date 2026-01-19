"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppShell } from "@/components/layout/AppShell";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { FormField } from "@/components/ui/form/FormField";
import { TextInput } from "@/components/ui/TextInput";
import { Button } from "@/components/ui/Button";
import { AccountSettingsHeader } from "@/components/ui/AccountSettingsHeader";
import { addToast } from "@/store/slices/notificationsSlice";
import { useAppDispatch } from "@/store/hooks";

const settingsSchema = z.object({
  displayName: z.string().min(2, "الاسم مطلوب"),
});

type SettingsValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { displayName: "الرحمة" },
  });

  const onSubmit = handleSubmit(async () => {
    dispatch(addToast({ type: "success", message: "تم حفظ الإعدادات (تجريبي)" }));
  });

  return (
    <AppShell>
      <Container>
        <div className="grid gap-6">
          <AccountSettingsHeader />
          <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">الإعدادات</h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  تبديل الوضع الداكن + نموذج تجريبي.
                </p>
              </div>
              <ThemeToggle />
            </div>
          </Card>

          <Card className="p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                label="اسم العرض"
                htmlFor="displayName"
                error={errors.displayName?.message}
              >
                <TextInput
                  id="displayName"
                  placeholder="مثال: الرحمة"
                  error={Boolean(errors.displayName)}
                  {...register("displayName")}
                />
              </FormField>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جارٍ الحفظ..." : "حفظ"}
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </AppShell>
  );
}
