// src/lib/mock/vehicles.ts
import { simulateDelay, createApiResponse, type ApiResponse } from "./api";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  engineType: string;
  compatibleProducts: string[];
  color: string;
  image: string;
  price: number;
  fuelType: string;
  transmission: string;
  mileage: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface VehicleFilters {
  make?: string;
  model?: string;
  year?: string;
  engineType?: string;
}

export const mockVehicles: Vehicle[] = [
  // Toyota Vehicles
  {
    id: "toyota-corolla-2020",
    make: "Toyota",
    model: "Corolla",
    year: "2020",
    engineType: "1.8L 4-Cylinder",
    compatibleProducts: ["p1", "p3", "p5", "p7", "p9"],
    color: "#EB0A1E",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 850000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: "15.5 km/L",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "toyota-corolla-2021",
    make: "Toyota",
    model: "Corolla",
    year: "2021",
    engineType: "2.0L 4-Cylinder",
    compatibleProducts: ["p1", "p3", "p5", "p7", "p9", "p11"],
    color: "#EB0A1E",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 920000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: "15.0 km/L",
    status: "active",
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "toyota-yaris-2022",
    make: "Toyota",
    model: "Yaris",
    year: "2022",
    engineType: "1.5L 4-Cylinder",
    compatibleProducts: ["p2", "p4", "p6", "p8"],
    color: "#1A1A1A",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 650000,
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: "16.0 km/L",
    status: "active",
    createdAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "toyota-fortuner-2023",
    make: "Toyota",
    model: "Fortuner",
    year: "2023",
    engineType: "2.8L Diesel",
    compatibleProducts: ["p3", "p5", "p7", "p11"],
    color: "#1A1A1A",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 1200000,
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: "12.0 km/L",
    status: "active",
    createdAt: "2024-04-05T10:00:00Z",
  },

  // Honda Vehicles
  {
    id: "honda-civic-2022",
    make: "Honda",
    model: "Civic",
    year: "2022",
    engineType: "1.5L Turbo",
    compatibleProducts: ["p2", "p4", "p6", "p8", "p10"],
    color: "#CC0000",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 980000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: "14.5 km/L",
    status: "active",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "honda-civic-2023",
    make: "Honda",
    model: "Civic",
    year: "2023",
    engineType: "2.0L 4-Cylinder",
    compatibleProducts: ["p2", "p4", "p6", "p8", "p10", "p12"],
    color: "#CC0000",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 1050000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: "14.0 km/L",
    status: "active",
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "honda-city-2021",
    make: "Honda",
    model: "City",
    year: "2021",
    engineType: "1.5L 4-Cylinder",
    compatibleProducts: ["p2", "p4", "p6"],
    color: "#0033A0",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 720000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: "15.8 km/L",
    status: "active",
    createdAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "honda-accord-2023",
    make: "Honda",
    model: "Accord",
    year: "2023",
    engineType: "2.0L Turbo",
    compatibleProducts: ["p2", "p4", "p6", "p8", "p10"],
    color: "#0033A0",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 1150000,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "13.5 km/L",
    status: "active",
    createdAt: "2024-04-15T10:00:00Z",
  },

  // Suzuki Vehicles
  {
    id: "suzuki-cultus-2020",
    make: "Suzuki",
    model: "Cultus",
    year: "2020",
    engineType: "1.0L 3-Cylinder",
    compatibleProducts: ["p3", "p5", "p7"],
    color: "#004A97",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 450000,
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: "18.0 km/L",
    status: "active",
    createdAt: "2024-01-25T10:00:00Z",
  },
  {
    id: "suzuki-cultus-2023",
    make: "Suzuki",
    model: "Cultus",
    year: "2023",
    engineType: "1.0L 3-Cylinder",
    compatibleProducts: ["p3", "p5", "p7", "p9"],
    color: "#004A97",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 520000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: "17.5 km/L",
    status: "active",
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "suzuki-alto-2022",
    make: "Suzuki",
    model: "Alto",
    year: "2022",
    engineType: "0.8L 3-Cylinder",
    compatibleProducts: ["p3", "p5"],
    color: "#FF6600",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 350000,
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: "20.0 km/L",
    status: "active",
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "suzuki-swift-2023",
    make: "Suzuki",
    model: "Swift",
    year: "2023",
    engineType: "1.2L 4-Cylinder",
    compatibleProducts: ["p3", "p5", "p7", "p9"],
    color: "#E31C23",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 580000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: "16.5 km/L",
    status: "active",
    createdAt: "2024-04-25T10:00:00Z",
  },

  // KIA Vehicles
  {
    id: "kia-sportage-2020",
    make: "KIA",
    model: "Sportage",
    year: "2020",
    engineType: "2.0L 4-Cylinder",
    compatibleProducts: ["p4", "p6", "p8", "p10"],
    color: "#C21B2B",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 950000,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "12.5 km/L",
    status: "active",
    createdAt: "2024-01-30T10:00:00Z",
  },
  {
    id: "kia-sportage-2023",
    make: "KIA",
    model: "Sportage",
    year: "2023",
    engineType: "2.5L 4-Cylinder",
    compatibleProducts: ["p4", "p6", "p8", "p10", "p12"],
    color: "#C21B2B",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 1080000,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "12.0 km/L",
    status: "active",
    createdAt: "2024-02-28T10:00:00Z",
  },
  {
    id: "kia-picanto-2022",
    make: "KIA",
    model: "Picanto",
    year: "2022",
    engineType: "1.2L 4-Cylinder",
    compatibleProducts: ["p4", "p6"],
    color: "#C41E3A",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 480000,
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: "16.0 km/L",
    status: "active",
    createdAt: "2024-03-25T10:00:00Z",
  },
  {
    id: "kia-sorento-2023",
    make: "KIA",
    model: "Sorento",
    year: "2023",
    engineType: "2.2L Diesel",
    compatibleProducts: ["p4", "p6", "p8", "p10"],
    color: "#C21B2B",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 1250000,
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: "11.5 km/L",
    status: "active",
    createdAt: "2024-05-05T10:00:00Z",
  },

  // Hyundai Vehicles
  {
    id: "hyundai-elantra-2022",
    make: "Hyundai",
    model: "Elantra",
    year: "2022",
    engineType: "2.0L 4-Cylinder",
    compatibleProducts: ["p5", "p7", "p9"],
    color: "#0066B3",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 820000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: "14.8 km/L",
    status: "active",
    createdAt: "2024-02-05T10:00:00Z",
  },
  {
    id: "hyundai-elantra-2023",
    make: "Hyundai",
    model: "Elantra",
    year: "2023",
    engineType: "2.5L 4-Cylinder",
    compatibleProducts: ["p5", "p7", "p9", "p11"],
    color: "#0066B3",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 880000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: "14.5 km/L",
    status: "active",
    createdAt: "2024-03-30T10:00:00Z",
  },
  {
    id: "hyundai-tucson-2023",
    make: "Hyundai",
    model: "Tucson",
    year: "2023",
    engineType: "2.0L Diesel",
    compatibleProducts: ["p5", "p7", "p9"],
    color: "#0066B3",
    image:
      "https://images.unsplash.com/photo-1623869675781-2e0d8e7d3f0d?w=500&h=500&fit=crop",
    price: 1100000,
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: "13.0 km/L",
    status: "active",
    createdAt: "2024-04-20T10:00:00Z",
  },
];

// Mock API functions
export const getVehicles = async (): Promise<ApiResponse<Vehicle[]>> => {
  await simulateDelay(500);
  return createApiResponse(mockVehicles);
};

export const getVehicleById = async (
  id: string,
): Promise<ApiResponse<Vehicle | null>> => {
  await simulateDelay(300);
  const vehicle = mockVehicles.find((v) => v.id === id);
  return createApiResponse(vehicle || null);
};

export const getVehiclesByMake = async (
  make: string,
): Promise<ApiResponse<Vehicle[]>> => {
  await simulateDelay(400);
  const vehicles = mockVehicles.filter(
    (v) => v.make.toLowerCase() === make.toLowerCase(),
  );
  return createApiResponse(vehicles);
};

export const getVehiclesByModel = async (
  model: string,
): Promise<ApiResponse<Vehicle[]>> => {
  await simulateDelay(400);
  const vehicles = mockVehicles.filter(
    (v) => v.model.toLowerCase() === model.toLowerCase(),
  );
  return createApiResponse(vehicles);
};

export const getVehiclesByYear = async (
  year: string,
): Promise<ApiResponse<Vehicle[]>> => {
  await simulateDelay(400);
  const vehicles = mockVehicles.filter((v) => v.year === year);
  return createApiResponse(vehicles);
};

export const searchVehicles = async (
  query: string,
): Promise<ApiResponse<Vehicle[]>> => {
  await simulateDelay(500);
  const results = mockVehicles.filter(
    (v) =>
      v.make.toLowerCase().includes(query.toLowerCase()) ||
      v.model.toLowerCase().includes(query.toLowerCase()) ||
      v.year.includes(query) ||
      v.engineType.toLowerCase().includes(query.toLowerCase()),
  );
  return createApiResponse(results);
};

export const getCompatibleProducts = async (
  vehicleId: string,
): Promise<ApiResponse<string[]>> => {
  await simulateDelay(300);
  const vehicle = mockVehicles.find((v) => v.id === vehicleId);
  return createApiResponse(vehicle?.compatibleProducts || []);
};
