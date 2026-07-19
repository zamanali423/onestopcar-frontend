// src/types/checkout.ts
export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  altPhone?: string;
  email?: string;
  country?: string;
  province: string;
  city: string;
  area?: string;
  address: string;
  postalCode?: string;
  landmark?: string;
  orderNotes?: string;
}

export interface OrderDetails {
  orderNumber: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  couponCode: string | null;
}