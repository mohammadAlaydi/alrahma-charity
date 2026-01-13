"use client";

import Image from "next/image";
import Link from "next/link";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author?: string;
  date: string;
  imageUrl?: string;
};

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.imageUrl || "/images/ac049d4dd7a08ce44ca76439fe3d3d1a5058f9f8.jpg";
  
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[20px] border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid bg-white pt-[8px] px-[8px] pb-0">
      {/* Feature Image */}
      <div 
        className="relative h-[262px] w-full items-start overflow-clip rounded-[14px]"
        style={{
          background: `url(${imageUrl}) lightgray 0px -33px / 100% 125.191% no-repeat`,
        }}
      >
        {/* Category Badge - positioned at top right */}
        <div className="absolute left-[27px] top-[20px] flex items-start justify-end">
          <div className="flex items-center justify-center gap-[2px] rounded-[60px] bg-white px-[10px] py-[4px] pr-[8px]">
            <span className="font-alexandria text-xs font-light leading-[1.5] tracking-[-0.24px] text-[#0d0d0d]">
              {post.category}
            </span>
             {/* Material Symbols Light Verified */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="h-3 w-3 shrink-0">
               <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#007F5E" />
            </svg>
          </div>
        </div>
      </div>

      {/* Feature Info Container */}
      <div className="flex w-full flex-col gap-[24px] items-start pb-[32px] pt-0 px-[16px]">
        {/* User Details */}
        <div className="flex w-full items-center justify-between mt-[24px]">
          <div className="flex flex-1 items-center justify-start gap-[8px] min-w-0">
            <span className="font-alexandria text-sm font-normal leading-5 text-[#0d0d0d]">
              {post.date}
            </span>
             <div className="relative h-[6px] w-[6px] shrink-0">
                <div className="h-full w-full rounded-full bg-[#0d0d0d]" />
              </div>
            {post.author && (
              <span className="font-alexandria text-sm font-normal leading-5 text-[#0d0d0d]">
                {post.author}
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="flex w-full flex-col items-start gap-[12px] text-right font-alexandria font-normal">
          <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[18px] capitalize leading-[1.2] text-[#0d0d0d]">
            {post.title}
          </h3>
          <p
            className="w-full overflow-hidden text-ellipsis text-sm lowercase leading-[1.5] text-[rgba(13,13,13,0.7)] whitespace-pre-wrap"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {post.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="flex w-full items-start justify-start">
          <Link
            href={`/blog/${post.id}`}
            className="flex items-center justify-center gap-[10px] pl-[16px] py-[8px] transition-opacity hover:opacity-80"
          >
            <span className="font-alexandria text-sm font-normal leading-[1.5] text-[rgba(13,13,13,0.7)]">
              إقراء المزيد
            </span>
            <div className="flex items-center justify-center relative shrink-0 size-[16px]">
               {/* Arrow Left for RTL Read More */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-[16px]">
                  <path d="M12 8L4 8M12 8L8 4M12 8L8 12" stroke="rgba(13,13,13,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
