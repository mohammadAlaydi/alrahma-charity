import Image from "next/image";

type CharityType = {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
};

const TYPES: CharityType[] = [
  {
    id: "wells",
    title: "حفر الآبار",
    description: "ساهم في توفير الماء الصالح للشرب للأسر المحتاجة.",
    iconSrc: "/globe.svg",
  },
  {
    id: "mosques",
    title: "بناء المساجد",
    description: "صدقة جارية تُعمِّر بيوت الله وتجمع القلوب على الخير.",
    iconSrc: "/window.svg",
  },
  {
    id: "education",
    title: "تعليم الأطفال",
    description: "ادعم التعليم ليكبر الأثر ويستمر النفع.",
    iconSrc: "/education.svg",
  },
  {
    id: "income",
    title: "مشاريع مُدِرّة للدخل",
    description: "ساعد الأسر المتعففة على الاستقلال والاستقرار.",
    iconSrc: "/all-campanes.svg",
  },
];

export function CharityTypesGrid() {
  return (
    <div dir="rtl" className="rounded-[20px] border border-black/10 bg-white p-6">
      <div className="mb-5">
        <p className="section-title-primary">مجالات الصدقة الجارية</p>
        <h3 className="mt-2 font-alexandria text-[22px] font-semibold leading-[1.6] text-alrahma-dark">
          اختر المجال الذي تحب أن يمتد أثره
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {TYPES.map((t) => (
          <div
            key={t.id}
            className="flex h-full flex-col gap-3 rounded-[16px] border border-black/10 bg-white p-4 transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,127,94,0.10)]">
                <Image src={t.iconSrc} alt="" width={20} height={20} className="h-5 w-5" />
              </span>
              <div className="font-alexandria text-[18px] font-semibold text-alrahma-dark">
                {t.title}
              </div>
            </div>
            <p className="text-[14px] leading-[1.8] text-alrahma-paragraph">{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

