import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => (
        <textarea
            ref={ref}
            className={cn(
                "min-h-28 w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/15 disabled:cursor-not-allowed disabled:opacity-60",
                className
            )}
            {...props}
        />
    )
);
Textarea.displayName = "Textarea";