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
    <div className="flex w-full max-w-[341px] flex-col gap-2 text-right" dir="rtl">
      {/* Frame 15 - Heading with icon (icon before text in RTL) */}
      {subtitle && (
        <div className="flex w-[271px] items-center gap-[5px]">
          {subtitleIcon && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center">
              <Image src={subtitleIcon} alt="" width={28} height={28} className="h-7 w-7" />
            </div>
          )}
          <h2 className="text-right text-[20px] leading-[30px] font-normal text-[#B4BB5F]">
            {subtitle}
          </h2>
        </div>
      )}

      {/* Main text - larger heading */}
      <h1 className="font-alexandria w-full text-center text-[58px] leading-[58px] font-semibold text-[#0D0D0D]">
        {title}
      </h1>

      {/* Frame 16 - Breadcrumb navigation (centered) */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mx-auto flex w-[214px] items-center gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center">
              <Image
                src="/emojis/color_home-to-cloud-sync.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-[5px]">
                <Link
                  href={crumb.href}
                  className="text-right text-[16px] leading-[30px] font-normal text-[#B4BB5F] hover:underline"
                >
                  {crumb.label}
                </Link>
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
