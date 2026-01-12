"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/features/projects/utils";
import { Project } from "@/features/projects/types";

type ProjectCardProps = {
    project: Project;
    isFav: boolean;
    isBursting: boolean;
    onToggleFavorite: (id: string) => void;
    onDonate: (project: Project) => void;
};

function HeartIcon({ isFav }: { isFav: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill={isFav ? "#DC2626" : "none"}
            stroke={isFav ? "#DC2626" : "#9CA3AF"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-colors"
        >
            <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.99.99 0 0 0 1.024 0C21.126 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3" />
        </svg>
    );
}



export function ProjectCard({
    project,
    isFav,
    isBursting,
    onToggleFavorite,
    onDonate,
}: ProjectCardProps) {
    const progress = Math.min((project.collected / project.goal) * 100, 100);

    return (
        <div className="flex h-full w-full max-w-[395px] flex-col overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-none transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] md:min-h-[600px]">
            {/* صورة Placeholder أعلى الكرت */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-t-[20px] bg-zinc-200">
                <Link href={`/projects/${project.id}`} className="absolute inset-0 flex items-center justify-center">
                    <span className="font-molle text-center text-[32px] font-normal text-white">
                        Donate image
                    </span>
                </Link>


                <div className="absolute inset-x-4 top-3 z-10 flex items-center justify-between">
                    <Link 
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white bg-[#007F5E] px-3.5 py-1.5 hover:bg-[#056A4F] transition-colors"
                    >
                        <span className="card-badge">تصنيف المشروع</span>
                    </Link>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onToggleFavorite(project.id);
                        }}
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E9E9F2] transition ${isFav ? "scale-105" : ""
                            }`}
                    >
                        <span className="relative inline-flex h-5 w-5 items-center justify-center">
                            {isBursting && (
                                <>
                                    <span className="animate-fav-burst pointer-events-none absolute -top-3 -right-2 h-3 w-3 opacity-40 will-change-transform">
                                        <HeartIcon isFav />
                                    </span>
                                    <span
                                        className="animate-fav-burst pointer-events-none absolute -top-2 -left-2 h-3 w-3 opacity-40 will-change-transform"
                                        style={{ animationDelay: "80ms" }}
                                    >
                                        <HeartIcon isFav />
                                    </span>
                                    <span
                                        className="animate-fav-burst pointer-events-none absolute -right-3 -bottom-1 h-3 w-3 opacity-40 will-change-transform"
                                        style={{ animationDelay: "140ms" }}
                                    >
                                        <HeartIcon isFav />
                                    </span>
                                </>
                            )}
                            <HeartIcon isFav={isFav} />
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3.5 bg-white p-4">
                <div className="space-y-2.5">
                    <Link href={`/projects/${project.id}`}>
                        <h3 className="card-title hover:text-[#007F5E] transition-colors">{project.title}</h3>
                    </Link>
                    <div className="flex items-start gap-2">
                        <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center">
                            <Image
                                src="/mage_goals-fill.svg"
                                alt="وصف الحملة"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                        </span>
                        <p className="card-description">{project.description}</p>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="card-stats flex items-center justify-between font-bold">
                        <span>التبرعات</span>
                        <span>{progress.toFixed(2)}%</span>
                    </div>
                    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#D9D9D9]/40">
                        <div
                            className="absolute top-0 right-0 h-full rounded-full bg-[#007F5E]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="card-stats mt-1 flex items-center justify-between">
                        <span className="font-medium whitespace-nowrap">
                            المبلغ المُجمَّع : {formatCurrency(project.collected)}
                        </span>
                        <span className="font-bold text-[#B4BB5F] whitespace-nowrap">
                            الهدف : ${formatCurrency(project.goal)}
                        </span>
                    </div>
                </div>

                <div className="mt-auto -mb-4 -ml-4 flex items-start justify-end relative z-10">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDonate(project);
                        }}
                        className="card-button inline-flex items-center gap-3 rounded-tr-2xl rounded-bl-none bg-[#007F5E] px-6 py-2.5 text-white transition-colors hover:bg-[#056A4F] focus-visible:ring-2 focus-visible:ring-[#007F5E]/40 focus-visible:outline-none"
                    >
                        <span>تبرع الآن</span>
                        <Image
                            src="/double hearts.svg"
                            alt="تبرع"
                            width={22}
                            height={23}
                            className="h-6 w-6"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
