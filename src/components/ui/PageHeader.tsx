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
    <div className="flex w-[341px] flex-col" dir="rtl">
      {/* Frame 15 - Subtitle with icon (271x30) - positioned at x=35 */}
      {subtitle && (
        <div className="mx-auto mr-[35px] mb-4 flex h-[30px] items-center gap-[5px] whitespace-nowrap">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center">
            <Image src={subtitleIcon || ""} alt="" width={28} height={28} className="h-7 w-7" />
          </div>
          <h2 className="hero-subtitle text-right whitespace-nowrap">{subtitle}</h2>
        </div>
      )}

      {/* Main title - 341x93 - full width */}
      <h1 className="hero-title flex h-[93px] w-full items-center justify-center text-center">
        {title}
      </h1>

      {/* Frame 17 - Breadcrumbs (235x30) - positioned at x=53 */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mx-auto mt-2 mr-[53px] flex h-[30px] w-[235px] items-center gap-[10px]">
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
                <Link href={crumb.href} className="breadcrumb-text text-right hover:underline">
                  {crumb.label}
                </Link>
                {index === 0 && breadcrumbs.length > 1 && (
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
