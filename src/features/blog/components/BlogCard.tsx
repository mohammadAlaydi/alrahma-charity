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
  return (
    <article className="flex h-full w-full max-w-102.5 flex-col overflow-hidden rounded-[20px] border-[0.5px] border-black/30 bg-white transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
      {/* Feature Image */}
      <div className="relative h-65.5 w-full overflow-hidden rounded-t-[14px] bg-zinc-200">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-2xl text-gray-400">صورة المقال</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute left-6.75 top-5 flex w-89 items-start justify-end">
          <div className="flex items-center justify-center gap-0.5 rounded-[60px] bg-white px-2.5 py-1 pr-2">
            <span className="font-alexandria text-xs font-light leading-normal tracking-[-0.24px] text-[#0d0d0d]">
              {post.category}
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="h-3 w-3">
              <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#007F5E" />
            </svg>
          </div>
        </div>
      </div>

      {/* Feature Info Container */}
      <div className="flex w-97 flex-col gap-6 px-4 pb-8 pt-0">
        {/* User Details */}
        <div className="flex w-full grow items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-alexandria text-sm font-normal leading-5 text-[#0d0d0d]">
              {post.date}
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          </div>
          {post.author && (
            <span className="font-alexandria text-sm font-normal leading-5 text-[#0d0d0d]">
              {post.author}
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="flex w-full flex-col items-start gap-3 text-right font-alexandria font-normal">
          <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg capitalize leading-[1.2] text-[#0d0d0d]">
            {post.title}
          </h3>
          <p
            className="w-full overflow-hidden text-ellipsis text-sm lowercase leading-normal text-[rgba(13,13,13,0.7)]"
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
        <Link
          href={`/blog/${post.id}`}
          className="flex items-center justify-center gap-2.5 px-4 py-2 transition-opacity hover:opacity-80"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="-scale-x-100">
            <path d="M12 8L4 8M12 8L8 4M12 8L8 12" stroke="rgba(13,13,13,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-alexandria text-sm font-normal leading-normal text-[rgba(13,13,13,0.7)]">
            إقراء المزيد
          </span>
        </Link>
      </div>
    </article>
  );
}
