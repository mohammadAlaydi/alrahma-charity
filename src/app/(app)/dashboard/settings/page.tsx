"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Globe, Wallet, Bell, Moon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/slices/notificationsSlice";

export default function SettingsPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        language: "ar",
        currency: "sar",
        notifications: {
            newsletter: true,
            withdrawalReminder: true,
            campaignUpdates: true,
            myUpdates: true,
            volunteering: true,
            campaignRatings: true,
        }
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await fetch('/api/user');
            const data = await res.json();
            if (data.success && data.data && data.data.settings) {
                // Define defaults to merge in case backend has partial data
                const defaultSettings = {
                    language: "ar",
                    currency: "sar",
                    notifications: {
                        newsletter: true,
                        withdrawalReminder: true,
                        campaignUpdates: true,
                        myUpdates: true,
                        volunteering: true,
                        campaignRatings: true,
                    }
                };

                // Merge fetched settings with defaults
                setSettings({
                    ...defaultSettings,
                    ...data.data.settings,
                    notifications: {
                        ...defaultSettings.notifications,
                        ...(data.data.settings.notifications || {})
                    }
                });
            }
        } catch (error) {
            console.error("Failed to load settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings })
            });
            const data = await res.json();

            if (data.success) {
                // Ideally show a toast
                dispatch(addToast({
                    type: "success",
                    message: "تم حفظ الإعدادات بنجاح"
                }));
            } else {
                dispatch(addToast({
                    type: "error",
                    message: "فشل حفظ الإعدادات"
                }));
            }
        } catch (error) {
            console.error("Failed to save settings", error);
            dispatch(addToast({
                type: "error",
                message: "حدث خطأ أثناء الحفظ"
            }));
        } finally {
            setSaving(false);
        }
    };

    const updateNotification = (key: keyof typeof settings.notifications, value: boolean) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: value
            }
        }));
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center md:text-right mb-6">
                <h1 className="text-2xl font-bold text-zinc-900">إعدادات الحساب</h1>
                <p className="text-zinc-500 mt-2">تخصيص تجربتك وتفضيلاتك</p>
            </div>

            <div className="space-y-6">

                {/* Language & Currency */}
                <div className="space-y-6 border-b border-zinc-100 pb-8">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-900">
                        <Globe className="h-5 w-5 text-emerald-600" />
                        اللغة والعملة
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700">اللغة</label>
                            <select
                                value={settings.language}
                                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                className="w-full h-10 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                            >
                                <option value="ar">العربية</option>
                                <option value="en">English</option>
                                <option value="tr">Türkçe</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700">العملة</label>
                            <select
                                value={settings.currency}
                                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                className="w-full h-10 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                            >
                                <option value="usd">دولار أمريكي (USD)</option>
                                <option value="sar">ريال سعودي (SAR)</option>
                                <option value="try">ليرة تركية (TRY)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="space-y-6">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-900">
                        <Bell className="h-5 w-5 text-emerald-600" />
                        إعدادات الإشعارات
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-zinc-900">النشرة البريدية وآخر الحملات</label>
                                <p className="text-xs text-zinc-500">النشرات البريدية الخاصة بآخر وأهم الحملات والحالات والمشاريع الأشد احتياجاً</p>
                            </div>
                            <Switch
                                checked={settings.notifications.newsletter}
                                onCheckedChange={(c) => updateNotification('newsletter', c)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-zinc-900">التذكير بعملية السحب القادمة</label>
                                <p className="text-xs text-zinc-500">إرسال تنبيه قبل ثلاثة أيام من عملية السحب القادمة عن كل اشتراك تبرع دوري</p>
                            </div>
                            <Switch
                                checked={settings.notifications.withdrawalReminder}
                                onCheckedChange={(c) => updateNotification('withdrawalReminder', c)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-zinc-900">أخبار الحملات والغايات التي تبرعت لها</label>
                                <p className="text-xs text-zinc-500">اشعارات عن تحديثات آخر أخبار الحملات والحالات والعناصر الاخرى التي تبرعت لها مسبقاً</p>
                            </div>
                            <Switch
                                checked={settings.notifications.campaignUpdates}
                                onCheckedChange={(c) => updateNotification('campaignUpdates', c)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-zinc-900">تحديثات العناصر الخاصة بي</label>
                                <p className="text-xs text-zinc-500">اشعارات عن التحديثات الخاصة بالمساهمات والروابط التي قمت مشاركتها من قبلك</p>
                            </div>
                            <Switch
                                checked={settings.notifications.myUpdates}
                                onCheckedChange={(c) => updateNotification('myUpdates', c)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-zinc-900">قسيمة التطوع المقبولة</label>
                                <p className="text-xs text-zinc-500">إشعارات حول فرص التطوع المتاحة قريباً والمناسبات التي يمكنك المشاركة فيها</p>
                            </div>
                            <Switch
                                checked={settings.notifications.volunteering}
                                onCheckedChange={(c) => updateNotification('volunteering', c)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-zinc-900">تقييمات الحملة</label>
                                <p className="text-xs text-zinc-500">معلومات عن تقييمات وآراء المشاركين في الحملات السابقة وكيفية تحسين تجربة التبرع</p>
                            </div>
                            <Switch
                                checked={settings.notifications.campaignRatings}
                                onCheckedChange={(c) => updateNotification('campaignRatings', c)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-start gap-4 pt-4">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
                    >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : null}
                        {saving ? "جاري الحفظ..." : "تأكيد"}
                    </Button>
                    <Button variant="ghost" className="text-zinc-500">
                        إلغاء
                    </Button>
                </div>
            </div>
        </div>
    );
}
