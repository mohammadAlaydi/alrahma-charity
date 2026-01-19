"use client";

import { useState, useEffect } from "react";
import { Loader2, Search, User as UserIcon, Trash2, Pencil, Eye, ChevronRight, ChevronLeft, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Modal } from "@/components/ui/modal/Modal";
import { ConfirmationModal } from "@/components/ui/modal/ConfirmationModal";
import { AdminFormDrawer, AdminInput, AdminSelect } from "@/components/admin/AdminComponents";
import { get, put as httpPut, del } from "@/services/http";

interface UserData {
    _id: string;
    name: string;
    email: string;
    country?: string;
    phone?: string;
    role: string;
    createdAt: string;
    image?: string;
    birthDate?: string;
}

const ITEMS_PER_PAGE = 8;

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingUser, setViewingUser] = useState<UserData | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    // Edit State
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        role: "user"
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await get<{ success: boolean, data: UserData[] }>("/users");
            if (data.success) {
                setUsers(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleView = (user: UserData) => {
        setViewingUser(user);
    };

    const handleDelete = async (id: string) => {
        setUserToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        try {
            await del(`/users/${userToDelete}`);
            setUsers(users.filter(u => u._id !== userToDelete));
            setDeleteModalOpen(false);
            setUserToDelete(null);
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء الحذف");
        }
    };

    const handleEdit = (user: UserData) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            country: user.country || "",
            role: user.role
        });
        setIsSheetOpen(true);
    };

    const handleSubmit = async () => {
        if (!editingUser) return;
        setSaving(true);
        try {
            const data = await httpPut<{ success: boolean, data: UserData }, any>(`/users/${editingUser._id}`, formData);
            if (data.success) {
                setUsers(users.map(u => u._id === editingUser._id ? data.data : u));
                setIsSheetOpen(false);
                setEditingUser(null);
            } else {
                alert("فشل تحديث البيانات");
            }
        } catch (error) {
            console.error(error);
            alert("حدث خطأ");
        } finally {
            setSaving(false);
        }
    };

    // Columns: Checkbox(1) | Name(3) | Email/Phone(3) | Country(2) | Role(1) | Actions(2)
    return (
        <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-sm min-h-full flex-1 w-full flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#122F2A]">إدارة المستخدمين</h1>
                    <p className="text-[#122F2A]/60 text-sm mt-1">إدارة جميع المستخدمين المسجلين في المنصة</p>
                </div>
                {/* Search Bar - Styled like Orphans Page usually doesn't have one in header, but we'll keep it consistent with functionality */}
                <div className="relative w-64 md:w-80">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="بحث عن مستخدم..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#F8F6F1] border-none rounded-xl h-12 pr-10 text-sm focus:ring-1 focus:ring-[#007F5E]"
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="border border-[#F2F2F2] rounded-[20px] overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#F9F9F9] p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2]">
                    <div className="col-span-1 flex justify-center">
                        <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                    </div>
                    <div className="col-span-3 text-sm font-medium text-[#122F2A]/60">المستخدم</div>
                    <div className="col-span-3 text-sm font-medium text-[#122F2A]/60">معلومات الاتصال</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">البلد</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60">الصلاحية</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">الإجراءات</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white">
                    {loading ? (
                        <div className="h-64 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-[#007F5E]" />
                        </div>
                    ) : (
                        currentUsers.map((user) => (
                            <div
                                key={user._id}
                                className="p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2] last:border-none hover:bg-[#Fcfcfc] transition-colors"
                            >
                                <div className="col-span-1 flex justify-center">
                                    <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                                </div>

                                {/* Name & Image */}
                                <div className="col-span-3 flex items-center gap-3">
                                    <div className="relative h-12 w-12 rounded-full overflow-hidden border border-[#EBEBEB] flex-shrink-0">
                                        {user.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                                                <UserIcon className="h-5 w-5" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#122F2A] text-sm">{user.name}</p>
                                        <p className="text-[#122F2A]/40 text-xs mt-0.5 font-mono">{new Date(user.createdAt).toLocaleDateString('ar-EG')}</p>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="col-span-3">
                                    <p className="font-medium text-[#122F2A] text-sm font-mono">{user.email}</p>
                                    <p className="text-[#122F2A]/40 text-xs mt-0.5 font-mono" dir="ltr">{user.phone || "-"}</p>
                                </div>

                                {/* Country */}
                                <div className="col-span-2">
                                    <p className="font-medium text-[#122F2A] text-sm">{user.country || "-"}</p>
                                </div>

                                {/* Type/Role */}
                                <div className="col-span-1">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.role === 'admin'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-emerald-100 text-emerald-700'
                                        }`}>
                                        {user.role === 'admin' ? 'مشرف' : 'مستخدم'}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="col-span-2 flex items-center gap-3 text-[#122F2A]/40">
                                    <button onClick={() => handleDelete(user._id)} className="hover:text-red-600 transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleEdit(user)} className="hover:text-[#122F2A] transition-colors">
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleView(user)}
                                        className="hover:text-[#122F2A] transition-colors"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                    {!loading && filteredUsers.length === 0 && (
                        <div className="h-32 flex items-center justify-center text-zinc-400 text-sm">
                            لا يوجد مستخدمين مطابقين
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-auto pt-6 border-t border-[#EBEBEB] flex items-center justify-between">
                <div className="text-sm text-[#122F2A]/60">
                    عرض {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} من {filteredUsers.length}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="h-9 w-9 p-0 border-[#EBEBEB] text-[#122F2A] hover:bg-gray-50"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-[#122F2A]">
                        صفحة {currentPage} من {totalPages || 1}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="h-9 w-9 p-0 border-[#EBEBEB] text-[#122F2A] hover:bg-gray-50"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Edit User Drawer */}
            <AdminFormDrawer
                title="تعديل بيانات المستخدم"
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
            >
                <div className="space-y-5">
                    <AdminInput
                        label="الاسم الكامل"
                        placeholder="الاسم"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <AdminInput
                        label="البريد الإلكتروني"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled
                    />
                    <AdminInput
                        label="رقم الهاتف"
                        placeholder="رقم الهاتف"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <AdminSelect
                        label="الدولة"
                        placeholder="اختر الدولة"
                        options={["فلسطين", "الأردن", "سوريا", "لبنان", "مصر", "السعودية"]}
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                    <AdminSelect
                        label="الصلاحية"
                        placeholder="اختر الصلاحية"
                        options={["user", "admin"]}
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />

                    <Button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="w-full h-12 text-md font-bold bg-[#007F5E] hover:bg-[#006e51] text-white rounded-xl mt-4"
                    >
                        {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </Button>
                </div>
            </AdminFormDrawer>

            {/* View User Details Modal */}
            <Modal
                open={!!viewingUser}
                onClose={() => setViewingUser(null)}
            >
                <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-xl w-full flex flex-col font-cairo overflow-hidden relative max-w-4xl">
                    {/* Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
                        style={{
                            backgroundImage: 'url("/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover'
                        }}
                    />

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 border-b border-[#F2F2F2] pb-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setViewingUser(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-6 w-6 text-gray-500" />
                                </button>
                                <h2 className="text-2xl font-bold text-[#122F2A]">تفاصيل المستخدم</h2>
                            </div>
                            <div className="flex gap-2">
                                <span className="bg-[#007F5E]/10 text-[#007F5E] px-4 py-1.5 rounded-full text-sm font-bold">
                                    نشيط
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Right Side: Image */}
                            <div className="col-span-1">
                                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-[#EBEBEB] shadow-sm flex items-center justify-center bg-gray-50">
                                    {viewingUser?.image ? (
                                        <Image
                                            src={viewingUser.image}
                                            alt={viewingUser.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <UserIcon className="h-24 w-24 text-gray-300" />
                                    )}
                                </div>
                            </div>

                            {/* Left Side: Details */}
                            <div className="col-span-2 space-y-6 text-right">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">الاسم الكامل</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingUser?.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">البريد الإلكتروني</h3>
                                        <p className="text-lg font-bold text-[#122F2A] font-mono">{viewingUser?.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">رقم الهاتف</h3>
                                        <p className="text-lg font-bold text-[#122F2A] font-mono" dir="ltr">{viewingUser?.phone || "-"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">الدولة</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingUser?.country || "-"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">الصلاحية</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingUser?.role === 'admin' ? 'مشرف' : 'مستخدم'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">تاريخ الانضمام</h3>
                                        <p className="text-lg font-bold text-[#122F2A] font-mono">{viewingUser?.createdAt && new Date(viewingUser.createdAt).toLocaleDateString('ar-EG')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setUserToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="حذف المستخدم"
                message="هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                cancelText="إلغاء"
                isDestructive
            />
        </div>
    );
}
