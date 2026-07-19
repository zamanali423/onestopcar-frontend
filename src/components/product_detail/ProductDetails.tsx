"use client";

import { useState, type ReactNode } from "react";
import { ChevronUp, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { composition, installationSteps, careInstructions, faqs, keyFeatures } from "@/lib/mock/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/mock/products";

interface ProductDetailsProps {
  product: Product;
}

function Accordion({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between bg-[#E9CC2F] text-white px-4 py-3 text-sm font-semibold uppercase tracking-wide"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-6 text-sm text-dark">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="divide-y divide-gray-100">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2 py-2">
          <Check size={14} className="text-accent mt-0.5 shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="mt-8">
      <Accordion title="Description">
        <p className="mb-4">
          Upgrade your <strong>{product.name}</strong> with premium quality and <strong>UV protection</strong>,{" "}
          <strong>heat control</strong>, <strong>privacy</strong>, and <strong>glare reduction</strong>.
        </p>

        <div className="bg-[#E9CC2F] text-white rounded-md p-5 text-center mb-5">
          <h3 className="font-bold mb-2">Why Choose This Product?</h3>
          <p className="text-sm">Premium Quality for {product.model}</p>
          <p className="text-sm">UV & Heat Protection</p>
          <p className="text-sm">Privacy & Anti-Glare</p>
          <p className="text-sm">No Tools Required</p>
        </div>

        <h4 className="font-bold mb-2">Key Features</h4>
        <BulletList items={keyFeatures} />
      </Accordion>

      <Accordion title="Composition">
        <div className="overflow-x-auto">
          <table className={cn("w-full text-sm border border-gray-200")}>
            <tbody>
              {composition.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-3 font-semibold w-1/3 border-r border-gray-200">{row.label}</td>
                  <td className="px-4 py-3">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      <Accordion title="Installation">
        <h4 className="font-bold mb-2">How to Install</h4>
        <ol className="list-decimal pl-6 space-y-1 mb-4">
          {installationSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <h4 className="font-bold mb-2">Care Instructions</h4>
        <BulletList items={careInstructions} />
      </Accordion>

      <Accordion title="FAQs">
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.q}>
              <p className="font-semibold">Q: {f.q}</p>
              <p className="text-gray-700">A: {f.a}</p>
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
}