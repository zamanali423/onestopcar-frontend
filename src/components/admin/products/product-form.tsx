"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/types";
import { ChevronLeft, Save, Copy, Trash2, Plus, Image as ImageIcon, X, Tag, Package, Layers } from "lucide-react";

type ProductStatus = "active" | "draft" | "archived";
type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "backorder";

interface Variant {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
}

type Props = {
    initialData?: Product;
};

export function ProductForm({ initialData }: Props) {
    const router = useRouter();

    const [form, setForm] = useState({
        name: initialData?.name ?? "",
        sku: initialData?.sku ?? "",
        oem: initialData?.oem ?? "N/A",
        warranty: initialData?.warranty ?? "18 Months",
        regularPrice: initialData?.originalPrice ?? 0,
        salePrice: initialData?.price ?? 0,
        stock: initialData?.stock ?? 0,
        status: (initialData?.status as ProductStatus) ?? "draft",
        stockStatus: "in_stock" as StockStatus,
        media: initialData?.images?.map(img => img.src).join("\n") ?? "",
        compatibility: initialData?.compatibility?.join(", ") ?? "",
        description: initialData?.description ?? "",
        shortDescription: initialData?.shortDescription ?? "",
        seoTitle: initialData?.seo?.title ?? "",
        seoDescription: initialData?.seo?.description ?? "",
        keywords: initialData?.seo?.keywords?.join(", ") ?? "",
        category: initialData?.category ?? "",
        model: initialData?.model ?? "",
        discount: initialData?.discount ?? 0,
        badge: initialData?.badge ?? "",
        styles: initialData?.styles?.join(", ") ?? "",
        brands: initialData?.brands?.join(", ") ?? "",
        thumbnails: initialData?.thumbnails?.join("\n") ?? "",
        keyFeatures: initialData?.keyFeatures?.join("\n") ?? "",
        composition: initialData?.composition?.map(c => `${c.label}: ${c.value}`).join("\n") ?? "",
        installationSteps: initialData?.installationSteps?.join("\n") ?? "",
        careInstructions: initialData?.careInstructions?.join("\n") ?? "",
        faqs: initialData?.faqs?.map(f => `Q: ${f.q}\nA: ${f.a}`).join("\n\n") ?? "",
    });

    const [variants, setVariants] = useState<Variant[]>([]);
    const [showVariantForm, setShowVariantForm] = useState(false);
    const [newVariant, setNewVariant] = useState<Partial<Variant>>({
        name: "",
        sku: "",
        price: 0,
        stock: 0,
        attributes: {},
    });

    // Update stock status based on stock value
    const getStockStatus = (stock: number): StockStatus => {
        if (stock <= 0) return "out_of_stock";
        if (stock <= 5) return "low_stock";
        return "in_stock";
    };

    const handleSave = () => {
        const productData = {
            ...form,
            status: form.status as ProductStatus,
            stockStatus: getStockStatus(form.stock),
            compatibility: form.compatibility.split(",").map(s => s.trim()).filter(Boolean),
            styles: form.styles.split(",").map(s => s.trim()).filter(Boolean),
            brands: form.brands.split(",").map(s => s.trim()).filter(Boolean),
            thumbnails: form.thumbnails.split("\n").filter(s => s.trim()),
            keyFeatures: form.keyFeatures.split("\n").filter(s => s.trim()),
            composition: form.composition.split("\n").filter(s => s.trim()).map(line => {
                const [label, value] = line.split(":").map(s => s.trim());
                return { label, value };
            }),
            installationSteps: form.installationSteps.split("\n").filter(s => s.trim()),
            careInstructions: form.careInstructions.split("\n").filter(s => s.trim()),
            faqs: form.faqs.split("\n\n").filter(s => s.trim()).map(faq => {
                const lines = faq.split("\n");
                const q = lines.find(l => l.startsWith("Q:"))?.replace("Q:", "").trim() || "";
                const a = lines.find(l => l.startsWith("A:"))?.replace("A:", "").trim() || "";
                return { q, a };
            }),
            images: form.media.split("\n").filter(s => s.trim()).map((src, index) => ({
                id: `img-${index}`,
                src: src.trim(),
                alt: `${form.name} - ${index + 1}`
            })),
            variants: variants,
        };

        if (initialData) {
            console.log("update product", initialData.id, productData);
        } else {
            console.log("create product", productData);
        }

        router.push("/admin/products");
    };

    const handleAddVariant = () => {
        if (newVariant.name && newVariant.sku) {
            setVariants([...variants, {
                id: `var-${Date.now()}`,
                name: newVariant.name,
                sku: newVariant.sku,
                price: newVariant.price || 0,
                stock: newVariant.stock || 0,
                attributes: newVariant.attributes || {},
            }]);
            setNewVariant({ name: "", sku: "", price: 0, stock: 0, attributes: {} });
            setShowVariantForm(false);
        }
    };

    const handleRemoveVariant = (id: string) => {
        setVariants(variants.filter(v => v.id !== id));
    };

    const statusMap: Record<string, ProductStatus> = {
        active: "active",
        draft: "draft",
        archived: "archived",
    };

    const stockStatusLabels: Record<StockStatus, string> = {
        in_stock: "In Stock",
        low_stock: "Low Stock",
        out_of_stock: "Out of Stock",
        backorder: "Backorder",
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <button
                        onClick={() => router.push("/admin/products")}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1A1A] transition-colors mb-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Products
                    </button>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">
                        {initialData ? "Edit Product" : "Add New Product"}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {initialData ? "Update product details" : "Create a new product in your catalog"}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                        onClick={() => router.push("/admin/products")}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]"
                        onClick={handleSave}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {initialData ? "Update Product" : "Save Product"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-6">
                    {/* Basic Details */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-[#E9CC2F]/10 flex items-center justify-center">
                                <Tag className="w-4 h-4 text-[#E9CC2F]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Basic Details</h2>
                                <p className="text-sm text-gray-500">Essential product information</p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Enter product name"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SKU <span className="text-red-500">*</span></label>
                                <Input
                                    value={form.sku}
                                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                                    placeholder="Enter SKU"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                <Input
                                    value={form.model}
                                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                                    placeholder="e.g., Universal, Toyota Corolla"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <Input
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    placeholder="e.g., interior, exterior"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">OEM</label>
                                <Input
                                    value={form.oem}
                                    onChange={(e) => setForm({ ...form, oem: e.target.value })}
                                    placeholder="OEM information"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
                                <Input
                                    value={form.warranty}
                                    onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                                    placeholder="e.g., 24 Months"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                                <Input
                                    value={form.badge}
                                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                                    placeholder="New, Hot, Sale, Best, Popular"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>

                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price</label>
                                <Input
                                    value={String(form.regularPrice)}
                                    onChange={(e) => setForm({ ...form, regularPrice: Number(e.target.value) })}
                                    placeholder="0"
                                    type="number"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
                                <Input
                                    value={String(form.salePrice)}
                                    onChange={(e) => setForm({ ...form, salePrice: Number(e.target.value) })}
                                    placeholder="0"
                                    type="number"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                                <Input
                                    value={String(form.discount)}
                                    onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                                    placeholder="0"
                                    type="number"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                                <Input
                                    value={String(form.stock)}
                                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                                    placeholder="0"
                                    type="number"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                                // Option 1: Use type assertion with 'as'
                                <Select
                                    value={getStockStatus(form.stock)}
                                    onValueChange={(value) => {
                                        setForm({ ...form, stockStatus: value as StockStatus });
                                    }}
                                >
                                    <SelectTrigger className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20">
                                        <SelectValue placeholder="Stock Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="in_stock">In Stock</SelectItem>
                                        <SelectItem value="low_stock">Low Stock</SelectItem>
                                        <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                        <SelectItem value="backorder">Backorder</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Status</label>
                                <Select
                                    value={form.status}
                                    onValueChange={(value) => setForm({ ...form, status: value as ProductStatus })}
                                >
                                    <SelectTrigger className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </section>

                    {/* Description */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                <Layers className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Description</h2>
                                <p className="text-sm text-gray-500">Product descriptions</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                <Textarea
                                    value={form.shortDescription}
                                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                                    className="min-h-20 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                    placeholder="Brief product description (max 150 characters)"
                                    maxLength={150}
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    {form.shortDescription.length}/150 characters
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                                <Textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="min-h-32 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                    placeholder="Detailed product description"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Media and Gallery */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                                <ImageIcon className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Media & Gallery</h2>
                                <p className="text-sm text-gray-500">Add product images</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
                                <Input
                                    value={form.media.split("\n")[0] || ""}
                                    onChange={(e) => {
                                        const rest = form.media.split("\n").slice(1).join("\n");
                                        setForm({ ...form, media: e.target.value + (rest ? "\n" + rest : "") });
                                    }}
                                    placeholder="Main image URL"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images (one per line)</label>
                                <Textarea
                                    value={form.media.split("\n").slice(1).join("\n")}
                                    onChange={(e) => {
                                        const main = form.media.split("\n")[0] || "";
                                        setForm({ ...form, media: main + (e.target.value ? "\n" + e.target.value : "") });
                                    }}
                                    className="min-h-32 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                    placeholder="Additional image URLs (one per line)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnails (one per line)</label>
                                <Textarea
                                    value={form.thumbnails}
                                    onChange={(e) => setForm({ ...form, thumbnails: e.target.value })}
                                    className="min-h-32 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                    placeholder="Thumbnail URLs (one per line)"
                                />
                            </div>
                            <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                                <Plus className="w-4 h-4 mr-2" />
                                Upload Images
                            </Button>
                        </div>
                    </section>

                    {/* Variants */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                                <Package className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Variants</h2>
                                <p className="text-sm text-gray-500">Add size, color, or fitment options</p>
                            </div>
                        </div>

                        {/* Variants List */}
                        {variants.length > 0 && (
                            <div className="space-y-2 mb-4">
                                {variants.map((variant) => (
                                    <div key={variant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <div>
                                            <p className="font-semibold text-sm text-[#1A1A1A]">{variant.name}</p>
                                            <p className="text-xs text-gray-500">SKU: {variant.sku} | Price: Rs {variant.price} | Stock: {variant.stock}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveVariant(variant.id)}
                                            className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add Variant Form */}
                        {showVariantForm ? (
                            <div className="border border-gray-200 rounded-xl p-4 space-y-3">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Variant Name *</label>
                                        <Input
                                            value={newVariant.name}
                                            onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                                            placeholder="e.g., Black, Large"
                                            className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Variant SKU *</label>
                                        <Input
                                            value={newVariant.sku}
                                            onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                                            placeholder="SKU for variant"
                                            className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                                        <Input
                                            value={String(newVariant.price)}
                                            onChange={(e) => setNewVariant({ ...newVariant, price: Number(e.target.value) })}
                                            placeholder="0"
                                            type="number"
                                            className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Stock</label>
                                        <Input
                                            value={String(newVariant.stock)}
                                            onChange={(e) => setNewVariant({ ...newVariant, stock: Number(e.target.value) })}
                                            placeholder="0"
                                            type="number"
                                            className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleAddVariant}
                                        className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]"
                                        disabled={!newVariant.name || !newVariant.sku}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Variant
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowVariantForm(false)}
                                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setShowVariantForm(true)}
                                className="w-full bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Variant
                            </Button>
                        )}
                    </section>

                    {/* Key Features */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <Tag className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Key Features</h2>
                                <p className="text-sm text-gray-500">List product features (one per line)</p>
                            </div>
                        </div>
                        <Textarea
                            value={form.keyFeatures}
                            onChange={(e) => setForm({ ...form, keyFeatures: e.target.value })}
                            className="min-h-32 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                            placeholder="Vehicle-specific precision fit&#10;Blocks up to 99% harmful UV rays&#10;Reduces cabin heat significantly"
                        />
                    </section>

                    {/* Composition */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                                <Layers className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Composition</h2>
                                <p className="text-sm text-gray-500">Product specifications (Label: Value format)</p>
                            </div>
                        </div>
                        <Textarea
                            value={form.composition}
                            onChange={(e) => setForm({ ...form, composition: e.target.value })}
                            className="min-h-32 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                            placeholder="Material: Premium Polyester Mesh with Flexible Steel Frame&#10;UV Protection: Up to 99%&#10;Heat Reduction: Up to 60%"
                        />
                    </section>

                    {/* Installation */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <Package className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Installation</h2>
                                <p className="text-sm text-gray-500">Installation steps (one per line)</p>
                            </div>
                        </div>
                        <Textarea
                            value={form.installationSteps}
                            onChange={(e) => setForm({ ...form, installationSteps: e.target.value })}
                            className="min-h-32 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                            placeholder="Unfold the sunshade carefully.&#10;Align it with the vehicle window frame.&#10;Insert the upper edge first."
                        />
                    </section>

                    {/* Care Instructions */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center">
                                <Layers className="w-4 h-4 text-rose-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Care Instructions</h2>
                                <p className="text-sm text-gray-500">Care instructions (one per line)</p>
                            </div>
                        </div>
                        <Textarea
                            value={form.careInstructions}
                            onChange={(e) => setForm({ ...form, careInstructions: e.target.value })}
                            className="min-h-32 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                            placeholder="Clean using a soft damp cloth.&#10;Do not machine wash.&#10;Avoid harsh chemicals."
                        />
                    </section>

                    {/* FAQs */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
                                <Layers className="w-4 h-4 text-cyan-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">FAQs</h2>
                                <p className="text-sm text-gray-500">Frequently asked questions (Q: ... / A: ... format)</p>
                            </div>
                        </div>
                        <Textarea
                            value={form.faqs}
                            onChange={(e) => setForm({ ...form, faqs: e.target.value })}
                            className="min-h-48 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                            placeholder="Q: Will these fit my vehicle exactly?&#10;A: Yes. Each sunshade is manufactured specifically for the supported vehicle model.&#10;&#10;Q: Can I roll down the windows?&#10;A: Yes. Windows can be partially opened while the shades remain installed."
                        />
                    </section>

                    {/* Styles & Brands */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                                <Tag className="w-4 h-4 text-teal-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Styles & Brands</h2>
                                <p className="text-sm text-gray-500">Product variants and brands</p>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Styles (comma separated)</label>
                                <Input
                                    value={form.styles}
                                    onChange={(e) => setForm({ ...form, styles: e.target.value })}
                                    placeholder="Matte Black, Carbon Fiber, Leather, Red Stitch"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brands (comma separated)</label>
                                <Input
                                    value={form.brands}
                                    onChange={(e) => setForm({ ...form, brands: e.target.value })}
                                    placeholder="Toyota, Honda, Suzuki, Universal"
                                    className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Compatibility */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                                <Layers className="w-4 h-4 text-violet-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Compatibility</h2>
                                <p className="text-sm text-gray-500">Vehicle fitment information</p>
                            </div>
                        </div>
                        <Textarea
                            value={form.compatibility}
                            onChange={(e) => setForm({ ...form, compatibility: e.target.value })}
                            className="min-h-32 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                            placeholder="Toyota Corolla 2019-2024, Honda Civic 2022-2024, Suzuki Cultus 2017-2024"
                        />
                    </section>

                    {/* SEO */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                                <Layers className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">SEO</h2>
                                <p className="text-sm text-gray-500">Search engine optimization</p>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <Input
                                value={form.seoTitle}
                                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                                placeholder="SEO Title"
                                className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                            />
                            <Textarea
                                value={form.seoDescription}
                                onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                                placeholder="Meta Description"
                                className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                            />
                            <Input
                                value={form.keywords}
                                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                                placeholder="Keywords (comma separated)"
                                className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                            />
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm sticky top-24">
                        <h2 className="text-lg font-bold text-[#1A1A1A]">Actions</h2>
                        <div className="mt-4 grid gap-3">
                            <Button
                                className="w-full bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]"
                                onClick={handleSave}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {initialData ? "Update Product" : "Save Product"}
                            </Button>
                            <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-50">
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate Product
                            </Button>
                            {initialData && (
                                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Product
                                </Button>
                            )}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
}