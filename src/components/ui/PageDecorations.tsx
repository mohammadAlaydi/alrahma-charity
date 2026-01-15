"use client";

import { WhatsAppButton } from "./WhatsAppButton";

interface PageDecorationsProps {
    top?: string | number;
}

export function PageDecorations({ top = 975 }: PageDecorationsProps) {
    return (
        <>
            {/* WhatsApp Icon - Managed globally to avoid duplication */}
            <WhatsAppButton top={top} />
        </>
    );
}
