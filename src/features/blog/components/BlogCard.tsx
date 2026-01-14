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
        className="relative h-[262px] w-full items-start overflow-clip"
        style={{
          borderRadius: '14px',
          background: `url(${imageUrl}) lightgray 0px -33px / 100% 125.191% no-repeat`,
        }}
      >
        {/* Category Badge - positioned at top right */}
        <div className="absolute right-[27px] top-[20px] flex items-start justify-start">
          <div className="flex items-center justify-center gap-[4px] rounded-[60px] bg-white px-[10px] py-[4px] pl-[8px]">
            <div className="relative h-3 w-3 shrink-0">
              <Image
                src="/figma/verify.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span className="font-alexandria text-xs font-light leading-[1.5] tracking-[-0.24px] text-[#0d0d0d]">
              {post.category}
            </span>
          </div>
        </div>
      </div>

      {/* Feature Info Container */}
      <div className="flex w-full flex-col gap-[24px] items-start pb-[32px] pt-0 px-[16px]">
        {/* User Details */}
        <div className="flex w-full items-center justify-between mt-[24px]">
          <div className="flex flex-1 items-center justify-end gap-[8px] min-w-0">
            <span className="font-alexandria text-sm font-normal leading-5 text-[#0d0d0d] text-right">
              {post.date}
            </span>
             <div className="relative h-[6px] w-[6px] shrink-0">
                <div className="h-full w-full rounded-full bg-[#0d0d0d]" />
              </div>
            {post.author && (
              <span className="font-alexandria text-sm font-normal leading-5 text-[#0d0d0d] text-right">
                {post.author}
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="flex w-full flex-col items-start gap-[12px] text-right font-alexandria font-normal">
          <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[18px] capitalize leading-[1.2] text-[#0d0d0d] text-right">
            {post.title}
          </h3>
          <p
            className="w-full overflow-hidden text-ellipsis text-sm leading-[1.5] text-[rgba(13,13,13,0.7)] whitespace-pre-wrap text-right"
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
        <div className="flex w-full items-start justify-end">
          <Link
            href={`/blog/${post.id}`}
            className="flex items-center justify-center gap-[10px] pr-[16px] py-[8px] transition-opacity hover:opacity-80"
          >
            <span className="font-alexandria text-sm font-normal leading-[1.5] text-[rgba(13,13,13,0.7)]">
              إقراء المزيد
            </span>
            <div className="flex items-center justify-center relative shrink-0 size-[14px]">
              <div className="flex-none rotate-[90deg] scale-y-[-100%]">
                <Image
                  src="/emojis/line-md_arrow-up.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="h-[14px] w-[14px]"
                  style={{ filter: 'brightness(0) opacity(0.7)' }}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
