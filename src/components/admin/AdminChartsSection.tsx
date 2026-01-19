"use client";

import { useState, useEffect } from "react";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { FolderOpen, DollarSign, Users } from "lucide-react";

const data = [
    { name: "يناير", donations: 4000 },
    { name: "فبراير", donations: 3000 },
    { name: "مارس", donations: 2000 },
    { name: "أبريل", donations: 2780 },
    { name: "مايو", donations: 1890 },
    { name: "يونيو", donations: 2390 },
    { name: "يوليو", donations: 3490 },
    { name: "أغسطس", donations: 4000 },
    { name: "سبتمبر", donations: 3000 },
    { name: "أكتوبر", donations: 2000 },
    { name: "نوفمبر", donations: 2780 },
    { name: "ديسمبر", donations: 1890 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-[#EBEBEB] shadow-lg text-right">
                <p className="font-bold text-[#122F2A] mb-2">{label}</p>
                <p className="text-[#007F5E] text-sm font-medium">
                    التبرعات: ${payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

interface AdminChartsSectionProps {
    className?: string;
    delay?: number;
}

export function AdminChartsSection({ className, delay = 0.2 }: AdminChartsSectionProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className={cn("mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[400px]", className)} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className={cn("mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0", className)} // Added min-h-0 to allow shrinking in flex containers
        >
            {/* Main Chart: Donations Analytics */}
            <div className="lg:col-span-2 bg-white rounded-[26px] p-4 border border-[#EBEBEB] shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <h3 className="text-lg font-bold text-[#122F2A]">تحليلات التبرعات</h3>
                    <select className="bg-[#F8F6F1] border-none rounded-lg text-xs text-[#122F2A] px-2 py-1 focus:ring-1 focus:ring-[#007F5E]">
                        <option>آخر 12 شهر</option>
                        <option>آخر 6 شهور</option>
                        <option>آخر 30 يوم</option>
                    </select>
                </div>
                <div className="w-full flex-1 min-h-0" dir="ltr"> {/* Changed fixed height to flex-1 */}
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#007F5E" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#007F5E" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBEB" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#122F2A', opacity: 0.6, fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#122F2A', opacity: 0.6, fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="donations"
                                stroke="#007F5E"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorDonations)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Secondary Card: Summary Stats or Pie Chart placeholder */}
            <div className="bg-white rounded-[26px] p-4 border border-[#EBEBEB] shadow-sm flex flex-col h-full"> {/* h-full to match neighbor */}
                <h3 className="text-base font-bold text-[#122F2A] w-full text-right mb-4 flex-shrink-0">ملخص الأداء</h3>

                {/* Placeholder for Circular Progress or Summary Cards */}
                <div className="flex flex-col gap-3 w-full flex-1 overflow-y-auto"> {/* flex-1 to fill space */}
                    <div className="bg-[#F8F6F1] p-3 rounded-xl flex items-center justify-between">
                        <div className="text-right">
                            <p className="text-[10px] text-[#122F2A]/60">إجمالي التبرعات</p>
                            <p className="text-base font-bold text-[#007F5E]">$1,250,500</p>
                        </div>
                        <div className="h-8 w-8 bg-[#007F5E]/10 rounded-full flex items-center justify-center text-[#007F5E]">
                            <DollarSign className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="bg-[#F8F6F1] p-3 rounded-xl flex items-center justify-between">
                        <div className="text-right">
                            <p className="text-[10px] text-[#122F2A]/60">إجمالي المشاريع</p>
                            <p className="text-base font-bold text-[#007F5E]">34</p>
                        </div>
                        <div className="h-8 w-8 bg-[#007F5E]/10 rounded-full flex items-center justify-center text-[#007F5E]">
                            <FolderOpen className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="bg-[#F8F6F1] p-3 rounded-xl flex items-center justify-between">
                        <div className="text-right">
                            <p className="text-[10px] text-[#122F2A]/60">إجمالي المتبرعين</p>
                            <p className="text-base font-bold text-[#007F5E]">128</p>
                        </div>
                        <div className="h-8 w-8 bg-[#007F5E]/10 rounded-full flex items-center justify-center text-[#007F5E]">
                            <Users className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-auto pt-2 border-t border-[#EBEBEB] w-full"> {/* mt-auto pushes to bottom */}
                        <p className="text-xs text-[#122F2A]/70 leading-relaxed">
                            أداء متميز هذا الشهر! حققت الحملات زيادة بنسبة <span className="text-green-600 font-bold">12%</span> مقارنة بالشهر السابق.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
