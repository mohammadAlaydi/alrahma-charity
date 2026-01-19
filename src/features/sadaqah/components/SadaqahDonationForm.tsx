import { TextInput } from "@/components/ui/TextInput";

export function SadaqahDonationForm() {
  return (
    <aside dir="rtl" className="rounded-[20px] border border-black/10 bg-white p-6">
      <p className="section-title-primary">تبرع سريع</p>
      <h3 className="mt-2 font-alexandria text-[22px] font-semibold leading-[1.6] text-alrahma-dark">
        اجعلها صدقة جارية
      </h3>
      <p className="mt-2 text-[14px] leading-[1.8] text-alrahma-paragraph">
        أدخل بيانات بسيطة وسنوجّه تبرعك للمجال الأنسب أو حسب اختيارك.
      </p>

      <form className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block font-alexandria text-[14px] font-medium text-alrahma-dark">
            مبلغ التبرع
          </label>
          <TextInput inputMode="decimal" placeholder="مثال: 100" />
        </div>

        <div>
          <label className="mb-2 block font-alexandria text-[14px] font-medium text-alrahma-dark">
            الاسم (اختياري)
          </label>
          <TextInput placeholder="اكتب اسمك" />
        </div>

        <div>
          <label className="mb-2 block font-alexandria text-[14px] font-medium text-alrahma-dark">
            رقم الهاتف (اختياري)
          </label>
          <TextInput inputMode="tel" placeholder="05xxxxxxxx" />
        </div>

        <button
          type="button"
          className="card-button inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-alrahma-primary text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alrahma-primary/40"
        >
          تبرع الآن
        </button>
      </form>
    </aside>
  );
}


