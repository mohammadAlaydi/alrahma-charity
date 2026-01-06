import Image from "next/image";

interface CampaignHeadlineProps {
  showIcon?: boolean;
  className?: string;
}

export function CampaignHeadline({ showIcon = true, className = "" }: CampaignHeadlineProps) {
  return (
    <div className={`flex h-5 items-center gap-[5px] ${className}`} dir="rtl">
      {showIcon && (
        <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center">
          <Image
            src="/emojis/hand_healtcare.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5  "
          />
        </span>
      )}
      <p className="section-title-primary">أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل</p>
    </div>
  );
}
