import Link from "next/link";
import { cn } from "@/lib/utils";

export function Pagination({
    current,
    total,
    hrefBuilder,
    onPageChange,
}: {
    current: number;
    total: number;
    hrefBuilder: (page: number) => string;
    onPageChange?: (page: number) => void;
}) {
    const handleClick = (e: React.MouseEvent, page: number) => {
        e.preventDefault();
        if (onPageChange) {
            onPageChange(page);
        }
    };

    return (
        <nav className="flex items-center justify-center gap-2">
            {/* Previous button */}
            <Link
                href={hrefBuilder(current - 1)}
                onClick={(e) => {
                    if (current > 1) {
                        handleClick(e, current - 1);
                    }
                }}
                className={cn(
                    "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition",
                    current > 1
                        ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        : "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
                )}
                aria-disabled={current <= 1}
                style={{ pointerEvents: current <= 1 ? 'none' : 'auto' }}
            >
                Previous
            </Link>

            {/* Page numbers */}
            {Array.from({ length: total }).map((_, index) => {
                const page = index + 1;
                const active = page === current;

                // Show ellipsis for large page counts
                if (total > 7) {
                    if (page === 1 || page === total || (page >= current - 1 && page <= current + 1)) {
                        return (
                            <Link
                                key={page}
                                href={hrefBuilder(page)}
                                onClick={(e) => handleClick(e, page)}
                                className={cn(
                                    "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition",
                                    active
                                        ? "border-[#0F172A] bg-[#0F172A] text-white"
                                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                )}
                            >
                                {page}
                            </Link>
                        );
                    }
                    if (page === 2 && current > 3) {
                        return (
                            <span key="ellipsis-start" className="inline-flex h-10 items-center justify-center px-2 text-slate-400">
                                …
                            </span>
                        );
                    }
                    if (page === total - 1 && current < total - 2) {
                        return (
                            <span key="ellipsis-end" className="inline-flex h-10 items-center justify-center px-2 text-slate-400">
                                …
                            </span>
                        );
                    }
                    return null;
                }

                return (
                    <Link
                        key={page}
                        href={hrefBuilder(page)}
                        onClick={(e) => handleClick(e, page)}
                        className={cn(
                            "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition",
                            active
                                ? "border-[#0F172A] bg-[#0F172A] text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        )}
                    >
                        {page}
                    </Link>
                );
            })}

            {/* Next button */}
            <Link
                href={hrefBuilder(current + 1)}
                onClick={(e) => {
                    if (current < total) {
                        handleClick(e, current + 1);
                    }
                }}
                className={cn(
                    "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition",
                    current < total
                        ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        : "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
                )}
                aria-disabled={current >= total}
                style={{ pointerEvents: current >= total ? 'none' : 'auto' }}
            >
                Next
            </Link>
        </nav>
    );
}