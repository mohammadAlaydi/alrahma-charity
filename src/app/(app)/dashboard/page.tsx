"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateUserDetails } from "@/store/slices/authSlice";
import { addToast } from "@/store/slices/notificationsSlice";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from "lucide-react";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { PhoneCodeDropdown } from "@/components/ui/phone-code-dropdown";
import { countries } from "country-data-list";
import { getExampleNumber, type CountryCode } from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import { CompleteProfileModal } from "@/components/profile/CompleteProfileModal";

// Helper to split phone number into code and local number
const splitPhone = (fullPhone: string | undefined | null) => {
  if (!fullPhone) return { code: "+970", number: "" }; // Default

  // Find matching country code (longest match first)
  const allCodes = countries.all
    .filter(c => c.countryCallingCodes && c.countryCallingCodes.length)
    .flatMap(c => c.countryCallingCodes)
    .sort((a, b) => b.length - a.length); // Descending length

  const matchedCode = allCodes.find(code => fullPhone.startsWith(code));

  if (matchedCode) {
    return {
      code: matchedCode,
      number: fullPhone.slice(matchedCode.length)
    };
  }

  return { code: "+970", number: fullPhone }; // Fallback
};

// Helper to get max length for a country code
const getPhoneLengths = (phoneCode: string) => {
  // Find a country alpha2 for this code
  const country = countries.all.find(c =>
    c.countryCallingCodes && c.countryCallingCodes[0] === phoneCode && c.alpha2
  );

  if (!country || !country.alpha2) return { min: 8, max: 15 }; // Default

  try {
    const example = getExampleNumber(country.alpha2 as CountryCode, examples);
    if (example) {
      const len = example.formatNational().replace(/\s/g, '').length;
      // Mobile numbers are usually fixed length in most countries.
      // We set min/max to the example length.
      // Some countries might be variable, but example length is a good strict baseline for "just this country"
      return { min: len, max: len };
    }
  } catch (e) {
    // Fallback
  }
  return { min: 8, max: 15 };
};

const Dashboard = () => {
  const { data: session, status } = useSession({
    required: true, // NextAuth will handle redirect
  });
  const dispatch = useDispatch(); // Changed from useAppDispatch to useDispatch to match existing code
  
  // Get user from Redux to seed initial state and avoid layout shift
  const user = useSelector((state: RootState) => state.auth.user as any); // Type assertion for profile fields
  const isLoadingRedux = useSelector((state: RootState) => (state.auth as any).isLoading); // Added isLoading from Redux

  // Initial state derived from user - must be before conditional returns
  const initialPhone = splitPhone(user?.phone);

  // All hooks must be called before any conditional returns
  const [passwordVisible, setPasswordVisible] = useState(false); // Added new state
  const [loading, setLoading] = useState(!user); // Only show loader if we don't have user data yet
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneLimits, setPhoneLimits] = useState<{ min: number, max: number }>(() => getPhoneLengths(initialPhone.code));
  const [formData, setFormData] = useState({
    name: user?.name || "عبدالرحمن",
    email: user?.email || "example@gmail.com",
    country: user?.country || "PSE",
    phone: initialPhone.number,
    phoneCode: initialPhone.code,
    birthDate: user?.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : "",
    password: ""
  });

  const fetchUserData = useCallback(async () => {
    try {
      const res = await fetch('/api/user');
      const data = await res.json();
      if (data.success && data.data) {
        // Sync Redux with fresh data
        dispatch(updateUserDetails(data.data));

        const { code, number } = splitPhone(data.data.phone);

        // Update limits for fetched data
        setPhoneLimits(getPhoneLengths(code));

        setFormData(prev => ({
          ...prev,
          name: data.data.name || prev.name,
          email: data.data.email || prev.email,
          country: data.data.country || prev.country,
          phone: number,
          phoneCode: code,
          birthDate: data.data.birthDate ? new Date(data.data.birthDate).toISOString().split('T')[0] : prev.birthDate,
        }));
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Conditional returns after all hooks
  if (status === "loading" || isLoadingRedux) { // Combined session loading with Redux loading
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Combine code and number
      const fullPhone = `${formData.phoneCode}${formData.phone}`;

      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          country: formData.country,
          phone: fullPhone,
          birthDate: formData.birthDate,
        })
      });
      const data = await res.json();

      if (data.success) {
        // Sync with Redux immediately
        dispatch(updateUserDetails({
          name: formData.name,
          email: formData.email
        }));
        dispatch(addToast({
          type: "success",
          message: "تم حفظ المعلومات بنجاح"
        }));
      } else {
        dispatch(addToast({
          type: "error",
          message: "فشل حفظ المعلومات"
        }));
      }
    } catch (error) {
      console.error("Failed to save profile", error);
      dispatch(addToast({
        type: "error",
        message: "حدث خطأ أثناء الحفظ"
      }));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <h2 className="text-lg font-bold text-zinc-900 text-right">المعلومات الشخصية</h2>

        <form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            {/* Name - Right Column */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 block text-right">
                الاسم
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-zinc-50/50 text-right h-12 rounded-xl"
                startIcon={<User className="h-5 w-5" />}
              />
            </div>

            {/* Email - Left Column */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 block text-right">
                البريد الإلكتروني
              </label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                disabled // Disabled as requested
                className="bg-zinc-100 text-right h-12 rounded-xl text-zinc-500 cursor-not-allowed" // Styled as disabled
                startIcon={<Mail className="h-5 w-5 text-zinc-400" />}
              />
              <p className="text-[10px] text-amber-600 text-right mt-1 px-1">
                لا يمكن تغيير البريد الإلكتروني لأنه مرتبط ببيانات الحساب
              </p>
            </div>

            {/* Country - Right Column */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 block text-right">
                البلد
              </label>
              <CountryDropdown
                defaultValue={formData.country}
                onChange={(c) => setFormData({ ...formData, country: c.alpha3 })}
                className="bg-zinc-50/50 text-right h-12 rounded-xl"
              />
            </div>

            {/* Phone - Left Column */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 block text-right">
                رقم الهاتف
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, ''); // Only digits
                      if (val.length <= phoneLimits.max) {
                        setFormData(prev => ({ ...prev, phone: val }));
                      }
                    }}
                    className="bg-zinc-50/50 text-right h-12 font-mono rounded-xl pl-4"
                    placeholder={`Max ${phoneLimits.max} digits`}
                    dir="ltr"
                    type="tel"
                    minLength={phoneLimits.min}
                    maxLength={phoneLimits.max}
                  />
                </div>
                <PhoneCodeDropdown
                  defaultValue={formData.phoneCode}
                  onChange={(code) => {
                    setFormData(prev => ({ ...prev, phoneCode: code, phone: "" })); // Clear phone to verify new length
                    setPhoneLimits(getPhoneLengths(code));
                  }}
                />
              </div>
            </div>

            {/* Date of Birth - Right Column */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 block text-right">
                تاريخ الميلاد
              </label>
              <div className="relative">
                <Input
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  type="date"
                  dir="rtl"
                  className="bg-zinc-50/50 text-right h-12 font-mono rounded-xl block w-full text-right"
                />
              </div>
            </div>

            {/* Password - Left Column */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 block text-right">
                تغيير كلمة المرور
              </label>
              <div className="relative">
                <Input
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  type={showPassword ? "text" : "password"}
                  className="bg-zinc-50/50 text-right h-12 rounded-xl"
                  startIcon={<Lock className="h-5 w-5" />}
                  placeholder="********"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-zinc-400" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-zinc-400" />
                  )}
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-2 pt-4">
            <h3 className="text-sm font-semibold text-zinc-900 text-right">ملاحظة</h3>
            <p className="text-xs text-zinc-500 leading-relaxed text-right bg-zinc-50 p-4 rounded-lg border border-zinc-100">
              نوصي بتعبئة جميع المعلومات المطلوبة في الاعلى لنستطيع تقديم أفضل تجربة لاستخدامك تطبيق وموقع فريق ملهم التطوعي. حيث أنه يتم الاحتفاظ بجميع المعلومات الخاصة بحسابك بسرية تامة ولا تتم مشاركتها مع أي جهة
            </p>
          </div>

          <div className="flex gap-4 pt-4 mt-8">
            <Button
              type="submit"
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px] rounded-full h-12 text-base shadow-none"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : null}
              {saving ? "جاري الحفظ..." : "حفظ"}
            </Button>
            <Button type="button" variant="secondary" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 min-w-[120px] rounded-full h-12 text-base">
              إلغاء
            </Button>
          </div>
        </form>
      </div>
      <CompleteProfileModal />
    </div>
  );
};

export default Dashboard;
