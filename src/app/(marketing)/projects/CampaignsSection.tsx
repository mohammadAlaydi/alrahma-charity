"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CampaignCategoryId, CampaignHeader } from "@/components/ui/CampaignHeader";
import { CampaignHeadline } from "@/components/ui/CampaignHeadline";

type Project = {
  id: string;
  title: string;
  description: string;
  category: CampaignCategoryId;
  goal: number;
  collected: number;
};

function HeartIcon({ isFav }: { isFav: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill={isFav ? "#DC2626" : "none"}
      stroke={isFav ? "#DC2626" : "#9CA3AF"}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 transition-colors"
    >
      <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.99.99 0 0 0 1.024 0C21.126 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3" />
    </svg>
  );
}

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "حفر 5 آبار مياه في شمال غزة",
    description:
      "أدت الحرب المستمرة في غزة إلى تدمير واسع لشبكات المياه وانقطاعها عن آلاف العائلات، خصوصاً في شمال القطاع الذي يعاني من النزوح...",
    category: "emergency",
    goal: 100_000,
    collected: 3_261,
  },
  {
    id: "p2",
    title: "برنامج كفالة الطلاب المتضرّرين",
    description: "دعم تعليم الأطفال في غزة لضمان استمرارهم في الدراسة رغم الظروف الإنسانية الصعبة.",
    category: "education",
    goal: 80_000,
    collected: 12_500,
  },
  {
    id: "p3",
    title: "سلال غذائية عاجلة للعائلات النازحة",
    description: "تأمين سلال غذائية ومستلزمات معيشية للعائلات التي فقدت منازلها ومصدر رزقها.",
    category: "humanitarian",
    goal: 60_000,
    collected: 25_300,
  },
  {
    id: "p4",
    title: "حملة كسوة الأيتام",
    description: "تأمين الملابس والاحتياجات الأساسية للأيتام في قطاع غزة.",
    category: "orphans",
    goal: 50_000,
    collected: 9_750,
  },
  {
    id: "p5",
    title: "تجهيز عيادة ميدانية متنقلة",
    description: "عيادة طبية متنقلة لتقديم الرعاية الطبية العاجلة في المناطق الأكثر تضررًا.",
    category: "medical",
    goal: 120_000,
    collected: 18_900,
  },
  {
    id: "p6",
    title: "صندوق دعم الحالات الأشد احتياجًا",
    description: "صندوق مرن يستجيب لأشد الحالات إلحاحًا في مختلف مجالات الدعم والإغاثة.",
    category: "humanitarian",
    goal: 150_000,
    collected: 33_400,
  },
];

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function CampaignsSection() {
  const [activeCategory, setActiveCategory] = useState<CampaignCategoryId>("all");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [favoriteBursts, setFavoriteBursts] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };

      // Trigger burst effect only when adding to favourites (false -> true)
      if (!prev[id] && next[id]) {
        setFavoriteBursts((prevBursts) => ({ ...prevBursts, [id]: true }));
        setTimeout(() => {
          setFavoriteBursts((prevBursts) => ({ ...prevBursts, [id]: false }));
        }, 500);
      }

      return next;
    });
  };

  return (
    <section dir="rtl" className="bg-white pb-20">
      {/* رأس الحملات مع الفلاتر */}
      <CampaignHeader activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* الكروت أسفل الفلاتر مباشرة */}
      <div className="mt-10">
        <Container>
          <div className="grid justify-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const progress = Math.min((project.collected / project.goal) * 100, 100);
              const isFav = !!favorites[project.id];
              const isBursting = !!favoriteBursts[project.id];

              return (
                <Card
                  key={project.id}
                  className="flex h-full w-full max-w-[410px] flex-col overflow-hidden rounded-[20px] !border !border-zinc-200 bg-white shadow-none transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] md:min-h-[640px] md:w-[410px]"
                >
                  {/* صورة Placeholder أعلى الكرت مع الطبقة العلوية (Heart + تصنيف المشروع) */}
                  <div className="relative h-[329px] w-full overflow-hidden rounded-t-[20px] bg-zinc-200">
                    {/* نص Donate image كـ placeholder (Molle 36 white) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-molle text-center text-[36px] font-normal text-white">
                        Donate image
                      </span>
                    </div>

                    <div className="absolute inset-x-5 top-4 z-10 flex items-center justify-between">
                      {/* تصنيف المشروع */}
                      <div className="inline-flex items-center gap-2 rounded-full border border-white bg-[#007F5E] px-4 py-2 text-xs text-white">
                        <span>تصنيف المشروع</span>
                      </div>

                      {/* Heart button - مفضّلة */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(project.id)}
                        aria-label={isFav ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                        aria-pressed={isFav}
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E9E9F2] transition ${
                          isFav ? "scale-105" : ""
                        }`}
                      >
                        <span className="relative inline-flex h-5 w-5 items-center justify-center">
                          {isBursting && (
                            <>
                              <span className="animate-fav-burst pointer-events-none absolute -top-3 -right-2 h-3 w-3 opacity-40 will-change-transform">
                                <HeartIcon isFav />
                              </span>
                              <span
                                className="animate-fav-burst pointer-events-none absolute -top-2 -left-2 h-3 w-3 opacity-40 will-change-transform"
                                style={{ animationDelay: "80ms" }}
                              >
                                <HeartIcon isFav />
                              </span>
                              <span
                                className="animate-fav-burst pointer-events-none absolute -right-3 -bottom-1 h-3 w-3 opacity-40 will-change-transform"
                                style={{ animationDelay: "140ms" }}
                              >
                                <HeartIcon isFav />
                              </span>
                            </>
                          )}
                          <HeartIcon isFav={isFav} />
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="font-alexandria flex flex-1 flex-col gap-4 bg-white p-5">
                    {/* العنوان والوصف المختصر مع أيقونة الوصف */}
                    <div className="space-y-3">
                      <h3 className="text-[20px] font-medium text-[#122F2A]">{project.title}</h3>
                      <div className="flex items-start gap-2 text-[16px] leading-6 font-light text-[#122F2A]">
                        <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center">
                          <Image
                            src="/mage_goals-fill.svg"
                            alt="وصف الحملة"
                            width={20}
                            height={20}
                            className="h-5 w-5"
                          />
                        </span>
                        <p>{project.description}</p>
                      </div>
                    </div>

                    {/* شريط التقدم والنِسب */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[16px] font-bold text-[#122F2A]">
                        <span>التبرعات</span>
                        <span>{progress.toFixed(2)}%</span>
                      </div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#D9D9D9]/40">
                        <div
                          className="absolute top-0 right-0 h-full rounded-full bg-[#007F5E]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[16px] text-[#122F2A]">
                        <span className="font-medium">
                          المبلغ المُجمَّع : {formatCurrency(project.collected)}
                        </span>
                        <span className="font-bold text-[#B4BB5F]">
                          الهدف : ${formatCurrency(project.goal)}
                        </span>
                      </div>
                    </div>

                    {/* زر التبرع - مثبت في أسفل الكرت وبمحاذاة الزاوية اليمنى */}
                    <div className="mt-auto -mb-5 -ml-6 flex items-end justify-end">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-tr-xl rounded-bl-lg bg-[#007F5E] px-5 py-2 text-[16px] font-semibold text-white transition-colors hover:bg-[#056A4F] focus-visible:ring-2 focus-visible:ring-[#007F5E]/40 focus-visible:outline-none"
                      >
                        <span>تبرع الآن</span>
                        <Image
                          src="/double hearts.svg"
                          alt="تبرع"
                          width={20}
                          height={21}
                          className="h-5 w-5"
                        />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2" dir="rtl">
            {/* Previous */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="الصفحة السابقة"
              className={`flex h-[35px] w-[35px] items-center justify-center rounded-full border text-white transition ${
                currentPage === 1
                  ? "border-[#B4BB5F]/40 bg-[#B4BB5F]/60 opacity-60"
                  : "border-[#007F5E] bg-[#007F5E]"
              }`}
            >
              <span className="inline-block">
                <Image
                  src="/iconamoon_arrow-up-2.svg"
                  alt="السابق"
                  width={21}
                  height={21}
                  className="h-[18px] w-[18px]"
                />
              </span>
            </button>

            {/* Page numbers */}
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-[35px] w-[35px] items-center justify-center rounded-full border text-sm font-medium transition ${
                  page === currentPage
                    ? "border-[#B4BB5F] bg-[#B4BB5F] text-white"
                    : "border-[#D4D4D4] bg-white text-[#474747]"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
              disabled={currentPage === 4}
              aria-label="الصفحة التالية"
              className={`flex h-[35px] w-[35px] items-center justify-center rounded-full border text-white transition ${
                currentPage === 4
                  ? "border-[#B4BB5F]/40 bg-[#B4BB5F]/60 opacity-60"
                  : "border-[#007F5E] bg-[#007F5E]"
              }`}
            >
              <span className="inline-block rotate-180">
                <Image
                  src="/iconamoon_arrow-up-2.svg"
                  alt="التالي"
                  width={21}
                  height={21}
                  className="h-[18px] w-[18px]"
                />
              </span>
            </button>
          </div>

          {/* About-style headline section after pagination */}
          <div className="mt-40 flex flex-col items-center gap-2" dir="rtl">
            <CampaignHeadline />
            <h2 className="font-alexandria text-center text-[32px] leading-[45px] font-semibold text-[#122F2A]">
              كن سببا في ابتسامة شخص ما
            </h2>
          </div>
        </Container>
      </div>
    </section>
  );
}
