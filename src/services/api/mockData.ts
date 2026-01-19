import { Campaign } from "./campaigns";
import { PaginatedResponse } from "@/types/api";

/**
 * Mock/fallback campaign data for development
 * Used when API is unavailable or returns errors
 */
export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    _id: "mock-1",
    title_ar: "حفر 5 آبار مياه في شمال غزة",
    title_en: "Digging 5 Water Wells in North Gaza",
    title_tr: "Kuzey Gazze'de 5 Su Kuyusu Kazma",
    description_ar:
      "أدت الحرب المستمرة في غزة إلى تدمير واسع لشبكات المياه وانقطاعها عن آلاف العائلات، خصوصاً في شمال القطاع الذي يعاني من النزوح...",
    description_en:
      "The ongoing war in Gaza has caused widespread destruction of water networks, cutting off thousands of families...",
    description_tr:
      "Gazze'deki devam eden savaş, su şebekelerinde yaygın tahribata neden olmuş, binlerce aileyi su kesintisine maruz bırakmıştır...",
    status: "ACTIVE" as Campaign["status"],
    financial_goal: 100000,
    current_amount: 3261,
    image_url: "https://via.placeholder.com/800x600/007F5E/FFFFFF?text=Water+Wells",
  },
  {
    _id: "mock-2",
    title_ar: "برنامج كفالة الطلاب المتضرّرين",
    title_en: "Student Sponsorship Program for Affected Students",
    title_tr: "Etkilenen Öğrenciler İçin Öğrenci Sponsorluk Programı",
    description_ar:
      "دعم تعليم الأطفال في غزة لضمان استمرارهم في الدراسة رغم الظروف الإنسانية الصعبة.",
    description_en:
      "Supporting children's education in Gaza to ensure they continue their studies despite difficult humanitarian conditions.",
    description_tr:
      "Zor insani koşullara rağmen çocukların eğitimlerine devam etmelerini sağlamak için Gazze'deki çocukların eğitimini desteklemek.",
    status: "ACTIVE" as Campaign["status"],
    financial_goal: 80000,
    current_amount: 12500,
    image_url: "https://via.placeholder.com/800x600/007F5E/FFFFFF?text=Education",
  },
  {
    _id: "mock-3",
    title_ar: "سلال غذائية عاجلة للعائلات النازحة",
    title_en: "Urgent Food Baskets for Displaced Families",
    title_tr: "Yerinden Edilmiş Aileler İçin Acil Gıda Sepetleri",
    description_ar: "تأمين سلال غذائية ومستلزمات معيشية للعائلات التي فقدت منازلها ومصدر رزقها.",
    description_en:
      "Providing food baskets and essential supplies for families who have lost their homes and livelihoods.",
    description_tr:
      "Evlerini ve geçim kaynaklarını kaybeden aileler için gıda sepetleri ve temel ihtiyaçlar sağlamak.",
    status: "ACTIVE" as Campaign["status"],
    financial_goal: 60000,
    current_amount: 25300,
    image_url: "https://via.placeholder.com/800x600/007F5E/FFFFFF?text=Food+Baskets",
  },
  {
    _id: "mock-4",
    title_ar: "حملة كسوة الأيتام",
    title_en: "Orphan Clothing Campaign",
    title_tr: "Yetim Giyim Kampanyası",
    description_ar: "تأمين الملابس والاحتياجات الأساسية للأيتام في قطاع غزة.",
    description_en: "Providing clothing and basic necessities for orphans in the Gaza Strip.",
    description_tr: "Gazze Şeridi'ndeki yetimler için giysi ve temel ihtiyaçlar sağlamak.",
    status: "ACTIVE" as Campaign["status"],
    financial_goal: 50000,
    current_amount: 9750,
    image_url: "https://via.placeholder.com/800x600/007F5E/FFFFFF?text=Orphans",
  },
  {
    _id: "mock-5",
    title_ar: "تجهيز عيادة ميدانية متنقلة",
    title_en: "Mobile Field Clinic Setup",
    title_tr: "Mobil Saha Kliniği Kurulumu",
    description_ar: "عيادة طبية متنقلة لتقديم الرعاية الطبية العاجلة في المناطق الأكثر تضررًا.",
    description_en:
      "A mobile medical clinic to provide urgent medical care in the most affected areas.",
    description_tr:
      "En çok etkilenen bölgelerde acil tıbbi bakım sağlamak için mobil bir tıbbi klinik.",
    status: "ACTIVE" as Campaign["status"],
    financial_goal: 120000,
    current_amount: 18900,
    image_url: "https://via.placeholder.com/800x600/007F5E/FFFFFF?text=Medical",
  },
  {
    _id: "mock-6",
    title_ar: "صندوق دعم الحالات الأشد احتياجًا",
    title_en: "Support Fund for Most Needy Cases",
    title_tr: "En Muhtaç Durumlar İçin Destek Fonu",
    description_ar: "صندوق مرن يستجيب لأشد الحالات إلحاحًا في مختلف مجالات الدعم والإغاثة.",
    description_en:
      "A flexible fund that responds to the most urgent cases in various areas of support and relief.",
    description_tr:
      "Çeşitli destek ve yardım alanlarında en acil durumlara yanıt veren esnek bir fon.",
    status: "ACTIVE" as Campaign["status"],
    financial_goal: 150000,
    current_amount: 33400,
    image_url: "https://via.placeholder.com/800x600/007F5E/FFFFFF?text=Emergency",
  },
];

/**
 * Get mock paginated response
 */
export function getMockCampaignsResponse(
  page: number = 1,
  limit: number = 20,
): PaginatedResponse<Campaign> {
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = MOCK_CAMPAIGNS.slice(start, end);

  return {
    data,
    total: MOCK_CAMPAIGNS.length,
    page,
    limit,
    totalPages: Math.ceil(MOCK_CAMPAIGNS.length / limit),
  };
}
