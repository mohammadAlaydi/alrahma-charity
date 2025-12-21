export function AccountSettingsHeader() {
  return (
    <div className="flex w-full max-w-[481px] flex-col gap-2 text-right" dir="rtl">
      {/* Frame 15 - Horizontal layout with heading */}
      <div className="flex w-[275px] items-center gap-[5px]">
        <h2 className="text-right text-[20px] leading-[30px] font-normal text-[#B4BB5F]">
          تعديل إعدادات ومعلومات الحساب
        </h2>
      </div>

      {/* Personal Information text */}
      <h1 className="w-full text-right text-[32px] leading-[48px] font-normal text-[#0D0D0D]">
        المعلومات الشخصية
      </h1>
    </div>
  );
}
