"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Truck, ShoppingBag, Minus, Plus, Info, Tag, Layers, Shield, Hash } from "lucide-react";
import { motion } from "framer-motion";
import { addToCartSchema, type AddToCartInput } from "@/lib/validations";
import { useCartStore } from "@/store";
import { cn, formatPKR } from "@/lib/utils";
import type { Product } from "@/lib/mock/products";

// Define the allowed style types from the schema
type StyleType = "4 Sides" | "Back" | "(4 Sides+Back) Full Set";

// Helper function to validate and cast style
function getValidStyle(style: string): StyleType {
  const validStyles: StyleType[] = ["4 Sides", "Back", "(4 Sides+Back) Full Set"];
  if (validStyles.includes(style as StyleType)) {
    return style as StyleType;
  }
  // Default fallback
  return "4 Sides";
}

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const defaultStyle = getValidStyle(product.styles[0] || "4 Sides");
  const [selectedStyle, setSelectedStyle] = useState<StyleType>(defaultStyle);
  const addToCart = useCartStore((state: any) => state.addItem);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddToCartInput>({
    resolver: zodResolver(addToCartSchema),
    defaultValues: {
      style: defaultStyle,
      quantity: 1
    },
  });

  const quantity = watch("quantity");
  const setQty = (n: number) => setValue("quantity", Math.max(1, Math.min(99, n)));

  const onSubmit = (data: AddToCartInput) => {
    addToCart({
      id: product.id,
      title: product.name,
      style: data.style,
      quantity: data.quantity,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const stockPct = Math.min(100, (product.stock / 20) * 100);
  const stockStatus = product.stock > 20 ? "In Stock" : product.stock > 5 ? "Low Stock" : "Out of Stock";
  const stockColor = product.stock > 20 ? "text-emerald-600" : product.stock > 5 ? "text-amber-600" : "text-red-600";

  // Filter styles to only show valid ones
  const validStyles = product.styles.filter((s): s is StyleType => {
    const valid: StyleType[] = ["4 Sides", "Back", "(4 Sides+Back) Full Set"];
    return valid.includes(s as StyleType);
  });

  // Get SEO keywords
  const seoKeywords = product.seo?.keywords || [];

  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark leading-snug">
        {product.name}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className={i < product.rating ? "fill-primary text-primary" : "text-gray-300"} />
          ))}
        </div>
        <span className="text-xs font-semibold text-dark">{product.rating}</span>
        <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
        <span className="text-gray-300">|</span>
        <span className={`text-xs font-semibold ${stockColor}`}>{stockStatus}</span>
        <span className="text-xs text-gray-500">• {product.stock} units</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        {product.originalPrice && (
          <span className="text-gray-500 line-through text-sm">
            {formatPKR(product.originalPrice)}
          </span>
        )}
        <span className="text-xl sm:text-2xl font-bold text-dark">{formatPKR(product.price)}</span>
        {product.badge === "Sale" && (
          <span className="text-[11px] bg-accent text-white px-2 py-0.5 rounded font-semibold">Sale</span>
        )}
        {product.discount && (
          <span className="text-[11px] bg-dark text-white px-2 py-0.5 rounded font-semibold">-{product.discount}%</span>
        )}
      </div>

      {/* Stock Bar */}
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-600">{stockStatus}: {product.stock} units left</p>
          <span className="text-xs text-gray-400">{Math.round(stockPct)}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-[#E9CC2F] rounded-full transition-all duration-500"
            style={{ width: `${stockPct}%` }}
          />
        </div>
      </div>

      {/* Category, Model & Brands Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600">
          <Tag size={12} />
          {product.category}
        </span>
        <span className="inline-flex items-center gap-1 text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600">
          <Layers size={12} />
          {product.model}
        </span>
        {product.brands && product.brands.map((brand) => (
          <span key={brand} className="inline-flex items-center gap-1 text-xs bg-[#E9CC2F]/10 px-2.5 py-1 rounded-full text-[#B69E24]">
            <Shield size={12} />
            {brand}
          </span>
        ))}
      </div>

      {/* SEO Keywords / Tags */}
      {seoKeywords.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Hash size={14} className="text-[#E9CC2F]" />
            Tags
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {seoKeywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E9CC2F]/10 text-[#B69E24] border border-[#E9CC2F]/20 hover:bg-[#E9CC2F]/20 transition-colors"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Short Description */}
      {product.shortDescription && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-5 p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex items-start gap-3">
            <Info size={16} className="text-[#E9CC2F] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                About this product
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Styles */}
      {validStyles.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-semibold mb-2">
            Style: <span className="font-normal">{selectedStyle}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {validStyles.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSelectedStyle(s);
                  setValue("style", s);
                }}
                className={cn(
                  "px-4 py-2 rounded border text-sm transition",
                  selectedStyle === s
                    ? "bg-dark text-white border-dark"
                    : "bg-white text-dark border-gray-300 hover:border-dark"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Meta Info */}
      <div className="mt-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {product.sku && (
            <div>
              <span className="text-gray-400">SKU:</span>
              <span className="ml-1 font-medium text-gray-700">{product.sku}</span>
            </div>
          )}
          {product.warranty && (
            <div>
              <span className="text-gray-400">Warranty:</span>
              <span className="ml-1 font-medium text-gray-700">{product.warranty}</span>
            </div>
          )}
          {product.oem && (
            <div>
              <span className="text-gray-400">OEM:</span>
              <span className="ml-1 font-medium text-gray-700">{product.oem}</span>
            </div>
          )}
          {product.badge && (
            <div>
              <span className="text-gray-400">Badge:</span>
              <span className="ml-1 font-medium text-[#E9CC2F]">{product.badge}</span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center border border-gray-300 rounded">
            <button
              type="button"
              onClick={() => setQty(quantity - 1)}
              className="px-3 py-2 hover:bg-gray-50"
              aria-label="Decrease"
            >
              <Minus size={14} />
            </button>
            <span className="px-4 py-2 text-sm min-w-[40px] text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQty(quantity + 1)}
              className="px-3 py-2 hover:bg-gray-50"
              aria-label="Increase"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-dark text-dark px-4 py-2.5 rounded text-sm font-medium hover:bg-[#000000] hover:text-white transition"
          >
            <ShoppingBag size={16} /> Add to cart
          </button>
        </div>

        {errors.quantity && <p className="text-xs text-red-600">{errors.quantity.message}</p>}

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full bg-[#E9CC2F] hover:bg-accent-dark text-[#1A1A1A] font-semibold py-3 rounded text-sm transition cursor-pointer"
        >
          Buy it now
        </motion.button>
      </form>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
        <Truck size={16} className="text-accent" /> Free shipping on every order
      </div>
    </div>
  );
}