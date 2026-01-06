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
    <div className="flex w-full md:w-[320px] flex-col items-center" dir="rtl">
      {/* Frame 15 - Subtitle with icon (271x30) - centered */}
      {subtitle && (
        <div className="mb-2 md:mb-3 flex h-[28px] items-center gap-[5px] whitespace-nowrap justify-center">
          <div className="flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center">
            <Image src={subtitleIcon || ""} alt="" width={24} height={24} className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <p className="font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif] text-sm md:text-[18px] font-normal leading-[1.5] text-[#B4BB5F] text-center whitespace-nowrap">
            {subtitle}
          </p>
        </div>
      )}

      {/* Main title - centered */}
      <h1 className="font-['Alexandria',var(--font-alexandria),sans-serif] text-[28px] md:text-[48px] font-semibold leading-tight md:leading-[1.4] text-[#0D0D0D] flex h-auto md:h-[70px] w-full items-center justify-center text-center">
        {title}
      </h1>

      {/* Frame 17 - Breadcrumbs - centered */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mt-2 flex h-[28px] items-center gap-[8px] justify-center">
          <div className="flex items-center gap-[5px]">
            <div className="flex h-4 w-4 md:h-5 md:w-5 shrink-0 items-center justify-center">
              <Image
                src="/emojis/color_home-to-cloud-sync.svg"
                alt=""
                width={20}
                height={20}
                className="h-4 w-4 md:h-5 md:w-5"
              />
            </div>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-[5px]">
                <Link
                  href={crumb.href}
                  className="font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif] text-sm md:text-[18px] font-normal leading-[1.5] text-[#B4BB5F] text-center whitespace-nowrap hover:underline"
                >
                  {crumb.label}
                </Link>
                {/* Add arrow between items (except after the last one) */}
                {index < breadcrumbs.length - 1 && (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                    <Image
                      src="/emojis/left arrow.svg"
                      alt=""
                      width={6}
                      height={10}
                      className="h-2.5 w-[6px]"
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
