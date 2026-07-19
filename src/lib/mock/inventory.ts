// src/lib/mock/inventory.ts
import { simulateDelay, createApiResponse, type ApiResponse } from "./api";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  maxStock: number;
  price: number;
  cost: number;
  status: "in-stock" | "low-stock" | "out-of-stock" | "discontinued";
  location: string;
  supplier: string;
  supplierContact?: string;
  lastUpdated: string;
  createdAt: string;
  description?: string;
  weight?: number;
  dimensions?: string;
  reorderPoint: number;
  leadTime: number; // in days
  warehouseLocation: string;
  binNumber: string;
  serialNumber?: string;
  batchNumber?: string;
  expirationDate?: string;
  notes?: string;
}

export interface InventoryTransaction {
  id: string;
  itemId: string;
  type: "in" | "out" | "adjustment" | "return" | "damaged";
  quantity: number;
  previousStock: number;
  newStock: number;
  date: string;
  note: string;
  reference?: string;
  performedBy: string;
}

export interface InventoryAlert {
  id: string;
  itemId: string;
  type: "low-stock" | "out-of-stock" | "expiring" | "overstock";
  message: string;
  severity: "low" | "medium" | "high";
  date: string;
  status: "active" | "resolved" | "dismissed";
}

export const inventoryItems: InventoryItem[] = [
  {
    id: "inv-001",
    name: "LED Headlight Kit H7",
    sku: "LED-H7-001",
    category: "Lighting",
    stock: 145,
    minStock: 20,
    maxStock: 200,
    price: 89.99,
    cost: 45.0,
    status: "in-stock",
    location: "Warehouse A",
    supplier: "Philips",
    supplierContact: "philips@supplier.com",
    lastUpdated: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-01T10:00:00Z",
    description: "Premium LED headlight conversion kit for H7 bulbs",
    weight: 0.5,
    dimensions: "15x10x5 cm",
    reorderPoint: 25,
    leadTime: 7,
    warehouseLocation: "A1",
    binNumber: "B-001",
  },
  {
    id: "inv-002",
    name: "Ceramic Brake Pads",
    sku: "BRK-CER-002",
    category: "Brakes",
    stock: 12,
    minStock: 15,
    maxStock: 100,
    price: 149.99,
    cost: 75.0,
    status: "low-stock",
    location: "Warehouse B",
    supplier: "Brembo",
    supplierContact: "brembo@supplier.com",
    lastUpdated: "2024-01-14T10:00:00Z",
    createdAt: "2024-01-02T10:00:00Z",
    description: "High-performance ceramic brake pads with low dust",
    weight: 2.0,
    dimensions: "20x15x8 cm",
    reorderPoint: 20,
    leadTime: 10,
    warehouseLocation: "B2",
    binNumber: "B-002",
  },
  {
    id: "inv-003",
    name: "Performance Air Filter",
    sku: "FIL-PER-003",
    category: "Engine",
    stock: 0,
    minStock: 10,
    maxStock: 80,
    price: 59.99,
    cost: 28.0,
    status: "out-of-stock",
    location: "Warehouse A",
    supplier: "K&N",
    supplierContact: "kn@supplier.com",
    lastUpdated: "2024-01-13T10:00:00Z",
    createdAt: "2024-01-03T10:00:00Z",
    description: "Reusable performance air filter with improved airflow",
    weight: 0.8,
    dimensions: "25x20x5 cm",
    reorderPoint: 15,
    leadTime: 14,
    warehouseLocation: "A3",
    binNumber: "B-003",
    notes: "Backordered - expected restock on 2024-01-25",
  },
  {
    id: "inv-004",
    name: "Suspension Kit Sport",
    sku: "SUS-SPT-004",
    category: "Suspension",
    stock: 8,
    minStock: 5,
    maxStock: 50,
    price: 399.99,
    cost: 200.0,
    status: "low-stock",
    location: "Warehouse C",
    supplier: "Eibach",
    supplierContact: "eibach@supplier.com",
    lastUpdated: "2024-01-12T10:00:00Z",
    createdAt: "2024-01-04T10:00:00Z",
    description: "Sport suspension kit for improved handling",
    weight: 25.0,
    dimensions: "60x30x20 cm",
    reorderPoint: 10,
    leadTime: 14,
    warehouseLocation: "C1",
    binNumber: "B-004",
  },
  {
    id: "inv-005",
    name: "All-Weather Floor Mats",
    sku: "MAT-AW-005",
    category: "Interior",
    stock: 67,
    minStock: 15,
    maxStock: 150,
    price: 79.99,
    cost: 40.0,
    status: "in-stock",
    location: "Warehouse B",
    supplier: "WeatherTech",
    supplierContact: "weathertech@supplier.com",
    lastUpdated: "2024-01-11T10:00:00Z",
    createdAt: "2024-01-05T10:00:00Z",
    description: "Custom-fit all-weather floor mats",
    weight: 4.5,
    dimensions: "70x50x10 cm",
    reorderPoint: 20,
    leadTime: 7,
    warehouseLocation: "B4",
    binNumber: "B-005",
  },
  {
    id: "inv-006",
    name: "LED Fog Light Kit",
    sku: "LED-FOG-006",
    category: "Lighting",
    stock: 23,
    minStock: 10,
    maxStock: 120,
    price: 69.99,
    cost: 35.0,
    status: "in-stock",
    location: "Warehouse A",
    supplier: "Philips",
    supplierContact: "philips@supplier.com",
    lastUpdated: "2024-01-10T10:00:00Z",
    createdAt: "2024-01-06T10:00:00Z",
    description: "LED fog light kit for improved visibility",
    weight: 1.2,
    dimensions: "20x15x10 cm",
    reorderPoint: 15,
    leadTime: 7,
    warehouseLocation: "A2",
    binNumber: "B-006",
  },
  {
    id: "inv-007",
    name: "Engine Block Assembly Kit",
    sku: "ENG-ASM-007",
    category: "Engine",
    stock: 4,
    minStock: 8,
    maxStock: 60,
    price: 249.99,
    cost: 130.0,
    status: "low-stock",
    location: "Warehouse C",
    supplier: "Motorcraft",
    supplierContact: "motorcraft@supplier.com",
    lastUpdated: "2024-01-09T10:00:00Z",
    createdAt: "2024-01-07T10:00:00Z",
    description: "Complete engine block assembly kit",
    weight: 15.0,
    dimensions: "40x30x20 cm",
    reorderPoint: 10,
    leadTime: 21,
    warehouseLocation: "C2",
    binNumber: "B-007",
  },
  {
    id: "inv-008",
    name: "PPF Protection Film",
    sku: "PPF-PRO-008",
    category: "Protection",
    stock: 0,
    minStock: 5,
    maxStock: 40,
    price: 499.99,
    cost: 250.0,
    status: "out-of-stock",
    location: "Warehouse A",
    supplier: "3M",
    supplierContact: "3m@supplier.com",
    lastUpdated: "2024-01-08T10:00:00Z",
    createdAt: "2024-01-08T10:00:00Z",
    description: "Premium paint protection film for full car",
    weight: 2.0,
    dimensions: "100x50x5 cm",
    reorderPoint: 8,
    leadTime: 14,
    warehouseLocation: "A4",
    binNumber: "B-008",
    notes: "Discontinued - replacement product coming soon",
  },
  {
    id: "inv-009",
    name: "Ceramic Coating Kit",
    sku: "CER-COAT-009",
    category: "Protection",
    stock: 18,
    minStock: 10,
    maxStock: 50,
    price: 129.99,
    cost: 65.0,
    status: "in-stock",
    location: "Warehouse B",
    supplier: "Gtechniq",
    supplierContact: "gtechniq@supplier.com",
    lastUpdated: "2024-01-07T10:00:00Z",
    createdAt: "2024-01-09T10:00:00Z",
    description: "Professional-grade ceramic coating kit",
    weight: 1.0,
    dimensions: "15x15x8 cm",
    reorderPoint: 12,
    leadTime: 10,
    warehouseLocation: "B5",
    binNumber: "B-009",
  },
  {
    id: "inv-010",
    name: "Wiper Blade Set",
    sku: "WIP-SET-010",
    category: "Accessories",
    stock: 34,
    minStock: 15,
    maxStock: 100,
    price: 24.99,
    cost: 12.0,
    status: "in-stock",
    location: "Warehouse A",
    supplier: "Bosch",
    supplierContact: "bosch@supplier.com",
    lastUpdated: "2024-01-06T10:00:00Z",
    createdAt: "2024-01-10T10:00:00Z",
    description: "Premium wiper blade set for all-weather performance",
    weight: 0.4,
    dimensions: "50x5x3 cm",
    reorderPoint: 20,
    leadTime: 5,
    warehouseLocation: "A5",
    binNumber: "B-010",
  },
];

// Mock Transactions
export const inventoryTransactions: InventoryTransaction[] = [
  {
    id: "tr-001",
    itemId: "inv-001",
    type: "in",
    quantity: 50,
    previousStock: 95,
    newStock: 145,
    date: "2024-01-15T10:00:00Z",
    note: "Restocked from supplier",
    reference: "PO-2024-001",
    performedBy: "Admin",
  },
  {
    id: "tr-002",
    itemId: "inv-002",
    type: "out",
    quantity: 8,
    previousStock: 20,
    newStock: 12,
    date: "2024-01-14T10:00:00Z",
    note: "Customer order #ORD-2024-002",
    reference: "ORD-2024-002",
    performedBy: "Admin",
  },
  {
    id: "tr-003",
    itemId: "inv-003",
    type: "out",
    quantity: 15,
    previousStock: 15,
    newStock: 0,
    date: "2024-01-13T10:00:00Z",
    note: "Last items sold - restock needed",
    reference: "ORD-2024-003",
    performedBy: "Admin",
  },
  {
    id: "tr-004",
    itemId: "inv-004",
    type: "adjustment",
    quantity: -2,
    previousStock: 10,
    newStock: 8,
    date: "2024-01-12T10:00:00Z",
    note: "Physical inventory adjustment - damaged items",
    performedBy: "Admin",
  },
];

// Mock Alerts
export const inventoryAlerts: InventoryAlert[] = [
  {
    id: "alert-001",
    itemId: "inv-002",
    type: "low-stock",
    message: "Ceramic Brake Pads are below minimum stock level (12 units)",
    severity: "high",
    date: "2024-01-14T10:00:00Z",
    status: "active",
  },
  {
    id: "alert-002",
    itemId: "inv-003",
    type: "out-of-stock",
    message: "Performance Air Filter is out of stock",
    severity: "high",
    date: "2024-01-13T10:00:00Z",
    status: "active",
  },
  {
    id: "alert-003",
    itemId: "inv-007",
    type: "low-stock",
    message: "Engine Block Assembly Kit is below minimum stock level (4 units)",
    severity: "medium",
    date: "2024-01-09T10:00:00Z",
    status: "active",
  },
];

// Mock API Functions
export const getInventoryItems = async (): Promise<
  ApiResponse<InventoryItem[]>
> => {
  await simulateDelay(500);
  return createApiResponse(inventoryItems);
};

export const getInventoryItemById = async (
  id: string,
): Promise<ApiResponse<InventoryItem | null>> => {
  await simulateDelay(300);
  const item = inventoryItems.find((i) => i.id === id);
  return createApiResponse(item || null);
};

export const getInventoryItemBySku = async (
  sku: string,
): Promise<ApiResponse<InventoryItem | null>> => {
  await simulateDelay(300);
  const item = inventoryItems.find((i) => i.sku === sku);
  return createApiResponse(item || null);
};

export const getLowStockItems = async (): Promise<
  ApiResponse<InventoryItem[]>
> => {
  await simulateDelay(400);
  const items = inventoryItems.filter(
    (i) => i.status === "low-stock" || i.status === "out-of-stock",
  );
  return createApiResponse(items);
};

export const getInventoryByCategory = async (
  category: string,
): Promise<ApiResponse<InventoryItem[]>> => {
  await simulateDelay(400);
  const items = inventoryItems.filter(
    (i) => i.category.toLowerCase() === category.toLowerCase(),
  );
  return createApiResponse(items);
};

export const getInventoryByLocation = async (
  location: string,
): Promise<ApiResponse<InventoryItem[]>> => {
  await simulateDelay(400);
  const items = inventoryItems.filter(
    (i) => i.location.toLowerCase() === location.toLowerCase(),
  );
  return createApiResponse(items);
};

export const getInventoryTransactions = async (
  itemId: string,
): Promise<ApiResponse<InventoryTransaction[]>> => {
  await simulateDelay(300);
  const transactions = inventoryTransactions.filter((t) => t.itemId === itemId);
  return createApiResponse(transactions);
};

export const getInventoryAlerts = async (): Promise<
  ApiResponse<InventoryAlert[]>
> => {
  await simulateDelay(300);
  return createApiResponse(inventoryAlerts);
};

export const getInventoryStats = async () => {
  await simulateDelay(300);
  const totalItems = inventoryItems.length;
  const totalStock = inventoryItems.reduce((sum, i) => sum + i.stock, 0);
  const lowStock = inventoryItems.filter(
    (i) => i.status === "low-stock",
  ).length;
  const outOfStock = inventoryItems.filter(
    (i) => i.status === "out-of-stock",
  ).length;
  const totalValue = inventoryItems.reduce(
    (sum, i) => sum + i.stock * i.price,
    0,
  );
  const totalCost = inventoryItems.reduce(
    (sum, i) => sum + i.stock * i.cost,
    0,
  );

  return createApiResponse({
    totalItems,
    totalStock,
    lowStock,
    outOfStock,
    totalValue,
    totalCost,
    profitMargin: (((totalValue - totalCost) / totalValue) * 100).toFixed(1),
  });
};

export const updateInventoryStock = async (
  id: string,
  quantity: number,
  type: "in" | "out" | "adjustment",
): Promise<ApiResponse<InventoryItem>> => {
  await simulateDelay(500);
  const item = inventoryItems.find((i) => i.id === id);
  if (!item) {
    return createApiResponse(null as any, "Item not found");
  }

  const newStock =
    type === "in" ? item.stock + quantity : item.stock - quantity;
  const finalStock = Math.max(0, newStock);

  // Determine status with proper typing
  let status: "in-stock" | "low-stock" | "out-of-stock" | "discontinued";
  if (finalStock === 0) {
    status = "out-of-stock";
  } else if (finalStock < item.minStock) {
    status = "low-stock";
  } else {
    status = "in-stock";
  }

  const updatedItem: InventoryItem = {
    ...item,
    stock: finalStock,
    status: status,
    lastUpdated: new Date().toISOString(),
  };

  const index = inventoryItems.findIndex((i) => i.id === id);
  if (index !== -1) {
    inventoryItems[index] = updatedItem;
  }

  return createApiResponse(updatedItem);
};
