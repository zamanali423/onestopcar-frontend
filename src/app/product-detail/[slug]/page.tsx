"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductGallery } from "@/components/product_detail/ProductGallery";
import { ProductInfo } from "@/components/product_detail/ProductInfo";
import { ProductDetails } from "@/components/product_detail/ProductDetails";
import { RelatedProducts } from "@/components/product_detail/RelatedProducts";
import { ProductTabs } from "@/components/product_detail/ProductTabs";
import { mockProducts, type Product, getRelatedProducts } from "@/lib/mock/products";
import { Loader2 } from "lucide-react";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                // Find product by slug
                const foundProduct = mockProducts.find((p) => p.slug === slug);

                if (!foundProduct) {
                    setError("Product not found");
                    setLoading(false);
                    return;
                }

                setProduct(foundProduct);

                // Fetch related products
                const related = mockProducts
                    .filter((p) => p.id !== foundProduct.id && p.category === foundProduct.category)
                    .slice(0, 4);
                setRelatedProducts(related);

                setLoading(false);
            } catch (err) {
                setError("Failed to load product");
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-[#E9CC2F] mx-auto mb-4" />
                    <p className="text-gray-500">Loading product...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error || !product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg font-semibold mb-4">{error || "Product not found"}</p>
                    <button
                        onClick={() => router.push("/shop")}
                        className="px-6 py-2 bg-[#E9CC2F] text-[#1A1A1A] rounded-lg font-semibold hover:bg-[#d4b828] transition-colors"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-[1280px] mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                    <ProductGallery product={product} />
                    <ProductInfo product={product} />
                </div>
                <ProductDetails product={product} />
                <ProductTabs product={product} />
            </main>
            <RelatedProducts products={relatedProducts} />
        </div>
    );
}