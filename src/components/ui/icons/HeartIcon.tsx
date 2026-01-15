import { COLORS } from "@/config/design-tokens";

export type HeartIconProps = {
    isFilled: boolean;
    className?: string;
};

/**
 * Heart icon component for favorite/like functionality
 * Used in ProjectCard and other components
 */
export function HeartIcon({ isFilled, className = "h-5 w-5" }: HeartIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill={isFilled ? COLORS.heartFilled : "none"}
            stroke={isFilled ? COLORS.heartFilled : COLORS.heartEmpty}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className} transition-colors`}
        >
            <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.99.99 0 0 0 1.024 0C21.126 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3" />
        </svg>
    );
}
