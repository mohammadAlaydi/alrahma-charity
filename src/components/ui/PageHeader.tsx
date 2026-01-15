import Link from "next/link";
import Image from "next/image";
import { WhatsAppButton } from "./WhatsAppButton";

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
    <div className="relative flex w-full md:w-[760px] flex-col items-center" dir="rtl">
      {/* WhatsApp Button for mobile/tablet - positioned to the right of the header */}
      <div className="absolute -right-0 top-0 md:-right-8 lg:hidden">
        <WhatsAppButton variant="header" />
      </div>

      {/* Frame 15 - Subtitle with icon (271x30) - centered */}
      {subtitle && (
        <div className="mb-2 md:mb-3 flex h-[28px] items-center gap-[5px] whitespace-nowrap justify-center">
          <span aria-hidden="true" className="relative h-5 w-5 md:h-6 md:w-6 shrink-0 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6">
              <path d="M4.66663 16.3334H7.46079C7.80379 16.3334 8.14213 16.4104 8.44896 16.5597L10.8313 17.7124C11.1381 17.8605 11.4765 17.9375 11.8206 17.9375H13.0363C14.2123 17.9375 15.1666 18.8604 15.1666 19.999C15.1666 20.0457 15.1351 20.0854 15.0896 20.0982L12.1251 20.9184C11.5932 21.0653 11.026 21.0139 10.5291 20.7737L7.98229 19.5417M9.79529 2.97736C11.515 1.91102 13.0176 2.34036 13.9195 3.02519C14.2893 3.30519 14.4748 3.44519 14.5833 3.44519C14.6918 3.44519 14.8773 3.30519 15.2471 3.02519C16.149 2.34036 17.6505 1.91102 19.3713 2.97736C21.63 4.37736 22.141 8.99269 16.933 12.887C15.9401 13.629 15.4443 14 14.5833 14C13.7223 14 13.2265 13.629 12.2348 12.887C7.02563 8.99269 7.53663 4.37619 9.79529 2.97736Z" stroke="#B4BB5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.1666 19.25L20.5251 17.6039C20.9916 17.4607 21.4914 17.4686 21.9532 17.6264C22.4149 17.7841 22.8151 18.0837 23.0965 18.4824C23.527 19.0774 23.352 19.9314 22.7243 20.293L13.9568 25.3529C13.6826 25.5115 13.3791 25.6126 13.0646 25.6501C12.7501 25.6876 12.4312 25.6607 12.1275 25.571L4.66663 23.3567" stroke="#B4BB5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <p className="font-['Playpen_Sans_Arabic',var(--font-cairo),sans-serif] text-[20px] font-normal leading-[1.5] text-[#B4BB5F] text-center whitespace-nowrap">
            {subtitle}
          </p>
        </div>
      )}

      {/* Main title - centered */}
      <h1 className="font-alexandria text-[50px] font-semibold leading-[1.6] text-[#0D0D0D] flex h-auto w-full items-center justify-center text-center">
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
                  className="font-alexandria text-sm md:text-[18px] font-normal leading-[1.5] text-[#B4BB5F] text-center whitespace-nowrap hover:underline"
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
