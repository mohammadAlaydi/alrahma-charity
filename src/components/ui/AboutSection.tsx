import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  return (
    <section className="w-full bg-white py-24" dir="rtl">
      <Container>
        <div className="flex flex-col gap-[91px] lg:flex-row-reverse lg:items-start">
          {/* Image Gallery - appears on left visually in RTL */}
          <div className="relative w-full lg:w-auto lg:flex-1">
            <div className="relative">
              {/* Main image container */}
              <div className="relative h-[695px] w-full max-w-[569px]">
                {/* Large main image with gradient overlay */}
                <div className="absolute top-0 right-0 h-[548px] w-[446px] overflow-hidden rounded-[20px] border-8 border-[#D9D9D9]">
                  <div className="relative h-full w-full">
                    {/* Placeholder for image - replace with actual image */}
                    <div className="h-full w-full bg-gradient-to-b from-[#2E7C5E]/80 via-[#2E7C5E]/60 to-[#2E7C5E]/10" />
                    {/* Play button overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <button
                        type="button"
                        className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-lg transition-opacity hover:opacity-90"
                      >
                        <Play className="h-8 w-8 text-black" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Smaller image on the left (visually) */}
                <div className="absolute bottom-0 left-0 h-[195px] w-[212px] overflow-hidden rounded-[20px] border-8 border-[#FEFBFB] bg-[#D9D9D9]">
                  {/* Placeholder for image */}
                  <div className="h-full w-full bg-gray-300" />
                </div>

                {/* Top right small image (visually) */}
                <div className="absolute top-0 right-0 h-[208px] w-[229px] overflow-hidden rounded-[20px] border-8 border-[#FEFBFB] bg-[#D9D9D9]">
                  {/* Placeholder for image */}
                  <div className="h-full w-full bg-gray-300" />
                </div>

                {/* Vertical bar with rotated text */}
                <div className="absolute top-[205px] right-[106px] flex h-[477px] w-[106px] flex-col items-center justify-center rounded-[15px] bg-[#B4BB5F]">
                  <div className="absolute rotate-90 text-center">
                    <p className="text-[16px] leading-[36px] whitespace-nowrap text-white">
                      نمنح الأمل للأسر المتضررة في غزة.
                    </p>
                  </div>
                  <div className="absolute bottom-0 h-[459px] w-full rounded-[15px] bg-[#007F5E]" />
                </div>

                {/* Decorative line */}
                <div className="absolute top-[5px] right-[264px] h-[37px] w-[262px]">
                  <svg width="262" height="37" viewBox="0 0 262 37" fill="none">
                    <path
                      d="M0 18.5L262 18.5"
                      stroke="#007F5E"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content - appears on right visually in RTL */}
          <div className="w-full space-y-8 lg:w-[628px] lg:flex-shrink-0">
            {/* Heading with icon */}
            <div className="space-y-2">
              <div className="flex items-center gap-[5px]">
                <Image
                  src="/emojis/hand_healtcare.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <h3 className="text-right text-[20px] leading-[24px] font-normal text-[#007F5E]">
                  مساعدة بعضنا البعض يمكن أن تجعل العالم أفضل
                </h3>
              </div>
              <h2 className="text-right text-[30px] leading-[45px] font-bold">
                <span className="text-[#0D0D0D]">جمعية </span>
                <span className="text-[#007F5E]"> الرحمة والإحسان </span>
              </h2>
            </div>

            {/* Paragraph */}
            <p className="text-right text-[16px] leading-[30px] font-normal text-[#0D0D0D]/70">
              جمعية الرحمة والإحسان، مؤسسة خيرية مرخصة في تركيا تحت الرقم 0733100144600001. تأسست
              الجمعية في 07 أكتوبر 2021 استجابة لحالة الطوارئ الإنسانية التي يشهدها قطاع غزة نتيجة
              الأزمات المتكررة والحصار المستمر. ومنذ انطلاقتها، أخذت الجمعية على عاتقها مهمة تقديم
              الإغاثة العاجلة والدعم المستدام للأسر المتضررة، عبر برامج نوعية تلبي الاحتياجات
              الأساسية في مجالات الغذاء، الصحة، التعليم، والإيواء. تسعى الجمعية إلى خدمة أهلنا
              الكرام في قطاع غزة من خلال مشاريع إنسانية وتنموية متكاملة، تهدف إلى تعزيز التكافل
              الاجتماعي، ونشر قيم العطاء، وبث الأمل في النفوس. كما تعمل على تمكين الأفراد وتحسين
              جودة حياتهم، مع التركيز على الفئات الأكثر احتياجا، وذلك عبر مبادرات مبتكرة وشراكات
              استراتيجية تضمن استدامة الأثر الإيجابي. وإيمانا منها بحق الإنسان في حياة كريمة، تركز
              جمعية الرحمة والإحسان على تعزيز فرص التنمية المستدامة، وتوفير بيئة أكثر استقرارا للأسر
              والأطفال، بما يسهم في بناء مستقبل أفضل للأجيال القادمة ويعزز من صمود المجتمع الفلسطيني
              أمام التحديات المتواصلة.
            </p>

            {/* CTA Cards */}
            <div className="flex flex-col gap-6 lg:flex-row-reverse lg:gap-[71px]">
              {/* Card 1 */}
              <div className="flex flex-row-reverse gap-4">
                <div className="flex-1 space-y-2">
                  <h4 className="text-right text-[20px] leading-[30px] font-normal text-[#122A2A]">
                    ابدأ بمساعدتهم
                  </h4>
                  <p className="text-right text-[14px] leading-[24px] font-normal text-[#0D0D0D]/70">
                    ساعدهم على تجاوز الأزمات… دعمك يمنحهم فرصة لحياة أكثر كرامة واستقرارًا
                  </p>
                </div>
                <div className="h-[57px] w-[57px] shrink-0 rounded-lg bg-gray-200">
                  {/* Placeholder for icon image */}
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-row-reverse gap-4">
                <div className="flex-1 space-y-2">
                  <h4 className="text-right text-[20px] leading-[30px] font-normal text-[#122A2A]">
                    قم بالتبرع
                  </h4>
                  <p className="text-right text-[14px] leading-[24px] font-normal text-[#0D0D0D]/70">
                    بمساهمة بسيطة، تمنح أسرة أملًا جديدًا… اجعل عطاؤك يصل لمن يحتاجه الآن.
                  </p>
                </div>
                <div className="h-[57px] w-[57px] shrink-0 rounded-lg bg-gray-200">
                  {/* Placeholder for icon image */}
                </div>
              </div>
            </div>

            {/* Donate Button */}
            <div className="flex justify-center">
              <Button className="h-[58px] rounded-[35px] bg-[#007F5E] px-6 text-[18px] leading-[26px] text-white hover:bg-[#007F5E]/90">
                <Image
                  src="/emojis/line-md_arrow-up.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 rotate-90"
                />
                تبرع الان
              </Button>
            </div>

            {/* Statistics Section */}
            <div className="space-y-4 rounded-lg bg-white p-6">
              {/* Stat 1 */}
              <div className="flex flex-row-reverse items-center justify-between gap-4">
                <div className="flex flex-row-reverse items-center gap-[5px]">
                  <span className="text-right text-[16px] leading-[24px] font-normal text-[#122A2A]">
                    إجمالي المساعدات النقدية
                  </span>
                  <span className="text-right text-[16px] leading-[24px] font-normal text-[#122A2A]">
                    2,800,000.00
                  </span>
                </div>
                <div className="h-8 w-8 shrink-0">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-row-reverse items-center justify-between gap-4">
                <div className="flex flex-row-reverse items-center gap-[5px]">
                  <span className="text-right text-[16px] leading-[24px] font-normal text-[#122A2A]">
                    المستفيدين من مشاريع الطرود الغذائية والوجبات
                  </span>
                  <span className="text-right text-[16px] leading-[24px] font-normal text-[#122A2A]">
                    303,950.00
                  </span>
                </div>
                <div className="h-8 w-8 shrink-0">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-row-reverse items-center justify-between gap-4">
                <div className="flex flex-row-reverse items-center gap-[5px]">
                  <span className="text-right text-[16px] leading-[24px] font-normal text-[#122A2A]">
                    عدد الأكواب ضمن مشاريع سقيا المياه
                  </span>
                  <span className="text-right text-[16px] leading-[24px] font-normal text-[#122A2A]">
                    76,500.00
                  </span>
                </div>
                <div className="h-8 w-8 shrink-0">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
