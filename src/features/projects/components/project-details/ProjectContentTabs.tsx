import { useState } from "react";
import Image from "next/image";

type ContentTab = "rationale" | "target" | "implementation" | "results" | "sustainability" | "costs" | "budget";

type ProjectContentTabsProps = {
    onDonateClick: () => void;
};

export function ProjectContentTabs({ onDonateClick }: ProjectContentTabsProps) {
    const [activeTab, setActiveTab] = useState<ContentTab>("rationale");

    const tabs: { id: ContentTab; label: string }[] = [
        { id: "rationale", label: "مبررات المشروع" },
        { id: "target", label: "الفئة المستهدفة" },
        { id: "implementation", label: "آلية التنفيذ" },
        { id: "results", label: "النتائج المتوقعة" },
        { id: "sustainability", label: "الاستدامة" },
        { id: "costs", label: "تكاليف المشروع" },
        { id: "budget", label: "الميزانية التفصيلية" },
    ];

    return (
        <>
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
                            className={`px-3 py-2.5 rounded-[12px] border border-[#f0f1f2] font-alexandria text-[16px] leading-[1.5] transition-all ${activeTab === tab.id
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
                            <div className="relative h-8 w-8">
                                <Image
                                    src="/figma/game-icons_space-needle.svg"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 object-contain"
                                />
                            </div>
                            <h3 className="font-alexandria text-[24px] font-semibold text-[#232325]">
                                مبررات المشروع
                            </h3>
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
                    <div className="absolute inset-0">
                        <Image
                            src="/figma/Image.png"
                            alt=""
                            fill
                            className="object-cover"
                        />
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
                            onClick={onDonateClick}
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
        </>
    );
}
