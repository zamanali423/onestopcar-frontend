"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Drawer({
    open,
    onClose,
    title,
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn("fixed inset-0 z-50 transition", open ? "pointer-events-auto" : "pointer-events-none")}>
            <button
                aria-label="Close drawer"
                onClick={onClose}
                className={cn("absolute inset-0 bg-slate-950/40 transition", open ? "opacity-100" : "opacity-0")}
            />
            <aside
                className={cn(
                    "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform",
                    open ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#DC2626]">Panel</p>
                        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
                    </div>
                    <Button variant="outline" size="icon" onClick={onClose} aria-label="Close">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-5">{children}</div>
            </aside>
        </div>
    );
}