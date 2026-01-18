"use client";

import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { Project } from "@/features/projects/types";

// Blog article data
const articleData = {
  title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة",
  titleHighlight: "لمساعدة أهل غزة",
  category: "التصنيف",
  date: "20 نوفمبر 2025",
  image: "/images/ac049d4dd7a08ce44ca76439fe3d3d1a5058f9f8.jpg",
  intro: `في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين حول العالم الذين يسعون لتخفيف معاناة أهله المحاصرين. فالحصار المستمر منذ أكثر من عقد ونصف، والعدوانات المتكررة، تسبّبت في أوضاع إنسانية مأساوية أثّرت على جميع جوانب الحياة — من السكن والتعليم، إلى الرعاية الصحية والغذاء والمياه. ومن هنا، تبرز أهمية الجمعيات الخيرية الموثوقة في غزة، تلك التي تعمل بإخلاص واحترافية لإيصال المساعدات لمستحقيها عبر قنوات شفافة وآمنة. لكن في عالم يعج بالمبادرات، كيف يمكننا أن نميز بين الجمعيات الحقيقية وتلك التي تستغل العواطف لجمع الأموال دون أثر فعلي؟`,
  imageCaption: `في هذا المقال، سنقدّم لك دليلًا شاملًا يوضح معايير اختيار الجمعيات الموثوقة، وكيفية التحقق من مصداقيتها، مع تسليط الضوء على نموذج متميز هو جمعية الرحمة والإحسان التي باتت من أبرز الجمعيات التي تُعنى بخدمة أهل غزة من خلال مشاريعها النوعية ومصداقيتها العالية.`,
};

const tableOfContents = [
  { id: "criteria", title: "معايير اختيار الجمعيات", active: true },
  { id: "credibility", title: "مصداقية الجمعية" },
  { id: "association", title: "جمعية الرحمة والإحسان" },
  { id: "projects", title: "أهم المشاريع الخيرية" },
  { id: "donate", title: "كيفية التبرع" },
];

type SectionItem = {
  number: string;
  title: string;
  content: string;
  list?: string[];
};

type ArticleSection = {
  id: string;
  title: string;
  intro: string;
  items: SectionItem[];
};

const articleSections: ArticleSection[] = [
  {
    id: "criteria",
    title: "ما هي معايير اختيار أفضل الجمعيات الخيرية لمساعدة أهل غزة؟",
    intro: "يعتقد الكثير من الناس أن التبرع لأي جهة خيرية يعني بالضرورة أن الأموال ستصل إلى المحتاجين، لكن الواقع يُظهر أن هناك تفاوتًا كبيرًا في كفاءة وموثوقية الجمعيات. لذلك، يجب اعتماد معايير دقيقة لاختيار أفضل الجمعيات الخيرية في غزة، لضمان أن التبرع يحقق أثرًا حقيقيًا.",
    items: [
      { number: "أولاً", title: "الترخيص والاعتراف القانوني", content: "من أهم المؤشرات على موثوقية أي جمعية أن تكون مسجلة رسميًا لدى الجهات الحكومية المختصة، سواء في فلسطين أو في البلدان التي تنشط منها. الجمعيات المرخصة تخضع لرقابة دورية وتلتزم بمعايير المحاسبة والشفافية، مما يمنح المتبرعين الثقة بأن أموالهم تُدار وفق الأصول القانونية." },
      { number: "ثانيًا", title: "الشفافية المالية والإدارية", content: "تتجلّى المصداقية في الوضوح المالي والإداري. فالجمعيات الخيرية الموثوقة في غزة تنشر تقارير دورية تفصيلية تُظهر حجم التبرعات ومصارفها، وتقدّم بيانات دقيقة عن المشاريع المنفذة." },
      { number: "ثالثًا", title: "التجربة الميدانية والخبرة المحلية", content: "تتمتع الجمعيات ذات الوجود الفعلي داخل غزة بقدرة أعلى على تنفيذ المشاريع بسرعة ودقة، لكونها تتعامل مباشرة مع العائلات والمؤسسات المحلية." },
      { number: "رابعًا", title: "الشراكات الاستراتيجية", content: "تتعاون الجمعيات الموثوقة مع منظمات دولية مثل الأونروا (UNRWA)، والهلال الأحمر الفلسطيني، ومنظمة الصحة العالمية." },
      { number: "خامسًا", title: "السمعة الإعلامية والتفاعل المجتمعي", content: "تتعاون الجمعيات الموثوقة مع منظمات دولية مثل الأونروا (UNRWA)، والهلال الأحمر الفلسطيني، ومنظمة الصحة العالمية." },
    ],
  },
  {
    id: "credibility",
    title: "كيفية التأكد من مصداقية الجمعية الخيرية؟",
    intro: "مع انتشار حملات التبرع عبر الإنترنت، ازدادت الحاجة إلى التأكد من مصداقية الجمعيات الخيرية في غزة قبل إرسال أي مبلغ مالي. إليك مجموعة من الطرق الفعالة للتحقق من موثوقية الجهة التي ترغب في دعمها.",
    items: [
      { number: "أولاً", title: "زيارة الموقع الإلكتروني الرسمي", content: "يُعد الموقع الإلكتروني أول مؤشر على الجدية. تأكد من أن الموقع:", list: ["يحتوي على نطاق رسمي (وليس مدونة مجانية).", "يذكر الترخيص القانوني للجمعية.", "يقدم تقارير سنوية وأنشطة حديثة موثقة بالصور والفيديو.", "يوفر وسائل تواصل حقيقية مثل الهاتف والعنوان والبريد الإلكتروني."] },
      { number: "ثانيًا", title: "مراجعة صفحات التواصل الاجتماعي", content: "تُعد المنصات الرقمية مرآة حقيقية لأنشطة الجمعية. تحقق من:", list: ["انتظام النشر وتنوع المحتوى.", "التفاعل الحقيقي مع المتابعين.", "وجود صور وفيديوهات ميدانية حقيقية من غزة.", "خلو الصفحة من الشعارات المجهولة أو الحملات غير الموثقة."] },
      { number: "ثالثًا", title: "الاطلاع على آراء المتبرعين السابقين", content: "تتيح لك التعليقات والتقييمات معرفة تجارب الآخرين. الجمعيات الموثوقة عادةً ما تحظى بسمعة طيبة وشهادات شكر من متبرعين أو مؤسسات إعلامية." },
      { number: "رابعًا", title: "فحص التقارير المالية المنشورة", content: "الجمعيات الجادة تنشر بيانات مالية سنوية تبين حجم التبرعات ومجالات الصرف بالتفصيل. إذا كانت الجمعية لا تقدم هذه المعلومات، فذلك يثير علامة استفهام حول مدى شفافيتها." },
      { number: "خامسًا", title: "التواصل المباشر مع الجمعية", content: "قبل التبرع، يمكنك التواصل مع إدارة الجمعية أو ممثليها وسؤالهم عن مشاريع محددة. الجمعية الجادة ترد بسرعة وتقدم معلومات دقيقة عن نشاطاتها." },
    ],
  },
];

const surveyQuestions = [
  { id: "q1", question: "هل تؤمن أن الإنسان قد يُنقذ حياة إنسان آخر؟", options: ["نعم", "أحيانًا", "لم أفكر في الأمر"] },
  { id: "q2", question: "هل سبق أن ساعدك أحد في وقت ضيق؟", options: ["نعم، ولن أنسى", "نعم، وكان له أثر كبير", "لا، لكني أتمنى ذلك"] },
  { id: "q3", question: "هل تعلم أن تبرعًا بسيطًا قد يكون سببًا في:", options: ["علاج مريض", "إطعام أسرة", "تعليم طفل", "إعفاف أرملة"] },
  { id: "q4", question: "هل تعلم أن تبرعًا بسيطًا قد يكون سببًا في:", options: ["علاج مريض", "إطعام أسرة", "تعليم طفل", "إعفاف أرملة"] },
  { id: "q5", question: "ما الذي يمنعك غالبًا من التبرع؟", options: ["ضيق الوقت", "الخوف من عدم وصول التبرع", "لا أعرف أين أتبرع", "لا شيء، أتبرع حين أستطيع"] },
  { id: "q6", question: "لو علمت أن مساهمتك الآن ستصل مباشرة لمستحقها، هل تحب أن تكون سببًا؟", options: ["نعم", "بالتأكيد"] },
];

const relatedArticles = [
  { id: "1", title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة", excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين...", date: "20 نوفمبر 2025", category: "التصنيفات", image: "/figma/blog-article.jpg" },
  { id: "2", title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة", excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين...", date: "20 نوفمبر 2025", category: "التصنيفات", image: "/figma/blog-article.jpg" },
  { id: "3", title: "أفضل الجمعيات الموثوقة لمساعدة أهل غزة", excerpt: "في خضم الأزمات المتتالية التي يعاني منها قطاع غزة، يتجدّد الأمل دائمًا بجهود الخيرين...", date: "20 نوفمبر 2025", category: "التصنيفات", image: "/figma/blog-article.jpg" },
];

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "حفر 5 آبار مياه في شمال غزة",
    description: "أدت الحرب المستمرة في غزة إلى تدمير واسع لشبكات المياه وانقطاعها عن آلاف العائلات، خصوصاً في شمال القطاع الذي يعاني من النزوح...",
    category: "humanitarian",
    collected: 3261,
    goal: 100000,
  },
  {
    id: "2",
    title: "حفر 5 آبار مياه في شمال غزة",
    description: "أدت الحرب المستمرة في غزة إلى تدمير واسع لشبكات المياه وانقطاعها عن آلاف العائلات، خصوصاً في شمال القطاع الذي يعاني من النزوح...",
    category: "humanitarian",
    collected: 3261,
    goal: 100000,
  },
  {
    id: "3",
    title: "حفر 5 آبار مياه في شمال غزة",
    description: "أدت الحرب المستمرة في غزة إلى تدمير واسع لشبكات المياه وانقطاعها عن آلاف العائلات، خصوصاً في شمال القطاع الذي يعاني من النزوح...",
    category: "humanitarian",
    collected: 3261,
    goal: 100000,
  },
];

type CharityProjectItem = {
  ordinal: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const charityProjectsSection = {
  title: "ما هي أهم المشاريع الخيرية التي تنفذها جمعية الرحمة والإحسان في غزة؟",
  intro: "تعمل الجمعية وفق خطة استراتيجية شاملة تهدف إلى تحسين حياة الأسر الفلسطينية في غزة من خلال مشاريع متنوعة تشمل المجالات التالية:",
  items: [
    {
      ordinal: "أولاً",
      title: "مشاريع الإيواء وإعادة الإعمار",
      paragraphs: [
        "بسبب الدمار الكبير الذي خلّفته الحروب، تولي الجمعية اهتمامًا خاصًا بمشاريع ترميم وإعادة بناء المنازل المهدمة، وتقديم مساعدات عاجلة للعائلات التي فقدت مأواها. وقد تمكنت خلال السنوات الماضية من إعادة إسكان مئات العائلات بفضل دعم المتبرعين من مختلف الدول.",
      ],
    },
    {
      ordinal: "ثانيًا",
      title: "مشاريع الإغاثة الغذائية",
      paragraphs: [
        "تُعتبر المساعدات الغذائية من أهم ركائز عمل الجمعية. فهي تنفّذ حملات توزيع السلال الغذائية والطرود الشهرية، إضافة إلى برامج الإفطار في رمضان ومبادرات “سلة الخير” في المواسم الصعبة. وتُقدّر أعداد الأسر المستفيدة سنويًا بالآلاف، مما يجعل أثر هذه المشاريع ملموسًا في حياة سكان غزة.",
      ],
    },
    {
      ordinal: "ثالثًا",
      title: "المشاريع الصحية والطبية",
      paragraphs: ["تواجه غزة أزمة مزمنة في القطاع الصحي، ولذلك تعمل الجمعية على:"],
      bullets: [
        "دعم المستشفيات بالمعدات الطبية.",
        "توفير الأدوية للمرضى المزمنين.",
        "تمويل العمليات الجراحية العاجلة.",
        "تنظيم القوافل الطبية في المناطق المهمّشة.",
      ],
    },
    {
      ordinal: "رابعًا",
      title: "التعليم ورعاية الأيتام",
      paragraphs: [
        "تهتم الجمعية بقطاع التعليم عبر كفالة الطلبة الجامعيين وتقديم المنح الدراسية للمتفوقين، كما تُشرف على برنامج كفالة الأيتام الذي يضمن لهم حياة كريمة وفرصة لمواصلة تعليمهم.",
      ],
    },
    {
      ordinal: "خامسًا",
      title: "مشاريع المياه والصرف الصحي",
      paragraphs: [
        "تسعى الجمعية لتأمين مصادر مياه نظيفة من خلال حفر الآبار وتوزيع خزانات مياه للأحياء الفقيرة، والمساهمة في مشاريع الصرف الصحي التي تحافظ على الصحة العامة.",
      ],
    },
    {
      ordinal: "سادساً",
      title: "مشاريع الطاقة الشمسية",
      paragraphs: [
        "في ظل أزمة الكهرباء المزمنة، أطلقت الجمعية مبادرات لتركيب أنظمة طاقة شمسية للمنازل والمدارس والمراكز الطبية لتخفيف معاناة السكان وضمان استمرارية الخدمات.",
      ],
    },
    {
      ordinal: "سابعاً",
      title: "برامج التمكين الاقتصادي",
      paragraphs: [
        "تركّز الجمعية أيضًا على تمكين الأسر المنتجة عبر توفير مشاريع صغيرة مدرّة للدخل مثل دعم الورش الحرفية والمشاريع النسائية، بما يحقق استدامة اقتصادية ويحفظ كرامة الأسر.",
        "هذه المشاريع المتنوعة والمتكاملة تجعل من جمعية الرحمة والإحسان من أهم وأبرز الجمعيات الخيرية الموثوقة في غزة التي تعمل على تحسين جودة الحياة بشكل شامل ومستدام.",
      ],
    },
  ] satisfies CharityProjectItem[],
};

export default function BlogDetailPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(150);
  const [customAmount, setCustomAmount] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({
    q1: "نعم",
    q2: "نعم، ولن أنسى",
    q3: "علاج مريض",
    q4: "علاج مريض",
    q5: "ضيق الوقت",
    q6: "نعم",
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [burstingFavs, setBurstingFavs] = useState<Set<string>>(new Set());

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
        setBurstingFavs((b) => new Set(b).add(id));
        setTimeout(() => {
          setBurstingFavs((b) => {
            const newB = new Set(b);
            newB.delete(id);
            return newB;
          });
        }, 600);
      }
      return newFavs;
    });
  };

  const handleDonate = (project: Project) => {
    console.log("Donate to project:", project);
  };

  return (
    <div className="w-full bg-[#fafafa]" dir="rtl">
      {/* Hero Section */}
      <section className="bg-[#007f5e] py-20 md:py-20 pb-15 text-center relative">
        <Container>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.25">
              <span className="font-alexandria font-medium text-base text-white/90 leading-normal">تبرعك اليوم يصنع أثرًا لا يُنسى</span>
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <path d="M14 2.33C7.56 2.33 2.33 7.56 2.33 14s5.23 11.67 11.67 11.67S25.67 20.44 25.67 14 20.44 2.33 14 2.33z" stroke="white" strokeWidth="1.5"/>
                <path d="M14 18.67V9.33M9.33 14h9.34" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="font-alexandria font-bold text-4xl md:text-[64px] text-white m-0 leading-[1.45]">تفاصيل المقال</h1>
            <nav className="flex items-center gap-2 font-alexandria text-base mt-2">
              <div className="flex items-center gap-1.25">
                <span className="text-white font-medium">حفر 5 آبار مياه في شمال غزة</span>
                <svg className="w-6 h-6 rotate-180" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                <Link href="/blog" className="text-white/80 no-underline transition-colors hover:text-white">المدونة</Link>
                <svg className="w-6 h-6 rotate-180" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                <Link href="/" className="text-white/80 no-underline transition-colors hover:text-white">الرئيسية</Link>
              </div>
              <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </nav>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-25 bg-[#fafafa]">
        <Container>
          {/* Article Header */}
          <div className="flex flex-col gap-5 mb-10">
            <h2 className="font-alexandria font-bold text-[30px] text-[#0d0d0d] m-0 leading-normal">
              أفضل الجمعيات الموثوقة <span className="text-[#007f5e]">{articleData.titleHighlight}</span>
            </h2>
            <p className="font-alexandria font-normal text-xl text-[#0d0d0d]/70 leading-normal m-0">{articleData.intro}</p>
          </div>

          {/* Featured Image */}
          <div className="relative w-full max-w-7xl h-175 rounded-[20px] overflow-hidden mb-6">
            <Image src={articleData.image} alt={articleData.title} fill className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-between pt-6 pr-6 pb-11.75 pl-6" style={{background: 'linear-gradient(transparent 0%, rgba(0, 0, 0, 0.5) 53.61%), linear-gradient(transparent 40.107%, rgba(0, 0, 0, 0.7) 74.361%)'}}>
              <div className="flex justify-start">
                <span className="bg-[#007f5e] text-white font-alexandria font-medium text-sm py-2 px-4 rounded-[29px] border border-white/50 leading-normal">{articleData.category}</span>
              </div>
              <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
                <p className="font-alexandria font-normal text-base text-white leading-normal max-w-202 m-0">{articleData.imageCaption}</p>
                <button className="flex items-center justify-center gap-2.5 bg-[#007f5e] text-white font-alexandria font-bold text-base py-4 px-8 rounded-[35px] border-none cursor-pointer transition-all duration-300 whitespace-nowrap hover:bg-[#006b4f] hover:-translate-y-0.5">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  تبرع الأن
                </button>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-evenly bg-white/10 border border-[#007f5e]/10 rounded-[20px] p-4 md:px-8 mb-6 shadow-[0_0_17.3px_rgba(0,127,94,0.07),inset_0_0_5.8px_rgba(0,0,0,0.25)] gap-4">
            <span className="font-alexandria font-medium text-xl text-[#323234] leading-normal">محتويات</span>
            <div className="flex flex-wrap items-center gap-6 justify-start">
              {tableOfContents.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={`font-alexandria font-medium text-base text-[#232325] no-underline py-2.5 px-3 border border-[#f0f1f2] rounded-xl transition-all duration-200 leading-normal hover:bg-[#007f5e]/5 hover:border-[#007f5e]/20 ${item.active ? 'bg-[#007f5e]/10 shadow-[0_0_4px_rgba(0,0,0,0.25)]' : ''}`}>{item.title}</a>
              ))}
            </div>
          </div>

          {/* Article Sections */}
          <div className="flex flex-col gap-10 mb-15">
            {articleSections.map((section) => (
              <div key={section.id} id={section.id} className="flex flex-col gap-6">
                <div className="flex items-center justify-start gap-2.5">
                  <svg className="w-8 h-8 shrink-0" viewBox="0 0 32 32"><path d="M16 2l2 12 12 2-12 2-2 12-2-12-12-2 12-2 2-12z" fill="#007F5E"/></svg>
                  <h3 className="font-alexandria font-semibold text-2xl text-[#232325] m-0 leading-normal text-right">{section.title}</h3>
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 max-w-228 ml-auto text-justify">{section.intro}</p>
                <div className="flex flex-col gap-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="bg-white rounded-[20px] p-1 px-4 flex flex-col gap-2">
                      <div className="flex items-center justify-start gap-2.5 leading-normal">
                        <span className="font-alexandria font-semibold text-xl text-[#232325]">{item.number}</span>
                        <span className="font-alexandria font-bold text-base text-[#232325]">{item.title}</span>
                      </div>
                      <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-justify">{item.content}</p>
                      {item.list && (
                        <ul className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 mr-6 list-disc space-y-1">
                          {item.list.map((listItem: string, idx: number) => (
                            <li key={idx}>{listItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>


          {/* Important Projects Section */}
          <div className="bg-[rgba(255,255,255,0.5)] flex flex-col gap-8 items-start pb-25 pt-12.5 mb-15">
            <div className="flex items-center justify-between w-full">

              <div className="flex flex-col gap-2.5 items-start">
                <div className="flex gap-1.25 items-center justify-center">
                  <span className="font-[Playpen_Sans_Arabic,Alexandria] font-normal text-base text-[#007f5e] leading-normal">كن أنت سبب الأمل</span>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M12 2v20M2 12h20" stroke="#007F5E" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="font-alexandria font-semibold text-[30px] text-[#232325] m-0 text-right">كن علي اطلاع بأهم المشاريع</h2>
              </div>
              <button className="bg-[#007f5e] flex gap-2.5 items-center justify-center px-8 py-4 rounded-[35px]">
                <svg className="w-5 h-5 rotate-90" viewBox="0 0 20 20">
                  <path d="M10 4v12M16 10H4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="font-alexandria font-bold text-base text-white leading-normal">مشاهدة المزيد</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
              {sampleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFav={favorites.has(project.id)}
                  isBursting={burstingFavs.has(project.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onDonate={handleDonate}
                />
              ))}
            </div>
          </div>

          
          {/* Credibility Details (from Figma) */}
          <div className="flex flex-col gap-6 mb-15">
            <div className="flex items-center w-full gap-4">
              <div className="w-7 h-4 relative" aria-hidden>
                <svg className="w-full h-full" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.13275 6.29425e-05C1.15631 4.68031 3.409 7.72506 6.14062 9.41006C4.07419 8.92194 2.07488 8.19238 0 7.10725C1.59375 11.9503 5.07281 13.0957 8.11912 12.7791C6.43581 13.6699 4.65712 14.3605 2.87306 14.828C7.21344 17.5244 10.3799 15.8566 12.1399 13.4957C12.0112 13.3802 11.8817 13.2657 11.7514 13.1521C11.4268 12.921 11.1184 12.6552 10.8277 12.3577C10.4547 12.0392 10.0749 11.7142 9.69194 11.3746C7.58894 9.50975 5.44331 7.27369 5.35256 4.32269L5.35244 4.31331C4.15575 2.93475 3.07294 1.48181 2.13281 0L2.13275 6.29425e-05ZM27.3165 6.29425e-05C26.3765 1.48163 25.2935 2.934 24.0968 4.31213L24.0971 4.317C24.1838 7.18994 22.0048 9.48325 19.8491 11.4036C18.9822 12.1758 18.1078 12.8926 17.3551 13.5561C19.1237 15.8849 22.2728 17.5014 26.5763 14.828C24.7924 14.3605 23.0151 13.6699 21.3319 12.7792C24.378 13.0952 27.8557 11.9493 29.4492 7.10738C27.3744 8.19256 25.375 8.92212 23.3086 9.41019C26.0401 7.72506 28.2929 4.6805 27.3164 0.000187874L27.3165 6.29425e-05ZM19.0402 0.248625C17.6561 0.25925 16.2031 0.98925 15.2262 2.64613L14.7397 3.47113L14.2562 2.64438C13.0392 0.564 10.8566 -0.0820622 9.12187 0.41H9.12125C7.59087 0.844188 6.40963 2.09481 6.47706 4.288C6.55125 6.70113 8.38969 8.71625 10.4383 10.5329C11.4627 11.4412 12.5233 12.2906 13.4016 13.1279C13.9239 13.6259 14.3876 14.118 14.7348 14.6367C15.0828 14.1544 15.5425 13.6903 16.0609 13.208C16.9597 12.3715 18.0519 11.4978 19.1009 10.5634C21.1988 8.69463 23.0412 6.61869 22.9727 4.351C22.9029 2.04013 21.5526 0.70225 19.9341 0.343063C19.6407 0.277895 19.3408 0.246172 19.0402 0.2485L19.0402 0.248625Z" fill="#007F5E"/></svg>
              </div>
              <h2 className="font-alexandria font-semibold text-2xl text-[#232325] m-0 text-right">لماذا تعتبر جمعية الرحمة والإحسان من أفضل الجمعيات الموثوقة في غزة؟</h2>
            </div>
            <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">تُعد جمعية الرحمة والإحسان نموذجًا رائدًا بين الجمعيات الخيرية الموثوقة في غزة، حيث جمعت بين الأصالة في العمل الإنساني، والاحترافية في الإدارة، والالتزام بالشفافية في كل ما تقوم به.</p>

            <div className="flex flex-col gap-6 items-start text-right">
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full">
                  <p className="font-alexandria font-semibold text-xl m-0">أولاً</p>
                  <p className="font-alexandria font-bold text-base text-[#232325] m-0">تاريخ حافل بالإنجازات</p>
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0">منذ تأسيسها، وضعت الجمعية نصب عينيها هدفًا ساميًا: دعم الإنسان الغزي بكل الوسائل الممكنة، سواء عبر المساعدات الطارئة أو المشاريع التنموية المستدامة. وقد أثبتت وجودها على الأرض من خلال حضورها الميداني الفاعل في جميع محافظات غزة.</p>
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full">
                  <p className="font-alexandria font-semibold text-xl m-0">ثانيًا</p>
                  <p className="font-alexandria font-bold text-base text-[#232325] m-0">التزام كامل بالشفافية</p>
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0">تلتزم الجمعية بمعايير صارمة في الإدارة المالية ونشر التقارير. فهي تنشر بانتظام تفاصيل المشاريع المنفذة والتبرعات المستلمة، مما جعلها تحظى بثقة كبيرة من المتبرعين في العالم العربي، وتركيا ودول الخليج.</p>
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full">
                  <p className="font-alexandria font-semibold text-xl m-0">ثالثًا</p>
                  <p className="font-alexandria font-bold text-base text-[#232325] m-0">كوادر مؤهلة وميدانية</p>                 
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0">تمتلك الجمعية فريقًا متخصصًا من المهندسين والأطباء والإداريين الذين يعملون بتنسيق كامل داخل القطاع، مما يضمن سرعة الاستجابة للحالات الطارئة وتوزيع المساعدات بعدالة وفعالية.</p>
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full">
                  <p className="font-alexandria font-semibold text-xl m-0">رابعًا</p>                    
                  <p className="font-alexandria font-bold text-base text-[#232325] m-0">علاقات تعاون دولية</p>
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0">نجحت الجمعية في بناء شراكات وثيقة مع منظمات إنسانية تركية وعربية، مما مكّنها من توسيع نطاق مشاريعها وزيادة تأثيرها على الأرض.</p>
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full">
                  <p className="font-alexandria font-semibold text-xl m-0">خامسًا</p>
                  <p className="font-alexandria font-bold text-base text-[#232325] m-0">سمعة إعلامية طيبة</p>
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0">تحظى جمعية الرحمة والإحسان بتغطية إعلامية إيجابية في الصحف والقنوات والمنصات الرقمية، بفضل شفافيتها وأسلوبها الإنساني النبيل في إدارة العمل الخيري.</p>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative w-full max-w-182 h-45 md:h-22.5 rounded-[20px] overflow-hidden mb-15 bg-white border border-[#007f5e]/10 mx-auto">
            <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-px bg-white h-full">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/ac049d4dd7a08ce44ca76439fe3d3d1a5058f9f8.jpg"
                  alt="Children / People"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/unsplash_Xz5kTUYAu9A.png"
                  alt="Symbolic flower / life"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/main-page-bg.jpg"
                  alt="Urban destruction / ruins"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/help-them.png"
                  alt="Field worker"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_5.8px_0px_rgba(0,127,94,0.3)] pointer-events-none" />
          </div>

          {/* Charity Projects (from Figma) */}
          <div id="projects" className="flex flex-col gap-6 mb-15">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-center gap-2.5 w-full">
                <div className="w-7 h-4 relative" aria-hidden>
                  <svg className="w-full h-full" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.13275 6.29425e-05C1.15631 4.68031 3.409 7.72506 6.14062 9.41006C4.07419 8.92194 2.07488 8.19238 0 7.10725C1.59375 11.9503 5.07281 13.0957 8.11912 12.7791C6.43581 13.6699 4.65712 14.3605 2.87306 14.828C7.21344 17.5244 10.3799 15.8566 12.1399 13.4957C12.0112 13.3802 11.8817 13.2657 11.7514 13.1521C11.4268 12.921 11.1184 12.6552 10.8277 12.3577C10.4547 12.0392 10.0749 11.7142 9.69194 11.3746C7.58894 9.50975 5.44331 7.27369 5.35256 4.32269L5.35244 4.31331C4.15575 2.93475 3.07294 1.48181 2.13281 0L2.13275 6.29425e-05ZM27.3165 6.29425e-05C26.3765 1.48163 25.2935 2.934 24.0968 4.31213L24.0971 4.317C24.1838 7.18994 22.0048 9.48325 19.8491 11.4036C18.9822 12.1758 18.1078 12.8926 17.3551 13.5561C19.1237 15.8849 22.2728 17.5014 26.5763 14.828C24.7924 14.3605 23.0151 13.6699 21.3319 12.7792C24.378 13.0952 27.8557 11.9493 29.4492 7.10738C27.3744 8.19256 25.375 8.92212 23.3086 9.41019C26.0401 7.72506 28.2929 4.6805 27.3164 0.000187874L27.3165 6.29425e-05ZM19.0402 0.248625C17.6561 0.25925 16.2031 0.98925 15.2262 2.64613L14.7397 3.47113L14.2562 2.64438C13.0392 0.564 10.8566 -0.0820622 9.12187 0.41H9.12125C7.59087 0.844188 6.40963 2.09481 6.47706 4.288C6.55125 6.70113 8.38969 8.71625 10.4383 10.5329C11.4627 11.4412 12.5233 12.2906 13.4016 13.1279C13.9239 13.6259 14.3876 14.118 14.7348 14.6367C15.0828 14.1544 15.5425 13.6903 16.0609 13.208C16.9597 12.3715 18.0519 11.4978 19.1009 10.5634C21.1988 8.69463 23.0412 6.61869 22.9727 4.351C22.9029 2.04013 21.5526 0.70225 19.9341 0.343063C19.6407 0.277895 19.3408 0.246172 19.0402 0.2485L19.0402 0.248625Z" fill="#007F5E" />
                  </svg>
                </div>                
                <h2 className="flex-1 font-alexandria font-semibold text-2xl text-[#232325] m-0 leading-normal text-right">
                  {charityProjectsSection.title}
                </h2>
              </div>
              <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">
                {charityProjectsSection.intro}
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full">
              {charityProjectsSection.items.map((item) => (
                <div key={`${item.ordinal}-${item.title}`} className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-start gap-2.5 w-full leading-normal text-right">
                    <span className="font-alexandria font-semibold text-xl text-[#0d0d0d]">{item.ordinal}</span>
                    <span className="font-alexandria font-bold text-base text-[#232325]">{item.title}</span>
                  </div>

                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">
                      {paragraph}
                    </p>
                  ))}

                  {item.bullets && (
                    <ul className="font-alexandria font-normal text-base text-[#4f4f52] leading-8 m-0 pr-6 list-disc space-y-1 text-right">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Survey Section */}
          <div className="bg-white border border-black/10 rounded-[20px] px-8 py-12.5 shadow-[0_1px_22.5px_rgba(0,127,94,0.09)] mb-15 flex items-start justify-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
              <Image src="/figma/dbTxSUX1Wcv6ygDKuKfddW7W2JVfCEEsqXENmzcu 1.png" alt="" fill className="object-cover" />
            </div>

            <div className="flex flex-col gap-8 items-center w-full px-4 relative z-10">
              <h2 className="font-alexandria font-semibold text-2xl text-[#0d0d0d] m-0 leading-normal w-full text-right">
                <span className="text-[#007f5e]">اسأل نفسك</span>… ثم قرر أن تُغيّر حياة إنسان
              </h2>

              <div className="flex flex-col gap-6 w-full">
                {surveyQuestions.map((q) => (
                  <div key={q.id} className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col items-end w-full">
                      <p className="font-alexandria font-normal text-xl text-[#0d0d0d]/70 m-0 tracking-[-0.2px] text-right w-full">
                        {q.question}
                      </p>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap gap-4 h-auto md:h-15 items-center justify-start w-full rounded-[20px]">
                      {q.options.map((option) => {
                        const isSelected = surveyAnswers[q.id] === option;
                        return (
                          <label key={option} className="flex items-center justify-center gap-2.5 h-15 px-4 cursor-pointer select-none">
                            <input
                              type="radio"
                              name={q.id}
                              value={option}
                              checked={isSelected}
                              onChange={() => setSurveyAnswers((p) => ({ ...p, [q.id]: option }))}
                              className="absolute opacity-0 pointer-events-none"
                            />

                            <span
                              className={`font-alexandria font-medium text-base leading-normal transition-colors duration-200 ${
                                isSelected ? "text-[#007f5e]" : "text-[#0d0d0d]/70 opacity-[0.67]"
                              }`}
                            >
                              {option}
                            </span>

                            <span
                              aria-hidden
                              className={`relative w-6 h-6 rounded-full border-2 shrink-0 transition-colors duration-200 ${
                                isSelected ? "border-[#007f5e]" : "border-[#0d0d0d]/20"
                              }`}
                            >
                              {isSelected && (
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#007f5e]" />
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full">
                <p className="font-alexandria font-semibold text-xl text-[#0d0d0d]/70 leading-normal m-0 text-center tracking-[-0.2px]">
                  قرارك الآن قد يكون الفارق في حياة إنسان لا تؤجل الخير… فالحاجة لا تنتظر
                </p>
                <p className="font-alexandria font-semibold text-xl text-[#0d0d0d]/70 leading-normal m-0 text-center tracking-[-0.2px]">
                  (نحن نضمن لك الشفافية ووصول التبرع)
                </p>
              </div>

              <button className="flex items-center justify-center gap-2.5 bg-[#007f5e] text-white font-alexandria font-semibold text-base py-4 px-8 rounded-[35px] border-none cursor-pointer w-full max-w-124 transition-all duration-300 hover:bg-[#006b4f] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,127,94,0.3)]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                تبرع الان
              </button>
            </div>
          </div>

          {/* Donation Methods Section (from Figma) */}
          <div id="donate" className="flex flex-col gap-6 mb-15">
            <div className="flex flex-col gap-4 items-start w-full">
              <div className="flex items-center justify-center gap-2.5 w-full">
                <div className="w-7 h-4 relative shrink-0" aria-hidden>
                  <svg className="w-full h-full" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.13275 6.29425e-05C1.15631 4.68031 3.409 7.72506 6.14062 9.41006C4.07419 8.92194 2.07488 8.19238 0 7.10725C1.59375 11.9503 5.07281 13.0957 8.11912 12.7791C6.43581 13.6699 4.65712 14.3605 2.87306 14.828C7.21344 17.5244 10.3799 15.8566 12.1399 13.4957C12.0112 13.3802 11.8817 13.2657 11.7514 13.1521C11.4268 12.921 11.1184 12.6552 10.8277 12.3577C10.4547 12.0392 10.0749 11.7142 9.69194 11.3746C7.58894 9.50975 5.44331 7.27369 5.35256 4.32269L5.35244 4.31331C4.15575 2.93475 3.07294 1.48181 2.13281 0L2.13275 6.29425e-05ZM27.3165 6.29425e-05C26.3765 1.48163 25.2935 2.934 24.0968 4.31213L24.0971 4.317C24.1838 7.18994 22.0048 9.48325 19.8491 11.4036C18.9822 12.1758 18.1078 12.8926 17.3551 13.5561C19.1237 15.8849 22.2728 17.5014 26.5763 14.828C24.7924 14.3605 23.0151 13.6699 21.3319 12.7792C24.378 13.0952 27.8557 11.9493 29.4492 7.10738C27.3744 8.19256 25.375 8.92212 23.3086 9.41019C26.0401 7.72506 28.2929 4.6805 27.3164 0.000187874L27.3165 6.29425e-05ZM19.0402 0.248625C17.6561 0.25925 16.2031 0.98925 15.2262 2.64613L14.7397 3.47113L14.2562 2.64438C13.0392 0.564 10.8566 -0.0820622 9.12187 0.41H9.12125C7.59087 0.844188 6.40963 2.09481 6.47706 4.288C6.55125 6.70113 8.38969 8.71625 10.4383 10.5329C11.4627 11.4412 12.5233 12.2906 13.4016 13.1279C13.9239 13.6259 14.3876 14.118 14.7348 14.6367C15.0828 14.1544 15.5425 13.6903 16.0609 13.208C16.9597 12.3715 18.0519 11.4978 19.1009 10.5634C21.1988 8.69463 23.0412 6.61869 22.9727 4.351C22.9029 2.04013 21.5526 0.70225 19.9341 0.343063C19.6407 0.277895 19.3408 0.246172 19.0402 0.2485L19.0402 0.248625Z" fill="#007F5E" />
                  </svg>
                </div>                
                <h2 className="flex-1 font-alexandria font-semibold text-2xl text-[#232325] m-0 leading-normal text-right">
                  كيفية التبرع ومساعدة أهل غزة عبر جمعية الرحمة والإحسان
                </h2>
              </div>
              <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">
                إدراكًا منها لأهمية تسهيل عملية التبرع، وفّرت الجمعية عدة طرق آمنة وسهلة للتبرع تناسب جميع المتبرعين إليك أهم الوسائل المعتمدة:
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full leading-normal text-right">
                  <span className="font-alexandria font-semibold text-xl text-[#232325]">أولاً</span>
                  <span className="font-alexandria font-bold text-base text-[#232325]">التبرع عبر بطاقات الائتمان</span>
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">
                  يمكنك التبرع بسهولة عبر الموقع الرسمي للجمعية باستخدام بطاقات الائتمان الدولية، في بيئة دفع آمنة وسريعة.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full leading-normal text-right">
                  <span className="font-alexandria font-semibold text-xl text-[#232325]">ثانيًا</span>
                  <span className="font-alexandria font-bold text-base text-[#232325]">التبرع عبر البنوك الإلكترونية</span>
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">
                  تتيح الجمعية إمكانية التبرع من خلال المنصات الإلكترونية الموثوقة مثل PayPal وغيرها من المحافظ الرقمية، مما يسهّل على المتبرعين في الخارج تقديم دعمهم فورًا.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full leading-normal text-right">
                  <span className="font-alexandria font-semibold text-xl text-[#0d0d0d]">ثالثًا</span>
                  <span className="font-alexandria font-bold text-base text-[#232325]">التبرع عبر الحساب البنكي</span>
                </div>
                <div className="flex flex-col gap-2 text-right">
                  <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-8 m-0">
                    للمهتمين بالتحويل المباشر، يمكن إرسال التبرعات إلى حسابات الجمعية في تركيا كما يلي:
                  </p>
                  <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-8 m-0">
                    بنك زراعات كاتلم
                  </p>
                  <ul className="font-alexandria font-normal text-base text-[#4f4f52] leading-8 m-0 pr-12 list-disc space-y-1">
                    <li>
                      حساب الليرة التركية:
                      <br />
                      IBAN: TR56 0020 9000 0223 7303 0000 01
                    </li>
                    <li>
                      حساب الدولار الأمريكي:
                      <br />
                      IBAN: TR29 0020 9000 0223 7303 0000 02
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full leading-normal text-right">
                  <span className="font-alexandria font-semibold text-xl text-[#0d0d0d]">رابعًا</span>
                  <span className="font-alexandria font-bold text-base text-[#232325]">التبرع بالعملات الرقمية</span>
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">
                  تماشيًا مع التطور التكنولوجي، تقبل الجمعية التبرعات عبر العملات الرقمية مثل البيتكوين والإيثيريوم لتوسيع خيارات المانحين.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-start gap-2.5 w-full leading-normal text-right">
                  <span className="font-alexandria font-semibold text-xl text-[#0d0d0d]">خامسًا</span>
                  <span className="font-alexandria font-bold text-base text-[#232325]">التبرعات المباشرة</span>
                </div>
                <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">
                  يمكن للراغبين بزيارة مقر الجمعية في إسطنبول التبرع بشكل مباشر والتعرّف على نشاطات الجمعية عن قرب، حيث يتم استقبال المتبرعين وتزويدهم بتقارير مفصّلة عن المشاريع الجارية.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full mt-5">
                <div className="flex items-center justify-start w-full">
                  <h3 className="font-alexandria font-bold text-base text-[#232325] leading-normal m-0 text-right">
                    خاتمة
                  </h3>
                </div>
                <div className="flex flex-col gap-5 w-full">
                  <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">
                    في عالمٍ يموج بالاحتياجات الإنسانية، يبقى فعل الخير أعظم استثمار في القيم والإنسانية. إن دعم أهل غزة ليس مجرّد عمل إحساني، بل هو رسالة ضمير حيّ تترجم التضامن والتكافل الإسلامي والإنساني بأجمل صوره. وبين عشرات الجمعيات، أثبتت جمعية الرحمة والإحسان أنها من أكثر الجمعيات الخيرية الموثوقة في غزة بفضل التزامها بالشفافية، واستمراريتها في العمل الميداني، وحرصها على بناء الثقة مع المتبرعين من مختلف أنحاء العالم.
                  </p>
                  <p className="font-alexandria font-normal text-base text-[#4f4f52] leading-normal m-0 text-right">
                    بادر الآن بالمساهمة — فكل تبرع، مهما كان صغيرًا، يمكن أن يُعيد الأمل إلى قلب أسرة فلسطينية تنتظر المساعدة لتعيش بكرامة.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Form */}
            <div className="flex flex-col items-center gap-4 p-4 rounded-[20px] mb-15 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[#007f5e]/3 before:pointer-events-none">
              <div className="flex items-center justify-center gap-2.5 relative z-10">
              <h2 className="font-alexandria font-semibold text-2xl text-[#232325] m-0 leading-normal">كم تريد التبرع اليوم</h2>
              <svg className="w-8 h-8" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" stroke="#007F5E" strokeWidth="2" fill="none"/><path d="M16 12v8M12 16h8" stroke="#007F5E" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <p className="font-alexandria font-normal text-base text-[#4f4f52] text-center leading-loose m-0 relative z-10">جميع التبرعات تؤثر بشكل مباشر على منظمتنا وتساعدنا على مواصلة مهمتنا</p>
            <div className="bg-white border border-black/10 rounded-[20px] py-4 px-8 shadow-[0_5px_12px_rgba(0,127,94,0.07)] w-full max-w-148 relative z-10">
              <div className="flex flex-col gap-6 px-4">
                <div className="flex flex-col gap-4">
                  <label className="font-alexandria font-normal text-lg text-[#0d0d0d]/70 tracking-[-0.18px]">حدد المبلغ</label>
                  <div className="flex flex-col md:flex-row gap-4 justify-start">
                    {[50, 100, 150].map((amount) => (
                      <button key={amount} className={`w-full md:w-41.25 h-15 border rounded-[20px] bg-transparent font-alexandria font-normal text-base cursor-pointer transition-all duration-200 hover:border-[#007f5e] ${selectedAmount === amount ? 'bg-[#007f5e]/10 border-[#007f5e] text-[#0d0d0d]/70' : 'border-[#0d0d0d]/20 text-[#0d0d0d]/70'}`} onClick={() => setSelectedAmount(amount)}>$ {amount}</button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="font-alexandria font-normal text-lg text-[#0d0d0d]/70 tracking-[-0.18px]">مبلغ مخصص</label>
                  <div className="flex items-center h-15 border border-[#0d0d0d]/20 rounded-[20px] overflow-hidden">
                    <input type="text" placeholder="أدخل القيمة" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} className="flex-1 h-full border-none px-4 font-alexandria font-light text-base text-[#0d0d0d]/70 bg-transparent focus:outline-none placeholder:text-[#0d0d0d]/50" />
                    <span className="px-4 font-alexandria font-light text-2xl text-[#0d0d0d]/70">$</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="font-alexandria font-normal text-lg text-[#0d0d0d]/70 tracking-[-0.18px]">الدولة</label>
                  <div className="flex items-center justify-between h-13.5 border-[0.5px] border-black/20 rounded-[10px] py-2.5 px-5 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Image src="/images/flags/palestine.svg" alt="Palestine" width={34} height={24} className="rounded-xs" />
                      <span className="font-alexandria font-normal text-base text-[#0d0d0d]/70 leading-normal">فلسطين</span>
                    </div>
                    <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2.5 w-full bg-[#007f5e] text-white font-alexandria font-semibold text-base py-4 px-8 rounded-[35px] border-none cursor-pointer transition-all duration-300 hover:bg-[#006b4f] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,127,94,0.3)]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  تبرع الان
                </button>
                <p className="font-alexandria font-normal text-base text-[#0d0d0d]/70 text-center leading-[1.6] m-0">معاملة مشفرة آمنة بتقنية SSL</p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="flex flex-col gap-8 pt-12.5">
            <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-1.25">
                  <span className="font-[Playpen_Sans_Arabic,Alexandria] font-normal text-base text-[#007f5e] leading-normal">كن أنت سبب الأمل</span>
                  <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" stroke="#007F5E" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <h2 className="font-alexandria font-semibold text-[30px] text-[#232325] m-0">مقالات</h2>
              </div>
              <button className="flex items-center justify-center gap-2.5 bg-[#007f5e] text-white font-alexandria font-bold text-base py-4 px-8 rounded-[35px] border-none cursor-pointer transition-all duration-300">
                <svg className="w-5 h-5 rotate-90" viewBox="0 0 20 20"><path d="M10 4v12M16 10H4" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                مشاهدة المزيد
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.25">
              {relatedArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.id}`} className="bg-white border-[0.5px] border-black/30 rounded-[20px] overflow-hidden p-2 no-underline flex flex-col gap-5 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:-translate-y-1">
                  <div className="relative h-65.5 rounded-[14px] overflow-hidden">
                    <Image src={article.image} alt={article.title} fill className="object-cover" />
                    <span className="absolute top-5 right-6.75 bg-white font-alexandria font-light text-xs text-[#0d0d0d] py-1 px-2.5 rounded-[60px] leading-normal">{article.category}</span>
                  </div>
                  <div className="flex flex-col gap-6 px-4 pb-8">
                    <div className="flex items-center justify-between font-alexandria font-normal text-sm text-[#0d0d0d] leading-5">
                      <span>{article.date}</span>
                      <span className="w-1.5 h-1.5 bg-[#0d0d0d] rounded-full"></span>
                      <span>في خضم الأزمات المتتالية التي</span>
                    </div>
                    <h3 className="font-alexandria font-normal text-lg text-[#0d0d0d] m-0 leading-[1.2] capitalize">{article.title}</h3>
                    <p className="font-alexandria font-normal text-sm text-[#0d0d0d]/70 m-0 leading-normal overflow-hidden line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center gap-2.5 py-2 px-4 font-alexandria font-normal text-sm text-[#0d0d0d]/70 leading-normal">
                      <span>إقراء المزيد</span>
                      <svg className="w-4 h-4 rotate-180" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
