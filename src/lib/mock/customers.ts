// src/lib/mock/customers.ts
import { simulateDelay, createApiResponse, type ApiResponse } from "./api";
import { mockOrders } from "./orders";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: "active" | "inactive";
  joinDate: string;
  avatarColor: string;
  initials: string;
}

// Generate customers from orders data
export const mockCustomers: Customer[] = mockOrders.map((order, index) => {
  const totalSpent = order.pricing.grandTotal;
  // Generate some random order counts
  const orderCount = Math.floor(Math.random() * 5) + 1;
  const joinDate = new Date(
    Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
  );

  // Generate avatar color
  const colors = [
    "#E9CC2F",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Get initials
  const initials = order.customer.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return {
    id: order.id,
    name: order.customer.name,
    email: order.email,
    phone: order.phone,
    orders: orderCount + Math.floor(Math.random() * 10),
    totalSpent: totalSpent * (orderCount + Math.random() * 2),
    status: Math.random() > 0.2 ? "active" : "inactive",
    joinDate: joinDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    avatarColor: color,
    initials: initials,
  };
});

// Add a few more customers for demo
const extraCustomers: Customer[] = [
  {
    id: "c-extra-1",
    name: "Usman Ahmed",
    email: "usman.ahmed@gmail.com",
    phone: "+92 321 9876543",
    orders: 12,
    totalSpent: 156000,
    status: "active",
    joinDate: "Jan 15, 2025",
    avatarColor: "#8B5CF6",
    initials: "UA",
  },
  {
    id: "c-extra-2",
    name: "Ayesha Malik",
    email: "ayesha.malik@outlook.com",
    phone: "+92 333 4567890",
    orders: 8,
    totalSpent: 89000,
    status: "active",
    joinDate: "Mar 3, 2025",
    avatarColor: "#EC4899",
    initials: "AM",
  },
  {
    id: "c-extra-3",
    name: "Bilal Hassan",
    email: "bilal.hassan@yahoo.com",
    phone: "+92 300 1239876",
    orders: 5,
    totalSpent: 42000,
    status: "inactive",
    joinDate: "Dec 10, 2024",
    avatarColor: "#F59E0B",
    initials: "BH",
  },
];

export const allCustomers: Customer[] = [...mockCustomers, ...extraCustomers];

// Mock API functions
export const getCustomers = async (): Promise<ApiResponse<Customer[]>> => {
  await simulateDelay(400);
  return createApiResponse(allCustomers);
};

export const getCustomerById = async (
  id: string,
): Promise<ApiResponse<Customer | null>> => {
  await simulateDelay(300);
  const customer = allCustomers.find((c) => c.id === id);
  return createApiResponse(customer || null);
};

export const searchCustomers = async (
  query: string,
): Promise<ApiResponse<Customer[]>> => {
  await simulateDelay(300);
  const results = allCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query),
  );
  return createApiResponse(results);
};
