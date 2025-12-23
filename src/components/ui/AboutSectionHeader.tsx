import { PageHeader } from "./PageHeader";

export function AboutSectionHeader() {
  return (
    <PageHeader
      title="تعرف علينا"
      subtitle="تبرعك اليوم يصنع أثرًا لا يُنسى"
      subtitleIcon="/emojis/hand_healtcare.svg"
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "تعرف علينا", href: "/about" },
      ]}
    />
  );
}
