import Image from "next/image";

type DonationChipId =
  | "water"
  | "aqiqah"
  | "nadhr"
  | "purification"
  | "sadaqah-jariyah"
  | "relieve"
  | "clothe"
  | "pay-harm"
  | "debtors"
  | "expiation"
  | "feed";

type DonationChip = { id: DonationChipId; label: string; active?: boolean };

const CHIPS: DonationChip[] = [
  { id: "water", label: "سقيا الماء" },
  { id: "aqiqah", label: "عقائق" },
  { id: "nadhr", label: "النذر" },
  { id: "purification", label: " تطهير مال وأسهم", active: true },
  { id: "relieve", label: "تفريج كربة" },
  { id: "sadaqah-jariyah", label: "صدقة جارية" },
  { id: "clothe", label: "كسوة مسكين" },
  { id: "pay-harm", label: "دفع بلاء" },
  { id: "debtors", label: "الغارمين" },
  { id: "expiation", label: "كفارة يمين" },
  { id: "feed", label: "إطعام مسكين" },
];

type AmountPreset = { amount: number; active?: boolean };
const PRESETS: AmountPreset[] = [
  { amount: 200, active: true },
  { amount: 100 },
  { amount: 50 },
  { amount: 10 },
];

export function ZakatPageContent() {
  return (
    <section className="w-full bg-white px-[320px] py-[100px]" dir="rtl">
      <div className="flex w-full items-start justify-between">
        {/* Right content column (first in DOM so it appears on the RIGHT in RTL flex layout) */}
        <div className="flex min-h-[1070.72px] w-full max-w-[736px] flex-col items-end gap-6">
          <div className="flex w-[575px] flex-col items-end gap-2">
            {/* Subtitle + icon */}
            <div className="flex items-center justify-center gap-[5px]">
              <p className="text-[16px] leading-[1.5] text-[#007F5E] [font-family:'Playpen_Sans_Arabic',var(--font-cairo),sans-serif]">
                صدقة اليوم… أمان لغدهم
              </p>
              <span aria-hidden="true" className="relative h-6 w-6 overflow-hidden">
                <Image src="/figma/hugeicons-healthcare.svg" alt="" width={24} height={24} />
              </span>
            </div>

            {/* Title */}
            <p className="text-center text-[30px] font-bold leading-[1.6] text-[#0D0D0D] font-alexandria">
              <span>{`الصدقة الجارية `}</span>
              <span className="text-[#007F5E]">هي</span>
            </p>

            {/* Paragraph */}
            <p className="w-full text-right text-[16px] font-normal leading-[1.6] text-[rgba(13,13,13,0.7)] font-alexandria">
              الصدقة التي يستمر ثوابها حتى عند الموت وهو ما يسعى له الكثير من المسلمين بإقامة مشروع
              صدقة جارية حتى تكون شفيعة له عند الله وتكون في ميزان حسناته ويستمر ثوابها حتى بعد
              الموت. وقد أكد الرسول صلى الله عليه وسلم على فضل الصدقة الجارية في السنة النبوية
              الشريفة فهناك حديث عن أبي هريرة رضي الله عنه قال رسول الله صلى الله عليه وسلم
              <br />
              (إذا مات الإنسان أنقطع عمله إلا من ثلاث، صدقة جارية، أو علم ينتفع به أو ولد صالح يدعو
              له).
            </p>
          </div>

          {/* Hadith image (provided) */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "736/426.746" }}>
            <Image src="/hadeeth.png" alt="" fill className="object-contain" priority />
          </div>

          <p className="text-center text-[20px] font-medium leading-[1.6] text-[#0D0D0D] font-alexandria">
            كم تريد التبرع اليوم
          </p>

          {/* Chips grid (match Figma: inline-grid, 4 columns, 8px gap, 148px height) */}
          <div className="inline-grid h-[148px] grid-cols-4 gap-2">
            {CHIPS.map((chip) => (
              <div
                key={chip.id}
                className={[
                  "flex items-center justify-center rounded-[20px] border p-[10px]",
                  chip.active
                    ? "border-[#007F5E] bg-[#007F5E] text-white"
                    : "border-black bg-white text-[#122F2A]",
                ].join(" ")}
              >
                <p className="text-center text-[16px] font-medium leading-[1.5] font-alexandria">
                  {chip.label}
                </p>
              </div>
            ))}
          </div>

          {/* Amount + custom amount + CTA */}
          <div className="flex w-full flex-col items-end gap-6">
            <div className="flex w-full flex-col items-start gap-4">
              {/* Amount label */}
              <div className="flex w-full flex-col items-end">
                <p className="w-full text-right text-[18px] font-normal tracking-[-0.18px] text-[rgba(13,13,13,0.7)] font-alexandria">
                  حدد المبلغ
                </p>
              </div>

              {/* Presets row */}
              <div className="flex w-full items-center justify-between">
                {PRESETS.map((p) => (
                  <div
                    key={p.amount}
                    className="flex h-[60px] w-[115px] items-center justify-center rounded-[20px] border border-[rgba(13,13,13,0.2)] px-4"
                  >
                    {p.active ? (
                      <div className="flex h-[57px] w-[110px] items-center justify-center rounded-[20px] border border-[#007F5E] bg-[rgba(0,127,94,0.1)]">
                        <p className="text-[16px] font-normal leading-[normal] text-[rgba(13,13,13,0.7)] font-alexandria">
                          $ {p.amount}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[16px] font-normal leading-[normal] text-[rgba(13,13,13,0.7)] font-alexandria">
                        $ {p.amount}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Custom amount label */}
              <div className="flex w-full flex-col items-end">
                <p className="w-full text-right text-[18px] font-normal tracking-[-0.18px] text-[rgba(13,13,13,0.7)] font-alexandria">
                  مبلغ مخصص
                </p>
              </div>

              {/* Custom amount input (Figma 60px height, 20px radius) */}
              <div className="flex h-[60px] w-full items-center justify-end rounded-[20px]">
                <div className="flex h-full w-full items-center justify-end gap-[10px] rounded-[20px] border border-[rgba(13,13,13,0.2)]">
                  <div className="flex h-full items-center justify-center px-4">
                    <span className="text-[16px] font-light leading-[normal] text-[rgba(13,13,13,0.7)] opacity-[0.67] font-alexandria">
                      أدخل القيمة
                    </span>
                  </div>
                  <div className="flex h-full items-center justify-center px-4">
                    <span className="w-full text-[24px] font-light leading-[normal] text-[rgba(13,13,13,0.7)] font-alexandria">
                      $
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="flex items-center justify-center gap-[10px] rounded-[35px] bg-[#007F5E] px-8 py-4"
            >
              <span aria-hidden="true" className="relative h-6 w-6 overflow-hidden">
                <Image src="/figma/mingcute-love-fill.svg" alt="" width={24} height={24} />
              </span>
              <span className="text-[16px] font-bold leading-[1.5] text-white font-alexandria">
                تبرع الأن
              </span>
            </button>
          </div>
        </div>

        {/* Left image (second in DOM so it appears on the LEFT in RTL flex layout) */}
        <div className="relative h-[1070.72px] w-[696.51px] shrink-0 overflow-hidden rounded-[352.749px]">
          <Image
            src="/sadaqah-jarya.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}


