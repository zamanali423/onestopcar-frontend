import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./button";

export function Carousel({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#DC2626]">Carousel</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h2>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon"><ArrowRight className="h-4 w-4" /></Button>
                </div>
            </div>
            <div className="mt-6">{children}</div>
        </section>
    );
}