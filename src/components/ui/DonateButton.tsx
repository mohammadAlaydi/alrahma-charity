import Image from "next/image";
import { cn } from "@/lib/cn";

export type DonateButtonProps = {
    onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
};

/**
 * Reusable donate button component
 * Used throughout the application for donation CTAs
 */
export function DonateButton({
    onClick,
    variant = 'primary',
    size = 'md',
    className,
    children = "تبرع الآن",
    type = 'button',
}: DonateButtonProps) {
    const baseStyles = "inline-flex items-center gap-2.5 rounded-[35px] transition-colors font-alexandria font-bold focus-visible:ring-2 focus-visible:ring-alrahma-primary/40 focus-visible:outline-none";

    const variants = {
        primary: "bg-alrahma-primary text-white hover:bg-brand-700",
        secondary: "bg-alrahma-secondary text-white hover:bg-alrahma-secondary/90",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm gap-2",
        md: "px-6 py-2.5 text-base gap-3",
        lg: "px-8 py-4 text-base gap-2.5",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
            <span>{children}</span>
            <Image
                src="/double hearts.svg"
                alt="تبرع"
                width={22}
                height={23}
                className="h-6 w-6"
            />
        </button>
    );
}
