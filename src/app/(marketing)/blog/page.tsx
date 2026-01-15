"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { BlogCard, type BlogPost } from "@/features/blog/components/BlogCard";

// Mock data - في الإنتاج، سيتم جلبها من API
const featuredPosts: BlogPost[] = [
  {
    id: "1",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "2",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "3",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "4",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "5",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "6",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
];

const latestPosts: BlogPost[] = [
  {
    id: "7",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "8",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "9",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "10",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "11",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
  {
    id: "12",
    title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
    excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار...",
    category: "التصنيفات",
    author: "في خضم الأزمات المتتالية التي",
    date: "20 نوفمبر 2025",
  },
];

const POSTS_PER_PAGE = 9; // 3 rows × 3 cards

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredScrollIndex, setFeaturedScrollIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate pagination
  const totalPages = Math.ceil(latestPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = latestPosts.slice(startIndex, endIndex);

  // Calculate total dots needed for featured section (showing 3 cards at a time)
  const totalDots = Math.ceil(featuredPosts.length / 3);

  // Handle scroll to update active dot
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 410 + 24; // card width + gap
      const cardsPerView = 3;
      const currentIndex = Math.round(scrollLeft / (cardWidth * cardsPerView));
      setFeaturedScrollIndex(Math.min(currentIndex, totalDots - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [totalDots]);

  // Handle dot click to scroll to position
  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 410 + 24; // card width + gap
    const cardsPerView = 3;
    const scrollPosition = index * cardWidth * cardsPerView;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* WhatsApp Icon - Positioned in the side gutter as per Projects page */}
      <div className="absolute top-[975px] inset-x-0 z-10 hidden xl:flex justify-center pointer-events-none">
        <div className="relative w-full max-w-[1920px] h-0">
          <a
            href="https://wa.me/905357829980"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-[1752px] pointer-events-auto transition-all hover:scale-110"
            aria-label="تواصل معنا على واتساب"
          >
            <Image
              src="/figma/whatsapp.svg"
              alt="واتساب"
              width={80}
              height={80}
              className="h-20 w-20"
            />
          </a>
        </div>
      </div>

      {/* Background Banners from Figma - Adjusted more towards center for visibility */}
      <div
        className="absolute left-[-60px] top-[210.01px] z-0 pointer-events-none"
        style={{ width: '346.12px', height: '346.12px' }}
      >
        <Image
          src="/images/Group 1000009427.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div
        className="absolute right-[-80px] top-[224.67px] z-0 pointer-events-none"
        style={{ width: '350.69px', height: '360.33px' }}
      >
        <div className="relative h-full w-full">
          {/* 1 17 - Positioned correctly relative to each other */}
          <div className="absolute right-[60px] top-0 h-[222.52px] w-[222.52px]">
            <Image
              src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 17.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          {/* 1 18 - Positioned 148.5px further right than 1 17 */}
          <div className="absolute right-[-0.5px] top-[120.53px] h-[222.52px] w-[222.52px]">
            <Image
              src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 18.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[420px] overflow-hidden">
        <Container className="relative z-10 flex h-full items-center justify-center">
          <PageHeader
            title="المدونة"
            subtitle="تبرعك اليوم يصنع أثرًا لا يُنسى"
            subtitleIcon="/emojis/hand_healtcare.svg"
            breadcrumbs={[
              { label: "الرئيسية", href: "/" },
              { label: "المدونة", href: "/blog" },
            ]}
          />
        </Container>
      </section>

      {/* Featured Articles Section */}
      <section className="relative overflow-hidden mt-4 pb-25" dir="rtl">
        {/* Background Blur Effects - Fading from left and right */}
        <div className="pointer-events-none absolute left-[-40.34px] top-25 z-10 h-[632.815px] w-[233.438px] bg-white blur-[22px]" />
        <div className="pointer-events-none absolute right-[-50.74px] top-25 z-10 h-[632.815px] w-[242.602px] -scale-y-100 bg-white blur-[22px]" />

        <Container>
          <div className="flex flex-col items-center gap-12">
            <h2 className="font-alexandria text-[30px] font-bold leading-normal text-[#122f2a]">
              مقالات مميزة
            </h2>

            {/* Horizontal Scrollable Cards Container with Gradient Fades */}
            <div className="relative w-full">
              {/* Left Fade Gradient */}
              <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-linear-to-r from-white to-transparent" />

              {/* Right Fade Gradient */}
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-linear-to-l from-white to-transparent" />

              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
              >
                {featuredPosts.map((post) => (
                  <div key={post.id} className="flex-none w-[410px]">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-0">
              {Array.from({ length: totalDots }, (_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className="h-8 w-8 overflow-clip cursor-pointer transition-opacity hover:opacity-80"
                  aria-label={`انتقل إلى المجموعة ${index + 1}`}
                >
                  <div className="relative flex aspect-square items-center justify-center">
                    <div
                      className={`h-3 w-3 rounded-full bg-[#007f5e] transition-opacity ${index === featuredScrollIndex ? 'opacity-100' : 'opacity-50'
                        }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Posts Section */}
      <section className="py-25" dir="rtl">
        <Container>
          <div className="flex flex-col items-center gap-12">
            <h2 className="w-full text-right font-alexandria text-[30px] font-bold leading-normal text-[#122f2a]">
              <span>استكشف آخر </span>
              <span className="text-[#007f5e]">التدوينات</span>
              <span> من جمعية رحمة</span>
            </h2>

            {/* Grid of Blog Cards - 3 cards per row */}
            <div className="grid w-full grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2" dir="rtl">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border text-white transition ${currentPage === 1
                    ? "border-[#B4BB5F]/40 bg-[#B4BB5F]/60 opacity-60"
                    : "border-[#007F5E] bg-[#007F5E]"
                  }`}
              >
                <Image
                  src="/iconamoon_arrow-up-2.svg"
                  alt="السابق"
                  width={18}
                  height={18}
                  className="h-[16px] w-[16px]"
                />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border text-xs font-medium transition ${page === currentPage
                      ? "border-[#B4BB5F] bg-[#B4BB5F] text-white"
                      : "border-[#D4D4D4] bg-white text-[#474747]"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border text-white transition ${currentPage === totalPages
                    ? "border-[#B4BB5F]/40 bg-[#B4BB5F]/60 opacity-60"
                    : "border-[#007F5E] bg-[#007F5E]"
                  }`}
              >
                <span className="rotate-180">
                  <Image
                    src="/iconamoon_arrow-up-2.svg"
                    alt="التالي"
                    width={18}
                    height={18}
                    className="h-[16px] w-[16px]"
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-25" dir="rtl">
        <Container>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-1.25">
                <div className="relative h-7 w-7 shrink-0">
                  <Image
                    src="/figma/hugeicons_healtcare.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-playpen text-base leading-normal text-[#007f5e]">
                  أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
                </p>
              </div>
              <p className="w-[496.251px] text-center font-cairo text-[32px] font-bold leading-normal text-[#122f2a]">
                كن سببا في ابتسامة شخص ما
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
