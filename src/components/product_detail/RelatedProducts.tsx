"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";
import { formatPKR } from "@/lib/utils";
import type { Product } from "@/lib/mock/products";

interface ProductCardProps {
  id: string;
  name: string;
  originalPrice?: number;
  price: number;
  image: string;
  slug: string;
}

function ProductCard({
  id,
  name,
  originalPrice,
  price,
  image,
  slug,
}: ProductCardProps) {
  return (
    <Link href={`/product-detail/${slug}`} className="block group">
      <div className="bg-white rounded-md border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col h-full">
        <div className="relative aspect-square bg-gray-50">
          {originalPrice && (
            <span className="absolute top-2 left-2 z-10 bg-[#E9CC2F] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              Sale
            </span>
          )}

          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:640px) 50vw, 220px"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-3 flex flex-col gap-2 flex-1">
          <h3 className="text-xs font-semibold leading-snug line-clamp-3 min-h-[3rem]">
            {name}
          </h3>

          <div className="mt-auto flex items-center gap-2 text-xs">
            {originalPrice !== undefined && originalPrice > 0 && (
              <span className="line-through text-gray-400">
                {formatPKR(originalPrice)}
              </span>
            )}

            <span className="font-bold text-dark">
              {formatPKR(price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface RelatedProductsProps {
  products: Product[];
  recentlyViewed?: Product[];
}

export function RelatedProducts({ products, recentlyViewed }: RelatedProductsProps) {
  return (
    <section className="py-10 max-w-[1280px] mx-auto px-4">
      {products && products.length > 0 && (
        <>
          <h2 className="text-center text-lg sm:text-xl font-bold mb-6">
            You may also like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                originalPrice={p.originalPrice}
                price={p.price}
                image={p.image}
                slug={p.slug}
              />
            ))}
          </div>
        </>
      )}

      {recentlyViewed && recentlyViewed.length > 0 && (
        <>
          <h2 className="text-center text-lg sm:text-xl font-bold mt-12 mb-6">
            Recently viewed products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {recentlyViewed.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                originalPrice={p.originalPrice}
                price={p.price}
                image={p.image}
                slug={p.slug}
              />
            ))}
          </div>
        </>
      )}

      <div className="flex items-center justify-center gap-2 mt-8 text-xs text-gray-600">
        <Truck size={14} className="text-[#E9CC2F]" />
        Free shipping on orders
      </div>
    </section>
  );
}