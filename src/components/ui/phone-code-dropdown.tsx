"use client";

import * as React from "react";
import { countries } from "country-data-list";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn";

export type CountryPhone = {
    name: string;
    alpha2: string;
    alpha3: string;
    dialCode: string;
    emoji: string;
    _id: string; // Internal unique ID for React keys
    displayName: string;
};

// Arabic country names mapping (duplicated from country-dropdown for independence)
const arabicCountryNames: Record<string, string> = {
    "Palestinian Territory": "فلسطين",
    "Palestinian Territory, Occupied": "فلسطين",
    "PS": "فلسطين",
    "PSE": "فلسطين",
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

export function PhoneCodeDropdown({
    onChange,
    defaultValue = "+970",
    placeholder = "Code",
    dir = "ltr", // Phone codes are usually LTR (+970) even in RTL layouts
    className,
}: {
    onChange: (dialCode: string) => void;
    defaultValue?: string;
    placeholder?: string;
    dir?: "ltr" | "rtl";
    className?: string;
}) {
    // Internal state stores alpha3 (unique), not dialCode (non-unique)
    const [selectedAlpha3, setSelectedAlpha3] = React.useState<string>("");

    // Prepare list with dial codes
    const sortedCountryList = React.useMemo(() => {
        return countries.all
            .filter((country) => country.countryCallingCodes && country.countryCallingCodes.length > 0 && country.alpha2 && country.status !== "deleted")
            .map((country, index) => {
                let displayName = arabicCountryNames[country.name] || arabicCountryNames[country.alpha2] || arabicCountryNames[country.alpha3] || country.name;

                return {
                    name: country.name,
                    alpha2: country.alpha2,
                    alpha3: country.alpha3,
                    emoji: country.emoji || "",
                    dialCode: country.countryCallingCodes[0],
                    _id: `${country.alpha3}-${index}`,
                    displayName: displayName
                };
            })
            .sort((a, b) => a.displayName.localeCompare(b.displayName, 'ar'));
    }, []);

    // Set initial selection based on defaultValue (dialCode)
    // We find the FIRST country that matches this dial code to use as the "selected" representation
    React.useEffect(() => {
        if (defaultValue) {
            const found = sortedCountryList.find(c => c.dialCode === defaultValue);
            if (found) {
                setSelectedAlpha3(found.alpha3);
            } else if (defaultValue === "+970") {
                // Fallback for default
                const palestine = sortedCountryList.find(c => c.alpha3 === "PSE" || c.dialCode === "+970");
                if (palestine) setSelectedAlpha3(palestine.alpha3);
            }
        } else {
            // Default to Palestine if empty
            const palestine = sortedCountryList.find(c => c.alpha3 === "PSE" || c.dialCode === "+970");
            if (palestine) setSelectedAlpha3(palestine.alpha3);
        }
    }, [defaultValue, sortedCountryList]);

    const selectedCountry = React.useMemo(() => {
        return sortedCountryList.find(c => c.alpha3 === selectedAlpha3) || null;
    }, [selectedAlpha3, sortedCountryList]);

    const handleValueChange = (alpha3: string) => {
        setSelectedAlpha3(alpha3);
        const country = sortedCountryList.find(c => c.alpha3 === alpha3);
        if (country) {
            onChange(country.dialCode);
        }
    };

    return (
        <Select value={selectedAlpha3} onValueChange={handleValueChange} dir={dir}>
            <SelectTrigger
                className={cn(
                    "flex h-[48px] w-[110px] items-center gap-2 rounded-xl border border-zinc-100 bg-[#F9FAFB] px-3 font-mono text-sm ring-offset-white focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-none",
                    className
                )}
            >
                <SelectValue placeholder={placeholder}>
                    {selectedCountry ? (
                        <div className="flex items-center gap-2">
                            <img
                                src={`https://flagcdn.com/w40/${selectedCountry.alpha2.toLowerCase()}.png`}
                                alt={selectedCountry.alpha2}
                                className="h-4 w-6 object-cover rounded-[2px]"
                            />
                            <span dir="ltr" className="text-zinc-600 font-bold">{selectedCountry.dialCode}</span>
                        </div>
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </SelectValue>
            </SelectTrigger>
            <SelectContent
                className="max-h-[300px] min-w-[300px] bg-white border-[rgba(0,0,0,0.1)] shadow-lg"
                dir="rtl" // List content in RTL for country names
            >
                <SelectGroup>
                    {sortedCountryList.map((country) => (
                        <SelectItem
                            key={country.alpha3} // Use alpha3 as strict unique key
                            value={country.alpha3} // Use alpha3 as value to avoid non-unique value error
                            className="cursor-pointer hover:bg-[#007F5E]/10 focus:bg-[#007F5E]/10"
                        >
                            <div className="flex items-center justify-between w-full gap-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={`https://flagcdn.com/w40/${country.alpha2.toLowerCase()}.png`}
                                        alt={country.alpha2}
                                        className="h-4 w-6 object-cover rounded-[2px]"
                                    />
                                    <span className="text-right">{country.displayName}</span>
                                </div>
                                <span dir="ltr" className="text-zinc-400 font-mono text-xs">{country.dialCode}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
