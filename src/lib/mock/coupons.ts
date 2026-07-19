import { ApiResponse, createApiResponse, simulateDelay } from "./api";

// src/lib/mock/coupons.ts
export interface Coupon {
  code: string;
  discount: number;
  type: 'fixed' | 'percent';
  label: string;
  description?: string;
  expiresAt?: string;
}

export const mockCoupons: Record<string, Coupon> = {
  WELCOME10: {
    code: 'WELCOME10',
    discount: 10,
    type: 'percent',
    label: '10% Welcome Discount',
    description: 'Get 10% off your first order',
    expiresAt: '2026-12-31T23:59:59Z',
  },
  SAVE500: {
    code: 'SAVE500',
    discount: 500,
    type: 'fixed',
    label: 'Rs. 500 Off',
    description: 'Save Rs. 500 on any order above Rs. 2,500',
    expiresAt: '2026-12-31T23:59:59Z',
  },
  DRIVE20: {
    code: 'DRIVE20',
    discount: 20,
    type: 'percent',
    label: '20% Drive Season Sale',
    description: '20% off on all accessories',
    expiresAt: '2026-09-30T23:59:59Z',
  },
};

export const validateCoupon = async (code: string): Promise<ApiResponse<Coupon | null>> => {
  await simulateDelay(400);
  const coupon = mockCoupons[code.toUpperCase()];
  if (!coupon) {
    return createApiResponse(null, 'Invalid coupon code', 404);
  }
  return createApiResponse(coupon);
};