import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mock/products";
import { ArrowLeft, Package, Tag, Layers, Star, ShoppingBag, Truck, Shield, Info, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;

    const product = mockProducts.find((item) => item.id === id);

    if (!product) notFound();

    const totalReviews = product.reviews || 0;
    const stockStatus = product.stock > 20 ? "In Stock" : product.stock > 5 ? "Low Stock" : "Out of Stock";
    const stockColor = product.stock > 20 ? "text-emerald-600" : product.stock > 5 ? "text-amber-600" : "text-red-600";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1A1A] transition-colors mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                        {product.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                        Product ID: {product.id} • SKU: {product.sku}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/products/edit/${product.id}`}>
                        <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-6">
                    {/* Product Image & Basic Info */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                {product.badge && (
                                    <span className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-md bg-[#E9CC2F] text-[#1A1A1A]">
                                        {product.badge}
                                    </span>
                                )}
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <h2 className="text-xl font-bold text-[#1A1A1A]">{product.name}</h2>
                                    <p className="text-sm text-gray-500">{product.model}</p>
                                </div>
                                {product.shortDescription && (
                                    <p className="text-sm text-gray-600">{product.shortDescription}</p>
                                )}
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-[#E9CC2F] text-[#E9CC2F]" />
                                        <span className="font-bold text-[#1A1A1A]">{product.rating}</span>
                                        <span className="text-sm text-gray-500">({totalReviews} reviews)</span>
                                    </div>
                                    <span className="text-sm text-gray-300">|</span>
                                    <span className={`text-sm font-semibold ${stockColor}`}>{stockStatus}</span>
                                    <span className="text-sm text-gray-500">• {product.stock} units</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-bold text-[#1A1A1A]">Rs {product.price.toLocaleString()}</span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">Rs {product.originalPrice.toLocaleString()}</span>
                                    )}
                                    {product.discount && (
                                        <span className="text-sm font-bold text-emerald-600">-{product.discount}%</span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">Category: {product.category}</span>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">Model: {product.model}</span>
                                    {product.brands && product.brands.length > 0 && (
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">Brands: {product.brands.join(", ")}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Description */}
                    {product.description && (
                        <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <Layers className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#1A1A1A]">Description</h2>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </section>
                    )}

                    {/* Key Features */}
                    {product.keyFeatures && product.keyFeatures.length > 0 && (
                        <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                                    <Tag className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#1A1A1A]">Key Features</h2>
                                </div>
                            </div>
                            <ul className="grid gap-2 sm:grid-cols-2">
                                {product.keyFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-[#E9CC2F] mt-0.5">•</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Composition */}
                    {product.composition && product.composition.length > 0 && (
                        <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                                    <Info className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#1A1A1A]">Composition</h2>
                                </div>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {product.composition.map((item, index) => (
                                    <div key={index} className="flex justify-between p-2 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium text-gray-600">{item.label}</span>
                                        <span className="text-sm text-gray-800">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Installation Steps */}
                    {product.installationSteps && product.installationSteps.length > 0 && (
                        <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <Truck className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#1A1A1A]">Installation Steps</h2>
                                </div>
                            </div>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                                {product.installationSteps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </section>
                    )}

                    {/* Care Instructions */}
                    {product.careInstructions && product.careInstructions.length > 0 && (
                        <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-rose-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#1A1A1A]">Care Instructions</h2>
                                </div>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                                {product.careInstructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* FAQs */}
                    {product.faqs && product.faqs.length > 0 && (
                        <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
                                    <Info className="w-4 h-4 text-cyan-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#1A1A1A]">FAQs</h2>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {product.faqs.map((faq, index) => (
                                    <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                        <p className="font-semibold text-sm text-[#1A1A1A]">Q: {faq.q}</p>
                                        <p className="text-sm text-gray-600 mt-1">A: {faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    {/* Product Status */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm sticky top-24">
                        <h2 className="text-lg font-bold text-[#1A1A1A]">Product Status</h2>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Status</span>
                                <span className={`text-sm font-bold ${product.status === 'active' ? 'text-emerald-600' :
                                    product.status === 'draft' ? 'text-amber-600' : 'text-gray-600'
                                    }`}>
                                    {product.status && (product.status?.charAt(0).toUpperCase() + product.status?.slice(1)) || 'Draft'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Stock Status</span>
                                <span className={`text-sm font-bold ${stockColor}`}>{stockStatus}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Total Stock</span>
                                <span className="text-sm font-bold text-[#1A1A1A]">{product.stock} units</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Warranty</span>
                                <span className="text-sm font-bold text-[#1A1A1A]">{product.warranty || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">OEM</span>
                                <span className="text-sm font-bold text-[#1A1A1A]">{product.oem || 'N/A'}</span>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-[#1A1A1A]">Quick Actions</h2>
                        <div className="mt-4 grid gap-3">
                            <Link href={`/admin/products/edit/${product.id}`}>
                                <Button className="w-full bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Product
                                </Button>
                            </Link>
                            <Link href="/admin/products">
                                <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-50">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Products
                                </Button>
                            </Link>
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
}