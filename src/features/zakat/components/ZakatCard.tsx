import Image from "next/image";
import { CountryDropdown, type Country } from "@/components/ui/country-dropdown";

interface ZakatCardProps {
  title: string;
  iconSrc: string;
  amount: string;
  onAmountChange: (value: string) => void;
  onCountryChange: (country: Country) => void;
  onPay: () => void;
}

export function ZakatCard({
  title,
  iconSrc,
  amount,
  onAmountChange,
  onCountryChange,
  onPay,
}: ZakatCardProps) {
  return (
    <div className="bg-white flex h-[130px] items-center justify-between px-[31px] py-[25px] relative rounded-[20px] shadow-[0px_19px_29px_0px_rgba(0,127,94,0.14)] w-full">
      {/* Title & Icon (First) */}
      <div className="flex gap-[16px] items-center justify-start w-[284px]">
        <div className="bg-[rgba(223,211,131,0.2)] flex items-center justify-center rounded-[53px] size-[80px]">
          <div className="relative size-[54px]">
            <Image src={iconSrc} alt={title} fill className="object-contain" />
          </div>
        </div>
        <p className="font-alexandria font-bold text-[#122f2a] text-[20px] text-right whitespace-nowrap">
          {title}
        </p>
      </div>

      {/* Country Dropdown Group */}
      <div className="flex gap-[16px] h-[80px] items-center justify-start w-[287px]">
        <p className="font-alexandria font-medium text-[#122f2a] text-[18px] text-center whitespace-nowrap min-w-[49px]">
          الدولة
        </p>
        <div className="flex-1">
          <CountryDropdown
            onChange={onCountryChange}
            placeholder="فلسطين"
            defaultValue="Palestine"
          />
        </div>
      </div>

      {/* Amount Input Group */}
      <div className="flex gap-[16px] h-[80px] items-center justify-start w-[287px]">
        <p className="font-alexandria font-medium text-[#122f2a] text-[18px] text-center whitespace-nowrap min-w-[93px]">
          قيمة الزكاة
        </p>
        <div className="flex-1">
          <div className="relative h-[54px] w-full rounded-[10px] border-[0.5px] border-[rgba(0,0,0,0.2)] bg-white px-0 py-[10px]">
            <input
              type="text"
              inputMode="decimal"
              placeholder="ادخل قيمة الزكاة"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              className="h-full w-full bg-transparent text-center font-alexandria font-light text-[16px] text-[rgba(13,13,13,0.7)] placeholder:opacity-[0.49] placeholder:text-[rgba(13,13,13,0.7)] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Action Button (Last) */}
      <div className="flex items-center justify-center">
        <button
          onClick={onPay}
          className="bg-[#007f5e] flex gap-[10px] items-center justify-center px-[32px] py-[16px] rounded-[20px] hover:bg-[#00664b] transition-colors"
        >
          <div className="relative size-[24px]">
            <Image src="/figma/mingcute_love-fill.svg" alt="" width={24} height={24} />
          </div>
          <span className="font-alexandria font-semibold text-[16px] text-white whitespace-nowrap">
            ادفع زكاتك
          </span>
        </button>
      </div>
    </div>
  );
}
