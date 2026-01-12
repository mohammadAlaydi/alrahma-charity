"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/ui/Container";
import { DonationFormDialog } from "./DonationFormDialog";
import { DonationSuccessModal } from "./DonationSuccessModal";
import { ProjectCard } from "./ProjectCard";
import { QuickDonationCard } from "./QuickDonationCard";
import { Project } from "../types";
import { formatCurrency } from "../utils";
import { getCampaigns } from "@/services/api/campaigns";
import { transformCampaignToProject } from "../utils";
import { queryKeys } from "@/services/queryKeys";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { AmountInput } from "@/components/ui/AmountInput";
import { CountryDropdown } from "@/components/ui/country-dropdown";

type ProjectDetailsViewProps = {
    project: Project;
};

type ContentTab = "rationale" | "target" | "implementation" | "results" | "sustainability" | "costs" | "budget";

const PRESET_AMOUNTS = [200, 100, 50, 10];

export function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
    const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<ContentTab>("rationale");
    const [selectedAmount, setSelectedAmount] = useState<number>(200);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const favorites = useAppSelector((state) => state.favorites.favorites);
    const dispatch = useAppDispatch();
    const [favoriteBursts, setFavoriteBursts] = useState<Record<string, boolean>>({});

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

    const handleCountryChange = (country: { name: string }) => {
        setSelectedCountry(country.name);
    };

    const handleDonate = () => {
        const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
        if (amount > 0) {
            setIsDonationDialogOpen(true);
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

    const tabs: { id: ContentTab; label: string }[] = [
        { id: "rationale", label: "مبررات المشروع" },
        { id: "target", label: "الفئة المستهدفة" },
        { id: "implementation", label: "آلية التنفيذ" },
        { id: "results", label: "النتائج المتوقعة" },
        { id: "sustainability", label: "الاستدامة" },
        { id: "costs", label: "تكاليف المشروع" },
        { id: "budget", label: "الميزانية التفصيلية" },
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
            {/* Hero Section with wave background */}
            <section className="relative h-[502px] overflow-hidden bg-white">
                {/* Wave Background */}
                <div className="absolute inset-0">
                    <svg
                        className="absolute w-full h-auto top-0 left-0"
                        viewBox="0 0 1920 639"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M-2290 167.108C-1534 -109.892 -778 -109.892 -22 167.108C734 444.108 1490 444.108 2246 167.108V638.108H-2290V167.108Z"
                            fill="url(#paint0_linear)"
                            fillOpacity="0.1"
                        />
                        <defs>
                            <linearGradient id="paint0_linear" x1="0" y1="0" x2="0" y2="1">
                                <stop stopColor="#007F5E" />
                                <stop offset="1" stopColor="#007F5E" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <Container className="relative z-10 flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-center pt-16">
                        <div className="flex items-center gap-2">
                            <p className="font-['Playpen_Sans_Arabic',sans-serif] text-[20px] leading-[1.5] text-[#B4BB5F]">
                                تبرعك اليوم يصنع أثرًا لا يُنسى
                            </p>
                            <div className="relative h-7 w-7">
                                <Image
                                    src="/emojis/hand_healtcare.svg"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <h1 className="font-alexandria text-[58px] font-semibold leading-[1.6] text-[#0D0D0D]">
                            تفاصيل المشروع
                        </h1>
                        <div className="flex items-center gap-2.5 text-[#B4BB5F] text-[20px]">
                            <Link href="/" className="hover:underline font-['Playpen_Sans_Arabic',sans-serif] leading-[1.5]">
                                الرئيسية
                            </Link>
                            <div className="relative h-6 w-6 rotate-[270deg]">
                                <Image
                                    src="/emojis/iconamoon_arrow-up-2-duotone.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                            </div>
                            <Link href="/projects" className="hover:underline font-['Playpen_Sans_Arabic',sans-serif] leading-[1.5]">
                                آخر مشاريعنا
                            </Link>
                            <div className="relative h-6 w-6 rotate-[270deg]">
                                <Image
                                    src="/emojis/iconamoon_arrow-up-2-duotone.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-['Playpen_Sans_Arabic',sans-serif] leading-[1.5]">{project.title}</span>
                        </div>
                    </div>
                </Container>
            </section>

            {/* About Section */}
            <section className="py-16 md:py-24">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
                        {/* Main Content - Left side in RTL */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-col gap-10">
                                {/* Title and Description */}
                                <div className="flex flex-col gap-5 items-start text-start">
                                    <h2 className="font-alexandria text-[30px] font-bold leading-[normal]">
                                        <span className="text-[#0D0D0D]">حفر 5 </span>
                                        <span className="text-[#007F5E]">آبار مياه </span>
                                        <span className="text-[#0D0D0D]">في شمال غزة</span>
                                    </h2>
                                    <p className="font-alexandria text-[20px] leading-[1.5] text-[rgba(13,13,13,0.7)] max-w-[801px]">
                                        يمثل مشروع حفر آبار المياه في شمال غزة استجابة عاجلة وضرورية لتأمين مصدر حياة أساسي لآلاف الأسر التي تعاني من العطش ونقص المياه
                                    </p>
                                </div>

                        {/* Project Image with Stats Overlay */}
                        <div className="relative h-[700px] w-full overflow-hidden rounded-[20px] bg-zinc-200">
                            {/* Placeholder Image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-black/50 to-black/70">
                                <span className="font-molle text-[36px] text-white">
                                    Donate image
                                </span>
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
                                <div className="relative h-[70px] w-[70px] rounded-full bg-white flex items-center justify-center">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 10L30 20L15 30V10Z"
                                            fill="#007F5E"
                                        />
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
                                                    {donors} متبرع
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="relative h-2 w-[759px] overflow-hidden rounded-[10px] bg-[rgba(217,217,217,0.4)]">
                                            <div
                                                className="absolute top-0 right-0 h-full rounded-[10px] bg-[#007F5E] transition-all duration-1000"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                                                        <button
                                        onClick={() => setIsDonationDialogOpen(true)}
                                        className="bg-[#007F5E] flex gap-2.5 items-center px-8 py-4 rounded-[35px] text-white hover:bg-[#056A4F] transition-colors"
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
                        </div>

                        {/* Content Tabs */}
                        <div className="bg-white/10 border border-[rgba(0,127,94,0.1)] rounded-[20px] p-4 shadow-[0px_0px_17.3px_rgba(0,127,94,0.07)]">
                            <div className="flex flex-wrap gap-4 items-center justify-start">
                                <div className="flex items-center justify-start w-full md:w-auto">
                                    <p className="font-alexandria text-[20px] font-medium text-[#323234]">
                                        محتويات
                                    </p>
                                </div>
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-3 py-2.5 rounded-[12px] border border-[#f0f1f2] font-alexandria text-[16px] leading-[1.5] transition-all ${
                                            activeTab === tab.id
                                                ? "bg-[rgba(0,127,94,0.1)] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] font-medium text-[#232325]"
                                                : "bg-transparent text-[#232325] font-normal"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col gap-10">
                            {/* Rationale Section (Default) */}
                            {activeTab === "rationale" && (
                                <div className="flex flex-col gap-4 items-start">
                                    <div className="flex items-center gap-2.5 w-full justify-start">
                                        <h3 className="font-alexandria text-[24px] font-semibold text-[#232325]">
                                            مبررات المشروع
                                        </h3>
                                        <div className="relative h-8 w-8">
                                            <Image
                                                src="/figma/game-icons_space-needle.svg"
                                                alt=""
                                                width={32}
                                                height={32}
                                                className="h-8 w-8 object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-5 text-start max-w-[912px]">
                                        <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52]">
                                            أدت الحرب المستمرة في غزة إلى تدمير واسع لشبكات المياه وانقطاعها عن آلاف العائلات، خصوصاً في شمال القطاع الذي يعاني من النزوح الكبير وتكدس السكان في مناطق محدودة. هذا الواقع جعل شبكات المياه المتبقية غير كافية لتلبية احتياجات الناس اليومية من مياه الشرب والاستخدام المنزلي، إضافة إلى تلوث مصادر المياه البديلة.
                                        </p>
                                        <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52]">
                                            في ظل هذا النقص الحاد، باتت الحاجة إلى حلول مستدامة وفعالة لتوفير مياه نقية وملائمة للشرب أمراً ملحاً. ويُعتبر حفر آبار مياه عميقة وتزويدها بمولدات كهربائية وخزانات تخزين خطوة جوهرية للتخفيف من أزمة العطش وضمان استمرار الحياة بكرامة.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Image with Quote Card */}
                            <div className="relative h-[410px] w-full overflow-hidden rounded-[20px]">
                                <div className="absolute inset-0 bg-white opacity-90" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-molle text-center text-[32px] font-normal text-white">
                                        Donate image
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#2e7c5a] to-transparent" />
                                
                                {/* Quote Card */}
                                <div className="absolute left-[29px] top-1/2 -translate-y-1/2 w-[528px]">
                                    <div className="bg-white border-[0.75px] border-[rgba(0,0,0,0.2)] rounded-[20px] p-4 flex flex-col gap-5 items-end relative overflow-hidden">
                                        <div className="flex items-center justify-center rotate-180">
                                            <div className="relative h-10 w-10">
                                                <Image
                                                    src="/figma/iconamoon_arrow-up-2-fill.svg"
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    className="h-10 w-10 object-contain"
                                                />
                                            </div>
                                        </div>
                                        <p className="font-alexandria text-[20px] font-medium leading-[1.5] text-[#232325] text-justify relative z-10">
                                            لنحذر جميعا كل الحذر من خذلان إخواننا وعدم التفاعل معهم ونصرتهم ومساندتهم، فخذلان المسلمين سبب لخذلان الله للعبد، فلا ينبغي لقادر أن يتأخر عن نجدة إخوانه وإغاثتهم وتخفيف آلامهم
                                        </p>
                                        {/* Background logo */}
                                        <div className="absolute left-[-47.46px] top-[67.11px] h-[319.489px] w-[286.272px] opacity-10">
                                            <Image
                                                src="/brand/3 4.png"
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsDonationDialogOpen(true)}
                                        className="mt-6 bg-[#007F5E] flex gap-2.5 items-center justify-center px-8 py-4 rounded-[35px] text-white hover:bg-[#056A4F] transition-colors"
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
                            <div className="flex flex-col gap-5 items-start text-start">
                                <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52]">
                                    يمثل مشروع حفر آبار المياه في شمال غزة استجابة عاجلة وضرورية لتأمين مصدر حياة أساسي لآلاف الأسر التي تعاني من العطش ونقص المياه. هذه الآبار ستوفر يومياً آلاف اللترات من المياه النقية، لتروي عطش الأطفال، وتدعم صحة النساء الحوامل وكبار السن، وتعيد للناس جزءاً من كرامتهم المفقودة وسط ظروف الحرب القاسية.
                                </p>
                                <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52]">
                                    إن مساهمتكم في هذا المشروع ليست مجرد تبرع مالي، بل هي شريان حياة يصل إلى قلوب وأفواه عطشى، واستثمار مباشر في بقاء الناس وصحتهم في غزة.
                                </p>
                                <div className="flex items-center gap-2.5 w-full justify-start">
                                    <div className="relative h-8 w-8">
                                        <Image
                                            src="/figma/donation-svgrepo-com 1.svg"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="h-8 w-8 object-contain"
                                        />
                                    </div>
                                    <p className="font-alexandria text-[16px] leading-[1.5] text-[#4f4f52]">
                                        ساهم اليوم في حفر بئر مياه ينقذ حياة الآلاف، ويمنحهم الأمل في غد أفضل.
                                    </p>
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Donation Form Section */}
            <section className="py-16 md:py-24 relative">
                <Container>
                    <div className="relative rounded-[20px] p-8 md:p-12 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none">
                            <Image
                                src="/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg"
                                alt=""
                                fill
                                className="object-cover object-center"
                            />
                        </div>

                        {/* Left Corner Decoration */}
                        <div className="absolute left-[-100px] top-[-80px] w-[400px] h-[600px] pointer-events-none opacity-100 z-0">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/peigeCorners1.png"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Right Corner Decoration */}
                        <div className="absolute right-[-100px] top-[-80px] w-[400px] h-[600px] pointer-events-none opacity-100 z-0">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/peigeCorners2.png"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex flex-col gap-6 items-center">
                            <div className="flex items-center gap-2.5">
                                <p className="font-alexandria text-[24px] font-semibold text-[#232325]">
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
                            <p className="font-alexandria text-[16px] leading-loose text-[#4f4f52] text-center max-w-200 hidden md:block">
                                جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
                            </p>
                            {/* Donation Form Card */}
                            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[20px] shadow-[0px_5px_12px_0px_rgba(0,127,94,0.07)] px-4 md:px-8 py-6 md:py-4 w-full relative z-10 max-w-[617.78px]">
                              {/* Background texture for mobile */}
                              <div className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-[20px] md:hidden">
                                <Image
                                  src="/images/7363d45c2da79e778f88045823a4c2479c8c599f.png"
                                  alt=""
                                  fill
                                  className="object-cover rounded-[20px]"
                                />
                              </div>

                              <div className="flex flex-col gap-6 items-center w-full relative z-10">
                                {/* Mobile: Section title */}
                                <div className="flex items-center justify-center gap-[10px] w-full md:hidden mb-2">
                                  <p className="font-alexandria text-[20px] font-bold leading-normal text-[#232325] text-right">
                                    كم تريد التبرع اليوم
                                  </p>
                                  <div className="relative h-8 w-8">
                                    <Image
                                      src="/emojis/hand_healtcare.svg"
                                      alt=""
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                </div>

                                {/* Mobile: Description */}
                                <p className="font-alexandria text-sm text-[#4f4f52] text-center leading-loose px-4 md:hidden mb-4">
                                  جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا
                                </p>

                                {/* Amount selection */}
                                <div className="flex flex-col gap-4 items-start w-full">
                                  <div className="flex flex-col items-end w-full">
                                    <p className="font-alexandria text-base md:text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                                      حدد المبلغ
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center sm:gap-4 gap-3 w-full" dir="rtl">
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
                                            "flex items-center justify-center rounded-[20px] transition-all w-full sm:w-28.75",
                                            isActive
                                              ? "h-12 sm:h-[60px] border border-[#007F5E] bg-[rgba(0,127,94,0.1)]"
                                              : "h-12 sm:h-[60px] border border-[rgba(13,13,13,0.2)] px-4 hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]",
                                          ].join(" ")}
                                        >
                                          <p className="font-alexandria text-sm md:text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                                            $ {amount}
                                          </p>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Custom amount */}
                                <div className="flex flex-col gap-4 items-start w-full">
                                  <div className="flex flex-col items-end w-full">
                                    <p className="font-alexandria text-base md:text-[18px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-right tracking-[-0.18px] w-full">
                                      مبلغ مخصص
                                    </p>
                                  </div>
                                  <AmountInput
                                    placeholder="أدخل القيمة"
                                    value={customAmount}
                                    onChange={(e) => {
                                      setCustomAmount(e.target.value);
                                      if (e.target.value) setSelectedAmount(0);
                                    }}
                                    className="h-12 sm:h-[60px] w-full"
                                  />
                                </div>

                                {/* Country selector */}
                                <div className="flex gap-4 h-auto sm:h-[81px] items-center justify-start w-full" dir="rtl">
                                  <p className="font-alexandria text-base md:text-[18px] font-medium leading-normal text-[#122F2A] text-center text-nowrap">
                                    الدولة
                                  </p>
                                  <div className="flex-1">
                                    <CountryDropdown
                                      onChange={handleCountryChange}
                                      defaultValue={selectedCountry || "Palestine"}
                                      placeholder="فلسطين"
                                      dir="rtl"
                                    />
                                  </div>
                                </div>

                                {/* Donate button */}
                                <button
                                  type="button"
                                  onClick={handleDonate}
                                  className="bg-[#007F5E] flex gap-[10px] items-center justify-center px-8 py-4 rounded-[35px] w-full hover:bg-[#005F4A] transition-colors"
                                >
                                  <Image
                                    src="/figma/mingcute_love-fill.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="h-6 w-6"
                                  />
                                  <p className="font-alexandria text-sm md:text-[16px] font-semibold leading-normal text-white text-nowrap">
                                    تبرع الان
                                  </p>
                                </button>

                                {/* Security text */}
                                <p className="font-alexandria text-xs sm:text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] text-center">
                                  معاملة مشفرة آمنة بتقنية SSL
                                </p>
                              </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Similar Projects Section */}
            {similarProjects.length > 0 && (
                <section className="py-16 md:py-24 bg-[rgba(244,244,244,0.5)]">
                    <Container>
                        <div className="flex flex-col gap-12">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => window.location.href = '/projects'}
                                    className="bg-[#007F5E] flex gap-2.5 items-center justify-center px-8 py-4 rounded-[35px] text-white hover:bg-[#056A4F] transition-colors"
                                >
                                    <div className="relative h-5 w-5 rotate-90 scale-y-[-100%]">
                                        <Image
                                            src="/figma/line-md_arrow-up.svg"
                                            alt=""
                                            width={20}
                                            height={20}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="font-alexandria text-[16px] font-bold leading-[1.5]">
                                        مشاهدة المزيد
                                    </span>
                                </button>
                                <div className="flex flex-col gap-2.5 items-start">
                                    <div className="flex items-center gap-2">
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
                                    <h2 className="font-alexandria text-[30px] font-semibold leading-[normal] text-[#232325]">
                                        مشاريع مشابهة
                                    </h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]">
                                {similarProjects.map((proj) => (
                                    <ProjectCard
                                        key={proj.id}
                                        project={proj}
                                        isFav={!!favorites[proj.id]}
                                        isBursting={!!favoriteBursts[proj.id]}
                                        onToggleFavorite={handleToggleFavoriteCard}
                                        onDonate={() => setIsDonationDialogOpen(true)}
                                    />
                                ))}
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
