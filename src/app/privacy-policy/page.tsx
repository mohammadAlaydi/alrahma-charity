import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Home } from "lucide-react";
import Image from "next/image";

export default function PrivacyPolicyPage() {
    return (
        <main className="w-full py-8 min-h-screen bg-white font-cairo" dir="rtl">
            {/* Header Section - Dashboard Style */}
            <div className="relative py-8 md:py-12 text-center md:text-right mb-8 overflow-hidden md:overflow-visible">
                {/* Decoration Left */}
                <div
                    className="absolute left-[-60px] top-1/2 -translate-y-1/2 mt-10 z-0 pointer-events-none"
                    style={{ width: '346.12px', height: '346.12px' }}
                >
                    <Image
                        src="/images/Group 1000009427.png"
                        alt=""
                        fill
                        className="object-contain opacity-50 md:opacity-100"
                    />
                </div>

                {/* Decoration Right */}
                <div
                    className="absolute right-[-80px] top-[60%] -translate-y-1/2 mt-10 z-0 pointer-events-none"
                    style={{ width: '350.69px', height: '360.33px' }}
                >
                    <div className="relative h-full w-full">
                        <div className="absolute right-[60px] top-0 h-[222.52px] w-[222.52px]">
                            <Image
                                src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 17.png"
                                alt=""
                                fill
                                className="object-contain opacity-50 md:opacity-100"
                            />
                        </div>
                        <div className="absolute right-[-0.5px] top-[120.53px] h-[222.52px] w-[222.52px]">
                            <Image
                                src="/images/الدليل الإرشادي لهوية جمعية رحمة v.02-2025_pages-to-jpg-0023 1 18.png"
                                alt=""
                                fill
                                className="object-contain opacity-50 md:opacity-100"
                            />
                        </div>
                    </div>
                </div>

                <Container>
                    <div className="relative z-10 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-[#122F2A]/60 font-medium mb-2">
                            <Link href="/" className="hover:text-[#122F2A] transition-colors flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                الرئيسية
                            </Link>
                            <span>/</span>
                            <span className="text-[#007F5E]">سياسة الخصوصية</span>
                        </div>
                        <h1 className="text-4xl md:text-[40px] md:leading-[70px] font-extrabold md:font-semibold text-black tracking-tight">سياسة الخصوصية</h1>
                    </div>
                </Container>
            </div>

            {/* Content Section - Wrapped in Dashboard Card Style */}
            <Container>
                <div className="p-0 md:p-0 min-h-[600px] relative">
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.02]"
                        style={{
                            backgroundImage: 'url("/images/pattern.png")',
                            backgroundSize: '400px',
                        }}
                    />

                    <div className="relative z-10 space-y-12 text-[#122F2A]">
                        {/* Introduction */}
                        <div className="prose prose-lg max-w-none text-[#122F2A]/80 leading-relaxed">
                            <p>
                                في جمعية رحمة والإحسان ("نحن"، "نا"، أو "خاصتنا")، نلتزم بحماية خصوصيتك وضمان أن بياناتك الشخصية محمية. تشرح سياسة الخصوصية هذه كيفية جمع واستخدام والكشف عن وحماية معلوماتك عند زيارة موقعنا الإلكتروني أو التفاعل مع خدماتنا، بما في ذلك التبرعات والمشاريع الخيرية.
                            </p>
                        </div>

                        {/* Who We Are */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/images/game-icons_space-needle.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="text-[#007F5E]"
                                />
                                <h2 className="text-2xl font-bold text-[#122F2A]">من نحن</h2>
                            </div>
                            <p className="text-[#122F2A]/80 leading-relaxed">
                                جمعية رحمة والإحسان هي مؤسسة خيرية مرخصة تهدف إلى تقديم الدعم الإنساني والإغاثي للمحتاجين، ومقرها في تركيا. نلتزم بأعلى معايير الشفافيه والنزاهة في جميع عملياتنا.
                                <br />
                                <strong>العنوان:</strong> إسطنبول، تركيا.
                                <br />
                                <strong>البريد الإلكتروني:</strong> info@rhmacharity.com
                            </p>
                        </section>

                        {/* When We Collect Data */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/images/game-icons_space-needle.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="text-[#007F5E]"
                                />
                                <h2 className="text-2xl font-bold text-[#122F2A]">متى نقوم بجمع بياناتك؟</h2>
                            </div>
                            <p className="text-[#122F2A]/80 leading-relaxed mb-3">
                                نقوم بجمع معلوماتك الشخصية في الحالات التالية:
                            </p>
                            <ul className="grid gap-3 list-none pr-0">
                                {[
                                    "عند إنشاء حساب على موقعنا الإلكتروني.",
                                    "عند التبرع لمشروع أو حملة خيرية عبر منصتنا.",
                                    "عند التواصل معنا عبر نماذج الاتصال أو البريد الإلكتروني.",
                                    "عند الاشتراك في نشرتنا البريدية.",
                                    "عند تصفح موقعنا (بيانات التصفح وملفات تعريف الارتباط).",
                                    "عند المشاركة في استبيانات أو فعاليات ننظمها."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[#122F2A]/80">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#007F5E] flex-shrink-0"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Data We Collect */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/images/game-icons_space-needle.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="text-[#007F5E]"
                                />
                                <h2 className="text-2xl font-bold text-[#122F2A]">البيانات التي نجمعها</h2>
                            </div>
                            <p className="text-[#122F2A]/80 leading-relaxed mb-3">
                                قد تشمل المعلومات التي نجمعها ما يلي:
                            </p>
                            <ul className="grid gap-3 list-none pr-0">
                                {[
                                    "المعلومات الشخصية: الاسم، رقم الهاتف، البريد الإلكتروني.",
                                    "بيانات الدفع: تفاصيل بطاقة الائتمان (يتم معالجتها بشكل آمن عبر مزودي خدمة دفع معتمدين ولا نقوم بتخزينها).",
                                    "العنوان ومعلومات الموقع الجغرافي (لأغراض الإيصالات والتوصيل إذا لزم الأمر).",
                                    "سجل التبرعات والمشاركات السابقة.",
                                    "المعلومات التقنية: عنوان IP، نوع المتصفح، ونظام التشغيل."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[#122F2A]/80">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#007F5E] flex-shrink-0"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* How We Use Data */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/images/game-icons_space-needle.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="text-[#007F5E]"
                                />
                                <h2 className="text-2xl font-bold text-[#122F2A]">كيف نستخدم بياناتك؟</h2>
                            </div>
                            <p className="text-[#122F2A]/80 leading-relaxed mb-3">
                                نستخدم بياناتك للأغراض التالية:
                            </p>
                            <ul className="grid gap-3 list-none pr-0">
                                {[
                                    "إتمام عمليات التبرع وإصدار الإيصالات الإلكترونية.",
                                    "التواصل معك بشأن مشاريعنا وتحديثات الجمعية (بموافقتك).",
                                    "تحسين تجربتك على الموقع وضمان عمله بكفاءة.",
                                    "الامتثال للمتطلبات القانونية والتنظيمية.",
                                    "الرد على استفساراتك وتقديم الدعم الفني."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[#122F2A]/80">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#007F5E] flex-shrink-0"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Data Protection */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/images/game-icons_space-needle.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="text-[#007F5E]"
                                />
                                <h2 className="text-2xl font-bold text-[#122F2A]">حماية وأمان بياناتك</h2>
                            </div>
                            <p className="text-[#122F2A]/80 leading-relaxed">
                                نحن نأخذ أمن بياناتك على محمل الجد. نطبق إجراءات أمنية تقنية وإدارية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف. نستخدم تقنيات التشفير (SSL) لحماية بياناتك أثناء النقل، ونقصر الوصول إلى المعلومات الشخصية على الموظفين الذين يحتاجون إليها لأداء عملهم.
                            </p>
                        </section>

                        {/* Third Parties */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/images/game-icons_space-needle.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="text-[#007F5E]"
                                />
                                <h2 className="text-2xl font-bold text-[#122F2A]">الطرف الثالث وخدمات خارجية</h2>
                            </div>
                            <p className="text-[#122F2A]/80 leading-relaxed">
                                لا نقوم ببيع أو تأجير أو المتاجرة ببياناتك الشخصية لأطراف ثالثة. قد نشارك بياناتك فقط مع:
                            </p>
                            <ul className="grid gap-3 list-none pr-0 mt-3">
                                {[
                                    "مزودي خدمات الدفع لمعالجة التبرعات بشكل آمن.",
                                    "مزودي خدمات البريد الإلكتروني لإرسال النشرات (في حال اشتراكك).",
                                    "الجهات الرسمية إذا كان ذلك مطلوباً بموجب القانون."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[#122F2A]/80">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#007F5E] flex-shrink-0"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Cookies */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/images/game-icons_space-needle.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="text-[#007F5E]"
                                />
                                <h2 className="text-2xl font-bold text-[#122F2A]">ملفات تعريف الارتباط (Cookies)</h2>
                            </div>
                            <p className="text-[#122F2A]/80 leading-relaxed">
                                يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل حركة المرور. يمكنك تعديل إعدادات المتصفح لرفض ملفات تعريف الارتباط، ولكن قد يؤثر ذلك على بعض وظائف الموقع.
                            </p>
                        </section>

                        {/* User Rights */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Image
                                    src="/images/game-icons_space-needle.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="text-[#007F5E]"
                                />
                                <h2 className="text-2xl font-bold text-[#122F2A]">ما هي حقوقك؟</h2>
                            </div>
                            <p className="text-[#122F2A]/80 leading-relaxed mb-3">
                                لديك الحق في:
                            </p>
                            <ul className="grid gap-3 list-none pr-0">
                                {[
                                    "الوصول إلى بياناتك الشخصية التي نحتفظ بها.",
                                    "تصحيح أي بيانات غير دقيقة.",
                                    "طلب حذف بياناتك (حق النسيان) في ظروف معينة.",
                                    "الاعتراض على معالجة بياناتك لأغراض التسويق المباشر."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[#122F2A]/80">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#007F5E] flex-shrink-0"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Contact Us */}
                        <section className="space-y-4 bg-[#F8F6F1] p-8 rounded-2xl border border-[#EBEBEB]">
                            <div className="flex items-center gap-3 mb-2">
                                <Image
                                    src="/images/game-icons_space-needle.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="text-[#007F5E]"
                                />
                                <h2 className="text-2xl font-bold text-[#122F2A]">تواصل معنا</h2>
                            </div>
                            <p className="text-[#122F2A]/80 leading-relaxed">
                                إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر:
                                <br />
                                <span className="font-bold text-[#007F5E] mt-2 block">info@rhmacharity.com</span>
                            </p>
                        </section>
                    </div>
                </div>
            </Container>
        </main>
    );
}
