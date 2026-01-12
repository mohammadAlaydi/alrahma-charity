"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { BlogCard, type BlogPost } from "@/features/blog/components/BlogCard";
import { Pagination } from "@/components/ui/Pagination";

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
      {/* WhatsApp Icon - Fixed position on right side */}
      <div className="fixed right-22 top-[calc(50%-439.69px)] z-50 hidden xl:block">
        <a
          href="https://wa.me/905357829980"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-all hover:scale-110"
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

      {/* Hero Section */}
      <section className="relative h-125.5 overflow-hidden">
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
      <section className="relative overflow-hidden py-25" dir="rtl">
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
                  <div key={post.id} className="flex-none">
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
                      className={`h-3 w-3 rounded-full bg-[#007f5e] transition-opacity ${
                        index === featuredScrollIndex ? 'opacity-100' : 'opacity-50'
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-25" dir="rtl">
        <Container>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-1.25">
                <p className="font-playpen text-base leading-normal text-[#007f5e]">
                  أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل
                </p>
                <div className="h-6 w-6 overflow-clip">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4ZM12 18C10.9 18 10 18.9 10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20C14 18.9 13.1 18 12 18ZM12 11C10.9 11 10 11.9 10 13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11Z" fill="#007F5E"/>
                  </svg>
                </div>
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
