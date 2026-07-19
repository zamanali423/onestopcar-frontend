// src/types/common.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  count: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  country: string;
  products: number;
  color: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'fixed' | 'percent';
  label: string;
  description?: string;
  expiresAt?: string;
}