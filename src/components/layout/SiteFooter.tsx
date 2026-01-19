"use client";

import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  // Social media icons with hover effects
  return (
    <footer className="relative w-full bg-[#007F5E] text-white overflow-hidden" dir="rtl">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
        style={{
          backgroundImage: 'url("/images/footer-Bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Top section with newsletter */}
        <Container className="border-b border-white py-3 lg:py-4">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-[320px]">
            {/* Newsletter text */}
            <div className="flex-1 text-right" dir="rtl">
              <p className="newsletter-heading">
                <span className="font-bold text-[#FFFFFF]">
                  اشترك في رسالتنا الإخبارية للبقاء{" "}
                </span>
                <span className="font-bold text-[#DFD383] lg:block">على اطلاع بأحدث أعمالنا</span>
              </p>
            </div>

            {/* Newsletter form */}
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="أدخل البريد الالكتروني"
                className="newsletter-input border-alrahma-accent text-alrahma-white placeholder:text-alrahma-white focus:ring-alrahma-accent h-[50px] w-[350px] rounded-full border bg-transparent pr-5 pl-[60px] text-[16px] leading-[26px] focus:ring-2 focus:outline-none"
                dir="rtl"
              />
              <button
                type="button"
                className="bg-alrahma-accent hover:bg-alrahma-accent/90 absolute left-[2px] flex h-[46px] w-[46px] items-center justify-center rounded-full transition-colors"
              >
                <Image
                  src="/emojis/send email button.png"
                  alt="Send"
                  width={46}
                  height={46}
                  className="h-[46px] w-[46px]"
                />
              </button>
            </div>
          </div>
        </Container>

        {/* Main footer content */}
        <Container className="py-8 lg:py-10">
          <div className="flex flex-col gap-6 lg:gap-6 lg:flex-row lg:justify-between xl:gap-8 2xl:gap-10">
            {/* Logo and Social - flexible width with max constraint, grows to fill space */}
            <div className="w-full space-y-4 lg:w-auto lg:max-w-[450px] lg:flex-1">
              {/* Logo - right aligned: Updated to new footer icon */}
              <div className="flex justify-start">
                <div className="relative h-[85px] w-[180px] lg:h-[95px]">
                  <Image src="/images/footer-icon.png" alt="Alrahma" fill className="object-contain" />
                </div>
              </div>

              {/* Mission statement - flexible height, text takes full width */}
              <p className="footer-mission w-full">
                رسالتنا في جمعية الرحمة والإحسان هي أن نكون سندا لأهل غزة، نمنحهم الإغاثة العاجلة
                والدعم المستدام ليبقى الأمل حيا
              </p>

              {/* Social media icons - right aligned: 215px width, 35px height, 10px spacing */}
              <div className="flex justify-start mt-4">
                <div className="flex items-center gap-[10px]">
                  {/* Facebook */}
                  <a
                    href="#"
                    className="group flex h-[35px] w-[35px] items-center justify-center transition-all hover:scale-110 rounded-full border-2 border-transparent hover:border-[#a8b561] hover:bg-[#008b67]"
                  >
                    <Image
                      src="/emojis/facebook.svg"
                      alt="Facebook"
                      width={35}
                      height={35}
                      className="h-[35px] w-[35px] transition-all group-hover:brightness-0 group-hover:invert"
                    />
                  </a>

                  {/* Instagram */}
                  <a
                    href="#"
                    className="group flex h-[35px] w-[35px] items-center justify-center transition-all hover:scale-110 rounded-full border-2 border-transparent hover:border-[#a8b561] hover:bg-[#008b67]"
                  >
                    <Image
                      src="/emojis/instagram.svg"
                      alt="Instagram"
                      width={35}
                      height={35}
                      className="h-[35px] w-[35px] transition-all group-hover:brightness-0 group-hover:invert"
                    />
                  </a>

                  {/* YouTube */}
                  <a
                    href="#"
                    className="group flex h-[35px] w-[35px] items-center justify-center transition-all hover:scale-110 rounded-full border-2 border-transparent hover:border-[#a8b561] hover:bg-[#008b67]"
                  >
                    <Image
                      src="/emojis/youtube.svg"
                      alt="YouTube"
                      width={35}
                      height={35}
                      className="h-[35px] w-[35px] transition-all group-hover:brightness-0 group-hover:invert"
                    />
                  </a>

                  {/* Google */}
                  <a
                    href="#"
                    className="group flex h-[35px] w-[35px] items-center justify-center transition-all hover:scale-110 rounded-full border-2 border-transparent hover:border-[#a8b561] hover:bg-[#008b67]"
                  >
                    <Image
                      src="/emojis/google icon.svg"
                      alt="Google"
                      width={35}
                      height={35}
                      className="h-[35px] w-[35px] transition-all group-hover:brightness-0 group-hover:invert"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links - flexible width with max constraint */}
            <div className="w-full space-y-4 lg:space-y-5 lg:w-auto lg:max-w-[171px] lg:flex-shrink-0">
              <h3 className="footer-section-title text-right">روابط سريعة</h3>
              <div className="space-y-3 lg:space-y-3.5" dir="rtl">
                <Link href="/blog" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">مدونة الجمعية</span>
                </Link>
                <Link href="/contact" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">تواصل معنا</span>
                </Link>
                <Link href="/partners" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">شركاؤنا</span>
                </Link>
                <Link href="/donation-methods" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">طرق الدفع</span>
                </Link>
              </div>
            </div>

            {/* Important Links - flexible width with max constraint */}
            <div className="w-full space-y-4 lg:space-y-5 lg:w-auto lg:max-w-[171px] lg:flex-shrink-0">
              <h3 className="footer-section-title text-right">روابط مهمة</h3>
              <div className="space-y-3 lg:space-y-3.5" dir="rtl">
                <Link href="/privacy-policy" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">سياسة الخصوصية</span>
                </Link>
                <Link href="/licenses" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">تراخيص الجمعية</span>
                </Link>
                <Link href="/terms" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">شروط الاستخدام</span>
                </Link>
                <Link href="/donation-policy" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">سياسة التبرعات</span>
                </Link>
              </div>
            </div>

            {/* Contact Info - flexible width with max constraint */}
            <div className="w-full space-y-4 lg:space-y-5 lg:w-auto lg:max-w-[319px] lg:flex-shrink-0">
              <h3 className="footer-section-title text-right">المكتب الرئيسي</h3>
              <div className="space-y-3 lg:space-y-3.5">
                {/* Address */}
                <div className="flex items-start gap-[15px]">
                  <div className="mt-0 flex h-6 w-6 shrink-0 items-center justify-center">
                    <Image
                      src="/emojis/location.svg"
                      alt="Location"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                  <p className="footer-body-text flex-1 text-right break-words" dir="rtl">
                    شارع تاش أوجاغي، مبنى A، رقم 33/1، رقم الباب الداخلي 43، باغجلار / إسطنبول
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-[15px]">
                  <div className="mt-0 flex h-6 w-6 shrink-0 items-center justify-center">
                    <Image
                      src="/emojis/phone.svg"
                      alt="Phone"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                  <p className="footer-body-text flex-1 text-right">00905357829980</p>
                </div>

                {/* Email */}
                <div className="flex items-start gap-[15px]">
                  <div className="mt-0 flex h-6 w-6 shrink-0 items-center justify-center">
                    <Image
                      src="/emojis/email.svg"
                      alt="Email"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                  <p className="footer-body-text flex-1 text-right">info@rhmacharity.com</p>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-[15px]">
                  <div className="mt-0 flex h-6 w-6 shrink-0 items-center justify-center">
                    <Image
                      src="/emojis/whatsapp.svg"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                  <p className="footer-body-text flex-1 text-right">00905357829980</p>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Copyright */}
        <Container className="border-t border-white">
          <div className="flex min-h-[60px] lg:min-h-[65px] items-center justify-center py-3 lg:py-3.5">
            <p className="copyright-text text-sm md:text-base px-4 text-center break-words max-w-full">
              جمعية الرحمة والإحسان مرخصة وتعمل وفقاً لأحكام القانون في تركيا برقم تأسيس{" "}
              <span className="whitespace-nowrap">0733100144600001</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
