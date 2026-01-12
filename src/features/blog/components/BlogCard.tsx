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
    <div className="flex h-full w-full max-w-102.5 flex-col overflow-hidden rounded-[20px] border-[0.5px] border-black/30 bg-white transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
      {/* Feature Image */}
      <div className="relative h-65.5 w-full overflow-hidden rounded-t-[14px]">
        <div className="absolute inset-0 bg-zinc-200">
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
        </div>
        
        {/* Category Badge */}
        <div className="absolute left-6.75 top-5 flex items-start justify-end w-89">
          <div className="flex items-center justify-center rounded-[60px] bg-white px-2.5 py-1 pr-2">
            <div className="flex items-center gap-0.5">
              <p className="font-alexandria text-xs font-light leading-normal tracking-[-0.24px] text-[#0d0d0d]">
                {post.category}
              </p>
              <div className="h-3 w-3">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#007F5E"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Info Container */}
      <div className="flex flex-col gap-6 px-4 pb-8 pt-0 w-97">
        {/* User Details Container */}
        <div className="flex w-full items-center justify-between">
          <div className="flex grow items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-alexandria text-sm font-normal leading-5 text-[#0d0d0d]">
                {post.date}
              </p>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            </div>
            {post.author && (
              <div className="flex items-center justify-center">
                <p className="font-alexandria text-sm font-normal leading-5 text-[#0d0d0d]">
                  {post.author}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Card Section */}
        <div className="flex w-full flex-col items-end">
          <div className="flex w-full flex-col items-start gap-3 font-alexandria font-normal text-right">
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg capitalize leading-[1.2] text-[#0d0d0d]">
              {post.title}
            </p>
            <p className="w-full overflow-hidden text-ellipsis text-sm lowercase leading-normal text-[rgba(13,13,13,0.7)]" style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}>
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Read More Link */}
        <div className="flex w-full items-start">
          <Link 
            href={`/blog/${post.id}`}
            className="flex items-center justify-center gap-2.5 px-4 py-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-4 w-4 items-center justify-center -scale-x-100">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 8L4 8M12 8L8 4M12 8L8 12" stroke="rgba(13,13,13,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-alexandria text-sm font-normal leading-normal text-[rgba(13,13,13,0.7)]">
              إقراء المزيد
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
