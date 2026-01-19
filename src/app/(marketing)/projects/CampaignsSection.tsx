"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/ui/Container";
import { CampaignCategoryId } from "@/features/projects/components/CampaignHeader";
import { CampaignHeadline } from "@/features/projects/components/CampaignHeadline";
import { DonationModal } from "@/features/projects/components/DonationModal";
import { DonationSuccessModal } from "@/features/projects/components/DonationSuccessModal";
import { FilterPanel, FilterState } from "@/features/projects/components/FilterPanel";
import { ProjectCard } from "@/features/projects/components/ProjectCard"; // Import this
import { transformCampaignToProject } from "@/features/projects/utils";
import { Project } from "@/features/projects/types";
import { getCampaigns, type Campaign } from "@/services/api/campaigns";
import { queryKeys } from "@/services/queryKeys";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";




/**
 * Transform backend Campaign to frontend Project format
 */


export function CampaignsSection() {
  const [activeCategory, setActiveCategory] = useState<CampaignCategoryId>("all");
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const dispatch = useAppDispatch();
  const [favoriteBursts, setFavoriteBursts] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProjectForDonation, setSelectedProjectForDonation] = useState<Project | null>(null);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    country: "",
    minGoal: 0,
    maxGoal: 1000000,
    completionRate: "all",
  });

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
    let filtered = projects;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    // Filter by financial goal range
    filtered = filtered.filter(
      (p) => p.goal >= filters.minGoal && p.goal <= filters.maxGoal
    );

    // Filter by completion rate
    if (filters.completionRate !== "all") {
      filtered = filtered.filter((p) => {
        const completion = (p.collected / p.goal) * 100;
        switch (filters.completionRate) {
          case "0-25":
            return completion < 25;
          case "25-50":
            return completion >= 25 && completion < 50;
          case "50-75":
            return completion >= 50 && completion < 75;
          case "75-100":
            return completion >= 75;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [activeCategory, projects, filters]);

  const handleToggleFavorite = (id: string) => {
    const wasFavorite = favorites[id];
    dispatch(toggleFavorite(id));

    // Trigger burst effect only when adding to favourites (false -> true)
    if (!wasFavorite) {
      setFavoriteBursts((prevBursts) => ({ ...prevBursts, [id]: true }));
      setTimeout(() => {
        setFavoriteBursts((prevBursts) => ({ ...prevBursts, [id]: false }));
      }, 500);
    }
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <section dir="rtl" className="bg-white pb-20">
      <div className="relative mt-4">
        {/* Filter sidebar overlay (starts exactly with this section) */}
        {isFilterPanelOpen && (
          <div className="absolute top-[-60px] bottom-0 left-0 z-50 w-[620px] max-w-[calc(100%-16px)]">
            <FilterPanel
              isOpen={true}
              onClose={() => setIsFilterPanelOpen(false)}
              onApplyFilters={handleApplyFilters}
              currentFilters={filters}
            />
          </div>
        )}

        {/* Campaign body: full-width wrapper so sidebar starts in the left gutter */}
        <div>
          <Container>
            {/* Section Headlines */}
            <div className="mb-12 flex flex-col items-center gap-0" dir="rtl">
              <CampaignHeadline />
              <h2 className="section-title-large h-10">كن سببا في ابتسامة شخص ما</h2>
            </div>

            {/* Categories tabs inside container */}
            <div className="mb-12">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-4 py-1 overflow-x-auto no-scrollbar">
                  <nav className="flex items-center gap-4 min-w-max">
                    {/* جميع الحملات */}
                    <button
                      type="button"
                      onClick={() => setActiveCategory("all")}
                      className={`category-tab-text inline-flex items-center gap-[5px] px-2 py-1.5 whitespace-nowrap shrink-0 transition-all ${activeCategory === "all" ? "text-[#007F5E] border-b-2 border-[#007F5E]" : "text-[#122F2A] border-b-2 border-transparent"
                        }`}
                    >
                      <span aria-hidden="true" className="inline-flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-6"
                        >
                          <g clipPath="url(#clip0_2213_4936)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M23.93 2.734C23.8991 2.293 23.7422 1.87015 23.4781 1.51564C23.214 1.16112 22.8537 0.889842 22.44 0.733997C21.11 0.183997 19 0.573997 17.45 0.603997C14.88 0.673997 10.001 0.743997 6.27102 0.843997C3.78102 0.903997 1.83102 1.004 1.42102 1.064C1.13313 1.10822 0.851282 1.18539 0.581022 1.294C0.404798 1.36381 0.256966 1.49052 0.161022 1.654C0.0439833 1.94961 -0.0104965 2.26627 0.00102164 2.584C0.00102164 3.244 0.141022 4.004 0.121022 4.484C0.120648 4.55863 0.148104 4.63072 0.19803 4.68619C0.247955 4.74166 0.316765 4.77654 0.391022 4.784C0.465652 4.78437 0.537742 4.75692 0.593214 4.70699C0.648687 4.65706 0.683559 4.58825 0.691022 4.514C0.691022 4.054 0.591022 3.254 0.611022 2.594C0.602504 2.36464 0.64343 2.13614 0.731022 1.924C0.731022 1.854 0.891022 1.854 1.01102 1.824C1.185 1.77541 1.36207 1.73865 1.54102 1.714C1.85102 1.664 3.04102 1.644 4.68102 1.644H17.471C18.799 1.49527 20.1377 1.46515 21.471 1.554C21.8177 1.56208 22.1494 1.69672 22.4036 1.93251C22.6578 2.1683 22.8169 2.48895 22.851 2.834L22.921 3.584C22.921 3.734 22.781 3.774 22.671 3.804C22.3733 3.85632 22.0687 3.85632 21.771 3.804C20.471 3.804 11.641 4.064 6.15102 4.164H2.26102C2.1846 4.17745 2.11537 4.21741 2.06548 4.27685C2.01559 4.33628 1.98825 4.4114 1.98825 4.489C1.98825 4.56659 2.01559 4.64171 2.06548 4.70115C2.11537 4.76058 2.1846 4.80054 2.26102 4.814H8.13102C13.541 4.814 20.621 4.754 21.781 4.814C22.2742 4.85981 22.7715 4.8019 23.241 4.644C23.4454 4.56615 23.6243 4.4335 23.7582 4.26062C23.8921 4.08774 23.9758 3.88131 24 3.664L23.93 2.734ZM21.83 5.004C21.788 5.00129 21.7458 5.00691 21.706 5.02053C21.6661 5.03415 21.6293 5.05551 21.5977 5.08339C21.5661 5.11126 21.5404 5.1451 21.5219 5.18295C21.5034 5.22081 21.4926 5.26195 21.49 5.304L21.13 15.244C21.12 15.914 21.07 16.5807 20.98 17.244C20.9232 17.6138 20.7639 17.9603 20.52 18.244C20.3254 18.4389 20.0727 18.5652 19.8 18.604C19.2748 18.6589 18.7453 18.6589 18.22 18.604L12.37 18.384C11.45 18.384 10.52 18.274 9.59102 18.244H8.37102L5.62102 18.314C4.92769 18.364 4.23435 18.364 3.54102 18.314C3.16139 18.3199 2.7887 18.2119 2.47102 18.004C2.3882 17.9061 2.34222 17.7823 2.34102 17.654C2.32102 17.304 2.32102 16.954 2.34102 16.604C2.34102 15.694 2.27102 12.714 2.28102 10.064C2.28102 8.124 2.28102 6.364 2.40102 5.734C2.41149 5.69574 2.41372 5.6557 2.40755 5.61652C2.40138 5.57733 2.38695 5.53991 2.36523 5.50673C2.3435 5.47354 2.31498 5.44535 2.28154 5.42402C2.2481 5.40268 2.21051 5.3887 2.17126 5.38299C2.13201 5.37728 2.09199 5.37998 2.05386 5.3909C2.01573 5.40182 1.98036 5.42072 1.95008 5.44634C1.9198 5.47196 1.89531 5.50373 1.87824 5.53952C1.86116 5.57532 1.85188 5.61434 1.85102 5.654C1.76102 6.164 1.69102 7.444 1.63102 8.954C1.52102 11.824 1.45102 15.564 1.44102 16.624C1.40102 17.0733 1.40102 17.5233 1.44102 17.974C1.49002 18.25 1.62202 18.505 1.82102 18.704C2.16342 18.9773 2.56932 19.1596 3.00102 19.234C3.86702 19.379 4.74502 19.429 5.62102 19.384L8.39102 19.334H9.56102L10.951 19.414C10.9531 19.4306 10.9531 19.4474 10.951 19.464C10.9464 19.554 10.9464 19.644 10.951 19.734C10.941 19.8233 10.941 19.9133 10.951 20.004C10.961 20.062 10.9777 20.1187 11.001 20.174C10.6211 20.2672 10.2748 20.4646 10.001 20.744C9.73053 21.0171 9.54922 21.3657 9.48102 21.744C9.45672 21.9718 9.48165 22.2023 9.55411 22.4196C9.62657 22.637 9.74487 22.8363 9.90102 23.004C10.2678 23.3353 10.7376 23.5301 11.2311 23.5555C11.7247 23.581 12.212 23.4357 12.611 23.144C12.8209 22.9912 12.9893 22.7884 13.101 22.554C13.2361 22.2544 13.2768 21.9209 13.2179 21.5976C13.159 21.2743 13.0031 20.9766 12.771 20.744C12.5342 20.485 12.2292 20.2978 11.891 20.204C11.891 20.144 11.891 20.074 11.961 20.004C11.971 19.9093 11.971 19.816 11.961 19.724C11.971 19.634 11.971 19.544 11.961 19.454H12.321L18.181 19.614C18.781 19.654 19.384 19.631 19.981 19.544C20.4574 19.4586 20.8929 19.2198 21.221 18.864C21.5789 18.4406 21.808 17.9235 21.881 17.374C21.971 16.6733 22.011 15.97 22.001 15.264C22.091 13.084 22.001 9.914 22.071 7.264C22.071 6.544 22.071 5.874 22.131 5.264C22.1176 5.19322 22.0807 5.12904 22.0262 5.08185C21.9718 5.03467 21.902 5.00724 21.83 5.004ZM12.341 22.254C12.2872 22.4137 12.1861 22.5532 12.051 22.654C11.981 22.704 11.051 23.174 10.541 22.494C10.4876 22.416 10.4519 22.3272 10.4364 22.2339C10.4209 22.1407 10.4258 22.0451 10.451 21.954C10.5025 21.7768 10.6073 21.6197 10.751 21.504C10.8935 21.3729 11.0648 21.277 11.251 21.224C11.3945 21.1906 11.544 21.1943 11.6857 21.2345C11.8274 21.2747 11.9565 21.3502 12.061 21.454C12.1829 21.5436 12.2749 21.6679 12.3249 21.8107C12.3748 21.9534 12.3805 22.108 12.341 22.254Z"
                              fill="currentColor"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.81104 11.754V13.274C5.81104 14.454 5.93104 15.624 5.99104 16.814C6.00449 16.8904 6.04445 16.9597 6.10389 17.0095C6.16332 17.0594 6.23844 17.0868 6.31604 17.0868C6.39363 17.0868 6.46875 17.0594 6.52818 17.0095C6.58762 16.9597 6.62758 16.8904 6.64104 16.814C6.64104 16.324 6.64104 15.814 6.71104 15.354H10.311L11.501 15.244C12.431 15.134 13.351 14.974 14.281 14.794C14.3229 14.7892 14.3633 14.7759 14.3998 14.7549C14.4363 14.7339 14.4682 14.7057 14.4934 14.672C14.5187 14.6384 14.5368 14.5999 14.5467 14.559C14.5566 14.518 14.5581 14.4755 14.551 14.434C14.5386 14.35 14.4942 14.274 14.4272 14.2218C14.3601 14.1696 14.2755 14.1454 14.191 14.154C13.191 14.214 12.301 14.154 11.351 14.224C10.721 14.224 10.091 14.224 9.46104 14.324C8.54104 14.404 7.65104 14.564 6.75104 14.724C6.75104 14.254 6.75104 13.774 6.82104 13.294V12.564C8.04104 12.444 9.26104 12.424 10.501 12.374C11.371 12.374 12.241 12.304 13.101 12.254C14.571 12.154 16.021 12.004 17.471 11.824C17.5134 11.8212 17.5549 11.81 17.5929 11.7911C17.631 11.7722 17.6649 11.7459 17.6927 11.7138C17.7205 11.6817 17.7417 11.6444 17.7549 11.604C17.7682 11.5636 17.7734 11.521 17.77 11.4787C17.7667 11.4363 17.7551 11.395 17.7357 11.3572C17.7163 11.3194 17.6896 11.2858 17.6571 11.2584C17.6246 11.231 17.5871 11.2103 17.5465 11.1975C17.506 11.1848 17.4634 11.1802 17.421 11.184H13.501C12.621 11.184 11.741 11.184 10.871 11.294C9.52458 11.4203 8.18819 11.6374 6.87104 11.944V10.244C6.87104 9.934 6.87104 9.624 6.81104 9.304C7.28037 9.40133 7.7537 9.468 8.23104 9.504C8.52837 9.51933 8.82504 9.51933 9.12104 9.504L10.001 9.444C10.681 9.364 11.351 9.244 12.001 9.134C12.0859 9.134 12.1673 9.10028 12.2273 9.04027C12.2873 8.98026 12.321 8.89887 12.321 8.814C12.321 8.72913 12.2873 8.64774 12.2273 8.58772C12.1673 8.52771 12.0859 8.494 12.001 8.494C11.331 8.494 10.651 8.434 10.001 8.424H8.23104L6.77104 8.534C6.77104 7.914 6.68104 7.284 6.64104 6.654C6.62853 6.58755 6.59321 6.52757 6.54117 6.4844C6.48913 6.44124 6.42365 6.41762 6.35604 6.41762C6.28842 6.41762 6.22294 6.44124 6.1709 6.4844C6.11886 6.52757 6.08354 6.58755 6.07104 6.654L5.92104 8.864C5.92104 9.314 5.86104 9.774 5.84104 10.224C5.82104 10.674 5.81104 11.244 5.81104 11.754Z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2213_4936">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <span>جميع الحملات</span>
                      {activeCategory === "all" && (
                        <svg
                          width="7"
                          height="12"
                          viewBox="8.5 6.5 7 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.5002 7.50011C15.5001 7.30236 15.4414 7.10906 15.3316 6.94465C15.2217 6.78024 15.0655 6.6521 14.8828 6.57643C14.7001 6.50076 14.4991 6.48096 14.3051 6.51952C14.1112 6.55809 13.933 6.6533 13.7932 6.79311L8.79315 11.7931C8.60568 11.9806 8.50037 12.2349 8.50037 12.5001C8.50037 12.7653 8.60568 13.0196 8.79315 13.2071L13.7932 18.2071C13.933 18.3469 14.1112 18.4421 14.3051 18.4807C14.4991 18.5193 14.7001 18.4995 14.8828 18.4238C15.0655 18.3481 15.2217 18.22 15.3316 18.0556C15.4414 17.8912 15.5001 17.6979 15.5002 17.5001L15.5002 7.50011Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </button>
                    {/* الحملات الطبية */}
                    <button
                      type="button"
                      onClick={() => setActiveCategory("medical")}
                      className={`category-tab-text inline-flex items-center gap-[5px] px-2 py-1.5 whitespace-nowrap shrink-0 transition-all ${activeCategory === "medical" ? "text-[#007F5E] border-b-2 border-[#007F5E]" : "text-[#122F2A] border-b-2 border-transparent"
                        }`}
                    >
                      <span aria-hidden="true" className="inline-flex items-center justify-center">
                        <Image
                          src="/figma/medical-campaigns.svg"
                          alt="الحملات الطبية"
                          width={33}
                          height={24}
                          className={`h-6 ${activeCategory === "medical" ? "brightness-0 saturate-100" : ""}`}
                          style={activeCategory === "medical" ? { filter: "brightness(0) saturate(100%) invert(35%) sepia(95%) saturate(1200%) hue-rotate(120deg) brightness(0.95) contrast(0.9)" } : {}}
                        />
                      </span>
                      <span>الحملات الطبية</span>
                      {activeCategory === "medical" && (
                        <svg
                          width="7"
                          height="12"
                          viewBox="8.5 6.5 7 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.5002 7.50011C15.5001 7.30236 15.4414 7.10906 15.3316 6.94465C15.2217 6.78024 15.0655 6.6521 14.8828 6.57643C14.7001 6.50076 14.4991 6.48096 14.3051 6.51952C14.1112 6.55809 13.933 6.6533 13.7932 6.79311L8.79315 11.7931C8.60568 11.9806 8.50037 12.2349 8.50037 12.5001C8.50037 12.7653 8.60568 13.0196 8.79315 13.2071L13.7932 18.2071C13.933 18.3469 14.1112 18.4421 14.3051 18.4807C14.4991 18.5193 14.7001 18.4995 14.8828 18.4238C15.0655 18.3481 15.2217 18.22 15.3316 18.0556C15.4414 17.8912 15.5001 17.6979 15.5002 17.5001L15.5002 7.50011Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </button>

                    {/* حملات دعم الأيتام */}
                    <button
                      type="button"
                      onClick={() => setActiveCategory("orphans")}
                      className={`category-tab-text inline-flex items-center gap-[5px] px-2 py-1.5 whitespace-nowrap shrink-0 transition-all ${activeCategory === "orphans" ? "text-[#007F5E] border-b-2 border-[#007F5E]" : "text-[#122F2A] border-b-2 border-transparent"
                        }`}
                    >
                      <span aria-hidden="true" className="inline-flex items-center justify-center">
                        <Image
                          src="/figma/streamline-freehand_donation-charity-donate-heart-flower.svg"
                          alt="حملات دعم الأيتام"
                          width={24}
                          height={24}
                          className={`h-6 ${activeCategory === "orphans" ? "brightness-0 saturate-100" : ""}`}
                          style={activeCategory === "orphans" ? { filter: "brightness(0) saturate(100%) invert(35%) sepia(95%) saturate(1200%) hue-rotate(120deg) brightness(0.95) contrast(0.9)" } : {}}
                        />
                      </span>
                      <span>حملات دعم الأيتام</span>
                      {activeCategory === "orphans" && (
                        <svg
                          width="7"
                          height="12"
                          viewBox="8.5 6.5 7 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.5002 7.50011C15.5001 7.30236 15.4414 7.10906 15.3316 6.94465C15.2217 6.78024 15.0655 6.6521 14.8828 6.57643C14.7001 6.50076 14.4991 6.48096 14.3051 6.51952C14.1112 6.55809 13.933 6.6533 13.7932 6.79311L8.79315 11.7931C8.60568 11.9806 8.50037 12.2349 8.50037 12.5001C8.50037 12.7653 8.60568 13.0196 8.79315 13.2071L13.7932 18.2071C13.933 18.3469 14.1112 18.4421 14.3051 18.4807C14.4991 18.5193 14.7001 18.4995 14.8828 18.4238C15.0655 18.3481 15.2217 18.22 15.3316 18.0556C15.4414 17.8912 15.5001 17.6979 15.5002 17.5001L15.5002 7.50011Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </button>

                    {/* الحملات الانسانية */}
                    <button
                      type="button"
                      onClick={() => setActiveCategory("humanitarian")}
                      className={`category-tab-text inline-flex items-center gap-[5px] px-2 py-1.5 whitespace-nowrap shrink-0 transition-all ${activeCategory === "humanitarian" ? "text-[#007F5E] border-b-2 border-[#007F5E]" : "text-[#122F2A] border-b-2 border-transparent"
                        }`}
                    >
                      <span aria-hidden="true" className="inline-flex items-center justify-center">
                        <Image
                          src="/figma/human 1.svg"
                          alt="الحملات الانسانية"
                          width={26}
                          height={24}
                          className="h-6"
                        />
                      </span>
                      <span>الحملات الانسانية</span>
                      {activeCategory === "humanitarian" && (
                        <svg
                          width="7"
                          height="12"
                          viewBox="8.5 6.5 7 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.5002 7.50011C15.5001 7.30236 15.4414 7.10906 15.3316 6.94465C15.2217 6.78024 15.0655 6.6521 14.8828 6.57643C14.7001 6.50076 14.4991 6.48096 14.3051 6.51952C14.1112 6.55809 13.933 6.6533 13.7932 6.79311L8.79315 11.7931C8.60568 11.9806 8.50037 12.2349 8.50037 12.5001C8.50037 12.7653 8.60568 13.0196 8.79315 13.2071L13.7932 18.2071C13.933 18.3469 14.1112 18.4421 14.3051 18.4807C14.4991 18.5193 14.7001 18.4995 14.8828 18.4238C15.0655 18.3481 15.2217 18.22 15.3316 18.0556C15.4414 17.8912 15.5001 17.6979 15.5002 17.5001L15.5002 7.50011Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </button>

                    {/* حملات التعليم */}
                    <button
                      type="button"
                      onClick={() => setActiveCategory("education")}
                      className={`category-tab-text inline-flex items-center gap-[5px] px-2 py-1.5 whitespace-nowrap shrink-0 transition-all ${activeCategory === "education" ? "text-[#007F5E] border-b-2 border-[#007F5E]" : "text-[#122F2A] border-b-2 border-transparent"
                        }`}
                    >
                      <span aria-hidden="true" className="inline-flex items-center justify-center">
                        <Image
                          src="/figma/streamline-freehand_design-process-drawing-board-education.svg"
                          alt="حملات التعليم"
                          width={24}
                          height={24}
                          className={`h-6 ${activeCategory === "education" ? "brightness-0 saturate-100" : ""}`}
                          style={activeCategory === "education" ? { filter: "brightness(0) saturate(100%) invert(35%) sepia(95%) saturate(1200%) hue-rotate(120deg) brightness(0.95) contrast(0.9)" } : {}}
                        />
                      </span>
                      <span>حملات التعليم</span>
                      {activeCategory === "education" && (
                        <svg
                          width="7"
                          height="12"
                          viewBox="8.5 6.5 7 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.5002 7.50011C15.5001 7.30236 15.4414 7.10906 15.3316 6.94465C15.2217 6.78024 15.0655 6.6521 14.8828 6.57643C14.7001 6.50076 14.4991 6.48096 14.3051 6.51952C14.1112 6.55809 13.933 6.6533 13.7932 6.79311L8.79315 11.7931C8.60568 11.9806 8.50037 12.2349 8.50037 12.5001C8.50037 12.7653 8.60568 13.0196 8.79315 13.2071L13.7932 18.2071C13.933 18.3469 14.1112 18.4421 14.3051 18.4807C14.4991 18.5193 14.7001 18.4995 14.8828 18.4238C15.0655 18.3481 15.2217 18.22 15.3316 18.0556C15.4414 17.8912 15.5001 17.6979 15.5002 17.5001L15.5002 7.50011Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </button>

                    {/* حملات الاستجابة والطوارئ */}
                    <button
                      type="button"
                      onClick={() => setActiveCategory("emergency")}
                      className={`category-tab-text inline-flex items-center gap-[5px] px-2 py-1.5 whitespace-nowrap shrink-0 transition-all ${activeCategory === "emergency" ? "text-[#007F5E] border-b-2 border-[#007F5E]" : "text-[#122F2A] border-b-2 border-transparent"
                        }`}
                    >
                      <span aria-hidden="true" className="inline-flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="h-6"
                        >
                          <path d="M5.25024 19.0004H18.7502C19.5032 19.0005 20.1515 19.5319 20.2991 20.27L20.5754 21.6518C20.637 21.9616 20.4005 22.2503 20.0852 22.2504H3.91528C3.59948 22.2504 3.36213 21.961 3.42407 21.6518L3.70142 20.27C3.84905 19.5318 4.49719 19.0004 5.25024 19.0004Z" />
                          <path d="M6.00024 17.5004H18.0002C18.1848 17.5005 18.3443 17.6014 18.4309 17.7504H5.5686C5.65517 17.6012 5.81551 17.5004 6.00024 17.5004Z" />
                          <path d="M10.7834 7.00043H13.217C14.9713 7.00043 16.4551 8.29878 16.6868 10.0375L17.5149 16.2504H12.2502V8.00043H10.8098C9.56141 8.00043 8.50489 8.92117 8.33325 10.1577L7.4895 16.2504H6.4856L7.31372 10.0375C7.54613 8.2987 9.02928 7.00047 10.7834 7.00043Z" />
                          <path d="M10.8098 9.25043H11.0002V16.2504H8.75122L9.57153 10.3286C9.6565 9.71434 10.1899 9.25043 10.8098 9.25043Z" />
                          <path d="M2.61548 9.35493V9.3559L5.51196 10.1313L5.51294 10.1323C5.5623 10.1455 5.59691 10.1866 5.60376 10.2348L5.60083 10.2846C5.58588 10.3402 5.53608 10.3772 5.48071 10.3774C5.46839 10.3774 5.45795 10.3761 5.44849 10.3735H5.44751L2.55005 9.59711L2.50513 9.57465C2.4674 9.54509 2.44832 9.49484 2.46118 9.44477C2.47871 9.37976 2.54408 9.33802 2.61548 9.35493Z" />
                          <path d="M21.384 9.35493C21.4372 9.34162 21.4876 9.36154 21.5168 9.39985L21.5383 9.44477C21.5557 9.51122 21.5162 9.57957 21.4504 9.59711H21.4495L18.553 10.3735H18.551C18.5417 10.376 18.5319 10.3774 18.5198 10.3774C18.4791 10.3774 18.4398 10.3571 18.4163 10.3227L18.3987 10.2836C18.3816 10.2173 18.4219 10.1497 18.4875 10.1323V10.1313L21.384 9.35493Z" />
                          <path d="M5.01685 5.01704C5.06536 4.96852 5.14496 4.96873 5.1936 5.01704L7.31567 7.13911C7.36399 7.18743 7.3644 7.2662 7.31665 7.31489C7.29141 7.33985 7.259 7.352 7.22681 7.352C7.19352 7.35195 7.16197 7.3399 7.13794 7.31586L5.01685 5.19379C4.96857 5.14518 4.96843 5.06556 5.01685 5.01704Z" />
                          <path d="M18.8059 5.01704C18.8545 4.96852 18.9341 4.96859 18.9827 5.01704C19.0313 5.06564 19.0312 5.14517 18.9827 5.19379L16.8625 7.31489C16.8373 7.33982 16.8049 7.352 16.7727 7.352C16.7404 7.35192 16.7404 7.35192 16.7404 7.35192C16.7404 7.35192 16.7404 7.35192 16.7404 7.35192Z" />
                          <path d="M9.4436 2.46137C9.49332 2.44823 9.54434 2.4679 9.57446 2.50629L9.59692 2.55024L10.3733 5.4477V5.44868C10.3911 5.51447 10.3523 5.58325 10.2854 5.60102L10.2825 5.602C10.2749 5.60412 10.2648 5.60493 10.2522 5.60493C10.1982 5.60478 10.1469 5.56882 10.1311 5.51215H10.1321L9.35571 2.61469V2.61372L9.35181 2.56489C9.35833 2.51691 9.39331 2.4747 9.4436 2.46137Z" />
                          <path d="M14.5559 2.46137C14.6054 2.47466 14.64 2.51652 14.6467 2.56489L14.6438 2.61469L13.8674 5.51215C13.8525 5.56799 13.8019 5.60493 13.7463 5.60493C13.7339 5.60489 13.7246 5.60409 13.717 5.602L13.6702 5.57856C13.6312 5.54829 13.6131 5.49721 13.6262 5.44868V5.4477L14.4026 2.55024C14.4204 2.48519 14.4912 2.4443 14.5559 2.46137Z" />
                        </svg>
                      </span>
                      <span>حملات الاستجابة والطوارئ</span>
                      {activeCategory === "emergency" && (
                        <svg
                          width="7"
                          height="12"
                          viewBox="8.5 6.5 7 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.5002 7.50011C15.5001 7.30236 15.4414 7.10906 15.3316 6.94465C15.2217 6.78024 15.0655 6.6521 14.8828 6.57643C14.7001 6.50076 14.4991 6.48096 14.3051 6.51952C14.1112 6.55809 13.933 6.6533 13.7932 6.79311L8.79315 11.7931C8.60568 11.9806 8.50037 12.2349 8.50037 12.5001C8.50037 12.7653 8.60568 13.0196 8.79315 13.2071L13.7932 18.2071C13.933 18.3469 14.1112 18.4421 14.3051 18.4807C14.4991 18.5193 14.7001 18.4995 14.8828 18.4238C15.0655 18.3481 15.2217 18.22 15.3316 18.0556C15.4414 17.8912 15.5001 17.6979 15.5002 17.5001L15.5002 7.50011Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </button>
                  </nav>
                </div>

                {/* Filter icon button */}
                <button
                  type="button"
                  onClick={() => setIsFilterPanelOpen((v) => !v)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#007F5E]/10"
                  aria-label="فتح خيارات الفلترة"
                >
                  <Image
                    src="/mage_filter-fill.svg"
                    alt="فلترة"
                    width={34}
                    height={34}
                    className="h-[28px] w-[28px]"
                  />
                </button>
              </div>
            </div>

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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => {
                  const isFav = !!favorites[project.id];
                  const isBursting = !!favoriteBursts[project.id];

                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isFav={isFav}
                      isBursting={isBursting}
                      onToggleFavorite={handleToggleFavorite}
                      onDonate={openDonationDialog}
                    />
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2" dir="rtl">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border text-white transition ${currentPage === 1
                  ? "border-[#B4BB5F]/40 bg-[#B4BB5F]/60 opacity-60"
                  : "border-[#007F5E] bg-[#007F5E]"
                  }`}
              >
                <Image
                  src="/iconamoon_arrow-up-2.svg"
                  alt="السابق"
                  width={18}
                  height={18}
                  className="h-[16px] w-[16px]"
                />
              </button>

              {campaignsData &&
                Array.from({ length: campaignsData.totalPages || 1 }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border text-xs font-medium transition ${page === currentPage
                      ? "border-[#B4BB5F] bg-[#B4BB5F] text-white"
                      : "border-[#D4D4D4] bg-white text-[#474747]"
                      }`}
                  >
                    {page}
                  </button>
                ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(campaignsData?.totalPages || 1, p + 1))}
                disabled={currentPage >= (campaignsData?.totalPages || 1)}
                className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border text-white transition ${currentPage === campaignsData?.totalPages
                  ? "border-[#B4BB5F]/40 bg-[#B4BB5F]/60 opacity-60"
                  : "border-[#007F5E] bg-[#007F5E]"
                  }`}
              >
                <span className="rotate-180">
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
          </Container>
        </div>
      </div>

      <DonationModal
        open={isDonationDialogOpen}
        onClose={() => setIsDonationDialogOpen(false)}
        onSuccess={() => setIsSuccessModalOpen(true)}
        projectTitle={selectedProjectForDonation?.title}
        isProject={true}
      />

      <DonationSuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </section>
  );
}
