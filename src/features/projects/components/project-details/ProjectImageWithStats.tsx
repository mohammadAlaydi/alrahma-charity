import Image from "next/image";
import { Project } from "../../types";
import { formatCurrency } from "../../utils";
import { DonateButton } from "@/components/ui/DonateButton";
import { LAYOUT } from "@/config/design-tokens";

type ProjectImageWithStatsProps = {
    project: Project;
    progress: number;
    donorsCount: number;
    onDonateClick: () => void;
};

export function ProjectImageWithStats({
    project,
    progress,
    donorsCount,
    onDonateClick,
}: ProjectImageWithStatsProps) {

    const getCategoryLabel = (category: string) => {
        const labels: Record<string, string> = {
            medical: "الحملات الطبية",
            orphans: "حملات دعم الأيتام",
            humanitarian: "الحملات الانسانية",
            education: "حملات التعليم",
            emergency: "حملات الاستجابة والطوارئ",
        };
        return labels[category] || "تصنيف المشروع";
    };

    return (
        <div className="relative h-[700px] w-full overflow-hidden rounded-[20px] bg-zinc-200">
            {/* Feature Image */}
            <div className="absolute inset-0">
                <Image
                    src="/figma/Feature Image.png"
                    alt={project.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70" />
            </div>

            {/* Category Badge */}
            <div className="absolute top-6 left-6 z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white bg-[#007F5E] px-4 py-2">
                    <span className="text-white font-alexandria font-medium text-sm">
                        {getCategoryLabel(project.category)}
                    </span>
                </div>
            </div>

            {/* Play Button */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative h-[70px] w-[70px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M15 10L30 20L15 30V10Z" fill="#007F5E" />
                    </svg>
                </div>
            </div>

            {/* Bottom Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="flex items-start justify-between">
                    {/* Stats Grid */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-20">
                            <div className="flex flex-col gap-2 items-start">
                                <p className="font-alexandria text-[20px] leading-[20px] text-[rgba(255,255,255,0.8)]">
                                    المبلغ المجمع
                                </p>
                                <p className="font-alexandria text-[24px] leading-[20px] text-[rgba(255,255,255,0.9)]">
                                    {formatCurrency(project.collected)} ₺
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 items-start">
                                <p className="font-alexandria text-[20px] leading-[20px] text-[rgba(255,255,255,0.8)]">
                                    نسبة الإنجاز
                                </p>
                                <p className="font-alexandria text-[24px] leading-[20px] text-[rgba(255,255,255,0.9)]">
                                    {progress.toFixed(2)} %
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 items-start">
                                <p className="font-alexandria text-[20px] leading-[20px] text-[rgba(255,255,255,0.8)]">
                                    الهدف المالي
                                </p>
                                <p className="font-alexandria text-[24px] leading-[20px] text-[rgba(255,255,255,0.9)]">
                                    {formatCurrency(project.goal)} ₺
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 items-start">
                                <p className="font-alexandria text-[20px] leading-[20px] text-[rgba(255,255,255,0.8)]">
                                    عدد المتبرعين
                                </p>
                                <p className="font-alexandria text-[24px] leading-[20px] text-[rgba(255,255,255,0.9)]">
                                    {donorsCount} متبرع
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div
                            className="relative h-2 overflow-hidden rounded-[10px] bg-[rgba(217,217,217,0.4)]"
                            style={{ width: LAYOUT.progressBarWidth }}
                        >
                            <div
                                className="absolute top-0 right-0 h-full rounded-[10px] bg-[#007F5E] transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <DonateButton
                        onClick={onDonateClick}
                        size="lg"
                        className="rounded-[35px]"
                    />
                </div>
            </div>
        </div>
    );
}
