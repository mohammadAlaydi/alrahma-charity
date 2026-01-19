"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


import { useState, useEffect } from "react";
import { AdminFormDrawer, AdminInput, AdminSelect, AdminImageUpload, AdminTextArea } from "@/components/admin/AdminComponents";
import { Plus, Calendar as CalendarIcon, Trash2, Pencil, Eye, X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAppDispatch } from "@/store/hooks";
import { addToast } from "@/store/slices/notificationsSlice";
import { Modal } from "@/components/ui/modal/Modal";
import { ConfirmationModal } from "@/components/ui/modal/ConfirmationModal";
import Image from "next/image";

import { get, post, put as httpPut, del } from "@/services/http";

// CRUD Operations
async function fetchProjects() {
    // Backend returns { data: [...], ... } or just [...]
    // API endpoint is /campaigns based on backend/index.ts
    const response = await get<any>('/campaigns');
    console.log("DEBUG: API Response in ProjectsPage:", JSON.stringify(response, null, 2));

    // Normalize response: backend might return wrapped structure
    // Normalize new API fields to Admin App expectations
    const normalizeProject = (p: any) => ({
        ...p,
        name: p.title_ar || p.name, // Fallback to old name if present
        target: p.financial_goal ?? p.target,
        collected: p.current_amount ?? p.collected ?? 0,
        image: p.image_url || p.image,
        description: p.description_ar || p.description,
        progress: p.progress ?? 0,
        // Map status back to Arabic if needed, or keep as is if Admin handles it
        // Admin expects: 'نشيط', 'مكتمل', 'إعداد', 'تنتهي قريبا'
        status: p.status === 'ACTIVE' ? 'نشيط' :
            p.status === 'COMPLETED' ? 'مكتمل' :
                p.status === 'SUSPENDED' ? 'تنتهي قريبا' : p.status,
    });

    if (response && response.data && Array.isArray(response.data)) {
        return { data: response.data.map(normalizeProject) };
    } else if (Array.isArray(response)) {
        return { data: response.map(normalizeProject) };
    }
    return { data: response };
}

async function createProject(project: any) {
    return await post('/campaigns', project);
}

async function updateProject({ id, data }: { id: string; data: any }) {
    return await httpPut(`/campaigns/${id}`, data);
}

async function deleteProject(id: string) {
    return await del(`/campaigns/${id}`);
}

const ITEMS_PER_PAGE = 8;

export default function ProjectsPage() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [viewingProject, setViewingProject] = useState<any>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        subtitle: "",
        target: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "إعداد",
        category: "",
        image: ""
    });



    const queryClient = useQueryClient();

    const { data: apiResponse, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
    });

    // Sync form data with editingProject
    useEffect(() => {
        if (editingProject) {
            setFormData({
                name: editingProject.name || "",
                subtitle: editingProject.subtitle || "",
                target: editingProject.target || "",
                description: editingProject.description || "",
                startDate: editingProject.startDate || "",
                endDate: editingProject.endDate || "",
                status: editingProject.status || "إعداد",
                category: editingProject.category || "",
                image: editingProject.image || ""
            });
        } else {
            // Reset form for new project
            setFormData({
                name: "",
                subtitle: "",
                target: "",
                description: "",
                startDate: "",
                endDate: "",
                status: "إعداد",
                category: "",
                image: "https://images.unsplash.com/photo-1541913299-b5f12e792d8e?q=80&w=200&auto=format&fit=crop"
            });
        }
    }, [editingProject]);


    const createMutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            dispatch(addToast({
                type: 'success',
                title: 'تم بنجاح',
                message: "تم إنشاء المشروع بنجاح"
            }));
            setIsSheetOpen(false);
            // Reset form
            setFormData({
                name: "",
                subtitle: "",
                target: "",
                description: "",
                startDate: "",
                endDate: "",
                status: "إعداد",
                category: "",
                image: ""
            });
        },
        onError: (error: any) => {
            const msg = error?.response?.data?.error || "حدث خطأ أثناء إنشاء المشروع";
            dispatch(addToast({
                type: 'error',
                title: 'خطأ',
                message: msg
            }));
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            dispatch(addToast({
                type: 'success',
                title: 'تم بنجاح',
                message: "تم التعديل بنجاح"
            }));
            setIsSheetOpen(false);
            setEditingProject(null);
        },
        onError: (error: any) => {
            const msg = error?.response?.data?.error || "حدث خطأ أثناء تعديل المشروع";
            dispatch(addToast({
                type: 'error',
                title: 'خطأ',
                message: msg
            }));
        }
    });



    const deleteMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });



    const projects = apiResponse?.data || [];

    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleAdd = () => {
        setEditingProject(null);
        setFormData({
            name: "",
            subtitle: "",
            target: "",
            description: "",
            startDate: "",
            endDate: "",
            status: "إعداد",
            category: "",
            image: ""
        });
        setIsSheetOpen(true);
    };

    const handleEdit = (project: any) => {
        setEditingProject(project);
        setFormData({
            name: project.name || "",
            subtitle: project.subtitle || "",
            target: project.target || "",
            description: project.description || "",
            startDate: project.startDate || "",
            endDate: project.endDate || "",
            status: project.status || "إعداد",
            category: project.category || "",
            image: project.image || ""
        });
        setIsSheetOpen(true);
    };

    const handleDelete = (id: string) => {
        setProjectToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) {
            deleteMutation.mutate(projectToDelete);
        }
    };

    const handleSubmit = () => {
        // Validation/Sanitization
        const payload = {
            ...formData,
            target: Number(formData.target) || 0, // Ensure number
        };

        if (editingProject) {
            updateMutation.mutate({ id: editingProject._id, data: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const handleView = (project: any) => {
        setViewingProject(project);
    };

    return (
        <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-sm min-h-full relative flex-1 w-full flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#122F2A]">إدارة المشاريع</h1>
                    <p className="text-[#122F2A]/60 text-sm mt-1">مراقبة مشاريع التطوير والتقدم المحرز في التمويل.</p>
                </div>
                <Button
                    onClick={handleAdd}
                    className="bg-[#007F5E] hover:bg-[#006e51] text-white rounded-xl px-6 py-2 h-12 gap-2 font-bold"
                >
                    <Plus className="h-5 w-5" />
                    إضافة مشروع
                </Button>
            </div>

            {/* Table Container */}
            <div className="border border-[#F2F2F2] rounded-[20px] overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#F9F9F9] p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2]">
                    <div className="col-span-1 flex justify-center">
                        <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                    </div>
                    <div className="col-span-3 text-sm font-medium text-[#122F2A]/60">اسم المشروع</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">الفئة</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">المجمعة / الهدف</div>
                    <div className="col-span-2 text-sm font-medium text-[#122F2A]/60">تقدم</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60">حالة</div>
                    <div className="col-span-1 text-sm font-medium text-[#122F2A]/60">الإجراءات</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white">
                    {currentProjects.map((project: any) => (
                        <div key={project._id} className="p-4 grid grid-cols-12 items-center text-right border-b border-[#F2F2F2] last:border-none hover:bg-[#Fcfcfc] transition-colors">
                            <div className="col-span-1 flex justify-center">
                                <Checkbox className="border-[#EBEBEB] data-[state=checked]:bg-[#007F5E] data-[state=checked]:border-[#007F5E]" />
                            </div>
                            <div className="col-span-3">
                                <p className="font-bold text-[#122F2A] text-sm">{project.name}</p>
                                <p className="text-[#122F2A]/40 text-xs mt-0.5">{project.subtitle}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-sm font-medium text-[#122F2A]">{project.category || '-'}</span>
                            </div>
                            <div className="col-span-2">
                                <p dir="ltr" className="font-bold text-[#122F2A] text-sm text-right">${(project.target ?? 0).toLocaleString()} / <span className="text-[#122F2A]/40">${(project.collected ?? 0).toLocaleString()}</span></p>
                            </div>
                            <div className="col-span-2 flex flex-col gap-1.5 justify-center">
                                <div className="flex items-center justify-between text-xs w-[60%]">
                                    <span className="font-bold text-[#122F2A]">{(project.collected ?? 0).toLocaleString()}</span>
                                    {/* Fallback calculation for progress */}
                                    <span className="text-[#122F2A]/40">{project.progress ?? (project.target ? Math.min(Math.round(((project.collected ?? 0) / project.target) * 100), 100) : 0)}%</span>
                                </div>
                                <div className="h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden w-[60%]">
                                    <div
                                        className="h-full bg-[#007F5E] rounded-full"
                                        style={{ width: `${project.progress ?? (project.target ? Math.min(Math.round((project.collected / project.target) * 100), 100) : 0)}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <span className={`font-medium text-sm flex items-center gap-1.5 ${project.status === 'نشيط' ? 'text-[#007F5E]' : 'text-[#F2C94C]'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'نشيط' ? 'bg-[#007F5E]' : 'bg-[#F2C94C]'}`}></span>
                                    {project.status}
                                </span>
                            </div>
                            <div className="col-span-1 flex items-center gap-3 text-[#122F2A]/40">
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="hover:text-[#122F2A] transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="hover:text-[#122F2A] transition-colors"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleView(project)}
                                    className="hover:text-[#122F2A] transition-colors"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-auto pt-6 border-t border-[#EBEBEB] flex items-center justify-between">
                <div className="text-sm text-[#122F2A]/60">
                    عرض {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, projects.length)} من {projects.length}
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
                        صفحة {currentPage} من {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="h-9 w-9 p-0 border-[#EBEBEB] text-[#122F2A] hover:bg-gray-50"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Project Drawer */}
            <AdminFormDrawer
                title={editingProject ? "تعديل المشروع" : "إنشاء مشروع"}
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
            >
                <div className="space-y-5">
                    <AdminInput
                        label="اسم المشروع"
                        placeholder="اكتب اسم المشروع"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <AdminInput
                        label="العنوان الفرعي"
                        placeholder="العنوان الفرعي"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    />

                    <AdminTextArea
                        label="الوصف"
                        placeholder=""
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <AdminImageUpload
                        label="صورة الغلاف"
                        value={formData.image}
                        onChange={(val) => setFormData({ ...formData, image: val })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <AdminInput
                            label="المبلغ المستهدف ($)"
                            placeholder="المبلغ المستهدف ($)"
                            type="number"
                            value={formData.target}
                            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                        />

                        <AdminSelect
                            label="الحالة"
                            placeholder="اختار الحالة"
                            options={["إعداد", "نشيط", "مكتمل", "تنتهي قريبا"]}
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        />
                    </div>

                    <AdminSelect
                        label="الفئة"
                        placeholder="اختار الفئة"
                        options={[
                            "الحملات الطبية",
                            "حملات دعم الأيتام",
                            "الحملات الانسانية",
                            "حملات التعليم",
                            "حملات الاستجابة والطوارئ"
                        ]}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#122F2A] text-right">تاريخ البدء</label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    dir="rtl"
                                    className="bg-zinc-50/50 text-right h-12 font-mono rounded-xl block w-full text-right"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#122F2A] text-right">تاريخ الانتهاء</label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    dir="rtl"
                                    className="bg-zinc-50/50 text-right h-12 font-mono rounded-xl block w-full text-right"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={createMutation.isPending || updateMutation.isPending}
                        className="w-full h-12 text-md font-bold bg-[#007F5E] hover:bg-[#006e51] text-white rounded-xl mt-4"
                    >
                        {createMutation.isPending || updateMutation.isPending ? "جاري الحفظ..." : "حفظ"}
                    </Button>
                </div>
            </AdminFormDrawer>

            {/* View Details Modal */}
            <Modal
                open={!!viewingProject}
                onClose={() => setViewingProject(null)}
                className="max-w-4xl"
            >
                <div className="bg-white rounded-[30px] p-8 border border-[#EBEBEB] shadow-xl w-full flex flex-col font-cairo overflow-hidden relative">
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
                                    onClick={() => setViewingProject(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-6 w-6 text-gray-500" />
                                </button>
                                <h2 className="text-2xl font-bold text-[#122F2A]">تفاصيل المشروع</h2>
                            </div>
                            <div className="flex gap-2">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${viewingProject?.status === 'نشيط' ? 'bg-[#007F5E]/10 text-[#007F5E]' : 'bg-[#F2C94C]/10 text-[#F2C94C]'}`}>
                                    {viewingProject?.status}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Right Side: Image */}
                            <div className="col-span-1">
                                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-[#EBEBEB] shadow-sm">
                                    {viewingProject?.image ? (
                                        <Image
                                            src={viewingProject.image}
                                            alt={viewingProject.name || 'Project Image'}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <span className="text-sm">No Image</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Left Side: Details */}
                            <div className="col-span-2 space-y-6 text-right">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">اسم المشروع</h3>
                                        <p className="text-xl font-bold text-[#122F2A]">{viewingProject?.name}</p>
                                        <p className="text-sm text-[#122F2A]/60">{viewingProject?.subtitle}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">المبلغ المستهدف</h3>
                                        <p dir="ltr" className="text-lg font-bold text-[#122F2A] text-right">${viewingProject?.target}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">المبلغ المجمع</h3>
                                        <p dir="ltr" className="text-lg font-bold text-[#122F2A] text-right">${viewingProject?.collected}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">تاريخ البدء</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingProject?.startDate}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-1">تاريخ الانتهاء</h3>
                                        <p className="text-lg font-bold text-[#122F2A]">{viewingProject?.endDate}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <h3 className="text-sm font-medium text-[#122F2A]/60 mb-2">التقدم</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-3 bg-[#EBEBEB] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#007F5E] rounded-full transition-all duration-500"
                                                    style={{ width: viewingProject ? `${viewingProject.progress}%` : '0%' }}
                                                ></div>
                                            </div>
                                            <span className="font-bold text-[#122F2A]">{viewingProject?.progress}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-[#F2F2F2] pt-6">
                                    <h3 className="text-sm font-medium text-[#122F2A]/60 mb-2">الوصف</h3>
                                    <p className="text-[#122F2A]/80 leading-relaxed">
                                        {viewingProject?.description}
                                    </p>
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
                    setProjectToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="حذف المشروع"
                message="هل أنت متأكد من أنك تريد حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
                cancelText="إلغاء"
                isDestructive
            />
        </div>
    );
}
