"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/mock/products";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const thumbs = product.thumbnails || [product.image];

  return (
    <div className="w-full">
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full aspect-square bg-white rounded-md overflow-hidden border border-gray-100"
      >
        <Image
          src={thumbs[active]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-contain p-4"
        />
      </motion.div>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {thumbs.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square rounded border overflow-hidden bg-white transition",
              active === i ? "border-accent ring-1 ring-accent" : "border-gray-200 hover:border-gray-400"
            )}
            aria-label={`Thumbnail ${i + 1}`}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-contain p-1" />
          </button>
        ))}
      </div>
    </div>
  );
}