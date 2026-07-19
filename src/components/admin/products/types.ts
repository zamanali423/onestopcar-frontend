export type ProductVariant = {
    id: string;
    name: string;
    sku: string;
    price?: number;
    stock?: number;
    attributes: Record<string, string>;
};

export type ProductSeo = {
    title: string;
    description: string;
    slug: string;
    keywords: string[];
    canonical?: string;
    noIndex?: boolean;
};

export type VehicleFitment = {
    make: string;
    model: string;
    yearFrom: number;
    yearTo: number;
    trim?: string;
    engine?: string;
    note?: string;
};

export type ProductImage = {
    id: string;
    src: string;
    alt: string;
};

export type ProductSpecification = {
    name: string;
    value: string;
};

export type ProductReview = {
    id: string;
    username: string;
    rating: number;
    date: string;
    comment: string;
};

export type ProductQuestion = {
    id: string;
    question: string;
    answer: string;
};

export type ProductRecord = {
    // Basic
    id: string;
    name: string;
    slug: string;
    sku: string;
    oem: string;

    // Classification
    brand: string;
    category: string;

    // Pricing
    regularPrice: number;
    salePrice?: number | null;

    // Store
    rating: number;
    reviewCount: number;

    stock: number;
    stockStatus: "In Stock" | "Low Stock" | "Out of Stock";

    status: "Active" | "Draft" | "Archived";

    badge?: string;

    isFeatured: boolean;
    isNew: boolean;
    isOnSale: boolean;

    // Images
    thumbnail: string;

    images: ProductImage[];

    gallery: {
        main: string;
        zoom: string;
        images: string[];
    };

    // Product Information
    warranty: string;

    specifications: ProductSpecification[];

    compatibility: string[];

    vehicleCompatibility: VehicleFitment[];

    variants: ProductVariant[];

    // Reviews
    reviews: ProductReview[];

    questions: ProductQuestion[];

    // Related Products
    relatedProducts: string[];

    frequentlyBoughtTogether: {
        bundleProducts: string[];
        bundleDiscountPercent: number;
    };

    // SEO
    seo: ProductSeo;

    // Dates
    createdAt: string;
    updatedAt: string;
};