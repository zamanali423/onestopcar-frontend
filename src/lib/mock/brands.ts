import { createApiResponse, simulateDelay } from "./api";

// src/lib/mock/brands.ts
export interface Brand {
  id: string;
  name: string;
  slug: string;
  country: string;
  products: number;
  color: string;
}

export const mockBrands: Brand[] = [
  { id: 'b1', name: 'Daewoo', slug: 'daewoo', country: 'Korea', products: 145, color: '#003087' },
  { id: 'b2', name: '3M', slug: '3m', country: 'USA', products: 280, color: '#FF0000' },
  { id: 'b3', name: "Meguiar's", slug: 'meguiars', country: 'USA', products: 98, color: '#002868' },
  { id: 'b4', name: 'Turtle Wax', slug: 'turtle-wax', country: 'USA', products: 76, color: '#1B4D3E' },
  { id: 'b5', name: 'AutoGlym', slug: 'autoglym', country: 'UK', products: 54, color: '#C41E3A' },
  { id: 'b6', name: 'Sonax', slug: 'sonax', country: 'Germany', products: 67, color: '#0066CC' },
  { id: 'b7', name: 'Rain-X', slug: 'rain-x', country: 'USA', products: 43, color: '#1A5276' },
  { id: 'b8', name: 'WD-40', slug: 'wd-40', country: 'USA', products: 32, color: '#003366' },
  { id: 'b9', name: 'Armor All', slug: 'armor-all', country: 'USA', products: 89, color: '#CC0000' },
  { id: 'b10', name: 'Chemical Guys', slug: 'chemical-guys', country: 'USA', products: 112, color: '#2E86AB' },
  { id: 'b11', name: 'Mothers', slug: 'mothers', country: 'USA', products: 78, color: '#E74C3C' },
  { id: 'b12', name: 'Gtechniq', slug: 'gtechniq', country: 'UK', products: 45, color: '#1A1A2E' },
];

export const getBrands = async () => {
  await simulateDelay(300);
  return createApiResponse(mockBrands);
};

export const getBrandBySlug = async (slug: string) => {
  await simulateDelay(200);
  const brand = mockBrands.find(b => b.slug === slug);
  return createApiResponse(brand || null);
};