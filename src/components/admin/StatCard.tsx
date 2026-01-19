import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatCardProps {
    title: string;
    value: string | number;
    subtext: string;
    icon: LucideIcon;
    trend?: "up" | "down" | "neutral";
    trendValue?: string; // e.g., "10%"
}

export function StatCard({ title, value, subtext, icon: Icon, trend, trendValue }: StatCardProps) {
    return (
        <div className="bg-white rounded-[14px] p-6 border border-[#EBEBEB] shadow-sm flex flex-col justify-between h-[140px] relative overflow-hidden">
            {/* Header: Title Right, Icon Left */}
            <div className="flex items-start justify-between w-full mb-4">
                <h3 className="text-[#122F2A] font-medium text-sm">{title}</h3>
                <div className="text-[#007F5E]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
            </div>

            <div className="text-3xl font-bold text-[#007F5E] mb-1">{value}</div>

            <div className="flex items-center justify-between mt-auto w-full">
                {trend && trendValue && (
                    <div className="flex items-center gap-1 text-[10px] font-medium">
                        {trend === "up" && (
                            <span className="text-[#007F5E] flex items-center gap-1 bg-[#007F5E]/5 px-1.5 py-0.5 rounded-full">
                                <span>↑</span> {trendValue}
                            </span>
                        )}
                        <span className="text-zinc-400">{subtext}</span>
                    </div>
                )}
                {!trend && (
                    <span className="text-[10px] text-zinc-400">{subtext}</span>
                )}
            </div>
        </div>
    );
}
