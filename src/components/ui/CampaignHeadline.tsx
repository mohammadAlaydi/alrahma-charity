import Image from "next/image";

interface CampaignHeadlineProps {
  showIcon?: boolean;
  className?: string;
}

export function CampaignHeadline({ showIcon = true, className = "" }: CampaignHeadlineProps) {
  return (
    <div className={`flex h-6 items-center gap-[5px] ${className}`} dir="rtl">
      <p className="section-title-primary">أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل</p>
      {showIcon && (
        <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center">
          <Image
            src="/emojis/hand_healtcare.svg"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </span>
      )}
    </div>
  );
}
