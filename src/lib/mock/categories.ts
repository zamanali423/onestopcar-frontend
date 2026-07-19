// src/lib/mock/categories.ts

export const mockCategories = [
  { id: "all", name: "All Categories" },
  { id: "exterior", name: "Exterior" },
  { id: "interior", name: "Interior" },
  { id: "electronics", name: "Electronics" },
  { id: "sunshades", name: "Sun Shades" },
  { id: "carcare", name: "Car Care" },
];

// Define the CarModel type
export interface CarModel {
  id: string;
  name: string;
  years: string;
  products: number;
  color: string;
  image: string;
}

export const carModels: CarModel[] = [
  {
    id: "toyota-corolla",
    name: "Toyota Corolla",
    years: "2019-2024",
    products: 342,
    color: "#EB0A1E",
    image: "https://images.pexels.com/photos/25189122/pexels-photo-25189122.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    id: "honda-civic",
    name: "Honda Civic",
    years: "2022-2024",
    products: 287,
    color: "#CC0000",
    image: "https://images.pexels.com/photos/18108314/pexels-photo-18108314.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    id: "suzuki-cultus",
    name: "Suzuki Cultus",
    years: "2017-2024",
    products: 198,
    color: "#004A97",
    image: "https://images.pexels.com/photos/33268786/pexels-photo-33268786.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    id: "kia-sportage",
    name: "KIA Sportage",
    years: "2020-2024",
    products: 256,
    color: "#C21B2B",
    image: "https://images.pexels.com/photos/94272/sports-car-pkw-auto-vehicle-94272.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    id: "toyota-yaris",
    name: "Toyota Yaris",
    years: "2020-2024",
    products: 156,
    color: "#1A1A1A",
    image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    id: "honda-city",
    name: "Honda City",
    years: "2021-2024",
    products: 189,
    color: "#0033A0",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    id: "suzuki-alto",
    name: "Suzuki Alto",
    years: "2018-2024",
    products: 134,
    color: "#FF6600",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    id: "kia-picanto",
    name: "KIA Picanto",
    years: "2020-2024",
    products: 167,
    color: "#C41E3A",
    image: "https://images.pexels.com/photos/212773/pexels-photo-212773.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    id: "hyundai-elantra",
    name: "Hyundai Elantra",
    years: "2021-2024",
    products: 203,
    color: "#0066B3",
    image: "https://images.pexels.com/photos/139392/pexels-photo-139392.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    id: "suzuki-swift",
    name: "Suzuki Swift",
    years: "2019-2024",
    products: 178,
    color: "#E31C23",
    image: "https://images.pexels.com/photos/248529/pexels-photo-248529.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
];

export const priceRanges = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "under-2000", label: "Under Rs 2,000", min: 0, max: 2000 },
  { id: "2000-5000", label: "Rs 2,000 - Rs 5,000", min: 2000, max: 5000 },
  { id: "5000-10000", label: "Rs 5,000 - Rs 10,000", min: 5000, max: 10000 },
  { id: "above-10000", label: "Above Rs 10,000", min: 10000, max: Infinity },
];