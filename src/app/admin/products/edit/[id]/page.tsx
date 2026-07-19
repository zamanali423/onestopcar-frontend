import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mock/products";
import { ProductForm } from "@/components/admin/products/product-form";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditProductPage({ params }: Props) {
    const { id } = await params;

    const product = mockProducts.find((item) => item.id === id);

    if (!product) notFound();

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E9CC2F]">
                        Edit Product
                    </p>
                    <h1 className="mt-1 text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                        {product.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                        Update product details and information
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${product.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : product.status === 'draft'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-gray-100 text-gray-600'
                        }`}>
                        {product?.status && (product?.status?.charAt(0).toUpperCase() + product?.status?.slice(1)) || 'Draft'}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                        SKU: {product.sku}
                    </span>
                </div>
            </div>

            {/* Product Form */}
            <ProductForm initialData={product} />
        </div>
    );
}