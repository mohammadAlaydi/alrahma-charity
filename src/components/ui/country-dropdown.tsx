"use client";

import * as React from "react";
import { countries } from "country-data-list";
import { CircleFlag } from "react-circle-flags";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn";

export type Country = {
  name: string;
  alpha2: string;
  alpha3: string;
  emoji: string;
  _id?: string; // Internal unique ID for React keys
};

const countryList: Country[] = countries.all
  .filter((country) => country.alpha2 && country.alpha3 && country.name && country.status !== "deleted")
  .map((country, index) => ({
    name: country.name,
    alpha2: country.alpha2,
    alpha3: country.alpha3,
    emoji: country.emoji || "",
    // Add unique index to handle duplicate alpha3 codes
    _id: `${country.alpha3}-${index}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Arabic country names mapping
const arabicCountryNames: Record<string, string> = {
  "Palestine": "فلسطين",
  "Syria": "سوريا",
  "Yemen": "اليمن",
  "Lebanon": "لبنان",
  "Jordan": "الأردن",
  "Egypt": "مصر",
  "Saudi Arabia": "السعودية",
  "Iraq": "العراق",
  "United Arab Emirates": "الإمارات العربية المتحدة",
  "Kuwait": "الكويت",
  "Qatar": "قطر",
  "Bahrain": "البحرين",
  "Oman": "عمان",
  "Turkey": "تركيا",
};

export function CountryDropdown({
  onChange,
  defaultValue,
  placeholder = "اختر الدولة",
  dir = "rtl",
}: {
  onChange: (country: Country) => void;
  defaultValue?: string;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}) {
  const [selectedValue, setSelectedValue] = React.useState<string>(
    defaultValue || "",
  );

  const selectedCountry = React.useMemo(() => {
    if (!selectedValue) return null;
    return countryList.find(
      (c) => c.name === selectedValue || c.alpha3 === selectedValue || c.alpha2 === selectedValue,
    ) || null;
  }, [selectedValue]);

  React.useEffect(() => {
    if (defaultValue) {
      const country = countryList.find(
        (c) => c.name === defaultValue || c.alpha3 === defaultValue || c.alpha2 === defaultValue,
      );
      if (country) {
        setSelectedValue(country.name);
      }
    }
  }, [defaultValue]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    const country = countryList.find((c) => c.name === value);
    if (country) {
      onChange(country);
    }
  };

  const getCountryName = (country: Country) => {
    return arabicCountryNames[country.name] || country.name;
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange} dir={dir}>
      <SelectTrigger
        className={cn(
          "h-[54px] w-full rounded-[10px] border-[0.5px] border-[rgba(0,0,0,0.2)] bg-white px-5 py-[10px] font-normal text-[rgba(13,13,13,0.7)] relative",
          "hover:border-[#007F5E]/40 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#007F5E]/20",
          "data-placeholder:text-[rgba(13,13,13,0.5)]",
          "justify-end",
          "[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:min-w-0",
          "[&>svg]:shrink-0 [&>svg]:absolute",
          dir === "rtl" ? "flex-row-reverse [&>span]:flex-row-reverse [&>svg]:left-5" : "flex-row [&>span]:flex-row [&>svg]:right-5",
        )}
        dir={dir}
      >
        <SelectValue placeholder={placeholder}>
          {selectedCountry && (
            <>
              <span className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.7)]">
                {getCountryName(selectedCountry)}
              </span>
              {selectedCountry.alpha2 && (
                <div className="h-6 w-[34px] shrink-0 rounded-sm overflow-hidden flex items-center justify-center">
                  <CircleFlag
                    countryCode={selectedCountry.alpha2.toLowerCase()}
                    height={24}
                  />
                </div>
              )}
            </>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className={cn(
          "max-h-[300px] bg-white border-[rgba(0,0,0,0.1)] shadow-lg",
          dir === "rtl" ? "text-right" : "text-left",
        )}
        dir={dir}
      >
        <SelectGroup>
          {countryList.map((country, index) => (
            <SelectItem
              key={country._id || `${country.alpha3}-${index}`}
              value={country.name}
              className={cn(
                "cursor-pointer hover:bg-[#007F5E]/10 hover:text-[#007F5E] transition-colors py-2 px-3 min-h-[44px] rounded-md",
                "focus:bg-[#007F5E]/10 focus:text-[#007F5E] active:bg-[#007F5E]/20",
                dir === "rtl" ? "flex-row-reverse" : "flex-row",
              )}
            >
              <div className={cn("flex items-center gap-2 w-full", dir === "rtl" ? "flex-row-reverse" : "flex-row")}>
                {country.alpha2 && (
                  <div className="h-5 w-8 shrink-0 rounded-sm overflow-hidden flex items-center justify-center">
                    <CircleFlag
                      countryCode={country.alpha2.toLowerCase()}
                      height={20}
                    />
                  </div>
                )}
                <span className="font-alexandria text-[16px] font-normal leading-normal flex-1">
                  {getCountryName(country)}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
