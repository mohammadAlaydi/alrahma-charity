"use client";

import React from "react";
import { X, Image as ImageIcon, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface AdminFormDrawerProps {
    title: string;
    isOpen?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    fullHeight?: boolean;
}

export function AdminFormDrawer({ title, isOpen = true, onClose, children }: AdminFormDrawerProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
            {/* Backdrop can be added if needed, but per screenshot seems to just be a side panel or modal */}
            {/* Using a persistent side panel within the layout context or fixed overlay */}

            <div className="w-full md:w-[450px] bg-white h-screen shadow-2xl pointer-events-auto overflow-y-auto flex flex-col font-cairo relative">
                {/* Background Image - User Request */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
                    style={{
                        backgroundImage: 'url("/images/f4fb97fb7613008487e534ebc136d2132150d2e1.jpg")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                />

                <div className="relative z-10 flex flex-col flex-1">
                    {/* Header */}
                    <div className="p-6 flex items-center justify-between border-b border-transparent">
                        <h2 className="text-xl font-bold text-[#122F2A]">{title}</h2>
                        <button onClick={onClose} className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 text-zinc-500">
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 p-6 space-y-6">
                        {children}
                    </div>


                </div>
            </div>
        </div>
    );
}

// Reusable Form components for common inputs seen in screenshots
// Reusable Form components for common inputs seen in screenshots
export function AdminInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-[#122F2A] text-right">{label}</label>
            <input
                {...props}
                className={cn("w-full h-11 rounded-lg border border-[#EBEBEB] bg-white text-right px-4 focus:ring-1 focus:ring-[#007F5E] focus:border-[#007F5E] placeholder:text-zinc-400 text-sm outline-none", props.className)}
            />
        </div>
    );
}

export function AdminTextArea({ label, rows = 4, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-[#122F2A] text-right">{label}</label>
            <textarea
                rows={rows}
                {...props}
                className={cn("w-full rounded-lg border border-[#EBEBEB] bg-white text-right p-4 focus:ring-1 focus:ring-[#007F5E] focus:border-[#007F5E] placeholder:text-zinc-400 text-sm resize-none outline-none", props.className)}
            />
        </div>
    );
}

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: string[];
    placeholder?: string;
}

export function AdminSelect({ label, placeholder, options = [], ...props }: AdminSelectProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-[#122F2A] text-right">{label}</label>
            <div className="relative">
                <select
                    {...props}
                    className={cn("w-full h-11 rounded-lg border border-[#EBEBEB] bg-white text-right px-4 appearance-none focus:ring-1 focus:ring-[#007F5E] focus:border-[#007F5E] text-[#122F2A] text-sm outline-none", props.className)}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            </div>
        </div>
    );
}

interface AdminImageUploadProps {
    label: string;
    value?: string;
    onChange?: (value: string) => void;
}

export function AdminImageUpload({ label, value, onChange }: AdminImageUploadProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                onChange?.(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-[#122F2A] text-right">{label}</label>
            <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#EBEBEB] rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white group relative overflow-hidden"
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {value ? (
                    <>
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-md mb-2">تغيير الصورة</span>
                        </div>
                        <button
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-10"
                            title="حذف الصورة"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </>
                ) : (
                    <>
                        <div className="h-10 w-10 mb-3 text-[#007F5E] group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-full h-full" />
                        </div>
                        <span className="text-sm font-medium text-[#2F80ED]">اضغط لرفع صورة</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                    </>
                )}
            </div>
        </div>
    )
}
