import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "warning" | "danger";

export function Badge({
    className,
    variant = "default",
    ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
    const variants: Record<BadgeVariant, string> = {
        default: "bg-[#0F172A] text-white",
        secondary: "bg-slate-100 text-slate-700",
        outline: "border border-slate-200 bg-white text-slate-700",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-[#FFF7ED] text-[#C2410C]",
        danger: "bg-[#FEE2E2] text-[#B91C1C]",
    };

    return (
        <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", variants[variant], className)} {...props} />
    );
}