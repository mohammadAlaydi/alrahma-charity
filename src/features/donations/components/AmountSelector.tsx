import { DONATION } from "@/config/design-tokens";
import { AmountInput } from "@/components/ui/AmountInput";
import { cn } from "@/lib/cn";

interface AmountSelectorProps {
    selectedAmount: number;
    customAmount: string;
    onAmountSelect: (amount: number) => void;
    onCustomAmountChange: (value: string) => void;
    className?: string;
}

export function AmountSelector({
    selectedAmount,
    customAmount,
    onAmountSelect,
    onCustomAmountChange,
    className,
}: AmountSelectorProps) {
    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCustomAmountChange(e.target.value);
    };

    // Use amounts as defined in tokens (lowest first)
    const displayAmounts = [...DONATION.presetAmounts];

    return (
        <div className={cn("flex flex-col gap-4 w-full", className)}>
            {/* Presets */}
            <div className="flex flex-col gap-[14px] items-start w-full">
                <p className="font-alexandria text-base font-normal leading-normal text-[rgba(13,13,13,0.7)] text-start tracking-[-0.18px] w-full">
                    حدد المبلغ
                </p>
                <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center sm:gap-4 gap-3 w-full" dir="rtl">
                    {displayAmounts.map((amount) => {
                        const isActive = selectedAmount === amount && !customAmount;
                        return (
                            <button
                                key={amount}
                                type="button"
                                onClick={() => onAmountSelect(amount)}
                                className={cn(
                                    "flex items-center justify-center rounded-[20px] transition-all w-full sm:w-[105px] h-[54px]",
                                    isActive
                                        ? "border border-[#007F5E] bg-[rgba(0,127,94,0.1)]"
                                        : "border border-[rgba(13,13,13,0.2)] hover:border-[#007F5E] hover:bg-[rgba(0,127,94,0.05)]"
                                )}
                            >
                                <p className="font-alexandria text-[15px] font-normal leading-normal text-[rgba(13,13,13,0.7)] text-nowrap">
                                    {/* Assuming standard amount formatting or just number */}
                                    $ {amount}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Custom Amount */}
            <div className="flex flex-col gap-[14px] items-start w-full">
                <p className="font-alexandria text-base font-normal leading-normal text-[rgba(13,13,13,0.7)] text-start tracking-[-0.18px] w-full">
                    مبلغ مخصص
                </p>
                <AmountInput
                    placeholder="أدخل القيمة"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="h-[54px] w-full rounded-[18px]"
                />
            </div>
        </div>
    );
}
