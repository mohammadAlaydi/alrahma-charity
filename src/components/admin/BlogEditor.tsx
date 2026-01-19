"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
    Image as ImageIcon,
    Bold, Italic, Underline,
    AlignLeft, AlignCenter, AlignRight,
    Link as LinkIcon, Calendar,
    Heading1, Heading2, Heading3
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapImage from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TipTapUnderline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { cn } from "@/lib/cn";

interface BlogEditorProps {
    initialData?: any;
    onBack: () => void;
    onSave?: (data: any) => void;
    isSaving?: boolean;
}


const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = window.prompt('URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive('bold') ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <Bold className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive('italic') ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <Italic className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive('underline') ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <Underline className="h-4 w-4" />
            </button>
            <div className="w-px h-3 bg-zinc-200 mx-1"></div>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <AlignRight className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <AlignCenter className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <AlignLeft className="h-4 w-4" />
            </button>
            <div className="w-px h-3 bg-zinc-200 mx-1"></div>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <Heading1 className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <Heading2 className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <Heading3 className="h-4 w-4" />
            </button>
            <div className="w-px h-3 bg-zinc-200 mx-1"></div>
            <button
                onClick={setLink}
                className={`p-1.5 rounded text-zinc-400 hover:bg-zinc-100 ${editor.isActive('link') ? 'bg-zinc-100 text-zinc-700' : ''}`}
            >
                <LinkIcon className="h-3 w-3" />
            </button>
            <button
                onClick={addImage}
                className="p-1.5 rounded text-zinc-400 hover:bg-zinc-100"
            >
                <ImageIcon className="h-4 w-4" />
            </button>
        </div>
    );
};

import { AdminImageUpload } from "@/components/admin/AdminComponents";

// ... existing imports

// Editor component
export function BlogEditor({ initialData, onBack, onSave, isSaving }: BlogEditorProps) {
    const [_, setUpdater] = useState(0); // Force re-render for toolbar states
    const [tags, setTags] = useState<string[]>(initialData?.tags || []);
    const [tagInput, setTagInput] = useState("");
    const [metaDescription, setMetaDescription] = useState(initialData?.description || "");
    const [coverImage, setCoverImage] = useState(initialData?.image || "");
    const [date, setDate] = useState<Date | undefined>(
        initialData?.date ? new Date(initialData.date) : new Date()
    );

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            TipTapImage,
            Link.configure({
                openOnClick: false,
                defaultProtocol: 'https',
            }),
            TipTapUnderline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                defaultAlignment: 'right', // Semantic RTL default
            }),
            Placeholder.configure({
                placeholder: 'ابدأ بكتابة مقالك هنا...',
            }),
        ],
        content: initialData?.description || '',
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] text-right dir-rtl font-cairo',
                dir: 'rtl',
            },
        },
        immediatelyRender: false,
        onTransaction: () => {
            // Force re-render so toolbar active states update
            setUpdater(prev => prev + 1);
        },
    });

    // Update content if initialData changes (e.g., when data loads)
    useEffect(() => {
        if (editor && initialData?.description) {
            // Only update if content is different to avoid cursor jumps or loops if needed
            // For simple use case, just setting content is fine, but careful with re-renders.
            // checking if empty is safer or comparing HTML logic
            if (editor.getHTML() !== initialData.description) {
                // editor.commands.setContent(initialData.description) 
                // Skipping this for now to avoid complexity, initial content is set on mount.
            }
        }
    }, [initialData, editor]);

    return (
        <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-full font-cairo animate-fadeIn">
            {/* Main Editor Area (Right side in RTL) */}
            <div className="flex-1 bg-white rounded-[20px] p-8 shadow-sm overflow-y-auto relative">
                {/* Header Actions (Back button) */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-[#122F2A]">مساحة عمل المحرر</h1>
                    {/* Toolbar */}
                    <MenuBar editor={editor} />
                </div>

                <div className="space-y-8">
                    {/* Title Input */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="اضف عنوان المقال ...."
                            defaultValue={initialData?.title || ""}
                            className="w-full text-3xl font-bold text-[#122F2A] placeholder-[#122F2A]/30 border-none focus:ring-0 p-0 bg-transparent text-right"
                        />
                    </div>

                    {/* Cover Image Placeholder */}
                    <AdminImageUpload
                        label="صورة الغلاف"
                        value={coverImage}
                        onChange={setCoverImage}
                    />

                </div>

                {/* Tiptap Editor Content Area */}
                <div className="text-[#122F2A] leading-relaxed pt-6">
                    <style jsx global>{`
                        .ProseMirror p.is-editor-empty:first-child::before {
                            color: #adb5bd;
                            content: attr(data-placeholder);
                            float: right;
                            height: 0;
                            pointer-events: none;
                        }

                        /* Heading Styles */
                        .ProseMirror h1 {
                            font-size: 2.5rem;
                            font-weight: 800;
                            line-height: 1.2;
                            margin-top: 1.5em;
                            margin-bottom: 0.8em;
                        }
                        .ProseMirror h2 {
                            font-size: 2rem;
                            font-weight: 700;
                            line-height: 1.3;
                            margin-top: 1.4em;
                            margin-bottom: 0.6em;
                        }
                        .ProseMirror h3 {
                            font-size: 1.75rem;
                            font-weight: 600;
                            line-height: 1.4;
                            margin-top: 1.2em;
                            margin-bottom: 0.5em;
                        }
                        /* List Styles to ensure visibility */
                        .ProseMirror ul {
                            list-style-type: disc;
                            padding-right: 1.5em; /* RTL padding */
                        }
                        .ProseMirror ol {
                            list-style-type: decimal;
                            padding-right: 1.5em;
                        }
                        .ProseMirror blockquote {
                            border-right: 4px solid #EBEBEB;
                            padding-right: 1em;
                            margin-right: 0;
                            font-style: italic;
                            color: #666;
                        }
                    `}</style>
                    <EditorContent editor={editor} />
                </div>
            </div>

            {/* Sidebar (Left side in RTL) */}
            <div className="w-full md:w-[300px] flex-shrink-0 bg-[#F8F8F8] rounded-[20px] p-5 shadow-sm overflow-y-auto h-fit border border-[#EBEBEB]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-[#122F2A]">شريط الحالة</h2>
                    <span className="bg-[#F2C94C]/20 text-[#F2C94C] text-xs px-3 py-1 rounded-full font-bold border border-[#F2C94C]/30">
                        {initialData?.status || "مسودة"}
                    </span>
                </div>

                <div className="flex gap-2 mb-8">
                    <Button
                        onClick={() => onSave?.({
                            title: (document.querySelector('input[placeholder="اضف عنوان المقال ...."]') as HTMLInputElement)?.value || "",
                            description: editor?.getHTML(),
                            image: coverImage,
                            category: "عام",
                            author: "Admin",
                            tags,
                            status: "مسودة",
                            date: date
                        })}
                        variant="outline"
                        disabled={isSaving}
                        className="flex-1 bg-white border-[#EBEBEB] text-[#122F2A] hover:bg-zinc-50 font-medium h-10 rounded-lg shadow-sm text-[12px]"
                    >
                        {isSaving ? "جاري الحفظ..." : "حفظ المسودة"}
                    </Button>
                    <Button
                        onClick={() => {
                            // Gather all data
                            const data = {
                                title: (document.querySelector('input[placeholder="اضف عنوان المقال ...."]') as HTMLInputElement)?.value || "",
                                description: metaDescription, // This is meta desc, content is editor
                                content: editor?.getHTML(),
                                image: coverImage, // State managed image
                                category: (document.querySelector('select') as HTMLSelectElement)?.value || "",
                                author: "Admin",
                                tags,
                                status: "تم النشر",
                                publishedAt: date,
                                slug: (document.querySelector('input[placeholder="url-slug-example"]') as HTMLInputElement)?.value || ""
                            };
                            onSave?.(data);
                        }}
                        disabled={isSaving}
                        className="flex-1 bg-[#1A73E8] hover:bg-[#155db5] text-white font-bold h-10 rounded-lg text-[12px]"
                    >
                        {isSaving ? "جاري النشر..." : "نشر"}
                    </Button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-bold text-[#122F2A] text-sm">التنظيم</h3>

                        <div className="bg-white p-3 rounded-xl border border-[#EBEBEB] shadow-sm space-y-4">
                            <div>
                                <label className="text-xs font-bold text-[#122F2A] mb-1.5 block text-right">مؤلف</label>
                                <select
                                    className="w-full h-10 rounded-lg border border-[#EBEBEB] bg-white text-sm text-[#122F2A] px-2 outline-none"
                                    defaultValue={initialData?.author || ""}
                                >
                                    <option value="" disabled>اختر المؤلف</option>
                                    <option>ASSEM MOH.</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-[#122F2A] mb-1.5 block text-right">فئة</label>
                                <select
                                    className="w-full h-10 rounded-lg border border-[#EBEBEB] bg-white text-sm text-[#122F2A] px-2 outline-none"
                                    defaultValue={initialData?.category || ""}
                                >
                                    <option value="" disabled>اختر الفئة</option>
                                    <option>تبرعات</option>
                                    <option>حفر آبار</option>
                                    <option>حملات طبية</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-[#122F2A] text-sm">العلامات</h3>
                        <div className="bg-white p-1 rounded-xl border border-[#EBEBEB] shadow-sm flex items-center flex-wrap gap-1 min-h-[42px]">
                            {tags.map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs flex items-center gap-1 m-1">
                                    {tag}
                                    <span
                                        onClick={() => removeTag(tag)}
                                        className="cursor-pointer hover:text-red-500 font-bold ml-1"
                                    >×</span>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder={tags.length === 0 ? "أضف علامة..." : "..."}
                                className="flex-1 bg-transparent text-xs text-[#122F2A] min-w-[80px] outline-none px-2 h-8"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-[#122F2A] text-sm">تاريخ النشر</h3>
                        <div className="relative">
                            <Input
                                type="date"
                                value={date ? format(date, "yyyy-MM-dd") : ""}
                                onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                                min={new Date().toISOString().split('T')[0]}
                                dir="rtl"
                                className="bg-white border-[#EBEBEB] text-right h-12 font-mono rounded-xl block w-full outline-none focus:ring-1 focus:ring-[#2D9F75] text-[#122F2A]"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-[#E1E1E1] mt-4">
                        <h3 className="font-bold text-[#122F2A] text-sm mb-4">إعدادات تحسين محركات البحث</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-[#122F2A] mb-1.5 block text-right">URL SLUG</label>
                                <input
                                    type="text"
                                    className="w-full h-10 rounded-lg border border-[#EBEBEB] bg-white text-xs text-[#122F2A] px-3 outline-none"
                                    placeholder="url-slug-example"
                                    defaultValue={initialData?.slug || ""}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-[#122F2A] mb-1.5 block text-right">وصف ميتا</label>
                                <textarea
                                    className="w-full p-3 rounded-lg border border-[#EBEBEB] bg-white text-xs text-[#122F2A] h-24 resize-none outline-none leading-relaxed"
                                    placeholder="اكتب وصف ميتا..."
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    maxLength={160}
                                />
                                <div className="text-[10px] text-zinc-400 text-left mt-1">{metaDescription.length}/160</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
