"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/ui/Container";
import { CampaignCategoryId, CampaignHeader } from "@/features/projects/components/CampaignHeader";
import { CampaignHeadline } from "@/features/projects/components/CampaignHeadline";
import { DonationFormDialog } from "@/features/projects/components/DonationFormDialog";
import { getCampaigns, type Campaign } from "@/services/api/campaigns";
import { queryKeys } from "@/services/queryKeys";

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

/**
 * Transform backend Campaign to frontend Project format
 */
function transformCampaignToProject(campaign: Campaign): Project {
  // Map project target_category to frontend category
  // If project_id is populated, use its target_category, otherwise default
  const projectCategory =
    typeof campaign.project_id === "object" && campaign.project_id
      ? (campaign.project_id as { target_category?: string }).target_category
      : undefined;

  // Map backend category to frontend category
  const categoryMap: Record<string, CampaignCategoryId> = {
    emergency: "emergency",
    education: "education",
    humanitarian: "humanitarian",
    orphans: "orphans",
    medical: "medical",
  };

  const category: CampaignCategoryId =
    (projectCategory && categoryMap[projectCategory]) || "humanitarian";

  return {
    id: campaign._id,
    title: campaign.title_ar || campaign.title_en || campaign.title_tr || "",
    description:
      campaign.description_ar || campaign.description_en || campaign.description_tr || "",
    category,
    goal: campaign.financial_goal || 0,
    collected: campaign.current_amount || 0,
  };
}

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
  const [selectedProjectForDonation, setSelectedProjectForDonation] = useState<Project | null>(null);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);

  const openDonationDialog = (project: Project) => {
    setSelectedProjectForDonation(project);
    setIsDonationDialogOpen(true);
  };

  // Fetch campaigns from API (with fallback to mock data)
  const {
    data: campaignsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.campaigns.list({ page: currentPage, limit: 20 }),
    queryFn: () => getCampaigns({ page: currentPage, limit: 20 }),
    retry: 1, // Only retry once
    retryDelay: 1000,
    staleTime: 0, // Always consider data stale in development
    gcTime: 0, // Don't cache in development
  });

  // Transform campaigns to projects format
  const projects = useMemo(() => {
    if (!campaignsData?.data) return [];
    // Ensure data is an array
    const dataArray = Array.isArray(campaignsData.data) ? campaignsData.data : [];
    return dataArray.map(transformCampaignToProject);
  }, [campaignsData]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

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
          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-lg text-gray-600">جاري تحميل الحملات...</div>
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="flex items-center justify-center py-20">
              <div className="text-lg text-red-600">
                حدث خطأ في تحميل الحملات: {error instanceof Error ? error.message : "خطأ غير معروف"}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && filteredProjects.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-lg text-gray-600">لا توجد حملات متاحة</div>
            </div>
          )}

          {/* Campaigns grid */}
          {!isLoading && !isError && filteredProjects.length > 0 && (
            <div className="grid justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => {
                const progress = Math.min((project.collected / project.goal) * 100, 100);
                const isFav = !!favorites[project.id];
                const isBursting = !!favoriteBursts[project.id];

                return (
                  <div
                    key={project.id}
                    className="flex h-full w-full max-w-[395px] flex-col overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-none transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] md:min-h-[600px] md:w-[395px]"
                  >
                    {/* صورة Placeholder أعلى الكرت مع الطبقة العلوية (Heart + تصنيف المشروع) */}
                    <div className="relative h-[300px] w-full overflow-hidden rounded-t-[20px] bg-zinc-200">
                      {/* نص Donate image كـ placeholder (Molle 36 white) */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-molle text-center text-[32px] font-normal text-white">
                          Donate image
                        </span>
                      </div>

                      <div className="absolute inset-x-4 top-3 z-10 flex items-center justify-between">
                        {/* تصنيف المشروع */}
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white bg-[#007F5E] px-3.5 py-1.5">
                          <span className="card-badge">تصنيف المشروع</span>
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

                    <div className="flex flex-1 flex-col gap-3.5 bg-white p-4">
                      {/* العنوان والوصف المختصر مع أيقونة الوصف */}
                      <div className="space-y-2.5">
                        <h3 className="card-title">{project.title}</h3>
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
                          <p className="card-description">{project.description}</p>
                        </div>
                      </div>

                      {/* شريط التقدم والنِسب */}
                      <div className="space-y-1.5">
                        <div className="card-stats flex items-center justify-between font-bold">
                          <span>التبرعات</span>
                          <span>{progress.toFixed(2)}%</span>
                        </div>
                        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#D9D9D9]/40">
                          <div
                            className="absolute top-0 right-0 h-full rounded-full bg-[#007F5E]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="card-stats mt-1 flex items-center justify-between">
                          <span className="font-medium whitespace-nowrap">
                            المبلغ المُجمَّع : {formatCurrency(project.collected)}
                          </span>
                          <span className="font-bold text-[#B4BB5F] whitespace-nowrap">
                            الهدف : ${formatCurrency(project.goal)}
                          </span>
                        </div>
                      </div>

                      {/* زر التبرع - مثبت في أسفل الكرت وبمحاذاة الزاوية اليمنى */}
                      <div className="mt-auto -mb-4 -ml-5 flex items-end justify-end">
                        <button
                          type="button"
                          onClick={() => openDonationDialog(project)}
                          className="card-button inline-flex items-center gap-3 rounded-tr-2xl rounded-bl-2xl bg-[#007F5E] px-6 py-2.5 text-white transition-colors hover:bg-[#056A4F] focus-visible:ring-2 focus-visible:ring-[#007F5E]/40 focus-visible:outline-none"
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
          )}

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2" dir="rtl">
            {/* Previous */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="الصفحة السابقة"
              className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border text-white transition ${
                currentPage === 1
                  ? "border-[#B4BB5F]/40 bg-[#B4BB5F]/60 opacity-60"
                  : "border-[#007F5E] bg-[#007F5E]"
              }`}
            >
              <span className="inline-block">
                <Image
                  src="/iconamoon_arrow-up-2.svg"
                  alt="السابق"
                  width={18}
                  height={18}
                  className="h-[16px] w-[16px]"
                />
              </span>
            </button>

            {/* Page numbers */}
            {campaignsData &&
              Array.from({ length: campaignsData.totalPages || 1 }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border text-xs font-medium transition ${
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
              onClick={() => setCurrentPage((p) => Math.min(campaignsData?.totalPages || 1, p + 1))}
              disabled={currentPage >= (campaignsData?.totalPages || 1)}
              aria-label="الصفحة التالية"
              className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border text-white transition ${
                currentPage === 4
                  ? "border-[#B4BB5F]/40 bg-[#B4BB5F]/60 opacity-60"
                  : "border-[#007F5E] bg-[#007F5E]"
              }`}
            >
              <span className="inline-block rotate-180">
                <Image
                  src="/iconamoon_arrow-up-2.svg"
                  alt="التالي"
                  width={18}
                  height={18}
                  className="h-[16px] w-[16px]"
                />
              </span>
            </button>
          </div>

          {/* About-style headline section after pagination */}
          <div className="mt-32 flex flex-col items-center gap-0" dir="rtl">
            <CampaignHeadline />
            <h2 className="section-title-large h-10">كن سببا في ابتسامة شخص ما</h2>
          </div>
        </Container>
      </div>

      <DonationFormDialog
        open={isDonationDialogOpen}
        onClose={() => setIsDonationDialogOpen(false)}
        projectTitle={selectedProjectForDonation?.title}
      />
    </section>
  );
}
