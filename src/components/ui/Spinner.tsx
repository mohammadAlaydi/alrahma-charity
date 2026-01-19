import { cn } from "@/lib/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Spinner({ className, size = 'md', ...props }: SpinnerProps) {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-3",
        lg: "h-12 w-12 border-4",
        xl: "h-16 w-16 border-4",
    };

    return (
        <div
            className={cn(
                "animate-spin rounded-full border-t-[#007F5E] border-zinc-200",
                sizeClasses[size],
                className
            )}
            {...props}
        />
    );
}
