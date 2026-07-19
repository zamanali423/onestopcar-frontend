// src/types/order.ts
export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered';

export interface OrderProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  rating: number;
  reviewCount: number;
  slug: string;
}

export interface OrderActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  instructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  phone: string;
  status: OrderStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  products: OrderProduct[];
  address: Address;
  courier: {
    name: string;
    trackingId: string;
    logo: string;
  };
  payment: {
    method: string;
    status: string;
  };
  pricing: {
    subtotal: number;
    shipping: number;
    discount: number;
    grandTotal: number;
  };
  dates: {
    placed: string;
    confirmed?: string;
    packed?: string;
    shipped?: string;
    expectedDelivery: string;
    delivered?: string;
  };
  activity: OrderActivity[];
}