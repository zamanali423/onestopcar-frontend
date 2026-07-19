// src/lib/mock/orders.ts
import { simulateDelay, createApiResponse, type ApiResponse } from "./api";

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

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

export interface MockOrder {
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

export const mockOrders: MockOrder[] = [
  {
    id: "1",
    orderNumber: "OSC-202600125",
    email: "muhammadali@gmail.com",
    phone: "03001234567",
    status: "shipped",
    customer: {
      name: "Muhammad Ali",
      email: "muhammadali@gmail.com",
      phone: "+92 300 1234567",
    },
    products: [
      {
        id: "p1",
        name: "Toyota Corolla Premium Floor Mats",
        category: "Interior Accessories",
        price: 3500,
        quantity: 1,
        image: "/images/product-floor-mats.jpg",
        rating: 4.8,
        reviewCount: 124,
        slug: "toyota-corolla-floor-mats",
      },
      {
        id: "p2",
        name: "Honda Dashboard Camera Pro",
        category: "Electronics & Safety",
        price: 8900,
        quantity: 1,
        image: "/images/product-dashcam.jpg",
        rating: 4.6,
        reviewCount: 89,
        slug: "honda-dashboard-camera",
      },
    ],
    address: {
      street: "House #45, Satellite Town",
      city: "Gujranwala",
      province: "Punjab",
      postalCode: "52250",
      country: "Pakistan",
      instructions: "Please call before delivery",
    },
    courier: {
      name: "Trax Courier",
      trackingId: "TS45895231",
      logo: "🚗",
    },
    payment: {
      method: "Cash On Delivery",
      status: "Pending",
    },
    pricing: {
      subtotal: 12400,
      shipping: 250,
      discount: 620,
      grandTotal: 12030,
    },
    dates: {
      placed: "2 July 2026",
      confirmed: "2 July 2026",
      packed: "3 July 2026",
      shipped: "5 July 2026",
      expectedDelivery: "18 July 2026",
    },
    activity: [
      {
        id: "a1",
        title: "Order Placed",
        description: "Your order has been received and is being processed.",
        date: "2 July 2026",
        time: "10:32 AM",
        completed: true,
      },
      {
        id: "a2",
        title: "Payment Confirmed",
        description: "Cash On Delivery confirmed. Order is now processing.",
        date: "2 July 2026",
        time: "10:35 AM",
        completed: true,
      },
      {
        id: "a3",
        title: "Warehouse Processing",
        description: "Your items are being picked from our warehouse.",
        date: "3 July 2026",
        time: "9:00 AM",
        completed: true,
      },
      {
        id: "a4",
        title: "Order Packed",
        description: "Your order has been securely packed and labeled.",
        date: "3 July 2026",
        time: "2:15 PM",
        completed: true,
      },
      {
        id: "a5",
        title: "Shipped via Leopards",
        description: "Package handed to trax Courier. Tracking: LP45895231",
        date: "5 July 2026",
        time: "11:00 AM",
        completed: true,
      },
      {
        id: "a6",
        title: "Reached Lahore Hub",
        description:
          "Package arrived at Lahore sorting hub and is being processed.",
        date: "6 July 2026",
        time: "7:45 PM",
        completed: true,
        current: true,
      },
      {
        id: "a7",
        title: "Out for Delivery",
        description: "Package is out for delivery to your address.",
        date: "Expected: 18 July 2026",
        time: "",
        completed: false,
      },
      {
        id: "a8",
        title: "Delivered",
        description: "Package delivered successfully.",
        date: "Expected: 18 July 2026",
        time: "",
        completed: false,
      },
    ],
  },
  {
    id: "2",
    orderNumber: "OSC-202600089",
    email: "sara.khan@gmail.com",
    phone: "03451239876",
    status: "delivered",
    customer: {
      name: "Sara Khan",
      email: "sara.khan@gmail.com",
      phone: "+92 345 1239876",
    },
    products: [
      {
        id: "p3",
        name: "Toyota Corolla Premium Floor Mats",
        category: "Interior Accessories",
        price: 3500,
        quantity: 2,
        image: "/images/product-floor-mats.jpg",
        rating: 4.8,
        reviewCount: 124,
        slug: "toyota-corolla-floor-mats",
      },
    ],
    address: {
      street: "Plot 22, DHA Phase 5",
      city: "Lahore",
      province: "Punjab",
      postalCode: "54810",
      country: "Pakistan",
    },
    courier: {
      name: "Trax Courier",
      trackingId: "TS38291047",
      logo: "🚗",
    },
    payment: {
      method: "Cash On Delivery",
      status: "Paid",
    },
    pricing: {
      subtotal: 7000,
      shipping: 0,
      discount: 350,
      grandTotal: 6650,
    },
    dates: {
      placed: "15 June 2026",
      confirmed: "15 June 2026",
      packed: "16 June 2026",
      shipped: "17 June 2026",
      expectedDelivery: "22 June 2026",
      delivered: "21 June 2026",
    },
    activity: [
      {
        id: "a1",
        title: "Order Placed",
        description: "Your order has been received and is being processed.",
        date: "15 June 2026",
        time: "3:20 PM",
        completed: true,
      },
      {
        id: "a2",
        title: "Payment Confirmed",
        description: "Cash On Delivery confirmed. Order is now processing.",
        date: "15 June 2026",
        time: "3:22 PM",
        completed: true,
      },
      {
        id: "a3",
        title: "Order Packed",
        description: "Your order has been securely packed and labeled.",
        date: "16 June 2026",
        time: "11:30 AM",
        completed: true,
      },
      {
        id: "a4",
        title: "Shipped via Leopards",
        description: "Package handed to trax Courier. Tracking: LP38291047",
        date: "17 June 2026",
        time: "9:00 AM",
        completed: true,
      },
      {
        id: "a5",
        title: "Out for Delivery",
        description: "Package is out for delivery to your address.",
        date: "21 June 2026",
        time: "8:15 AM",
        completed: true,
      },
      {
        id: "a6",
        title: "Delivered",
        description: "Package delivered successfully. Thank you for shopping!",
        date: "21 June 2026",
        time: "12:40 PM",
        completed: true,
        current: true,
      },
    ],
  },
  {
    id: "3",
    orderNumber: "OSC-202600201",
    email: "ahmed.raza@outlook.com",
    phone: "03121987654",
    status: "confirmed",
    customer: {
      name: "Ahmed Raza",
      email: "ahmed.raza@outlook.com",
      phone: "+92 312 1987654",
    },
    products: [
      {
        id: "p4",
        name: "Honda Dashboard Camera Pro",
        category: "Electronics & Safety",
        price: 8900,
        quantity: 1,
        image: "/images/product-dashcam.jpg",
        rating: 4.6,
        reviewCount: 89,
        slug: "honda-dashboard-camera",
      },
    ],
    address: {
      street: "Street 12, G-11/1",
      city: "Islamabad",
      province: "ICT",
      postalCode: "44000",
      country: "Pakistan",
    },
    courier: {
      name: "Trax Courier",
      trackingId: "Pending Assignment",
      logo: "🚗",
    },
    payment: {
      method: "Cash On Delivery",
      status: "Pending",
    },
    pricing: {
      subtotal: 8900,
      shipping: 300,
      discount: 0,
      grandTotal: 9200,
    },
    dates: {
      placed: "8 July 2026",
      confirmed: "8 July 2026",
      expectedDelivery: "20 July 2026",
    },
    activity: [
      {
        id: "a1",
        title: "Order Placed",
        description: "Your order has been received and is being processed.",
        date: "8 July 2026",
        time: "5:10 PM",
        completed: true,
      },
      {
        id: "a2",
        title: "Order Confirmed",
        description:
          "Our team has confirmed your order and it is being prepared.",
        date: "8 July 2026",
        time: "5:15 PM",
        completed: true,
        current: true,
      },
      {
        id: "a3",
        title: "Order Packed",
        description: "Your order will be packed soon.",
        date: "Expected: 9 July 2026",
        time: "",
        completed: false,
      },
      {
        id: "a4",
        title: "Shipped",
        description: "Package will be handed to courier.",
        date: "Expected: 10 July 2026",
        time: "",
        completed: false,
      },
      {
        id: "a5",
        title: "Delivered",
        description: "Package will be delivered to your address.",
        date: "Expected: 20 July 2026",
        time: "",
        completed: false,
      },
    ],
  },
];

export const STATUS_META: Record<
  OrderStatus,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    step: number;
  }
> = {
  placed: {
    label: "Order Placed",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    step: 0,
  },
  confirmed: {
    label: "Confirmed",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    step: 1,
  },
  packed: {
    label: "Packed",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    step: 2,
  },
  shipped: {
    label: "Shipped",
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    step: 3,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    step: 4,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    step: 5,
  },
};

// Mock API functions
export const findOrder = async (
  orderNumber: string,
  emailOrPhone: string,
): Promise<ApiResponse<MockOrder | null>> => {
  await simulateDelay(800);
  const normalized = emailOrPhone.trim().toLowerCase().replace(/\s/g, "");
  const found = mockOrders.find((o) => {
    const orderMatch =
      o.orderNumber.toLowerCase() === orderNumber.trim().toLowerCase();
    const emailMatch = o.email.toLowerCase() === normalized;
    const phoneMatch = o.phone.replace(/\s/g, "") === normalized;
    return orderMatch && (emailMatch || phoneMatch);
  });
  return createApiResponse(found || null);
};

export const getAllOrders = async (): Promise<ApiResponse<MockOrder[]>> => {
  await simulateDelay(400);
  return createApiResponse(mockOrders);
};

export const getOrderById = async (
  id: string,
): Promise<ApiResponse<MockOrder | null>> => {
  await simulateDelay(300);
  const order = mockOrders.find((o) => o.id === id);
  return createApiResponse(order || null);
};
