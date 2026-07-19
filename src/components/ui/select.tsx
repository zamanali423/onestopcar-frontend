import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── types ─────────────────────────────────────────────── */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    /** Called with the new value whenever the selection changes */
    onValueChange?: (value: string) => void;
    children?: React.ReactNode;
}

interface SelectItemProps {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
}

/* ─── Select (root + trigger combined) ──────────────────── */
export function Select({ className, children, onValueChange, onChange, ...props }: SelectProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onValueChange?.(e.target.value); // fire onValueChange
        onChange?.(e);                   // fire native onChange too
    };

    return (
        <select
            className={cn(
                "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm",
                "text-slate-700 outline-none transition appearance-none cursor-pointer",
                "focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20",
                "hover:border-slate-300",
                className
            )}
            onChange={handleChange}
            {...props}
        >
            {children}
        </select>
    );
}

/** Alias – ProductsTable uses <SelectTrigger> as the wrapper */
export function SelectTrigger({ className, children, onValueChange, onChange, ...props }: SelectProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onValueChange?.(e.target.value);
        onChange?.(e);
    };

    return (
        <select
            className={cn(
                "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm",
                "text-slate-700 outline-none transition appearance-none cursor-pointer",
                "focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20",
                "hover:border-slate-300",
                className
            )}
            onChange={handleChange}
            {...props}
        >
            {children}
        </select>
    );
}

/** Passthrough wrapper – keeps JSX structure compatible */
export function SelectContent({ children }: { children?: React.ReactNode }) {
    return <>{children}</>;
}

/** Renders the default/placeholder <option> */
export function SelectValue({ placeholder }: { placeholder?: string }) {
    return (
        <option value="" disabled hidden>
            {placeholder ?? "Select…"}
        </option>
    );
}

/** Renders a single <option> */
export function SelectItem({ value, children, disabled }: SelectItemProps) {
    return (
        <option value={value} disabled={disabled}>
            {children}
        </option>
    );
}