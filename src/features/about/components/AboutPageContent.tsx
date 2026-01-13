"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AmountInput } from "@/components/ui/AmountInput";

const PRESET_AMOUNTS = [200, 100, 50, 10];

type TabType = "vision" | "mission" | "values";

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

export function AboutPageContent() {
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
    <div className="w-full" dir="rtl">
      {/* First About Section with Image Gallery */}
      <section className="w-full pt-12 pb-12 md:pt-[100px] md:pb-[100px] px-4 md:px-0">
        <Container>
          <div className="flex flex-col gap-6 md:gap-10 lg:gap-[91px] lg:flex-row-reverse lg:items-start">
            {/* Image Gallery - appears on left visually in RTL */}
            <div className="relative w-full lg:w-auto lg:flex-1">
              <div className="relative">
                {/* Main image container - matches Group 8 dimensions from Figma */}
                <div className="relative h-[486.915px] md:h-[695px] w-full max-w-[500px] md:max-w-[569px] mx-auto">
                  {/* Top left small image - Rectangle 9.png - positioned at top-left (0,0) from Figma */}
                  <div className="hidden md:block absolute top-0 left-0 h-[208px] w-[229px] z-10">
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

                  {/* Large main image with gradient overlay - Rectangle 4.png - positioned at (122.98, 52.90) from Figma */}
                  <div className="absolute top-[52.9px] left-[20px] md:left-[123px] h-[486.915px] md:h-[548px] w-full max-w-[396px] md:max-w-[446px] z-0">
                    <div className="relative h-full w-full rounded-[20px] p-2 bg-[#FEFCFC]">
                      <div className="relative h-full w-full rounded-[12px] overflow-hidden">
                        <Image
                          src="/images/Rectangle 4.png"
                          alt="Child in humanitarian aid"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-[#2E7C5E]/80 via-[#2E7C5E]/60 to-[#2E7C5E]/33 to-[#2E7C5E]/31.8 to-[#2E7C5E]/10" />
                        {/* Play button overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                          <button
                            type="button"
                            className="flex h-[89.599px] w-[118.015px] md:h-[70px] md:w-[70px] items-center justify-center rounded-full bg-white shadow-lg transition-opacity hover:opacity-90"
                          >
                            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="ml-1 md:w-8 md:h-8"
                              >
                                <path d="M8 5v14l11-7z" fill="#007F5E" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smaller image on the right - Rectangle 6.png - positioned at (356.03, 481.31) from Figma */}
                  <div className="hidden md:block absolute top-[481px] left-[20px] md:left-[356px] h-[195px] w-[212px] z-20">
                    <div className="relative h-full w-full rounded-[20px] p-2 bg-[#FEFCFC]">
                      <div className="relative h-full w-full rounded-[12px] overflow-hidden">
                        <Image
                          src="/images/Rectangle 6.png"
                          alt="Child portrait"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vertical bar with rotated text - positioned at y: 305.388 from Figma (205.388px from top of container) */}
                  <div className="hidden md:flex absolute top-[205px] left-0 h-[477px] w-[106px] flex-col items-center justify-center z-30">
                    {/* Background yellow/green bar - Rectangle 8 */}
                    <div className="absolute top-0 left-0 h-[476.858px] w-full rounded-[15px] bg-[#B4BB5F]" />
                    {/* Foreground green bar - Rectangle 7, offset by 8.88px from top */}
                    <div className="absolute top-[8.88px] left-0 h-[459px] w-full rounded-[15px] bg-[#007F5E]" />
                    {/* Rotated text - centered in the bar */}
                    <div className="absolute flex h-[337px] items-center justify-center -rotate-90">
                      <p className="font-['Playpen_Sans_Arabic'] text-[24px] font-semibold leading-[1.5] text-center text-white whitespace-nowrap">
                        نمنح <span className="text-[#DFD383]">الأمل</span> للأسر المتضررة في غزة.
                      </p>
                    </div>
                  </div>

                  {/* Decorative line - aligned with top left elements */}
                  <div className="hidden md:block absolute top-[5px] left-[264px] h-[37px] w-[262px] z-40">
                    <svg
                      width="262"
                      height="37"
                      viewBox="0 0 262 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 18.5L262 18.5" stroke="#007F5E" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - appears on right visually in RTL */}
            <div className="w-full space-y-6 md:space-y-8 lg:w-[628px] lg:flex-shrink-0">
              {/* Heading with icon */}
              <div className="space-y-2">
                <div className="flex items-center gap-[5px] justify-center md:justify-start">
                  <p className="font-['Playpen_Sans_Arabic'] text-[16px] leading-[1.5] text-[#007F5E]">
                    مساعدة بعضنا البعض يمكن أن تجعل العالم أفضل
                  </p>
                  <div className="relative h-6 w-6">
                    <Image
                      src="/emojis/hand_healtcare.svg"
                      alt=""
                      fill
                      className="object-contain"
                      style={{ filter: 'brightness(0) saturate(100%) invert(37%) sepia(95%) saturate(1234%) hue-rotate(130deg) brightness(95%) contrast(87%)' }}
                    />
                  </div>
                </div>
                <h2 className="font-alexandria text-[24px] md:text-[30px] font-bold leading-[1.5] text-right">
                  <span className="text-[#122F2A]">جمعية </span>
                  <span className="text-[#007F5E]">الرحمة</span>{" "}
                  <span className="text-[#007F5E]">والإحسان</span>
                </h2>
              </div>

              {/* Paragraph */}
              <p className="font-alexandria text-[16px] font-normal leading-[1.6] text-right text-[rgba(13,13,13,0.7)] text-justify">
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
              <div className="flex flex-col gap-6 md:gap-6 lg:flex-row lg:gap-[71px]">
                {/* Card 1 - قم بالتبرع on the right (first) */}
                <div className="flex flex-col gap-4 w-full md:w-[276px]">
                  <div className="flex flex-row gap-4 md:gap-[16px] items-start justify-end">
                    <div className="flex-1 space-y-2 flex flex-col items-end">
                      <h4 className="font-alexandria text-[20px] font-semibold leading-normal text-right text-[#122F2A] w-full">
                        قم بالتبرع
                      </h4>
                      <p className="font-alexandria text-[16px] font-normal leading-[1.5] text-right text-[rgba(13,13,13,0.7)] text-justify w-full">
                        بمساهمة بسيطة، تمنح أسرة أملًا جديدًا… اجعل عطاؤك يصل لمن يحتاجه الآن.
                      </p>
                    </div>
                    <div className="relative h-[39px] md:h-[57px] w-[39px] md:w-[57px] shrink-0">
                      <Image
                        src="/emojis/give hart 1.png"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Donate Button - under قم بالتبرع */}
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
                      <p className="font-alexandria text-base md:text-[16px] font-bold leading-[1.6] text-white">
                        تبرع الان
                      </p>
                    </button>
                  </div>
                </div>

                {/* Card 2 - ابدأ بمساعدتهم on the left (second) */}
                <div className="flex flex-row gap-4 items-start justify-end w-full md:w-[276px]">
                  <div className="flex-1 space-y-2 flex flex-col items-end">
                    <h4 className="font-alexandria text-[20px] font-semibold leading-normal text-right text-[#122F2A] w-full">
                      ابدأ بمساعدتهم
                    </h4>
                    <p className="font-alexandria text-[16px] font-normal leading-[1.5] text-right text-[rgba(13,13,13,0.7)] text-justify w-full">
                      ساعدهم على تجاوز الأزمات… دعمك يمنحهم فرصة لحياة أكثر كرامة واستقرارًا
                    </p>
                  </div>
                  <div className="relative h-[39px] md:h-[57px] w-[39px] md:w-[57px] shrink-0">
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
      <section className="w-full bg-white py-5 md:py-[100px]">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4">
            {/* Stat Card 1 - Water */}
            <div className="flex flex-col gap-4 items-center justify-center min-h-[180px] md:min-h-[219px] w-full max-w-[312px]">
              <div className="h-12 w-12 md:h-[67px] md:w-[67px] flex items-center justify-center relative">
                <Image src="/figma/water-svgrepo-com 1.svg" alt="" fill className="object-contain" />
              </div>
              <div className="flex flex-col gap-[5px] items-center text-[#122F2A]">
                <p className="font-['Playpen_Sans_Arabic'] text-2xl md:text-[32px] font-semibold leading-[1.5] text-center">
                  76,500
                </p>
                <p className="font-alexandria text-sm md:text-[16px] font-medium leading-[1.5] text-center">
                  عدد الأكواب ضمن مشاريع سقيا المياه
                </p>
              </div>
            </div>

            {/* Stat Card 2 - Donation */}
            <div className="flex flex-col gap-4 items-center justify-center min-h-[180px] md:min-h-[219px] w-full max-w-[393px]">
              <div className="h-12 w-12 md:h-[67px] md:w-[67px] flex items-center justify-center relative">
                <Image src="/figma/donate-donation-svgrepo-com 1.svg" alt="" fill className="object-contain" />
              </div>
              <div className="flex flex-col gap-[5px] items-center text-[#122F2A]">
                <p className="font-['Playpen_Sans_Arabic'] text-2xl md:text-[32px] font-semibold leading-[1.5] text-center">
                  303,950
                </p>
                <p className="font-alexandria text-sm md:text-[16px] font-medium leading-[1.5] text-center">
                  المستفيدين من مشاريع الطرود الغذائية والوجبات
                </p>
              </div>
            </div>

            {/* Stat Card 3 - Money */}
            <div className="flex flex-col gap-4 items-center justify-center min-h-[180px] md:min-h-[219px] w-full max-w-[226px]">
              <div className="h-12 w-10 md:h-[67px] md:w-[50px] flex items-center justify-center relative">
                <Image src="/figma/Frame 1000009357.svg" alt="" fill className="object-contain" />
              </div>
              <div className="flex flex-col gap-[5px] items-center text-[#122F2A]">
                <p className="font-['Playpen_Sans_Arabic'] text-2xl md:text-[32px] font-semibold leading-[1.5] text-center">
                  2,8 M
                </p>
                <p className="font-alexandria text-sm md:text-[16px] font-medium leading-[1.5] text-center">
                  إجمالي المساعدات النقدية
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section with Background */}
      <section className="relative w-full h-[564px] md:h-[808px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Rectangle 5354.png"
            alt="Children receiving aid"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0E201D]/95 via-[#0E201D]/60 to-[#0E201D]/10" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#2E7C5E]/95 via-[#2E7C5E]/60 to-[#2E7C5E]/10 opacity-60" />
        </div>
        <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center px-4 md:px-0">
            <div className="flex flex-col gap-2 items-center text-center">
              <div className="flex gap-[5px] items-center">
                <div className="relative h-5 w-5 md:h-8 md:w-8">
                  <Image
                    src="/emojis/hand_healtcare.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-['Playpen_Sans_Arabic'] text-[16px] md:text-[20px] leading-[1.5] text-[#DFD383]">
                  تبرعك اليوم يصنع أثرًا لا يُنسى
                </p>
              </div>
            <p className="font-alexandria text-[24px] md:text-[40px] font-bold leading-[1.5] md:leading-[1.6] text-white max-w-[797px]">
              بمساهمة بسيطة تصنع حماية وأمانًا لأطفال يواجهون الظروف الأصعب
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-[22px] items-center w-full md:w-auto px-4 md:px-0">

            <button
              type="button"
              className="border border-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] bg-transparent w-full md:w-auto hover:bg-[#007F5E]/10 transition-colors"
            >
              <p className="font-alexandria text-base md:text-[16px] font-semibold leading-[1.5] text-white">
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
              className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] w-full md:w-auto hover:bg-[#005F4A] transition-colors"
            >
              <div className="flex items-center justify-center relative shrink-0 size-[20px]">
              </div>
              <p className="font-alexandria text-base md:text-[16px] font-bold leading-[1.5] text-white">
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

      {/* Vision/Mission/Values Section */}
      <section className="w-full bg-white py-10 md:py-[100px]">
        <Container>
          <div className="flex flex-col gap-10 lg:gap-[91px] lg:flex-row-reverse lg:items-start">
            {/* Image Gallery */}
            <div className="relative w-full lg:w-auto lg:flex-1">
              <div className="relative h-[300px] md:h-[529px] w-full max-w-[448px] mx-auto">
                <div className="absolute top-0 left-0 h-full w-full overflow-hidden rounded-[20px] border-4 md:border-8 border-[#FFECEC]">
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/Rectangle 10.png"
                      alt="Children sharing food"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#2E7C5E]/80 via-[#2E7C5E]/60 to-[#2E7C5E]/10" />
                    {/* Play button overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <button
                        type="button"
                        className="flex h-14 w-14 md:h-[70px] md:w-[70px] items-center justify-center rounded-full bg-white shadow-lg transition-opacity hover:opacity-90"
                      >
                        <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1 md:w-8 md:h-8">
                            <path d="M8 5v14l11-7z" fill="#007F5E" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Secondary image - HIDDEN ON MOBILE or positioned differently */}
                <div className="hidden md:block absolute bottom-0 left-[236px] h-[290px] w-[291px] z-20">
                  <div className="relative h-full w-full rounded-[20px] p-1 md:p-2 bg-[#FEFDFD]">
                    <div className="relative h-full w-full rounded-[12px] overflow-hidden">
                      <Image
                        src="/images/Rectangle 7.png"
                        alt="Children in camp"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full space-y-6 md:space-y-8 lg:w-[628px] lg:flex-shrink-0">
              {/* Heading */}
              <div className="space-y-2">
                <div className="flex items-center gap-[5px]">
                  <div className="relative h-5 w-5 md:h-6 md:w-6">
                    <Image
                      src="/emojis/hand_healtcare.svg"
                      alt=""
                      fill
                      className="object-contain"
                      style={{ filter: 'brightness(0) saturate(100%) invert(37%) sepia(95%) saturate(1234%) hue-rotate(130deg) brightness(95%) contrast(87%)' }}
                    />
                  </div>
                  <p className="font-alexandria text-sm md:text-[16px] leading-[1.5] text-[#007F5E]">
                    أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
                  </p>
                </div>
                <h2 className="font-alexandria text-[24px] md:text-[30px] font-bold leading-[1.5] text-right self-stretch">
                  <span className="text-[#122F2A]">نحو أثر إنساني مستدام </span>
                  <span className="text-[#007F5E]">يغيّر حياة أهل غزة</span>
                </h2>
              </div>

              {/* Paragraph */}
              <p className="font-alexandria text-sm md:text-[16px] font-normal leading-[1.6] text-left text-[rgba(13,13,13,0.7)]">
                في جمعية الرحمة والإحسان، نعمل على تحسين جودة حياة الأسر المتضررة في غزة من خلال
                تدخلات إنسانية عاجلة ومشاريع تنموية مستدامة. نؤمن بأن الكرامة الإنسانية تبدأ من دعم
                الاحتياجات الأساسية، وتمتد بتمكين الشباب والأسَر لبناء مستقبل أفضل. برؤية واضحة وقيم
                قائمة على الشفافية والإنسانية، نواصل جهودنا لصناعة أثر حقيقي يعزز صمود المجتمع ويزرع
                الأمل في نفوس المحتاجين.
              </p>

              {/* Tabs */}
              <div className="flex flex-col gap-6 md:gap-8">
                <div className="border-b border-[rgba(0,0,0,0.2)] flex gap-4 md:gap-6 items-center justify-start pb-4 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab("vision")}
                    className={`px-6 md:px-8 py-[10px] rounded-[30px] transition-colors whitespace-nowrap ${
                      activeTab === "vision" ? "bg-[#007F5E]" : ""
                    }`}
                  >
                    <p
                      className={`font-alexandria text-lg md:text-[20px] font-medium leading-[1.5] ${
                        activeTab === "vision" ? "text-white" : "text-[#0D0D0D]"
                      }`}
                    >
                      رؤيتنا
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("mission")}
                    className={`px-6 md:px-8 py-[10px] rounded-[30px] transition-colors whitespace-nowrap ${
                      activeTab === "mission" ? "bg-[#007F5E]" : ""
                    }`}
                  >
                    <p
                      className={`font-alexandria text-lg md:text-[20px] font-medium leading-[1.5] ${
                        activeTab === "mission" ? "text-white" : "text-[#0D0D0D]"
                      }`}
                    >
                      قيمنا
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("values")}
                    className={`px-6 md:px-8 py-[10px] rounded-[30px] transition-colors whitespace-nowrap ${
                      activeTab === "values" ? "bg-[#007F5E]" : ""
                    }`}
                  >
                    <p
                      className={`font-alexandria text-lg md:text-[20px] font-medium leading-[1.5] ${
                        activeTab === "values" ? "text-white" : "text-[#0D0D0D]"
                      }`}
                    >
                      أهدافنا
                    </p>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex flex-col gap-4">
                  {getTabItems().map((item, index) => (
                    <div key={index} className="flex gap-4 items-center justify-start">
                      <Image
                        src="/figma/lets-icons_check-fill.svg"
                        alt=""
                        width={32}
                        height={32}
                        className="h-6 w-6 md:h-8 md:w-8 shrink-0"
                      />
                      <p
                        className={`font-alexandria text-sm md:text-[16px] leading-[1.5] text-left text-[rgba(13,13,13,0.7)] ${
                          index === 1 || index === 2 ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] self-start mt-4 w-full md:w-auto hover:bg-[#005F4A] transition-colors"
                  >
                    
                     
                    
                    <p className="font-alexandria text-base md:text-[16px] text-right font-bold leading-[1.5] text-white">
                      إقراء المزيد
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
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Donation Card Section */}
      <section className="relative w-full min-h-[846px] md:min-h-[1115px] overflow-visible px-4 md:px-0">
        {/* Background Image with Gradient */}
        <div className="absolute top-0 left-0 w-full h-[846px] z-0">
          <Image 
            src="/images/Rectangle 11.png" 
            alt="" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#007F5E]/95 via-[#007F5E]/60 to-[#007F5E]/10" />
        </div>
        
        <Container>
          <div className="relative z-10">
            {/* Text and Heart - positioned above background */}
            <div className="relative flex flex-col gap-[19px] md:gap-10 lg:flex-row lg:gap-10 items-end justify-between pt-[133px] md:pt-[252px] pb-8">
              {/* Text */}
              <div className="relative flex flex-col gap-[8px] items-end text-white w-full lg:w-auto text-right z-20">
                <div className="flex gap-[5px] items-center">
                  <div className="relative h-6 w-6">
                    <Image
                      src="/emojis/hand_healtcare.svg"
                      alt=""
                      fill
                      className="object-contain"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                  <p className="font-['Playpen_Sans_Arabic'] text-[16px] leading-[1.5] text-white">
                    مساعدة بعضنا البعض يمكن أن تجعل العالم أفضل
                  </p>
                </div>
                <p className="font-alexandria text-[24px] md:text-[30px] font-bold leading-[1.5]">
                  <span className="text-[#DFD383]">جمعية </span>
                  <span className="text-white">الرحمة</span>{" "}
                  <span className="text-white">والإحسان</span>
                </p>

                {/* Heart Icon Overlay - positioned at top right of texts */}
                <div className="absolute top-[-110] right-[-100] translate-x-[20%] -translate-y-[20%] z-20 opacity-80 md:opacity-100 hidden lg:block">
                  <div className="relative h-[300px] w-[300px] lg:h-[352px] lg:w-[362px]">
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

            {/* White Container with Image and Donation Card - positioned below background */}
            <div className="relative mt-[-100px] md:mt-[-150px] lg:mt-[60px] z-30">
              <div className="bg-white rounded-[20px] w-full max-w-[1286px] h-[652px] mx-auto overflow-hidden">
                <div className="relative flex flex-col lg:flex-row-reverse items-start gap-0 w-full h-full">
                  {/* Donation Card Container - 552x545 */}
                  <div className="w-full lg:w-[552px] lg:h-[545px] lg:flex-shrink-0 flex flex-col gap-8 lg:gap-[32px] lg:ml-[53px] lg:mt-[53.5px] lg:self-start">
                    {/* Heading - 45px height, 372px width, right-aligned */}
                    <div className="flex justify-center lg:justify-end h-[45px] flex-shrink-0">
                      <p className="font-alexandria text-[24px] md:text-[30px] font-bold leading-[1.5] text-[#0D0D0D] text-center lg:text-right w-[372px]">
                        أحدث تأثيراً ملموساً اليوم
                      </p>
                    </div>
                    
                    {/* Donation Card - 552x468 */}
                    <div className="bg-white rounded-[20px] shadow-[0px_2px_30px_0px_rgba(0,0,0,0.15)] w-full h-[468px] overflow-hidden flex flex-col flex-shrink-0">
                      <div className="bg-[#F0F0F0] flex items-center justify-end px-4 py-4 h-[62px] rounded-t-[20px] flex-shrink-0">
                        <p className="font-alexandria text-[20px] font-bold leading-normal text-[#0D0D0D]">
                          تبرع سريع
                        </p>
                      </div>
                      <div className="flex flex-col gap-6 items-end px-4 py-6 flex-1 min-h-0">
                        {/* Amount selection */}
                        <div className="flex flex-col gap-4 items-start w-full">
                          <p className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right w-full">
                            حدد المبلغ
                          </p>
                          <div
                            className="flex flex-wrap items-center justify-center gap-4 md:gap-4 w-full"
                            dir="rtl"
                          >
                            {[...PRESET_AMOUNTS].reverse().map((amount) => {
                              const isActive = selectedAmount === amount && !customAmount;
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
                                      : "border border-[rgba(13,13,13,0.2)] px-4 hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]",
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
                          <p className="font-alexandria text-base md:text-[16px] font-bold leading-[1.5] text-white">
                            تبرع الأن
                          </p>
                        </button>

                        {/* Security text */}
                        <p className="font-alexandria text-xs md:text-[16px] font-normal leading-[1.6] text-center text-[rgba(13,13,13,0.7)] w-full">
                          معاملة مشفرة آمنة بتقنية SSL
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image next to the card - fills remaining space */}
                  <div className="relative w-full lg:w-auto flex-shrink-0 lg:flex-1 lg:h-[652px]">
                    <div className="relative h-[300px] md:h-[400px] lg:h-full w-full overflow-hidden">
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
      <section className="w-full bg-white py-10 md:py-[100px] relative overflow-hidden">
        <Container>
          <div className="flex flex-col gap-8 md:gap-10 items-center relative z-10">
            <div className="flex flex-col gap-2 items-center text-center">
              <div className="flex gap-[5px] items-center">
                <p className="font-alexandria text-sm md:text-[16px] leading-[1.5] text-[#007F5E]">
                  رحمة تصنع القوة
                </p>
                <div className="relative h-5 w-5 md:h-6 md:w-6">
                  <Image
                    src="/emojis/hand_healtcare.svg"
                    alt=""
                    fill
                    className="object-contain"
                    style={{ filter: 'brightness(0) saturate(100%) invert(37%) sepia(95%) saturate(1234%) hue-rotate(130deg) brightness(95%) contrast(87%)' }}
                  />
                </div>
              </div>
              <p className="font-alexandria text-2xl md:text-[40px] font-bold leading-[1.6]">
                <span>شركاؤنا من جميع </span>
                <span className="text-[#007F5E]">أنحاء العالم</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-[40px] items-center justify-center w-full px-4 max-w-7xl mx-auto">
              {/* Partner logos */}
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
                "dc389620c673293402902b3d6a7c5d11ac6b59ca.jpg"
                
              ].map((imageName, i) => (
                <div
                  key={i}
                  className="h-16 md:h-[86px] w-[140px] md:w-[189px] flex items-center justify-center transition-opacity hover:opacity-80 cursor-pointer"
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

          {/* Decorative background element matching Figma imgVector */}
          <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-full max-w-[1667px] h-[542px] pointer-events-none opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 1667 542" fill="none">
              <path
                d="M0 271C0 121.325 121.325 0 271 0H1396C1545.68 0 1667 121.325 1667 271V271C1667 420.675 1545.68 542 1396 542H271C121.325 542 0 420.675 0 271V271Z"
                fill="#007F5E"
              />
            </svg>
          </div>
        </Container>
      </section>
    </div>
  );
}
