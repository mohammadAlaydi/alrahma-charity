"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/ui/Container";
import { DonationFormDialog } from "./DonationFormDialog";
import { DonationSuccessModal } from "./DonationSuccessModal";
import { ProjectCard } from "./ProjectCard";
import { Project } from "../types";
import { formatCurrency } from "../utils";
import { getCampaigns } from "@/services/api/campaigns";
import { transformCampaignToProject } from "../utils";
import { queryKeys } from "@/services/queryKeys";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";

type ProjectDetailsViewProps = {
    project: Project;
};

type ContentTab = "objective" | "rationale" | "implementation" | "target" | "sustainability" | "results" | "budget" | "costs";

function HeartIcon({ isFav }: { isFav: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill={isFav ? "#DC2626" : "none"}
            stroke={isFav ? "#DC2626" : "#9CA3AF"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 transition-colors"
        >
            <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.99.99 0 0 0 1.024 0C21.126 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3" />
        </svg>
    );
}

export function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
    const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<ContentTab>("rationale");

    const favorites = useAppSelector((state) => state.favorites.favorites);
    const dispatch = useAppDispatch();
    const isFav = !!favorites[project.id];
    const [favoriteBursts, setFavoriteBursts] = useState<Record<string, boolean>>({});

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(project.id));
    };

    const handleToggleFavoriteCard = (id: string) => {
        const wasFavorite = favorites[id];
        dispatch(toggleFavorite(id));
        if (!wasFavorite) {
            setFavoriteBursts((prevBursts) => ({ ...prevBursts, [id]: true }));
            setTimeout(() => {
                setFavoriteBursts((prevBursts) => ({ ...prevBursts, [id]: false }));
            }, 500);
        }
    };

    const progress = Math.min((project.collected / project.goal) * 100, 100);
    const donors = Math.floor(project.collected / 100); // Mock donor count

    // Fetch similar projects
    const { data: campaignsData } = useQuery({
        queryKey: queryKeys.campaigns.list({ page: 1, limit: 3 }),
        queryFn: () => getCampaigns({ page: 1, limit: 3 }),
        retry: 1,
        staleTime: 0,
        gcTime: 0,
    });

    const similarProjects = useMemo(() => {
        if (!campaignsData?.data) return [];
        const dataArray = Array.isArray(campaignsData.data) ? campaignsData.data : [];
        return dataArray
            .map(transformCampaignToProject)
            .filter((p) => p.id !== project.id && p.category === project.category)
            .slice(0, 3);
    }, [campaignsData, project.id, project.category]);

    const openDonationDialog = (proj: Project) => {
        setIsDonationDialogOpen(true);
    };

    const tabs: { id: ContentTab; label: string }[] = [
        { id: "objective", label: "الهدف العام" },
        { id: "rationale", label: "مبررات المشروع" },
        { id: "implementation", label: "آلية التنفيذ" },
        { id: "target", label: "الفئة المستهدفة" },
        { id: "sustainability", label: "الاستدامة" },
        { id: "results", label: "النتائج المتوقعة" },
        { id: "budget", label: "الميزانية التفصيلية" },
        { id: "costs", label: "تكاليف المشروع" },
    ];

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
        <div dir="rtl" className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[502px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#007F5E]/10 to-transparent" />
                <Container className="relative z-10 flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="flex items-center gap-2">
                            <p className="font-['Playpen_Sans_Arabic',sans-serif] text-[16px] leading-[1.5] text-[#B4BB5F]">
                                تبرعك اليوم يصنع أثرًا لا يُنسى
                            </p>
                            <div className="relative h-5 w-5">
                                <Image
                                    src="/emojis/hand_healtcare.svg"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <h1 className="font-alexandria text-[32px] md:text-[50px] font-semibold leading-[normal] text-[#0D0D0D]">
                            تفاصيل المشروع
                        </h1>
                        <div className="flex items-center gap-2 text-[#B4BB5F] text-[16px]">
                            <Link href="/projects" className="hover:underline">
                                آخر مشاريعنا
                            </Link>
                            <Image
                                src="/emojis/left arrow.svg"
                                alt=""
                                width={6}
                                height={10}
                                className="h-2.5 w-[6px]"
                            />
                            <Link href="/" className="hover:underline">
                                الرئيسية
                            </Link>
                            <Image
                                src="/emojis/left arrow.svg"
                                alt=""
                                width={6}
                                height={10}
                                className="h-2.5 w-[6px]"
                            />
                            <span>{project.title}</span>
                        </div>
                    </div>
                </Container>
            </section>

            {/* About Section */}
            <section className="py-8 md:py-16">
                <Container>
                    <div className="flex flex-col gap-6 md:gap-12">
                        {/* Title and Description */}
                        <div className="flex flex-col gap-4 items-end">
                            <h2 className="font-alexandria text-[24px] md:text-[32px] font-bold text-right">
                                <span className="text-[#0D0D0D]">{project.title.split(" ").slice(0, 2).join(" ")} </span>
                                <span className="text-[#007F5E]">{project.title.split(" ").slice(2, -2).join(" ")} </span>
                                <span className="text-[#0D0D0D]">{project.title.split(" ").slice(-2).join(" ")}</span>
                            </h2>
                            <p className="font-alexandria text-[16px] leading-[1.5] text-[rgba(13,13,13,0.7)] text-justify">
                                {project.description}
                            </p>
                        </div>

                        {/* Project Image/Video */}
                        <div className="relative h-[400px] md:h-[700px] w-full overflow-hidden rounded-[20px] bg-zinc-200">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-molle text-center text-[32px] md:text-[40px] font-normal text-white">
                                    Donate image
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70" />
                            
                            {/* Category Badge */}
                            <div className="absolute top-6 right-6 z-10">
                                <div className="inline-flex items-center gap-1.5 rounded-full border border-white bg-[#007F5E] px-4 py-2">
                                    <span className="text-white font-medium text-sm">
                                        {getCategoryLabel(project.category)}
                                    </span>
                                </div>
                            </div>

                            {/* Play Button */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="relative h-[111px] w-[133px]">
                                    <div className="absolute inset-0 rounded-full bg-white/90" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg
                                            width="70"
                                            height="70"
                                            viewBox="0 0 70 70"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-[69px] w-[70px]"
                                        >
                                            <path
                                                d="M25 20L50 35L25 50V20Z"
                                                fill="#007F5E"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="flex flex-col gap-4 p-4 md:p-0">
                            <div className="flex flex-wrap gap-4 justify-end">
                                <div className="flex flex-col gap-2 items-end">
                                    <p className="font-alexandria text-[16px] font-normal text-[#0D0D0D]">
                                        الهدف المالي
                                    </p>
                                    <p className="font-alexandria text-[20px] font-bold text-[#0D0D0D]">
                                        {formatCurrency(project.goal)} ₺
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <p className="font-alexandria text-[16px] font-normal text-[#0D0D0D]">
                                        نسبة الإنجاز
                                    </p>
                                    <p className="font-alexandria text-[20px] font-bold text-[#0D0D0D]">
                                        {progress.toFixed(2)}%
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-2 w-full overflow-hidden rounded-[10px] bg-[rgba(217,217,217,0.4)]">
                                <div
                                    className="absolute top-0 right-0 h-full rounded-[10px] bg-[#007F5E] transition-all duration-1000"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="flex flex-wrap gap-4 justify-end">
                                <div className="flex flex-col gap-2 items-end">
                                    <p className="font-alexandria text-[16px] font-normal text-[#0D0D0D]">
                                        المبلغ المجمع
                                    </p>
                                    <p className="font-alexandria text-[20px] font-bold text-[#0D0D0D]">
                                        {formatCurrency(project.collected)} ₺
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <p className="font-alexandria text-[16px] font-normal text-[#0D0D0D]">
                                        عدد المتبرعين
                                    </p>
                                    <p className="font-alexandria text-[20px] font-bold text-[#0D0D0D]">
                                        {donors} متبرع
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Tabs */}
                        <div className="bg-[rgba(255,255,255,0.1)] border border-[rgba(0,127,94,0.1)] rounded-[20px] p-4 shadow-[0px_0px_17.3px_rgba(0,127,94,0.07)]">
                            <div className="flex flex-wrap gap-4 items-center justify-end">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-3 py-2.5 rounded-[12px] border border-[#f0f1f2] font-alexandria text-[16px] leading-[1.5] transition-all ${
                                            activeTab === tab.id
                                                ? "bg-[rgba(0,127,94,0.1)] border-[#f0f1f2] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] font-medium text-[#232325]"
                                                : "bg-transparent text-[#232325] font-normal"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                                <div className="flex items-center justify-end w-full md:w-auto">
                                    <p className="font-alexandria text-[20px] font-medium text-[#323234]">
                                        محتويات
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className="flex flex-col gap-10">
                            {/* Rationale Section (Default) */}
                            {activeTab === "rationale" && (
                                <div className="flex flex-col gap-4 items-end">
                                    <div className="flex items-center gap-2.5 w-full justify-end">
                                        <h3 className="font-alexandria text-[20px] font-bold text-[#232325]">
                                            مبررات المشروع
                                        </h3>
                                        <div className="relative h-8 w-8">
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-8 w-8"
                                            >
                                                <path
                                                    d="M16 2L20 12L30 16L20 20L16 30L12 20L2 16L12 12L16 2Z"
                                                    fill="#232325"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-5 text-right">
                                        <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52]">
                                            أدت الحرب المستمرة في غزة إلى تدمير واسع لشبكات المياه وانقطاعها عن آلاف العائلات، خصوصاً في شمال القطاع الذي يعاني من النزوح الكبير وتكدس السكان في مناطق محدودة. هذا الواقع جعل شبكات المياه المتبقية غير كافية لتلبية احتياجات الناس اليومية من مياه الشرب والاستخدام المنزلي، إضافة إلى تلوث مصادر المياه البديلة.
                                        </p>
                                        <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52]">
                                            في ظل هذا النقص الحاد، باتت الحاجة إلى حلول مستدامة وفعالة لتوفير مياه نقية وملائمة للشرب أمراً ملحاً. ويُعتبر حفر آبار مياه عميقة وتزويدها بمولدات كهربائية وخزانات تخزين خطوة جوهرية للتخفيف من أزمة العطش وضمان استمرار الحياة بكرامة.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Image with Quote */}
                            <div className="relative h-[410px] w-full overflow-hidden rounded-[20px]">
                                <div className="absolute inset-0 bg-white opacity-90" />
                                <div className="absolute inset-0">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="font-molle text-center text-[32px] font-normal text-white">
                                            Donate image
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#2e7c5a] to-transparent" />
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[365px] px-4">
                                    <div className="bg-white border-[0.75px] border-[rgba(0,0,0,0.2)] rounded-[20px] p-4 flex flex-col gap-5 items-end">
                                        <div className="flex items-center justify-center">
                                            <div className="relative h-10 w-10 rotate-180">
                                                <Image
                                                    src="/figma/iconamoon_arrow-up-2-fill.svg"
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    className="h-10 w-10 object-contain"
                                                />
                                            </div>
                                        </div>
                                        <p className="font-alexandria text-[20px] font-medium leading-[1.5] text-[#232325] text-justify">
                                            لنحذر جميعا كل الحذر من خذلان إخواننا وعدم التفاعل معهم ونصرتهم ومساندتهم، فخذلان المسلمين سبب لخذلان الله للعبد، فلا ينبغي لقادر أن يتأخر عن نجدة إخوانه وإغاثتهم وتخفيف آلامهم
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsDonationDialogOpen(true)}
                                        className="mt-6 bg-[#007F5E] flex gap-2.5 items-center justify-center px-8 py-4 rounded-[35px] text-white mx-auto"
                                    >
                                    <div className="relative h-6 w-6">
                                        <Image
                                            src="/figma/mingcute_love-fill.svg"
                                            alt=""
                                            width={24}
                                            height={24}
                                            className="h-6 w-6 object-contain"
                                        />
                                    </div>
                                        <span className="font-alexandria text-[16px] font-bold leading-[1.5]">
                                            تبرع الأن
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Additional Content */}
                            <div className="flex flex-col gap-5 items-end">
                                <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52] text-right">
                                    يمثل مشروع حفر آبار المياه في شمال غزة استجابة عاجلة وضرورية لتأمين مصدر حياة أساسي لآلاف الأسر التي تعاني من العطش ونقص المياه. هذه الآبار ستوفر يومياً آلاف اللترات من المياه النقية، لتروي عطش الأطفال، وتدعم صحة النساء الحوامل وكبار السن، وتعيد للناس جزءاً من كرامتهم المفقودة وسط ظروف الحرب القاسية.
                                </p>
                                <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52] text-right">
                                    إن مساهمتكم في هذا المشروع ليست مجرد تبرع مالي، بل هي شريان حياة يصل إلى قلوب وأفواه عطشى، واستثمار مباشر في بقاء الناس وصحتهم في غزة.
                                </p>
                                <div className="flex items-center gap-2.5 w-full justify-end">
                                    <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52] text-right">
                                        ساهم اليوم في حفر بئر مياه ينقذ حياة الآلاف، ويمنحهم الأمل في غد أفضل.
                                    </p>
                                        <div className="relative h-8 w-8">
                                            <Image
                                                src="/figma/donation-svgrepo-com (1) 1.svg"
                                                alt=""
                                                width={32}
                                                height={32}
                                                className="h-8 w-8 object-contain"
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Donation Form Section */}
            <section className="py-8 md:py-16 bg-gradient-to-b from-transparent to-[#007F5E]/5">
                <Container>
                    <div className="relative rounded-[20px] p-4 md:p-8 overflow-hidden">
                        <div className="absolute inset-0 opacity-5 pointer-events-none">
                            <div className="absolute inset-0 bg-[url('/images/7363d45c2da79e778f88045823a4c2479c8c599f.png')] bg-cover" />
                        </div>
                        <div className="relative z-10 flex flex-col gap-6 items-center">
                            <div className="flex items-center gap-2.5">
                                <p className="font-alexandria text-[20px] font-bold text-[#232325]">
                                    كم تريد التبرع اليوم
                                </p>
                                        <div className="relative h-8 w-8">
                                            <Image
                                                src="/figma/donation-svgrepo-com (1) 1.svg"
                                                alt=""
                                                width={32}
                                                height={32}
                                                className="h-8 w-8 object-contain"
                                            />
                                        </div>
                            </div>
                            <p className="font-alexandria text-[16px] leading-[2] text-[#4f4f52] text-center max-w-2xl">
                                جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
                            </p>
                            <button
                                onClick={() => setIsDonationDialogOpen(true)}
                                className="w-full max-w-[592px] bg-[#007F5E] flex gap-2.5 items-center justify-center px-8 py-4 rounded-[35px] text-white hover:bg-[#056A4F] transition-colors"
                            >
                                    <div className="relative h-6 w-6">
                                        <Image
                                            src="/figma/mingcute_love-fill.svg"
                                            alt=""
                                            width={24}
                                            height={24}
                                            className="h-6 w-6 object-contain"
                                        />
                                    </div>
                                <span className="font-alexandria text-[16px] font-semibold leading-[1.5]">
                                    تبرع الان
                                </span>
                            </button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Similar Projects Section */}
            {similarProjects.length > 0 && (
                <section className="py-8 md:py-16">
                    <Container>
                        <div className="flex flex-col gap-8 md:gap-12">
                            <div className="flex flex-col gap-2 items-end">
                                <div className="flex items-center gap-2.5">
                                    <p className="font-['Playpen_Sans_Arabic',sans-serif] text-[16px] leading-[1.5] text-[#007F5E]">
                                        كن أنت سبب الأمل
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
                                <h2 className="font-alexandria text-[24px] font-bold text-[#232325] text-center">
                                    مشاريع مشابهة
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {similarProjects.map((proj) => (
                                    <ProjectCard
                                        key={proj.id}
                                        project={proj}
                                        isFav={!!favorites[proj.id]}
                                        isBursting={!!favoriteBursts[proj.id]}
                                        onToggleFavorite={handleToggleFavoriteCard}
                                        onDonate={openDonationDialog}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <Link
                                    href="/projects"
                                    className="bg-[#007F5E] flex gap-2.5 items-center justify-center px-8 py-4 rounded-[35px] text-white"
                                >
                                    <div className="relative h-5 w-5 rotate-90">
                                        <Image
                                            src="/emojis/line-md_arrow-up.svg"
                                            alt=""
                                            width={20}
                                            height={20}
                                            className="h-5 w-5 object-contain"
                                        />
                                    </div>
                                    <span className="font-alexandria text-[16px] font-bold leading-[1.5]">
                                        مشاهدة المزيد
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            <DonationFormDialog
                open={isDonationDialogOpen}
                onClose={() => setIsDonationDialogOpen(false)}
                onSuccess={() => setIsSuccessModalOpen(true)}
                projectTitle={project.title}
            />

            <DonationSuccessModal
                open={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
            />
        </div>
    );
}
