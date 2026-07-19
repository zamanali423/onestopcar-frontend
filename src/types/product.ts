// src/types/product.ts
export interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  model: string;
  description: string;
  shortDescription?: string;
  rating: number;
  reviews: number;
  stock: number;
  slug: string;
  discount?: number;
  badge?: "New" | "Hot" | "Sale" | "Best" | "Popular";
  createdAt: string;
  thumbnails: string[];
  styles: string[];
  brands: string[];
  sku: string;
  status?: "active" | "draft" | "archived";
  images?: ProductImage[];
  compatibility?: string[];
  warranty?: string;
  oem?: string;
  keyFeatures?: string[];
  composition?: Array<{ label: string; value: string }>;
  installationSteps?: string[];
  careInstructions?: string[];
  faqs?: Array<{ q: string; a: string }>;
  seo?: {
    title: string;
    description: string;
    slug: string;
    keywords: string[];
  };
}

export interface CartItem {
  id: string;
  title: string;
  style?: string;
  price: number;
  quantity: number;
  image?: string;
  category: string;
  sku?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  image?: string;
}

export interface ProductFilters {
  category: string;
  priceRange: [number, number];
  search: string;
  model: string;
  sortBy: string;
}
