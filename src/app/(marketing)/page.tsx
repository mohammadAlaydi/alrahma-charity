"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AmountInput } from "@/components/ui/AmountInput";

const PRESET_AMOUNTS = [200, 100, 50, 10];

type TabType = "vision" | "mission" | "values";

const PRESET_AMOUNTS_DONATION = [200, 100, 50, 10];

const VISION_ITEMS = [
  "توسيع التدخلات الإنسانية للوصول إلى الأسر الأكثر تضررًا",
  "تنفيذ مشاريع تنموية مستدامة تعيد للأسر القدرة على الاعتماد على نفسها",
  "تمكين الشباب عبر التدريب والتعليم وبناء القدرات",
];

const MISSION_ITEMS = [
  "تقديم الإغاثة العاجلة والدعم المستدام للأسر المتضررة في غزة",
  "تعزيز التكافل الاجتماعي ونشر قيم العطاء",
  "تمكين الأفراد وتحسين جودة حياتهم عبر مبادرات مبتكرة",
];

const VALUES_ITEMS = [
  "الشفافية في جميع أعمالنا ومشاريعنا",
  "الإنسانية في التعامل مع جميع الفئات المحتاجة",
  "الاستدامة في الأثر الإيجابي لمشاريعنا",
];

// Mock project data - to be replaced with real data
const FEATURED_PROJECTS = [
  {
    id: "1",
    title: "توفير سلال غذائية للأسر المحتاجة",
    description: "ساهم في توفير احتياجات غذائية أساسية لعائلات تعاني من انعدام الأمن الغذائي",
    goal: 100000,
    collected: 85000,
    category: "إغاثة عاجلة",
  },
  {
    id: "2",
    title: "إعادة تأهيل المدارس والمرافق التعليمية",
    description: "دعم التعليم عبر إصلاح المدارس وتوفير بيئة تعليمية آمنة للأطفال",
    goal: 75000,
    collected: 50000,
    category: "تعليم",
  },
  {
    id: "3",
    title: "حفر آبار مياه نظيفة",
    description: "وفر مياه نظيفة وآمنة للشرب لمئات الأسر المحتاجة",
    goal: 120000,
    collected: 35000,
    category: "مياه",
  },
];

export default function HomePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("vision");

  const getTabItems = () => {
    switch (activeTab) {
      case "vision":
        return VISION_ITEMS;
      case "mission":
        return MISSION_ITEMS;
      case "values":
        return VALUES_ITEMS;
      default:
        return VISION_ITEMS;
    }
  };

  return (
    <div className="relative min-h-screen bg-white" dir="rtl">
      {/* WhatsApp Icon - Positioned in the side gutter as per Figma (x=1752, y=1475 on 1920px canvas) */}
      <div className="absolute top-[1475px] inset-x-0 z-10 hidden xl:flex justify-center pointer-events-none">
        <div className="relative w-full max-w-[1920px] h-0">
          <a
            href="https://wa.me/905357829980"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-[1752px] pointer-events-auto transition-all hover:scale-110"
            aria-label="تواصل معنا على واتساب"
          >
            <Image
              src="/figma/whatsapp.svg"
              alt="واتساب"
              width={80}
              height={80}
              className="h-20 w-20"
            />
          </a>
        </div>
      </div>

      {/* Hero Section with Background */}
      <section className="relative h-[1023.726px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Hero Area.png"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(270deg, rgba(14, 32, 29, 0.1) 0%, rgba(14, 32, 29, 0.318) 16.5%, rgba(14, 32, 29, 0.328) 34.2%, rgba(14, 32, 29, 0.6) 50.5%, rgba(14, 32, 29, 0.95) 71%, rgba(14, 32, 29, 1) 84.5%)` 
            }} 
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(270deg, rgba(46, 124, 94, 0.1) 0%, rgba(46, 124, 94, 0.318) 23.5%, rgba(46, 124, 94, 0.328) 50.4%, rgba(46, 124, 94, 0.6) 72.1%, rgba(46, 124, 94, 0.95) 87.9%, rgba(46, 124, 94, 1) 99.5%)` 
            }} 
          />
        </div>
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col gap-2 items-center">
              <div className="flex gap-[5px] items-center">
                <div className="relative h-8 w-8">
                  <Image
                    src="/emojis/hand_healtcare.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-['Playpen_Sans_Arabic'] text-[20px] leading-[1.5] text-[#DFD383]">
                  عطاؤك شفاعة وسلام وعفاف
                </p>
              </div>
              <h1 className="font-alexandria text-[64px] font-bold leading-[1.2] text-white max-w-[900px]">
                عطائك اليوم يُنشئ أثر الأمل لغدٍ أفضل
              </h1>
            </div>
            <button
              type="button"
              className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] hover:bg-[#005F4A] transition-colors"
            >
              <div className="flex items-center justify-center relative shrink-0 size-[20px]">
                <div className="flex-none rotate-[90deg] scale-y-[-100%]">
                  <Image
                    src="/emojis/line-md_arrow-up.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </div>
              </div>
              <p className="font-alexandria text-[16px] font-bold leading-[1.5] text-white">
                تبرع الآن
              </p>
            </button>
          </div>
        </Container>
      </section>

      {/* About Section with Image Gallery */}
      <section className="w-full py-[100px]">
        <Container>
          <div className="flex flex-col gap-[91px] lg:flex-row-reverse lg:items-start">
            {/* Image Gallery - same as About page */}
            <div className="relative w-full lg:w-auto lg:flex-1">
              <div className="relative">
                <div className="relative h-[695px] w-full max-w-[569px] mx-auto">
                  {/* Top left small image */}
                  <div className="absolute top-0 left-0 h-[208px] w-[229px] z-10">
                    <div className="relative h-full w-full rounded-[20px] p-2 bg-[#FEFCFC]">
                      <div className="relative h-full w-full rounded-[12px] overflow-hidden">
                        <Image
                          src="/images/Rectangle 9.png"
                          alt="Children in shelter"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rectangle 5 - Decorative border behind Rectangle 4 */}
                  <div className="hidden md:block absolute top-[52.9px] left-[175px] h-[642px] w-[337px] rounded-[20px] border-[2px] border-[#B4BB5F] z-0" />

                  {/* Large main image with gradient overlay */}
                  <div className="absolute top-[52.9px] left-[123px] h-[548px] w-[446px] z-10">
                    <div className="relative h-full w-full rounded-[20px] border-[8px] border-[#FFECEC] overflow-hidden">
                        <Image
                          src="/images/Rectangle 4.png"
                          alt="Child in humanitarian aid"
                          fill
                          className="object-cover"
                        />
                        <div 
                          className="absolute inset-0" 
                          style={{ 
                            background: `linear-gradient(180deg, rgba(46, 124, 94, 0.8) 0%, rgba(46, 124, 94, 0.6) 34.5%, rgba(46, 124, 94, 0.328) 61.5%, rgba(46, 124, 94, 0.318) 81.5%, rgba(46, 124, 94, 0.1) 100%)` 
                          }} 
                        />
                        {/* Play button overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                          <button
                            type="button"
                            className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-lg transition-opacity hover:opacity-90"
                          >
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path d="M8 5v14l11-7z" fill="#007F5E" />
                            </svg>
                          </button>
                        </div>
                    </div>
                  </div>

                  {/* Smaller image on the right */}
                  <div className="absolute top-[481px] left-[356px] h-[195px] w-[212px] z-20">
                    <div className="relative h-full w-full rounded-[20px] border-[8px] border-[#FEFDFD] overflow-hidden">
                        <Image
                          src="/images/Rectangle 6.png"
                          alt="Child portrait"
                          fill
                          className="object-cover"
                        />
                    </div>
                  </div>

                  {/* Vertical bar with rotated text */}
                  <div className="absolute top-[205px] left-0 h-[477px] w-[106px] flex flex-col items-center justify-center z-30">
                    <div className="absolute top-0 left-0 h-[476.858px] w-full rounded-[15px] bg-[#B4BB5F]" />
                    <div className="absolute top-[8.88px] left-0 h-[459px] w-full rounded-[15px] bg-[#007F5E]" />
                    <div className="absolute flex h-[337px] items-center justify-center -rotate-90">
                      <p className="font-['Playpen_Sans_Arabic'] text-[24px] font-semibold leading-[1.5] text-center text-white whitespace-nowrap">
                        نمنح <span className="text-[#DFD383]">الأمل</span> للأسر
                        المتضررة في غزة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full space-y-8 lg:w-[628px] lg:flex-shrink-0">
              {/* Heading with icon */}
              <div className="space-y-2">
                <div className="flex items-center gap-[5px] justify-start">
                  <p className="font-['Playpen_Sans_Arabic'] text-[16px] leading-[1.5] text-[#007F5E]">
                    مساعدة بعضنا البعض يمكن أن تجعل العالم أفضل
                  </p>
                  <div className="relative h-6 w-6">
                    <Image
                      src="/emojis/hand_healtcare.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h2 className="font-alexandria text-[30px] font-bold leading-[1.5] text-right">
                  <span className="text-[#122F2A]">جمعية </span>
                  <span className="text-[#007F5E]">الرحمة</span>{" "}
                  <span className="text-[#007F5E]">والإحسان</span>
                </h2>
              </div>

              {/* Paragraph */}
              <p className="font-alexandria text-[16px] font-normal leading-[1.6] text-right text-[rgba(13,13,13,0.7)] text-justify">
                جمعية الرحمة والإحسان، مؤسسة خيرية مرخصة في تركيا تحت الرقم
                0733100144600001. تأسست الجمعية في 07 أكتوبر 2021 استجابة لحالة
                الطوارئ الإنسانية التي يشهدها قطاع غزة نتيجة الأزمات المتكررة
                والحصار المستمر. ومنذ انطلاقتها، أخذت الجمعية على عاتقها مهمة
                تقديم الإغاثة العاجلة والدعم المستدام للأسر المتضررة، عبر برامج
                نوعية تلبي الاحتياجات الأساسية في مجالات الغذاء، الصحة، التعليم،
                والإيواء.
              </p>

              {/* CTA Cards */}
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-[71px]">
                {/* Card 1 - قم بالتبرع */}
                <div className="flex flex-col gap-4 w-full md:w-[276px]">
                  <div className="flex flex-row gap-4 items-start justify-end">
                    <div className="flex-1 space-y-2 flex flex-col items-end">
                      <h4 className="font-alexandria text-[20px] font-semibold leading-normal text-right text-[#122F2A] w-full">
                        قم بالتبرع
                      </h4>
                      <p className="font-alexandria text-[16px] font-normal leading-[1.5] text-right text-[rgba(13,13,13,0.7)] text-justify w-full">
                        بمساهمة بسيطة، تمنح أسرة أملًا جديدًا… اجعل عطاؤك يصل
                        لمن يحتاجه الآن.
                      </p>
                    </div>
                    <div className="relative h-[57px] w-[57px] shrink-0">
                      <Image
                        src="/emojis/give hart 1.png"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Donate Button */}
                  <div className="flex justify-start pt-4">
                    <button
                      type="button"
                      className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] w-full md:w-auto hover:bg-[#005F4A] transition-colors"
                    >
                      <div className="flex items-center justify-center relative shrink-0 size-[20px]">
                        <div className="flex-none rotate-[90deg] scale-y-[-100%]">
                          <Image
                            src="/emojis/line-md_arrow-up.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5"
                          />
                        </div>
                      </div>
                      <p className="font-alexandria text-[16px] font-bold leading-[1.6] text-white">
                        تبرع الان
                      </p>
                    </button>
                  </div>
                </div>

                {/* Card 2 - ابدأ بمساعدتهم */}
                <div className="flex flex-row gap-4 items-start justify-end w-full md:w-[276px]">
                  <div className="flex-1 space-y-2 flex flex-col items-end">
                    <h4 className="font-alexandria text-[20px] font-semibold leading-normal text-right text-[#122F2A] w-full">
                      ابدأ بمساعدتهم
                    </h4>
                    <p className="font-alexandria text-[16px] font-normal leading-[1.5] text-right text-[rgba(13,13,13,0.7)] text-justify w-full">
                      ساعدهم على تجاوز الأزمات… دعمك يمنحهم فرصة لحياة أكثر
                      كرامة واستقرارًا
                    </p>
                  </div>
                  <div className="relative h-[57px] w-[57px] shrink-0">
                    <Image
                      src="/emojis/give hart 1.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="w-full bg-white py-[100px]">
        <Container>
          <div className="flex flex-row items-center justify-center gap-6">
            {/* Stat Card 1 - Water */}
            <div className="flex flex-col gap-4 items-center justify-center min-h-[219px] w-full max-w-[312px]">
              <div className="h-[67px] w-[67px] flex items-center justify-center relative">
                <Image
                  src="/figma/water-svgrepo-com 1.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-[5px] items-center text-[#122F2A]">
                <p className="font-['Playpen_Sans_Arabic'] text-[32px] font-semibold leading-[1.5] text-center">
                  76,500.00
                </p>
                <p className="font-alexandria text-[16px] font-medium leading-[1.5] text-center">
                  عدد الأكواب ضمن مشاريع سقيا المياه
                </p>
              </div>
            </div>

            {/* Stat Card 2 - Donation */}
            <div className="flex flex-col gap-4 items-center justify-center min-h-[219px] w-full max-w-[393px]">
              <div className="h-[67px] w-[67px] flex items-center justify-center relative">
                <Image
                  src="/figma/donate-donation-svgrepo-com 1.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-[5px] items-center text-[#122F2A]">
                <p className="font-['Playpen_Sans_Arabic'] text-[32px] font-semibold leading-[1.5] text-center">
                  303,950.00
                </p>
                <p className="font-alexandria text-[16px] font-medium leading-[1.5] text-center">
                  المستفيدين من مشاريع الطرود الغذائية والوجبات
                </p>
              </div>
            </div>

            {/* Stat Card 3 - Money */}
            <div className="flex flex-col gap-4 items-center justify-center min-h-[219px] w-full max-w-[226px]">
              <div className="h-[67px] w-[50px] flex items-center justify-center relative">
                <Image
                  src="/figma/Frame 1000009357.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-[5px] items-center text-[#122F2A]">
                <p className="font-['Playpen_Sans_Arabic'] text-[32px] font-semibold leading-[1.5] text-center">
                  2,800,000.00
                </p>
                <p className="font-alexandria text-[16px] font-medium leading-[1.5] text-center">
                  إجمالي المساعدات النقدية
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Section - مشاريعنا الإنسانية */}
      <section className="w-full bg-white py-[100px]">
        <Container>
          <div className="flex flex-col gap-12 items-center">
            {/* Section Header */}
            <div className="flex flex-col gap-2 items-center text-center">
              <div className="flex gap-[5px] items-center">
                <p className="font-['Playpen_Sans_Arabic'] text-[16px] leading-[1.5] text-[#007F5E]">
                  مشاريع تصنع الفارق في حياة الأسر المحتاجة
                </p>
                <div className="relative h-6 w-6">
                  <Image
                    src="/emojis/hand_healtcare.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="font-alexandria text-[40px] font-bold leading-[1.6]">
                <span className="text-[#122F2A]">مشاريعنا </span>
                <span className="text-[#007F5E]">الإنسانية</span>
              </h2>
            </div>

            {/* Projects Grid - Display 3 cards */}
            <div className="grid grid-cols-3 gap-6 w-full">
              {FEATURED_PROJECTS.map((project) => {
                const progress = Math.min(
                  (project.collected / project.goal) * 100,
                  100
                );
                return (
                  <div
                    key={project.id}
                    className="flex h-full w-full max-w-[395px] flex-col overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-none transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                  >
                    {/* Project Image placeholder */}
                    <div className="relative h-[300px] w-full overflow-hidden rounded-t-[20px] bg-zinc-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-molle text-center text-[32px] font-normal text-white">
                          Donate image
                        </span>
                      </div>
                      <div className="absolute inset-x-4 top-3 z-10 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white bg-[#007F5E] px-3.5 py-1.5">
                          <span className="font-alexandria text-[14px] font-medium leading-[1.5] text-white">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-3.5 bg-white p-4">
                      <div className="space-y-2.5">
                        <h3 className="font-alexandria text-[18px] font-bold leading-[1.5] text-[#122F2A]">
                          {project.title}
                        </h3>
                        <div className="flex items-start gap-2">
                          <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center">
                            <Image
                              src="/mage_goals-fill.svg"
                              alt="وصف الحملة"
                              width={20}
                              height={20}
                              className="h-5 w-5"
                            />
                          </span>
                          <p className="font-alexandria text-[14px] font-normal leading-[1.5] text-[rgba(13,13,13,0.7)]">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="font-alexandria text-[14px] flex items-center justify-between font-bold text-[#122F2A]">
                          <span>التبرعات</span>
                          <span>{progress.toFixed(2)}%</span>
                        </div>
                        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#D9D9D9]/40">
                          <div
                            className="absolute top-0 right-0 h-full rounded-full bg-[#007F5E]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="font-alexandria text-[14px] mt-1 flex items-center justify-between text-[#122F2A]">
                          <span className="font-medium whitespace-nowrap">
                            المبلغ المُجمَّع: ${project.collected.toLocaleString()}
                          </span>
                          <span className="font-bold text-[#B4BB5F] whitespace-nowrap">
                            الهدف: ${project.goal.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto -mb-4 -ml-4 flex items-start justify-end relative z-10">
                        <button
                          type="button"
                          className="font-alexandria text-[16px] font-bold leading-[1.5] inline-flex items-center gap-3 rounded-tr-2xl rounded-bl-none bg-[#007F5E] px-6 py-2.5 text-white transition-colors hover:bg-[#056A4F]"
                        >
                          <span>تبرع الآن</span>
                          <Image
                            src="/double hearts.svg"
                            alt="تبرع"
                            width={22}
                            height={23}
                            className="h-6 w-6"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* More Button */}
            <button
              type="button"
              className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] hover:bg-[#005F4A] transition-colors"
            >
              <div className="flex items-center justify-center relative shrink-0 size-[20px]">
                <div className="flex-none rotate-[90deg] scale-y-[-100%]">
                  <Image
                    src="/emojis/line-md_arrow-up.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </div>
              </div>
              <p className="font-alexandria text-[16px] font-bold leading-[1.5] text-white">
                المزيد
              </p>
            </button>
          </div>
        </Container>
      </section>

      {/* Campaign/Impact Section with Background Image */}
      <section className="relative w-full h-[808px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Rectangle 5354.png"
            alt="Children receiving aid"
            fill
            className="object-cover"
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(270deg, rgba(14, 32, 29, 0.1) 0%, rgba(14, 32, 29, 0.318) 16.5%, rgba(14, 32, 29, 0.328) 34.2%, rgba(14, 32, 29, 0.6) 50.5%, rgba(14, 32, 29, 0.95) 71%, rgba(14, 32, 29, 1) 84.5%)` 
            }} 
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(270deg, rgba(46, 124, 94, 0.1) 0%, rgba(46, 124, 94, 0.318) 23.5%, rgba(46, 124, 94, 0.328) 50.4%, rgba(46, 124, 94, 0.6) 72.1%, rgba(46, 124, 94, 0.95) 87.9%, rgba(46, 124, 94, 1) 99.5%)` 
            }} 
          />
        </div>
        <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-center">
            <div className="flex gap-[5px] items-center">
              <div className="relative h-8 w-8">
                <Image
                  src="/emojis/hand_healtcare.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-['Playpen_Sans_Arabic'] text-[20px] leading-[1.5] text-[#DFD383]">
                تبرعك اليوم يصنع أثرًا لا يُنسى
              </p>
            </div>
            <p className="font-alexandria text-[40px] font-bold leading-[1.6] text-white max-w-[797px]">
              بمساهمة بسيطة تصنع حماية وأمانًا لأطفال يواجهون الظروف الأصعب
            </p>
          </div>
          <div className="flex flex-row gap-[22px] items-center">
            <button
              type="button"
              className="border border-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] bg-transparent hover:bg-[#007F5E]/10 transition-colors"
            >
              <p className="font-alexandria text-[16px] font-semibold leading-[1.5] text-white">
                تبرع الان
              </p>
              <div className="flex items-center justify-center relative shrink-0 size-[20px]">
                <div className="flex-none rotate-[90deg] scale-y-[-100%]">
                  <Image
                    src="/emojis/line-md_arrow-up.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </div>
              </div>
            </button>
            <button
              type="button"
              className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] hover:bg-[#005F4A] transition-colors"
            >
              <p className="font-alexandria text-[16px] font-bold leading-[1.5] text-white">
                اهم المشاريع
              </p>
              <div className="flex-none rotate-[90deg] scale-y-[-100%]">
                <Image
                  src="/emojis/line-md_arrow-up.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Article Section - اهم المقالات */}
      <section className="w-full bg-white py-[100px]">
        <Container>
          <div className="flex flex-col gap-12 items-center">
            {/* Section Header */}
            <div className="flex flex-col gap-2 items-center text-center">
              <div className="flex gap-[5px] items-center">
                <p className="font-['Playpen_Sans_Arabic'] text-[16px] leading-[1.5] text-[#007F5E]">
                  اطّلع على أحدث المقالات والأخبار
                </p>
                <div className="relative h-6 w-6">
                  <Image
                    src="/emojis/hand_healtcare.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="font-alexandria text-[40px] font-bold leading-[1.6]">
                <span className="text-[#122F2A]">اهم </span>
                <span className="text-[#007F5E]">المقالات</span>
              </h2>
            </div>

            {/* Articles Grid - 3 placeholder cards */}
            <div className="grid grid-cols-3 gap-6 w-full">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-none transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                >
                  <div className="relative h-[250px] w-full overflow-hidden bg-zinc-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-molle text-center text-[24px] font-normal text-white">
                        Article image
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 p-4">
                    <h3 className="font-alexandria text-[18px] font-bold leading-[1.5] text-[#122F2A]">
                      أفضل الجمعيات الموثوقة لمساعدة أهل غزة
                    </h3>
                    <p className="font-alexandria text-[14px] font-normal leading-[1.5] text-[rgba(13,13,13,0.7)]">
                      في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد
                      الأمل دائمًا بجهود الخيرين...
                    </p>
                    <div className="flex items-center justify-between text-[12px] text-[rgba(13,13,13,0.5)]">
                      <span>20 نوفمبر 2025</span>
                      <span>التصنيفات</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* More Button */}
            <button
              type="button"
              className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] hover:bg-[#005F4A] transition-colors"
            >
              <div className="flex items-center justify-center relative shrink-0 size-[20px]">
                <div className="flex-none rotate-[90deg] scale-y-[-100%]">
                  <Image
                    src="/emojis/line-md_arrow-up.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </div>
              </div>
              <p className="font-alexandria text-[16px] font-bold leading-[1.5] text-white">
                المزيد
              </p>
            </button>
          </div>
        </Container>
      </section>

      {/* Donation Card Section with Background */}
      <section className="relative w-full min-h-[1115px] overflow-visible">
        <div className="absolute top-0 left-0 w-full h-[846px] z-0">
          <Image
            src="/images/Rectangle 11.png"
            alt=""
            fill
            className="object-cover"
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(90deg, rgba(0, 127, 94, 0.1) 0%, rgba(0, 127, 94, 0.318) 16.5%, rgba(0, 127, 94, 0.328) 34.2%, rgba(0, 127, 94, 0.6) 50.5%, rgba(0, 127, 94, 0.95) 71%, rgba(0, 127, 94, 1) 84.5%)` 
            }} 
          />
        </div>

        <Container>
          <div className="relative z-10">
            {/* Text and Heart */}
            <div className="relative flex flex-row gap-10 items-end justify-between pt-[252px] pb-8">
              <div className="relative flex flex-col gap-[8px] items-end text-white w-auto text-right z-20">
                <div className="flex gap-[5px] items-center">
                  <div className="relative h-6 w-6">
                    <Image
                      src="/emojis/hand_healtcare.svg"
                      alt=""
                      fill
                      className="object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                  <p className="font-['Playpen_Sans_Arabic'] text-[16px] leading-[1.5] text-white">
                    مساعدة بعضنا البعض يمكن أن تجعل العالم أفضل
                  </p>
                </div>
                <p className="font-alexandria text-[30px] font-bold leading-[1.5]">
                  <span className="text-[#DFD383]">جمعية </span>
                  <span className="text-white">الرحمة</span>{" "}
                  <span className="text-white">والإحسان</span>
                </p>

                {/* Heart Icon Overlay */}
                <div className="absolute top-[-110px] right-[-100px] translate-x-[20%] -translate-y-[20%] z-20">
                  <div className="relative h-[352px] w-[362px]">
                    <Image
                      src="/images/hart2 1.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* White Container with Image and Donation Card */}
            <div className="relative mt-[60px] z-30">
              <div className="bg-white rounded-[20px] w-full max-w-[1286px] h-[652px] mx-auto overflow-hidden">
                <div className="relative flex flex-row-reverse items-start gap-0 w-full h-full">
                  {/* Donation Card Container */}
                  <div className="w-[552px] h-[545px] flex-shrink-0 flex flex-col gap-[32px] ml-[53px] mt-[53.5px]">
                    {/* Heading */}
                    <div className="flex justify-end h-[45px] flex-shrink-0">
                      <p className="font-alexandria text-[30px] font-bold leading-[1.5] text-[#0D0D0D] text-right w-[372px]">
                        أحدث تأثيراً ملموساً اليوم
                      </p>
                    </div>

                    {/* Donation Card */}
                    <div className="bg-white rounded-[20px] shadow-[0px_2px_30px_0px_rgba(0,0,0,0.15)] w-full h-[468px] overflow-hidden flex flex-col flex-shrink-0">
                      <div className="bg-[#F0F0F0] flex items-center justify-end px-4 py-4 h-[62px] rounded-t-[20px] flex-shrink-0">
                        <p className="font-alexandria text-[20px] font-bold leading-normal text-[#0D0D0D]">
                          تبرع سريع
                        </p>
                      </div>
                      <div className="flex flex-col gap-6 items-end px-4 py-6 flex-1">
                        {/* Amount selection */}
                        <div className="flex flex-col gap-4 items-start w-full">
                          <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right w-full">
                            حدد المبلغ
                          </p>
                          <div
                            className="flex flex-wrap items-center justify-center gap-4 w-full"
                            dir="rtl"
                          >
                            {[...PRESET_AMOUNTS_DONATION]
                              .reverse()
                              .map((amount) => {
                                const isActive =
                                  selectedAmount === amount && !customAmount;
                                return (
                                  <button
                                    key={amount}
                                    type="button"
                                    onClick={() => {
                                      setSelectedAmount(amount);
                                      setCustomAmount("");
                                    }}
                                    className={[
                                      "flex items-center justify-center rounded-[20px] transition-all w-[115px] h-[60px]",
                                      isActive
                                        ? "border border-[#007F5E] bg-[rgba(0,127,94,0.1)]"
                                        : "border border-[rgba(13,13,13,0.2)] hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]",
                                    ].join(" ")}
                                  >
                                    <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)]">
                                      $ {amount}
                                    </p>
                                  </button>
                                );
                              })}
                          </div>
                        </div>

                        {/* Custom amount */}
                        <div className="flex flex-col gap-4 items-start w-full">
                          <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right w-full tracking-[-0.16px]">
                            مبلغ مخصص
                          </p>
                          <AmountInput
                            placeholder="أدخل القيمة"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              if (e.target.value) setSelectedAmount(0);
                            }}
                            className="h-[60px] w-full"
                          />
                        </div>

                        {/* Donate button */}
                        <button
                          type="button"
                          className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] w-full hover:bg-[#005F4A] transition-colors"
                        >
                          <Image
                            src="/figma/mingcute_love-fill.svg"
                            alt=""
                            width={24}
                            height={24}
                            className="h-6 w-6"
                          />
                          <p className="font-alexandria text-[16px] font-bold leading-[1.5] text-white">
                            تبرع الأن
                          </p>
                        </button>

                        {/* Security text */}
                        <p className="font-alexandria text-[16px] font-normal leading-[1.6] text-center text-[rgba(13,13,13,0.7)] w-full">
                          معاملة مشفرة آمنة بتقنية SSL
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image next to the card */}
                  <div className="relative flex-1 h-[652px]">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src="/images/unsplash_Xz5kTUYAu9A.png"
                        alt="Donation"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Partners Section */}
      <section className="w-full bg-white py-[100px] relative overflow-hidden">
        <Container>
          <div className="flex flex-col gap-10 items-center relative z-10">
            <div className="flex flex-col gap-2 items-center text-center">
              <div className="flex gap-[5px] items-center">
                <p className="font-alexandria text-[16px] leading-[1.5] text-[#007F5E]">
                  رحمة تصنع القوة
                </p>
                <div className="relative h-6 w-6">
                  <Image
                    src="/emojis/hand_healtcare.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="font-alexandria text-[40px] font-bold leading-[1.6]">
                <span>شركاؤنا من جميع </span>
                <span className="text-[#007F5E]">أنحاء العالم</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-[40px] items-center justify-center w-full max-w-7xl mx-auto">
              {[
                "8b47b003a7255ede6fad9d51057d59e80ec24121.jpg",
                "34785ad56667d1906ba68088f3554f3eb8c35c0d.jpg",
                "66d135ecc5184406303531714c1e072de635e1c5.jpg",
                "c446f2cf2a25ca6b7010b4b368cbf5f47a1db603.jpg",
                "413e3496de49f990716dea0fef383780797a00db.jpg",
                "40b43e7a35f9b1f82e9b1e360ade6a09bc197615.jpg",
                "9dc097b36ae4d82cb1aac080f673db266df3489d.jpg",
                "a9e547767e29dcba3b386de1e4943b70857d72d9.jpg",
                "3f3937f27754c20f5e58aab5bad45412b9b14da4.jpg",
                "1007952220522051d5df92c9d714420127ff0e9b.jpg",
                "ba71bf27fea188d0a57b1a0696e5e260e6a7c670.jpg",
                "d0f279404cbc7bcf87b57345bef1c1b54c05945f.jpg",
                "dc389620c673293402902b3d6a7c5d11ac6b59ca.jpg",
              ].map((imageName, i) => (
                <div
                  key={i}
                  className="h-[86px] w-[189px] flex items-center justify-center transition-opacity hover:opacity-80 cursor-pointer"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={`/images/${imageName}`}
                      alt={`Partner ${i + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
