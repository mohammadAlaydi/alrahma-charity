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
import { arabicCountryNames } from "./country-names-ar";

export type Country = {
  name: string;
  alpha2: string;
  alpha3: string;
  emoji: string;
  _id?: string; // Internal unique ID for React keys
};

// List of major countries and Arab countries to include (around 100)
const allowedCountries = new Set([
  // Arab countries
  "Palestine", "Syria", "Yemen", "Lebanon", "Jordan", "Egypt", "Saudi Arabia",
  "Iraq", "United Arab Emirates", "Kuwait", "Qatar", "Bahrain", "Oman",
  "Libya", "Tunisia", "Algeria", "Morocco", "Sudan", "Mauritania", "Djibouti", "Somalia",
  // Major countries
  "United States", "United Kingdom", "Canada", "Australia", "New Zealand",
  "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Switzerland",
  "Austria", "Sweden", "Norway", "Denmark", "Finland", "Poland", "Portugal", "Greece",
  "Russia", "China", "Japan", "South Korea", "India", "Indonesia", "Malaysia",
  "Singapore", "Thailand", "Philippines", "Vietnam", "Bangladesh", "Pakistan",
  "Turkey", "Iran", "Brazil", "Argentina", "Mexico", "Chile", "Colombia",
  "South Africa", "Nigeria", "Kenya", "Ghana", "Ethiopia", "Tanzania", "Uganda",
  // Additional important countries
  "Ireland", "Iceland", "Luxembourg", "Monaco", "Malta", "Cyprus", "Croatia",
  "Serbia", "Romania", "Bulgaria", "Czech Republic", "Hungary", "Slovakia", "Slovenia",
  "Ukraine", "Belarus", "Kazakhstan", "Uzbekistan", "Azerbaijan", "Georgia", "Armenia",
  "Afghanistan", "Nepal", "Sri Lanka", "Myanmar", "Cambodia", "Laos", "Mongolia",
  "Venezuela", "Peru", "Ecuador", "Uruguay", "Paraguay", "Bolivia", "Panama", "Costa Rica",
  "Cuba", "Dominican Republic", "Jamaica", "Haiti", "Trinidad and Tobago",
  "Zambia", "Zimbabwe", "Botswana", "Namibia", "Mozambique", "Madagascar", "Mauritius",
  "Senegal", "Ivory Coast", "Cameroon", "Gabon", "Congo", "Democratic Republic of the Congo",
  "Angola", "Malawi", "Rwanda", "Burundi", "Eritrea", "Sierra Leone", "Liberia", "Guinea",
  "Burkina Faso", "Mali", "Niger", "Chad", "Central African Republic", "Benin", "Togo",
  "Gambia", "Guinea-Bissau", "Cape Verde", "Equatorial Guinea", "São Tomé and Príncipe",
  "Comoros", "Seychelles", "Maldives", "Fiji", "Papua New Guinea", "Samoa", "Tonga",
  "Vanuatu", "Solomon Islands", "Kiribati", "Tuvalu", "Nauru", "Palau", "Micronesia",
  "Marshall Islands", "Timor-Leste", "Brunei", "Bhutan"
]);

// Filter and map countries, excluding Israel and Palestine (we'll add Palestine manually)
const filteredCountries = countries.all
  .filter((country) =>
    country.alpha2 &&
    country.alpha3 &&
    country.name &&
    country.status !== "deleted" &&
    country.name !== "Israel" && // Explicitly exclude Israel
    country.alpha2 !== "PS" && // Exclude Palestine from database (we'll add it manually)
    country.alpha3 !== "PSE" &&
    allowedCountries.has(country.name)
  )
  .map((country, index) => ({
    name: country.name,
    alpha2: country.alpha2,
    alpha3: country.alpha3,
    emoji: country.emoji || "",
    // Add unique index to handle duplicate alpha3 codes
    _id: `${country.alpha3}-${index}`,
  }));

// Always add Palestine at the beginning
const palestineCountry: Country = {
  name: "Palestine",
  alpha2: "PS",
  alpha3: "PSE",
  emoji: "🇵🇸",
  _id: "PSE-0",
};

const countryList: Country[] = [palestineCountry, ...filteredCountries]
  .sort((a, b) => {
    // Keep Palestine at the top
    if (a.name === "Palestine") return -1;
    if (b.name === "Palestine") return 1;
    return a.name.localeCompare(b.name);
  });

export function CountryDropdown({
  onChange,
  defaultValue,
  placeholder = "فلسطين",
  dir = "rtl",
  className,
}: {
  onChange: (country: Country) => void;
  defaultValue?: string;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  className?: string;
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
          className,
          "hover:border-[#007F5E]/40 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#007F5E]/20",
          "data-placeholder:text-[rgba(13,13,13,0.5)]",
          dir === "rtl"
            ? "justify-start [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:min-w-0 [&>span]:flex-row-reverse [&>svg]:absolute [&>svg]:end-5"
            : "justify-start [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:min-w-0 [&>span]:flex-row [&>svg]:absolute [&>svg]:end-5",
          "[&>svg]:shrink-0",
        )}
        dir={dir}
      >
        <SelectValue placeholder={placeholder}>
          {selectedCountry ? (
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
          ) : (
            <span className="font-alexandria text-[16px] font-normal leading-normal text-[rgba(13,13,13,0.5)]">
              {placeholder}
            </span>
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
                "cursor-pointer hover:bg-[#007F5E]/10 hover:text-[#007F5E] transition-colors py-2 min-h-[44px] rounded-md",
                "focus:bg-[#007F5E]/10 focus:text-[#007F5E] active:bg-[#007F5E]/20",
                dir === "rtl"
                  ? "!pe-8 !ps-2 [&>span]:!start-auto [&>span]:!end-2"
                  : "!pe-2 !ps-8 [&>span]:!start-2 [&>span]:!end-auto",
              )}
            >
              <div className={cn("flex items-center gap-2 w-full", dir === "rtl" ? "flex-row-reverse justify-end items-center" : "flex-row justify-start items-center")}>
                <span className={cn("font-alexandria text-[16px] font-normal leading-normal flex-1", dir === "rtl" ? "text-right" : "text-left")}>
                  {getCountryName(country)}
                </span>
                {country.alpha2 && (
                  <div className="h-5 w-8 shrink-0 rounded-sm overflow-hidden flex items-center justify-center">
                    <CircleFlag
                      countryCode={country.alpha2.toLowerCase()}
                      height={20}
                    />
                  </div>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
