"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

export interface FilterState {
  country: string;
  minGoal: number;
  maxGoal: number;
  completionRate: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
}

const COUNTRIES = [
  "مصر",
  "السعودية",
  "الإمارات",
  "الأردن",
  "تونس",
  "المغرب",
  "الجزائر",
];

const COMPLETION_RATES = [
  { value: "all", label: "الكل" },
  { value: "0-25", label: "أقل من 25%" },
  { value: "25-50", label: "من 25% إلى 50%" },
  { value: "50-75", label: "من 50% إلى 75%" },
  { value: "75-100", label: "أكثر من 75%" },
];

const GOAL_RANGES = [
  { value: "all", label: "الكل", min: 0, max: 1000000 },
  { value: "0-5000", label: "أقل من 5,000", min: 0, max: 5000 },
  { value: "5000-50000", label: "من 5,000 إلى 50,000", min: 5000, max: 50000 },
  { value: "50000-100000", label: "من 50,000 إلى 100,000", min: 50000, max: 100000 },
  { value: "100000-plus", label: "أكثر من 100,000", min: 100000, max: 1000000 },
];

export function FilterPanel({ isOpen, onClose, onApplyFilters, currentFilters }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);

  const selectedGoalLabel = useMemo(() => {
    const range = GOAL_RANGES.find(
      (r) => r.min === localFilters.minGoal && r.max === localFilters.maxGoal
    );
    return range ? range.label : "قيمة الهدف المالي";
  }, [localFilters.minGoal, localFilters.maxGoal]);

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  if (!isOpen) return null;

  return (
    <aside
      dir="rtl"
      className="flex h-full w-full flex-col overflow-hidden rounded-[20px] z-50 bg-white"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.10)",
        position: "absolute",
        top: "-0.373px",
      }}
      aria-label="خيارات الفلترة والعرض"
    >
      {/* Background pattern - Layered for better visibility and solid base */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: "url('/images/7363d45c2da79e778f88045823a4c2479c8c599f.png')",
          backgroundPosition: "50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between py-2 mb-4">
          <h2
            id="filter-panel-title"
            className="flex items-center gap-3 font-['Alexandria',sans-serif] text-[24px] font-bold leading-8 tracking-[0.48px] text-[#0D0D0D]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0D0D0D] text-[14px] font-medium">
              0
            </div>
            <span>خيارات الفلترة والعرض</span>
          </h2>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(13,13,13,0.05)] transition-colors hover:bg-[rgba(13,13,13,0.1)]"
            aria-label="إغلاق"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M1 11L11 1"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="h-0.5 w-full bg-[rgba(13,13,13,0.05)] mb-6" />

        {/* Filter Options */}
        <div className="flex flex-1 flex-col gap-8">
          {/* Country Dropdown */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 font-['Alexandria',sans-serif] text-[14px] font-medium text-[#0D0D0D]">
              <Image src="/figma/hugeicons_location-03.svg" alt="" width={20} height={20} />
              <span>الدولة</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="flex h-[58px] w-full items-center justify-between rounded-[10px] bg-[rgba(13,13,13,0.05)] px-4 py-2 transition-colors hover:bg-[rgba(13,13,13,0.08)]"
              >
                <span className="font-['Alexandria',sans-serif] text-[14px] font-medium text-[#0D0D0D]">
                  {localFilters.country || "اسم الدولة"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="24"
                  viewBox="0 0 12 24"
                  fill="currentColor"
                  className={`transition-transform text-[#0D0D0D] opacity-40 ${isCountryOpen ? "rotate-90" : "rotate-180"}`}
                >
                  <path d="M8.58997 12.0001L2.28997 18.3001C1.89997 18.6901 1.89997 19.3201 2.28997 19.7101C2.67997 20.1001 3.30997 20.1001 3.69997 19.7101L10.71 12.7001C11.1 12.3101 11.1 11.6801 10.71 11.2901L3.69997 4.29006C3.30997 3.90006 2.67997 3.90006 2.28997 4.29006C1.89997 4.68006 1.89997 5.31006 2.28997 5.70006L8.58997 12.0001Z" />
                </svg>
              </button>

              {isCountryOpen && (
                <div className="absolute top-full left-0 right-0 z-30 mt-2 flex flex-col overflow-hidden rounded-[10px] bg-white shadow-xl border border-[rgba(13,13,13,0.05)]">
                  <button
                    type="button"
                    onClick={() => {
                      setLocalFilters({ ...localFilters, country: "" });
                      setIsCountryOpen(false);
                    }}
                    className="px-4 py-3 text-right font-['Alexandria',sans-serif] text-[14px] font-medium text-[#0D0D0D] transition-colors hover:bg-[rgba(13,13,13,0.05)]"
                  >
                    الكل
                  </button>
                  {COUNTRIES.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        setLocalFilters({ ...localFilters, country });
                        setIsCountryOpen(false);
                      }}
                      className={`px-4 py-3 text-right font-['Alexandria',sans-serif] text-[14px] font-medium transition-colors hover:bg-[rgba(13,13,13,0.05)] ${
                        localFilters.country === country
                          ? "bg-[rgba(0,127,94,0.1)] text-[#007F5E]"
                          : "text-[#0D0D0D]"
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Financial Goal Range Dropdown */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 font-['Alexandria',sans-serif] text-[14px] font-medium text-[#0D0D0D]">
              <Image src="/figma/Icon text.svg" alt="" width={20} height={20} />
              <span>قيمة الهدف المالي</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsGoalOpen(!isGoalOpen)}
                className="flex h-[58px] w-full items-center justify-between rounded-[10px] bg-[rgba(13,13,13,0.05)] px-4 py-2 transition-colors hover:bg-[rgba(13,13,13,0.08)]"
              >
                <span className="font-['Alexandria',sans-serif] text-[14px] font-medium text-[#0D0D0D]">
                  {selectedGoalLabel}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="24"
                  viewBox="0 0 12 24"
                  fill="currentColor"
                  className={`transition-transform text-[#0D0D0D] opacity-40 ${isGoalOpen ? "rotate-90" : "rotate-180"}`}
                >
                  <path d="M8.58997 12.0001L2.28997 18.3001C1.89997 18.6901 1.89997 19.3201 2.28997 19.7101C2.67997 20.1001 3.30997 20.1001 3.69997 19.7101L10.71 12.7001C11.1 12.3101 11.1 11.6801 10.71 11.2901L3.69997 4.29006C3.30997 3.90006 2.67997 3.90006 2.28997 4.29006C1.89997 4.68006 1.89997 5.31006 2.28997 5.70006L8.58997 12.0001Z" />
                </svg>
              </button>

              {isGoalOpen && (
                <div className="absolute top-full left-0 right-0 z-30 mt-2 flex flex-col overflow-hidden rounded-[10px] bg-white shadow-xl border border-[rgba(13,13,13,0.05)]">
                  {GOAL_RANGES.map((range) => (
                    <button
                      key={range.value}
                      type="button"
                      onClick={() => {
                        setLocalFilters({ ...localFilters, minGoal: range.min, maxGoal: range.max });
                        setIsGoalOpen(false);
                      }}
                      className={`px-4 py-3 text-right font-['Alexandria',sans-serif] text-[14px] font-medium transition-colors hover:bg-[rgba(13,13,13,0.05)] ${
                        localFilters.minGoal === range.min && localFilters.maxGoal === range.max
                          ? "bg-[rgba(0,127,94,0.1)] text-[#007F5E]"
                          : "text-[#0D0D0D]"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Completion Rate Dropdown */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 font-['Alexandria',sans-serif] text-[14px] font-medium text-[#0D0D0D]">
              <Image src="/figma/tabler_percentage-10.svg" alt="" width={20} height={20} />
              <span>نسبة اكتمال التبرعات</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCompletionOpen(!isCompletionOpen)}
                className="flex h-[58px] w-full items-center justify-between rounded-[10px] bg-[rgba(13,13,13,0.05)] px-4 py-2 transition-colors hover:bg-[rgba(13,13,13,0.08)]"
              >
                <span className="font-['Alexandria',sans-serif] text-[14px] font-medium text-[#0D0D0D]">
                  {COMPLETION_RATES.find((r) => r.value === localFilters.completionRate)?.label ||
                    "المشاريع التي حققت 50%"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="24"
                  viewBox="0 0 12 24"
                  fill="currentColor"
                  className={`transition-transform text-[#0D0D0D] opacity-40 ${isCompletionOpen ? "rotate-90" : "rotate-180"}`}
                >
                  <path d="M8.58997 12.0001L2.28997 18.3001C1.89997 18.6901 1.89997 19.3201 2.28997 19.7101C2.67997 20.1001 3.30997 20.1001 3.69997 19.7101L10.71 12.7001C11.1 12.3101 11.1 11.6801 10.71 11.2901L3.69997 4.29006C3.30997 3.90006 2.67997 3.90006 2.28997 4.29006C1.89997 4.68006 1.89997 5.31006 2.28997 5.70006L8.58997 12.0001Z" />
                </svg>
              </button>

              {isCompletionOpen && (
                <div className="absolute top-full left-0 right-0 z-30 mt-2 flex flex-col overflow-hidden rounded-[10px] bg-white shadow-xl border border-[rgba(13,13,13,0.05)]">
                  {COMPLETION_RATES.map((rate) => (
                    <button
                      key={rate.value}
                      type="button"
                      onClick={() => {
                        setLocalFilters({ ...localFilters, completionRate: rate.value });
                        setIsCompletionOpen(false);
                      }}
                      className={`px-4 py-3 text-right font-['Alexandria',sans-serif] text-[14px] font-medium transition-colors hover:bg-[rgba(13,13,13,0.05)] ${
                        localFilters.completionRate === rate.value
                          ? "bg-[rgba(0,127,94,0.1)] text-[#007F5E]"
                          : "text-[#0D0D0D]"
                      }`}
                    >
                      {rate.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Apply Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleApply}
              className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-solid border-white bg-[#007F5E] px-8 py-4 font-['Alexandria',sans-serif] text-white transition-all hover:bg-[#006B4F] shadow-lg shadow-[#007F5E]/20"
            >
              <span className="text-[20px] font-normal">عرض</span>
              <Image src="/figma/tabler_search.svg" alt="" width={20} height={20} className="scale-125" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

