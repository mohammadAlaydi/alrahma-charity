import Link from "next/link";
import Image from "next/image";

export interface CategoryBreadcrumbItem {
  label: string;
  href: string;
}

interface CategoryHeaderProps {
  subtitle: string;
  subtitleIcon?: string;
  title: string;
  breadcrumbs?: CategoryBreadcrumbItem[];
}

/**
 * CategoryHeader Component
 * Matches Figma Frame 16 design specifications:
 * - Container: 271x169px, vertical layout, 8px spacing
 * - Subtitle section: 271x30px, horizontal layout, 5px spacing
 * - Main title: positioned at x=30, width=211px, height=93px
 * - Breadcrumb section: 190x30px, horizontal layout, 10px spacing, positioned at x=40.5
 */
export function CategoryHeader({
  subtitle,
  subtitleIcon = "/emojis/hand_healtcare.svg",
  title,
  breadcrumbs,
}: CategoryHeaderProps) {
  return (
    <div className="flex w-[271px] flex-col gap-2" dir="rtl">
      {/* Frame 15 - Subtitle with icon (271x30px, horizontal, 5px gap) */}
      <div className="flex h-[30px] items-center gap-[5px]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center">
          <Image
            src={subtitleIcon}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
          />
        </div>
        <h2 className="hero-subtitle whitespace-nowrap">{subtitle}</h2>
      </div>

      {/* Main title - "صدقات" (211x93px, positioned at x=30) */}
      <h1 className="category-title ml-[30px] h-[93px] w-[211px]">{title}</h1>

      {/* Frame 17 - Breadcrumbs (190x30px, horizontal, 10px gap, positioned at x=40.5) */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="ml-[40.5px] flex h-[30px] w-[190px] items-center gap-[10px]">
          <div className="flex items-center gap-[5px]">
            {/* First breadcrumb item */}
            <Link href={breadcrumbs[0].href} className="breadcrumb-text">
              {breadcrumbs[0].label}
            </Link>
            {/* Arrow icon (rotated for RTL - points left) */}
            {breadcrumbs.length > 1 && (
              <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                <Image
                  src="/emojis/line-md_arrow-up.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 -rotate-90"
                />
              </div>
            )}
            {/* Second breadcrumb item */}
            {breadcrumbs.length > 1 && (
              <Link href={breadcrumbs[1].href} className="breadcrumb-text">
                {breadcrumbs[1].label}
              </Link>
            )}
          </div>
          {/* Home icon */}
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            <Image
              src="/emojis/color_home-to-cloud-sync.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </div>
        </div>
      )}
    </div>
  );
}

