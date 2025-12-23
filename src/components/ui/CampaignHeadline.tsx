import Image from "next/image";

interface CampaignHeadlineProps {
  showIcon?: boolean;
  className?: string;
}

export function CampaignHeadline({ showIcon = true, className = "" }: CampaignHeadlineProps) {
  return (
    <div className={`flex items-center gap-[5px] ${className}`}>
      {showIcon && (
        <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center">
          <Image
            src="/emojis/hand_healtcare.svg"
            alt="الرعاية الصحية"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </span>
      )}
      <p className="font-playpen-sans text-[16px] leading-6 font-normal text-[#007F5E]">
        أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
      </p>
    </div>
  );
}
