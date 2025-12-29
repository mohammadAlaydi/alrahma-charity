import Link from "next/link";
import Image from "next/image";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  subtitleIcon?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({ title, subtitle, subtitleIcon, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="flex w-full md:w-[341px] flex-col items-center md:items-end" dir="rtl">
      {/* Frame 15 - Subtitle with icon (271x30) - aligned to right */}
      {subtitle && (
        <div className="mb-2 md:mb-4 flex h-[30px] items-center gap-[5px] whitespace-nowrap justify-center md:justify-end">
          <p className="font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif] text-base md:text-[20px] font-normal leading-[1.5] text-[#B4BB5F] text-right whitespace-nowrap order-2 md:order-1">
            {subtitle}
          </p>
          <div className="flex h-5 w-5 md:h-7 md:w-7 shrink-0 items-center justify-center order-1 md:order-2">
            <Image src={subtitleIcon || ""} alt="" width={28} height={28} className="h-5 w-5 md:h-7 md:w-7" />
          </div>
        </div>
      )}

      {/* Main title - aligned to right */}
      <h1 className="font-['Alexandria',var(--font-alexandria),sans-serif] text-[32px] md:text-[58px] font-semibold leading-tight md:leading-[1.6] text-[#0D0D0D] flex h-auto md:h-[93px] w-full items-center justify-center md:justify-end text-center md:text-right">
        {title}
      </h1>

      {/* Frame 17 - Breadcrumbs - aligned to right */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mt-2 flex h-[30px] items-center gap-[10px] justify-center md:justify-end">
          <div className="flex items-center gap-[5px]">
            <div className="flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center">
              <Image
                src="/emojis/color_home-to-cloud-sync.svg"
                alt=""
                width={24}
                height={24}
                className="h-5 w-5 md:h-6 md:w-6"
              />
            </div>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-[5px]">
                <Link
                  href={crumb.href}
                  className="font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif] text-base md:text-[20px] font-normal leading-[1.5] text-[#B4BB5F] text-right whitespace-nowrap hover:underline"
                >
                  {crumb.label}
                </Link>
                {/* Add arrow between items (except after the last one) */}
                {index < breadcrumbs.length - 1 && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                    <Image
                      src="/emojis/left arrow.svg"
                      alt=""
                      width={7}
                      height={12}
                      className="h-3 w-[7px]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
