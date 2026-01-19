"use client";

import { useMemo, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Download, ExternalLink, RefreshCw, RefreshCcw } from "lucide-react";
import { Modal } from "@/components/ui/modal/Modal";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function DonationsHistoryPage() {
    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState<any[]>([]);
    const [recurringDonations, setRecurringDonations] = useState<any[]>([]);

    const [editingDonation, setEditingDonation] = useState<any>(null);
    const [newAmount, setNewAmount] = useState("");

    const fetchDonations = async () => {
        try {
            const res = await fetch('/api/donations?limit=100');
            const data = await res.json();

            if (data.success && data.data.length > 0) {
                const formattedDonations = data.data.map((d: any) => ({
                    ...d,
                    id: d._id,
                    project: d.project || d.category, // Fallback
                    date: new Date(d.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
                    amount: d.amountFormatted ? d.amountFormatted : (d.amount ? `$${d.amount}` : '$0.00'),
                }));

                setDonations(formattedDonations.filter((d: any) => d.type === 'مرة واحدة' || d.type === 'one-time'));
                setRecurringDonations(formattedDonations.filter((d: any) => d.type === 'يتكرر' || d.type === 'recurring'));
                setLoading(false);
            } else if (data.success && data.data.length === 0) {
                await fetch('/api/seed');
                setTimeout(() => fetchDonations(), 1000);
            }
        } catch (error) {
            console.error("Failed to fetch donations", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const handleEdit = (item: any) => {
        setEditingDonation(item);
        // Extract numeric value from string like "$25.00/شهر" or "$ 25.00"
        let numeric = item.amount.toString().replace(/[^0-9.]/g, '');
        if (!numeric) numeric = item.amount.toString(); // Fallback
        setNewAmount(numeric);
    };

    const handleSave = async () => {
        if (!editingDonation) return;

        try {
            const updatedAmount = `$${newAmount}/شهر`;
            const res = await fetch('/api/donations', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingDonation.id,
                    amountFormatted: updatedAmount,
                    amount: parseFloat(newAmount)
                })
            });

            if (res.ok) {
                await fetchDonations();
                setEditingDonation(null);
            }
        } catch (error) {
            console.error("Failed to save", error);
        }
    };

    const toggleSubscription = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'نشط' ? 'متوقف' : 'نشط';

        // Optimistic update
        setRecurringDonations(prev => prev.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));

        try {
            await fetch('/api/donations', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    status: newStatus
                })
            });
        } catch (error) {
            console.error("Failed to toggle status", error);
            fetchDonations(); // Revert on error
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center md:text-right mb-2">
                <h1 className="text-2xl font-bold text-zinc-900">سجل التبرعات</h1>
                <p className="text-zinc-500 mt-2">عرض جميع تبرعاتك السابقة والاشتراكات الدورية</p>
            </div>

            {/* Recurring Donations Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-zinc-900">تاريخ التبرعات الدورية</h2>

                </div>
                <p className="text-sm text-zinc-500">قائمة بجميع مساهماتك الدورية</p>

                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-zinc-50 text-zinc-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">تاريخ</th>
                                <th className="px-4 py-3 font-medium">النوع</th>
                                <th className="px-4 py-3 font-medium">التحكم في الاشتراك</th>
                                <th className="px-4 py-3 font-medium">القيمة</th>
                                <th className="px-4 py-3 font-medium">تعديل</th>
                                <th className="px-4 py-3 font-medium">تجديد تاريخ التبرع</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {recurringDonations.map((item) => (
                                <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="px-4 py-4 text-zinc-900">{item.date}</td>
                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                            <RefreshCw className="h-3 w-3" />
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        {item.status === 'نشط' ? (
                                            <button
                                                onClick={() => toggleSubscription(item.id, item.status)}
                                                className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-rose-600 transition-colors"
                                            >
                                                <RefreshCcw className="h-3 w-3" />
                                                توقف الاشتراك
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => toggleSubscription(item.id, item.status)}
                                                className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                                            >
                                                <RefreshCw className="h-3 w-3" />
                                                اعادة الاشتراك
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-zinc-900">{item.amount}</td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-emerald-600 hover:underline text-xs font-medium"
                                        >
                                            تحديث
                                        </button>
                                    </td>
                                    <td className="px-4 py-4 text-zinc-500">
                                        <Select defaultValue="15">
                                            <SelectTrigger dir="rtl" className="w-[140px] h-9 bg-white border-zinc-200 justify-between text-right px-3">
                                                <SelectValue placeholder="اختر التاريخ" />
                                            </SelectTrigger>
                                            <SelectContent dir="rtl">
                                                <SelectItem value="5">5 من الشهر</SelectItem>
                                                <SelectItem value="10">10 من الشهر</SelectItem>
                                                <SelectItem value="15">15 من الشهر</SelectItem>
                                                <SelectItem value="20">20 من الشهر</SelectItem>
                                                <SelectItem value="25">25 من الشهر</SelectItem>
                                                <SelectItem value="30">30 من الشهر</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                children={
                    <div className="bg-white rounded-[30px] w-full max-w-md overflow-hidden font-cairo" dir="rtl">
                        <div className="p-6 space-y-6">
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-bold text-[#122F2A]">تعديل قيمة التبرع</h3>
                                <p className="text-sm text-zinc-500">
                                    قم بتعديل قيمة التبرع الشهري لمشروع: <br />
                                    <span className="font-semibold text-emerald-700">{editingDonation?.project}</span>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-zinc-900 block text-right">
                                        قيمة التبرع ($)
                                    </label>
                                    <Input
                                        value={newAmount}
                                        onChange={(e) => setNewAmount(e.target.value)}
                                        type="number"
                                        className="bg-zinc-50/50 text-right h-12 rounded-xl border-zinc-200 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    onClick={handleSave}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 font-bold"
                                >
                                    حفظ التغييرات
                                </Button>
                                <Button
                                    onClick={() => setEditingDonation(null)}
                                    variant="secondary"
                                    className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-xl h-12 font-bold"
                                >
                                    إلغاء
                                </Button>
                            </div>
                        </div>
                    </div>
                }
                open={!!editingDonation}
                onClose={() => setEditingDonation(null)}
            />

            {/* Past Donations Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-zinc-900">تاريخ التبرعات السابقة</h2>

                </div>
                <p className="text-sm text-zinc-500">قائمة بجميع مساهماتك السابقة</p>

                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-zinc-50 text-zinc-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">تاريخ</th>
                                <th className="px-4 py-3 font-medium">النوع</th>
                                <th className="px-4 py-3 font-medium">مرجع</th>
                                <th className="px-4 py-3 font-medium">القيمة</th>
                                <th className="px-4 py-3 font-medium">الحالة</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {donations.map((item) => (
                                <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="px-4 py-4 text-zinc-900">{item.date}</td>
                                    <td className="px-4 py-4 text-zinc-600 flex items-center gap-1">
                                        <ExternalLink className="h-3 w-3 opacity-50" />
                                        {item.type}
                                    </td>
                                    <td className="px-4 py-4 text-zinc-500 font-mono text-xs">{item.id}</td>
                                    <td className="px-4 py-4 font-semibold text-zinc-900">{item.amount}</td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === "مدفوع"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-rose-50 text-rose-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center pt-4">
                    <button className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                        عرض جميع المعاملات
                        <span className="text-lg">←</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
