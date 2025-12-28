import { Container } from "@/components/ui/Container";
import { CharityTypesGrid } from "./CharityTypesGrid";
import { SadaqahDonationForm } from "./SadaqahDonationForm";
import Image from "next/image";

export function SadaqahPageContent() {
  return (
    <main dir="rtl" className="bg-white">
      {/* Figma intro block (node 868:8808) */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="mx-auto flex w-full max-w-[971px] flex-col items-center gap-[8px] text-center">
            <div className="flex items-center justify-center gap-[5px]">
              <p className="text-[16px] leading-[1.5] text-[#007F5E] text-nowrap [font-family:'Playpen_Sans_Arabic',var(--font-cairo),sans-serif]">
                صدقة اليوم… أمان لغدهم
              </p>
              <span aria-hidden="true" className="relative h-6 w-6 overflow-hidden">
                <Image src="/figma/hugeicons-healthcare.svg" alt="" width={24} height={24} />
              </span>
            </div>

            <p className="font-alexandria text-[30px] font-bold leading-[1.6] text-[#0D0D0D] text-nowrap">
              <span>{`الصدقات… `}</span>
              <span className="text-[#007F5E]">أجر</span>{" "}
              <span className="text-[#007F5E]">يمتد ولا ينقطع</span>
            </p>

            <p className="w-full text-center text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] font-alexandria">
              الصدقات هي كل عمل خير ينتفع به صاحبه في حياته ويمتدُ نفعهُ إلى ما بعد الموت. وقد دلت
              الكثير من نصوص القرآن الكريم والسنة النبوية على مشروعيتها والحث على القيام بها. وتدرج
              مؤسسة الخير العديد من المشاريع الخيرية ضمن مشاريع الصدقة الجارية تسهيلاً على المحسنين
              الكرام لزيادة الأجر وحتى ينتفع بها ذوو الحاجة، مثل مشاريع حفر الآبار وبناء المدارس
              والمساجد وتعليم الأطفال وطلبة العلم والمشاريع المدرة للدخل للأسر المتعففة
            </p>
          </div>
        </Container>
      </section>

      {/* Next sections (kept modular + reusable, like Projects) */}
      <section className="pb-20">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <CharityTypesGrid />
          <SadaqahDonationForm />
        </Container>
      </section>

      {/* Button to navigate to Sadaqah Jariyah page */}
      <section className="pb-20">
        <Container>
          <div className="flex justify-center">
            <a
              href="/sadaqah/sadaqah-jariyah"
              className="inline-flex items-center justify-center gap-[10px] rounded-[35px] bg-[#007F5E] px-8 py-4 transition-colors hover:bg-[#056A4F]"
            >
              <span className="text-[16px] font-bold leading-[1.5] text-white font-alexandria">
                صدقة جارية
              </span>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

