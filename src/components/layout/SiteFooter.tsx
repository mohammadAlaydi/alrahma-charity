"use client";

import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  return (
    <footer className="relative w-full bg-[#007F5E] text-white" dir="rtl">
      {/* Main content */}
      <div className="relative">
        {/* Top section with newsletter */}
        <Container className="border-b border-white py-8">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-[420px]">
            {/* Newsletter text */}
            <div className="flex-1 text-right" dir="rtl">
              <p className="newsletter-heading">
                <span className="font-bold text-[#FFFFFF]">
                  اشترك في رسالتنا الإخبارية للبقاء على{" "}
                </span>
                <span className="font-bold text-[#DFD383]">اطلاع بأحدث أعمالنا</span>
              </p>
            </div>

            {/* Newsletter form */}
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="أدخل البريد الالكتروني"
                className="newsletter-input border-alrahma-accent text-alrahma-white placeholder:text-alrahma-white focus:ring-alrahma-accent h-[64px] w-[412px] rounded-full border bg-transparent pr-6 pl-[72px] text-[18px] leading-[30px] focus:ring-2 focus:outline-none"
                dir="rtl"
              />
              <button
                type="button"
                className="bg-alrahma-accent hover:bg-alrahma-accent/90 absolute left-[2px] flex h-[60px] w-[60px] items-center justify-center rounded-full transition-colors"
              >
                <Image
                  src="/emojis/send email button.png"
                  alt="Send"
                  width={60}
                  height={60.26}
                  className="h-[60.26px] w-[60px]"
                />
              </button>
            </div>
          </div>
        </Container>

        {/* Main footer content */}
        <Container className="py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-8 xl:gap-12 2xl:gap-16">
            {/* Logo and Social - flexible width with max constraint, grows to fill space */}
            <div className="w-full space-y-4 lg:w-auto lg:max-w-[450px] lg:flex-1">
              {/* Logo - right aligned: 180px width, 105.337px height */}
              <div className="flex justify-start">
                <div className="relative h-[105.337px] w-[180px]">
                  <Image src="/footer-logo.png" alt="Alrahma" fill className="object-contain" />
                </div>
              </div>

              {/* Mission statement - 450px width, 60px height - text takes full width */}
              <p className="footer-mission h-[60px] w-full">
                رسالتنا في جمعية الرحمة والإحسان هي أن نكون سندا لأهل غزة، نمنحهم الإغاثة العاجلة
                والدعم المستدام ليبقى الأمل حيا
              </p>

              {/* Social media icons - right aligned: 215px width, 35px height, 10px spacing */}
              <div className="flex justify-start">
                <div className="flex items-center gap-[10px]">
                  {/* Facebook */}
                  <a
                    href="#"
                    className="flex h-[35px] w-[35px] items-center justify-center transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/emojis/facebook.svg"
                      alt="Facebook"
                      width={35}
                      height={35}
                      className="h-[35px] w-[35px]"
                    />
                  </a>

                  {/* Instagram */}
                  <a
                    href="#"
                    className="flex h-[35px] w-[35px] items-center justify-center transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/emojis/instagram.svg"
                      alt="Instagram"
                      width={35}
                      height={35}
                      className="h-[35px] w-[35px]"
                    />
                  </a>

                  {/* YouTube */}
                  <a
                    href="#"
                    className="flex h-[35px] w-[35px] items-center justify-center transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/emojis/youtube.svg"
                      alt="YouTube"
                      width={35}
                      height={35}
                      className="h-[35px] w-[35px]"
                    />
                  </a>

                  {/* Google */}
                  <a
                    href="#"
                    className="flex h-[35px] w-[35px] items-center justify-center transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/emojis/google icon.svg"
                      alt="Google"
                      width={35}
                      height={35}
                      className="h-[35px] w-[35px]"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links - flexible width with max constraint */}
            <div className="w-full space-y-6 lg:w-auto lg:max-w-[171px] lg:flex-shrink-0">
              <h3 className="footer-section-title text-right">روابط سريعة</h3>
              <div className="space-y-4" dir="rtl">
                <Link href="#" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">مدونة الجمعية</span>
                </Link>
                <Link href="#" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">تواصل معنا</span>
                </Link>
                <Link href="#" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">شركاؤنا</span>
                </Link>
                <Link href="#" className="footer-link flex items-center gap-[15px] hover:underline">
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
            <div className="w-full space-y-6 lg:w-auto lg:max-w-[171px] lg:flex-shrink-0">
              <h3 className="footer-section-title text-right">روابط مهمة</h3>
              <div className="space-y-4" dir="rtl">
                <Link href="#" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">سياسة الخصوصية</span>
                </Link>
                <Link href="#" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">تراخيص الجمعية</span>
                </Link>
                <Link href="#" className="footer-link flex items-center gap-[15px] hover:underline">
                  <Image
                    src="/emojis/check.svg"
                    alt=""
                    width={14}
                    height={16}
                    className="h-4 w-[14px] shrink-0"
                  />
                  <span className="flex-1">شروط الاستخدام</span>
                </Link>
                <Link href="#" className="footer-link flex items-center gap-[15px] hover:underline">
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
            <div className="w-full space-y-6 lg:w-auto lg:max-w-[319px] lg:flex-shrink-0">
              <h3 className="footer-section-title text-right">المكتب الرئيسي</h3>
              <div className="space-y-4">
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
          <div className="flex h-[79px] items-center justify-center">
            <p className="copyright-text">
              جمعية الرحمة والإحسان مرخصة وتعمل وفقاً لأحكام القانون في تركيا برقم تأسيس
              0733100144600001
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
