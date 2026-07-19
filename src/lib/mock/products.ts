// src/lib/mock/products.ts
import { simulateDelay, createApiResponse, type ApiResponse } from "./api";

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  model: string;
  description: string;
  shortDescription?: string;
  rating: number;
  reviews: number;
  stock: number;
  slug: string;
  discount?: number;
  badge?: "New" | "Hot" | "Sale" | "Best" | "Popular";
  createdAt: string;
  thumbnails: string[];
  styles: string[];
  brands: string[];
  sku: string;
  status?: "active" | "draft" | "archived";
  images?: ProductImage[];
  compatibility?: string[];
  warranty?: string;
  oem?: string;
  keyFeatures?: string[];
  composition?: Array<{ label: string; value: string }>;
  installationSteps?: string[];
  careInstructions?: string[];
  faqs?: Array<{ q: string; a: string }>;
  seo?: {
    title: string;
    description: string;
    slug: string;
    keywords: string[];
  };
}

const defaultImages = (src: string, alt: string): ProductImage[] => [
  { id: "img-1", src, alt },
  { id: "img-2", src: src.replace("w=500", "w=600"), alt: `${alt} - 2` },
  { id: "img-3", src: src.replace("w=500", "w=700"), alt: `${alt} - 3` },
];

export const mockProducts: Product[] = [
  // 1. Universal Car Window Sun Shade
  {
    id: "1",
    name: "Universal Car Window Sun Shade",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=500&fit=crop",
    category: "sunshades",
    model: "Universal",
    description:
      "Custom fit sun shade for all car models with UV protection and heat reduction technology. Blocks up to 99% of harmful UV rays and reduces cabin heat significantly. Perfect for keeping your car cool and protected.",
    shortDescription: "UV protection sun shade with heat reduction technology",
    rating: 4.8,
    reviews: 56,
    stock: 30,
    slug: "universal-window-sun-shade",
    thumbnails: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-01-20T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Toyota", "Honda", "Suzuki", "KIA", "Universal"],
    sku: "UNI-SHD-002",
    status: "active",
    warranty: "18 Months",
    oem: "N/A",
    compatibility: ["Universal Fit", "All Car Models"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=500&fit=crop",
      "Universal Car Window Sun Shade"
    ),
    keyFeatures: [
      "Vehicle-specific precision fit",
      "Blocks up to 99% harmful UV rays",
      "Reduces cabin heat significantly",
      "Provides daytime privacy",
      "Anti-glare mesh design",
      "No drilling or permanent installation",
      "Durable steel frame construction",
      "Easy foldable storage",
    ],
    composition: [
      { label: "Material", value: "Premium Polyester Mesh with Flexible Steel Frame" },
      { label: "UV Protection", value: "Up to 99%" },
      { label: "Heat Reduction", value: "Up to 60%" },
      { label: "Installation", value: "Clip-On | No Tools Required" },
      { label: "Vehicle Fit", value: "Custom Designed" },
      { label: "Frame", value: "Memory Steel Wire" },
      { label: "Color", value: "Black" },
      { label: "Warranty", value: "1 Year Manufacturing Warranty" },
    ],
    installationSteps: [
      "Unfold the sunshade carefully.",
      "Align it with the vehicle window frame.",
      "Insert the upper edge first.",
      "Press the remaining edges into the frame.",
      "Secure using supplied clips if required.",
      "Check proper fit before driving.",
    ],
    careInstructions: [
      "Clean using a soft damp cloth.",
      "Do not machine wash.",
      "Avoid harsh chemicals.",
      "Store folded inside the provided pouch.",
      "Avoid excessive bending of the frame.",
    ],
    faqs: [
      { q: "Will these fit my vehicle exactly?", a: "Yes. Each sunshade is manufactured specifically for the supported vehicle model." },
      { q: "Can I roll down the windows?", a: "Yes. Windows can be partially opened while the shades remain installed." },
      { q: "Do they block visibility?", a: "No. You can clearly see outside while reducing glare and maintaining privacy." },
      { q: "Is installation permanent?", a: "No. Installation is completely removable without damaging your vehicle." },
      { q: "Are tools required?", a: "No. Installation takes only a few minutes without any tools." },
    ],
    seo: {
      title: "Universal Car Window Sun Shade - Premium UV Protection",
      description: "Custom fit sun shade with 99% UV protection. Keep your car cool and protected.",
      slug: "universal-window-sun-shade",
      keywords: ["sun shade", "car shade", "UV protection", "car accessories"],
    },
  },

  // 2. Universal Microfiber Cleaning Cloth
  {
    id: "2",
    name: "Universal Microfiber Cleaning Cloth",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&h=500&fit=crop",
    category: "carcare",
    model: "Universal",
    description:
      "High-quality microfiber cleaning cloth for dust-free car interior maintenance. Perfect for keeping your dashboard, seats, and surfaces spotless.",
    shortDescription: "High-quality microfiber cleaning cloth for interiors",
    rating: 4.7,
    reviews: 41,
    stock: 45,
    slug: "universal-microfiber-cloth",
    thumbnails: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-02-05T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Toyota", "Honda", "Suzuki", "KIA", "Universal"],
    sku: "UNI-CLN-005",
    status: "active",
    warranty: "12 Months",
    oem: "N/A",
    compatibility: ["Universal Fit", "All Surfaces"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&h=500&fit=crop",
      "Universal Microfiber Cleaning Cloth"
    ),
    keyFeatures: [
      "Premium microfiber material",
      "Lint-free cleaning",
      "Safe for all surfaces",
      "Reusable and durable",
      "Machine washable",
    ],
    composition: [
      { label: "Material", value: "Premium Microfiber" },
      { label: "Size", value: "16 x 16 inches" },
      { label: "Weight", value: "300 GSM" },
      { label: "Color", value: "Yellow" },
    ],
    installationSteps: [
      "Use dry or slightly damp",
      "Wipe surfaces gently",
      "Air dry after use",
    ],
    careInstructions: [
      "Machine wash cold",
      "Do not use fabric softener",
      "Air dry or tumble dry low",
    ],
    faqs: [
      { q: "Is this safe for delicate surfaces?", a: "Yes, the microfiber is safe for all car surfaces including paint, glass, and leather." },
      { q: "Can I use this on my phone screen?", a: "Yes, it's safe for electronic screens and won't scratch." },
    ],
    seo: {
      title: "Universal Microfiber Cleaning Cloth - Premium Quality",
      description: "High-quality microfiber cleaning cloth for all car surfaces.",
      slug: "universal-microfiber-cloth",
      keywords: ["microfiber cloth", "car cleaning", "dust cloth", "interior cleaning"],
    },
  },

  // 3. Universal Steering Wheel Protector
  {
    id: "3",
    name: "Universal Steering Wheel Protector",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&h=500&fit=crop",
    category: "interior",
    model: "Universal",
    description:
      "Protective steering wheel cover with anti-slip technology and comfortable grip. Provides excellent protection while adding style to your car's interior.",
    shortDescription: "Anti-slip steering wheel cover for comfortable grip",
    rating: 4.4,
    reviews: 19,
    stock: 25,
    slug: "universal-steering-protector",
    thumbnails: [
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-02-10T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Toyota", "Honda", "Suzuki", "KIA", "Universal"],
    sku: "UNI-SWP-006",
    status: "active",
    warranty: "12 Months",
    oem: "N/A",
    compatibility: ["Universal Fit", "Most Standard Steering Wheels"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&h=500&fit=crop",
      "Universal Steering Wheel Protector"
    ),
    keyFeatures: [
      "Anti-slip technology",
      "Comfortable grip",
      "Durable stitching",
      "Universal fit",
      "Easy installation",
    ],
    composition: [
      { label: "Material", value: "Premium Leather" },
      { label: "Diameter", value: "14-15 inches" },
      { label: "Color", value: "Black" },
    ],
    installationSteps: [
      "Place over steering wheel",
      "Secure with clips",
      "Adjust for perfect fit",
    ],
    careInstructions: [
      "Wipe with damp cloth",
      "Air dry",
      "Avoid direct sunlight",
    ],
    faqs: [
      { q: "Will this fit my steering wheel?", a: "Yes, it's designed to fit most standard steering wheels." },
    ],
    seo: {
      title: "Universal Steering Wheel Protector - Anti-Slip",
      description: "Premium steering wheel cover with anti-slip technology.",
      slug: "universal-steering-protector",
      keywords: ["steering cover", "car interior", "anti-slip", "leather cover"],
    },
  },

  // 4. Universal Dashboard Fiber Mat
  {
    id: "4",
    name: "Universal Dashboard Fiber Mat",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
    category: "interior",
    model: "Universal",
    description:
      "Non-slip dashboard protection mat with premium fiber material and UV resistance. Protects your dashboard from sun damage while adding a premium feel.",
    shortDescription: "Non-slip dashboard protection mat with UV resistance",
    rating: 4.6,
    reviews: 34,
    stock: 22,
    slug: "universal-dashboard-mat",
    thumbnails: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-02-20T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Toyota", "Honda", "Suzuki", "KIA", "Universal"],
    sku: "UNI-DFM-008",
    status: "active",
    warranty: "24 Months",
    oem: "N/A",
    compatibility: ["Universal Fit", "Most Standard Dashboards"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "Universal Dashboard Fiber Mat"
    ),
    keyFeatures: [
      "Non-slip grip",
      "UV resistance",
      "Premium fiber material",
      "Heat protection",
      "Easy to clean",
    ],
    composition: [
      { label: "Material", value: "Premium Fiber" },
      { label: "Size", value: "Custom Fit" },
      { label: "Color", value: "Black" },
      { label: "Weight", value: "500 GSM" },
    ],
    installationSteps: [
      "Clean dashboard surface",
      "Place mat on dashboard",
      "Secure with clips",
    ],
    careInstructions: [
      "Wipe with damp cloth",
      "Vacuum regularly",
      "Spot clean as needed",
    ],
    faqs: [
      { q: "Will this fit my dashboard?", a: "Yes, it's designed to fit most standard dashboards." },
    ],
    seo: {
      title: "Universal Dashboard Fiber Mat - Premium Protection",
      description: "Non-slip dashboard protection mat with UV resistance.",
      slug: "universal-dashboard-mat",
      keywords: ["dashboard mat", "car interior", "UV protection", "non-slip"],
    },
  },

  // 5. Toyota Corolla Leather Steering Wheel Cover
  {
    id: "5",
    name: "Toyota Corolla Leather Steering Wheel Cover",
    price: 8500,
    originalPrice: 10500,
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&h=500&fit=crop",
    category: "exterior",
    model: "Toyota Corolla",
    description:
      "Premium leather steering wheel cover specifically designed for Toyota Corolla. Features include anti-slip technology, durable stitching, and a luxurious feel that enhances your driving experience.",
    shortDescription: "Premium leather steering wheel cover for Toyota Corolla",
    rating: 4.5,
    reviews: 24,
    stock: 15,
    slug: "toyota-corolla-steering-cover",
    discount: 19,
    badge: "Sale",
    thumbnails: [
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-01-15T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Toyota"],
    sku: "TYT-STW-001",
    status: "active",
    warranty: "24 Months",
    oem: "Toyota Genuine",
    compatibility: ["Toyota Corolla (2019-2024)"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&h=500&fit=crop",
      "Toyota Corolla Leather Steering Wheel Cover"
    ),
    keyFeatures: [
      "Vehicle-specific fit for Toyota Corolla",
      "Premium leather material",
      "Anti-slip technology",
      "Durable stitching",
      "Ergonomic design",
      "Luxurious feel",
    ],
    composition: [
      { label: "Material", value: "Premium Leather" },
      { label: "Diameter", value: "14.5 inches" },
      { label: "Color", value: "Black with Red Stitch" },
    ],
    installationSteps: [
      "Remove old cover",
      "Place new cover over steering wheel",
      "Secure in place",
    ],
    careInstructions: [
      "Wipe with leather cleaner",
      "Condition regularly",
      "Avoid harsh chemicals",
    ],
    faqs: [
      { q: "Is this genuine leather?", a: "Yes, it's made from premium quality leather." },
      { q: "Will this fit my Corolla?", a: "Yes, it's specifically designed for Toyota Corolla." },
    ],
    seo: {
      title: "Toyota Corolla Leather Steering Wheel Cover",
      description: "Premium leather steering wheel cover for Toyota Corolla.",
      slug: "toyota-corolla-steering-cover",
      keywords: ["toyota corolla", "steering cover", "leather cover", "car interior"],
    },
  },

  // 6. Toyota Corolla Body Side Molding Chrome
  {
    id: "6",
    name: "Toyota Corolla Body Side Molding Chrome",
    price: 7200,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    category: "exterior",
    model: "Toyota Corolla",
    description:
      "Chrome side body molding trim specifically designed for Toyota Corolla. Protects your vehicle's doors from dents and scratches while adding a luxurious look.",
    shortDescription: "Chrome side body molding for Toyota Corolla",
    rating: 4.7,
    reviews: 22,
    stock: 10,
    slug: "toyota-corolla-body-molding",
    thumbnails: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-02-25T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Toyota"],
    sku: "TYT-BSM-009",
    status: "active",
    warranty: "36 Months",
    oem: "Toyota Genuine",
    compatibility: ["Toyota Corolla (2019-2024)"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
      "Toyota Corolla Body Side Molding Chrome"
    ),
    keyFeatures: [
      "Vehicle-specific fit for Toyota Corolla",
      "Premium chrome finish",
      "Door protection",
      "Scratch resistance",
      "Corrosion resistant",
    ],
    composition: [
      { label: "Material", value: "Stainless Steel" },
      { label: "Finish", value: "Chrome" },
      { label: "Length", value: "Custom Fit" },
    ],
    installationSteps: [
      "Clean door surface",
      "Remove backing tape",
      "Align and press firmly",
    ],
    careInstructions: [
      "Wipe with soft cloth",
      "Use chrome cleaner",
      "Avoid abrasive materials",
    ],
    faqs: [
      { q: "Will this fit my Corolla?", a: "Yes, it's specifically designed for Toyota Corolla." },
    ],
    seo: {
      title: "Toyota Corolla Body Side Molding Chrome",
      description: "Premium chrome body molding for Toyota Corolla.",
      slug: "toyota-corolla-body-molding",
      keywords: ["toyota corolla", "body molding", "chrome trim", "exterior accessory"],
    },
  },

  // 7. Honda Civic Tail Pipe Cover Premium
  {
    id: "7",
    name: "Honda Civic Tail Pipe Cover Premium",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
    category: "exterior",
    model: "Honda Civic",
    description:
      "Stainless steel tail pipe cover specifically designed for Honda Civic. Adds a sporty look to your vehicle while protecting the exhaust system.",
    shortDescription: "Stainless steel tail pipe cover for Honda Civic",
    rating: 4.5,
    reviews: 28,
    stock: 18,
    slug: "honda-civic-tail-pipe-cover",
    thumbnails: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-02-15T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Honda"],
    sku: "HND-PTP-007",
    status: "active",
    warranty: "24 Months",
    oem: "Honda Genuine",
    compatibility: ["Honda Civic (2022-2024)"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
      "Honda Civic Tail Pipe Cover Premium"
    ),
    keyFeatures: [
      "Vehicle-specific fit for Honda Civic",
      "Stainless steel construction",
      "Sporty design",
      "Corrosion resistant",
      "Easy installation",
    ],
    composition: [
      { label: "Material", value: "Stainless Steel" },
      { label: "Finish", value: "Polished" },
      { label: "Diameter", value: "3 inches" },
    ],
    installationSteps: [
      "Remove old cover",
      "Slide new cover over exhaust",
      "Secure with screws",
    ],
    careInstructions: [
      "Wipe with metal polish",
      "Clean regularly",
      "Check screws periodically",
    ],
    faqs: [
      { q: "Will this fit my Civic?", a: "Yes, it's specifically designed for Honda Civic." },
    ],
    seo: {
      title: "Honda Civic Tail Pipe Cover Premium",
      description: "Premium stainless steel tail pipe cover for Honda Civic.",
      slug: "honda-civic-tail-pipe-cover",
      keywords: ["honda civic", "tail pipe", "exhaust cover", "exterior accessory"],
    },
  },

  // 8. Honda Civic LED Interior Door Light
  {
    id: "8",
    name: "Honda Civic LED Interior Door Light",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&h=500&fit=crop",
    category: "interior",
    model: "Honda Civic",
    description:
      "LED interior ambient lighting system specifically designed for Honda Civic. Enhance your car's interior with customizable lighting options.",
    shortDescription: "Premium LED interior lighting for Honda Civic",
    rating: 4.6,
    reviews: 32,
    stock: 20,
    slug: "honda-civic-interior-light",
    thumbnails: [
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-02-01T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Honda"],
    sku: "HND-LED-004",
    status: "active",
    warranty: "18 Months",
    oem: "Honda Genuine",
    compatibility: ["Honda Civic (2022-2024)"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&h=500&fit=crop",
      "Honda Civic LED Interior Door Light"
    ),
    keyFeatures: [
      "Vehicle-specific fit for Honda Civic",
      "LED ambient lighting",
      "Customizable colors",
      "Energy efficient",
      "Easy installation",
    ],
    composition: [
      { label: "Light Type", value: "LED" },
      { label: "Color", value: "RGB (16 Colors)" },
      { label: "Power", value: "12V" },
    ],
    installationSteps: [
      "Remove door panel",
      "Install LED strips",
      "Connect to power source",
    ],
    careInstructions: [
      "Wipe with soft cloth",
      "Check connections periodically",
    ],
    faqs: [
      { q: "Is this compatible with my Civic?", a: "Yes, it's specifically designed for Honda Civic models." },
    ],
    seo: {
      title: "Honda Civic LED Interior Door Light",
      description: "Premium LED ambient lighting for Honda Civic.",
      slug: "honda-civic-interior-light",
      keywords: ["honda civic", "LED light", "interior lighting", "ambient lighting"],
    },
  },

  // 9. Suzuki Cultus Front Door Handle Protector
  {
    id: "9",
    name: "Suzuki Cultus Front Door Handle Protector",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
    category: "exterior",
    model: "Suzuki Cultus",
    description:
      "Durable front door handle protector specifically designed for Suzuki Cultus. Made from high-quality materials that provide excellent protection against scratches and wear.",
    shortDescription: "Stylish door handle protector for Suzuki Cultus",
    rating: 4.3,
    reviews: 15,
    stock: 12,
    slug: "suzuki-cultus-door-handle",
    thumbnails: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-01-25T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Suzuki"],
    sku: "SUZ-HDL-003",
    status: "active",
    warranty: "18 Months",
    oem: "Suzuki Genuine",
    compatibility: ["Suzuki Cultus (2017-2024)"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
      "Suzuki Cultus Front Door Handle Protector"
    ),
    keyFeatures: [
      "Vehicle-specific fit for Suzuki Cultus",
      "Durable construction",
      "Scratch protection",
      "Stylish design",
      "Easy installation",
    ],
    composition: [
      { label: "Material", value: "Premium Plastic" },
      { label: "Color", value: "Black" },
      { label: "Size", value: "Custom Fit" },
    ],
    installationSteps: [
      "Clean door handle area",
      "Apply adhesive",
      "Press firmly in place",
    ],
    careInstructions: ["Wipe with damp cloth", "Avoid harsh chemicals"],
    faqs: [
      { q: "Will this fit my Cultus?", a: "Yes, it's specifically designed for Suzuki Cultus." },
    ],
    seo: {
      title: "Suzuki Cultus Front Door Handle Protector",
      description: "Durable door handle protector for Suzuki Cultus.",
      slug: "suzuki-cultus-door-handle",
      keywords: ["suzuki cultus", "door handle", "protector", "exterior accessory"],
    },
  },

  // 10. Suzuki Cultus Headlight Lens Cover
  {
    id: "10",
    name: "Suzuki Cultus Headlight Lens Cover",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
    category: "electronics",
    model: "Suzuki Cultus",
    description:
      "Protective lens clear film specifically designed for Suzuki Cultus. Keeps your headlights and taillights looking new while preventing damage.",
    shortDescription: "Protective lens cover for Suzuki Cultus",
    rating: 4.5,
    reviews: 18,
    stock: 14,
    slug: "suzuki-cultus-lens-cover",
    thumbnails: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-03-01T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["Suzuki"],
    sku: "SUZ-HLC-010",
    status: "active",
    warranty: "18 Months",
    oem: "Suzuki Genuine",
    compatibility: ["Suzuki Cultus (2017-2024)"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
      "Suzuki Cultus Headlight Lens Cover"
    ),
    keyFeatures: [
      "Vehicle-specific fit for Suzuki Cultus",
      "Clear protective film",
      "UV protection",
      "Scratch resistance",
      "Self-healing technology",
    ],
    composition: [
      { label: "Material", value: "Premium Clear Film" },
      { label: "Thickness", value: "8 mil" },
      { label: "Protection", value: "UV Resistant" },
    ],
    installationSteps: [
      "Clean headlight surface",
      "Apply film",
      "Smooth out bubbles",
    ],
    careInstructions: ["Wipe with soft cloth", "Use gentle cleaner"],
    faqs: [
      { q: "Will this fit my Cultus?", a: "Yes, it's specifically designed for Suzuki Cultus." },
    ],
    seo: {
      title: "Suzuki Cultus Headlight Lens Cover",
      description: "Protective lens cover for Suzuki Cultus headlights.",
      slug: "suzuki-cultus-lens-cover",
      keywords: ["suzuki cultus", "headlight cover", "lens protection", "clear film"],
    },
  },

  // 11. KIA Sportage Premium Tail Pipe Cover
  {
    id: "11",
    name: "KIA Sportage Premium Tail Pipe Cover",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
    category: "exterior",
    model: "KIA Sportage",
    description:
      "Premium stainless steel tail pipe cover specifically designed for KIA Sportage. Adds a sporty look to your vehicle while protecting the exhaust system.",
    shortDescription: "Premium tail pipe cover for KIA Sportage",
    rating: 4.5,
    reviews: 20,
    stock: 16,
    slug: "kia-sportage-tail-pipe",
    thumbnails: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-02-18T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["KIA"],
    sku: "KIA-PTP-011",
    status: "active",
    warranty: "24 Months",
    oem: "KIA Genuine",
    compatibility: ["KIA Sportage (2020-2024)"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=500&fit=crop",
      "KIA Sportage Premium Tail Pipe Cover"
    ),
    keyFeatures: [
      "Vehicle-specific fit for KIA Sportage",
      "Stainless steel construction",
      "Premium finish",
      "Corrosion resistant",
      "Sporty design",
    ],
    composition: [
      { label: "Material", value: "Stainless Steel" },
      { label: "Finish", value: "Premium Chrome" },
      { label: "Diameter", value: "3.5 inches" },
    ],
    installationSteps: [
      "Remove old cover",
      "Slide new cover",
      "Secure with screws",
    ],
    careInstructions: ["Wipe with metal polish", "Clean regularly"],
    faqs: [
      { q: "Will this fit my Sportage?", a: "Yes, it's specifically designed for KIA Sportage." },
    ],
    seo: {
      title: "KIA Sportage Premium Tail Pipe Cover",
      description: "Premium tail pipe cover for KIA Sportage.",
      slug: "kia-sportage-tail-pipe",
      keywords: ["kia sportage", "tail pipe", "exhaust cover", "exterior accessory"],
    },
  },

  // 12. KIA Sportage Body Side Molding
  {
    id: "12",
    name: "KIA Sportage Body Side Molding",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    category: "exterior",
    model: "KIA Sportage",
    description:
      "Premium chrome side body molding specifically designed for KIA Sportage. Protects your vehicle's doors from dents and scratches while adding a luxurious look.",
    shortDescription: "Chrome side molding for KIA Sportage",
    rating: 4.6,
    reviews: 18,
    stock: 8,
    slug: "kia-sportage-body-molding",
    thumbnails: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-02-28T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber", "Leather", "Red Stitch"],
    brands: ["KIA"],
    sku: "KIA-BSM-012",
    status: "active",
    warranty: "36 Months",
    oem: "KIA Genuine",
    compatibility: ["KIA Sportage (2020-2024)"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
      "KIA Sportage Body Side Molding"
    ),
    keyFeatures: [
      "Vehicle-specific fit for KIA Sportage",
      "Premium chrome finish",
      "Door protection",
      "Luxurious look",
      "Corrosion resistant",
    ],
    composition: [
      { label: "Material", value: "Stainless Steel" },
      { label: "Finish", value: "Chrome" },
      { label: "Length", value: "Custom Fit" },
    ],
    installationSteps: [
      "Clean door surface",
      "Remove backing",
      "Align and press firmly",
    ],
    careInstructions: ["Wipe with soft cloth", "Use chrome cleaner"],
    faqs: [
      { q: "Will this fit my Sportage?", a: "Yes, it's specifically designed for KIA Sportage." },
    ],
    seo: {
      title: "KIA Sportage Body Side Molding",
      description: "Premium chrome side molding for KIA Sportage.",
      slug: "kia-sportage-body-molding",
      keywords: ["kia sportage", "body molding", "chrome trim", "exterior accessory"],
    },
  },

  // 13. Universal Car Phone Holder
  {
    id: "13",
    name: "Universal Car Phone Holder",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
    category: "electronics",
    model: "Universal",
    description:
      "Universal car phone holder with strong suction cup and adjustable angle. Compatible with all smartphones and fits any car model.",
    shortDescription: "Universal car phone holder for all models",
    rating: 4.3,
    reviews: 45,
    stock: 50,
    slug: "universal-phone-holder",
    thumbnails: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-03-05T10:00:00Z",
    styles: ["Matte Black", "Carbon Fiber"],
    brands: ["Toyota", "Honda", "Suzuki", "KIA", "Universal"],
    sku: "UNI-PHN-013",
    status: "active",
    warranty: "12 Months",
    oem: "N/A",
    compatibility: ["Universal Fit", "All Smartphones"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=500&fit=crop",
      "Universal Car Phone Holder"
    ),
    keyFeatures: [
      "Universal fit",
      "Strong suction cup",
      "Adjustable angle",
      "Secure grip",
      "Compatible with all phones",
    ],
    composition: [
      { label: "Material", value: "Premium Plastic" },
      { label: "Color", value: "Black" },
      { label: "Size", value: "Universal" },
    ],
    installationSteps: [
      "Clean windshield",
      "Attach suction cup",
      "Adjust angle",
      "Place phone",
    ],
    careInstructions: ["Wipe with cloth", "Clean suction cup regularly"],
    faqs: [
      { q: "Will this fit my phone?", a: "Yes, it's compatible with all smartphones." },
    ],
    seo: {
      title: "Universal Car Phone Holder",
      description: "Universal car phone holder for all smartphones.",
      slug: "universal-phone-holder",
      keywords: ["phone holder", "car mount", "universal", "smartphone mount"],
    },
  },

  // 14. Universal Car Air Freshener
  {
    id: "14",
    name: "Universal Car Air Freshener",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=500&fit=crop",
    category: "carcare",
    model: "Universal",
    description:
      "Premium car air freshener with long-lasting fragrance. Available in multiple scents to keep your car smelling fresh.",
    shortDescription: "Long-lasting car air freshener",
    rating: 4.2,
    reviews: 38,
    stock: 60,
    slug: "universal-air-freshener",
    thumbnails: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop",
    ],
    createdAt: "2026-03-10T10:00:00Z",
    styles: ["Fresh", "Lavender", "Citrus", "Vanilla"],
    brands: ["Toyota", "Honda", "Suzuki", "KIA", "Universal"],
    sku: "UNI-FRS-014",
    status: "active",
    warranty: "6 Months",
    oem: "N/A",
    compatibility: ["Universal Fit", "All Cars"],
    images: defaultImages(
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=500&fit=crop",
      "Universal Car Air Freshener"
    ),
    keyFeatures: [
      "Long-lasting fragrance",
      "Multiple scents available",
      "Easy to use",
      "Premium quality",
      "Car-safe design",
    ],
    composition: [
      { label: "Type", value: "Vent Clip" },
      { label: "Fragrance", value: "Multiple Options" },
      { label: "Duration", value: "Up to 60 days" },
    ],
    installationSteps: [
      "Remove from package",
      "Attach to air vent",
      "Adjust fragrance level",
    ],
    careInstructions: [
      "Replace when scent fades",
      "Keep away from direct sunlight",
    ],
    faqs: [
      { q: "How long does it last?", a: "Each air freshener lasts up to 60 days." },
    ],
    seo: {
      title: "Universal Car Air Freshener",
      description: "Premium car air freshener with long-lasting fragrance.",
      slug: "universal-air-freshener",
      keywords: ["air freshener", "car fragrance", "vent clip", "car accessories"],
    },
  },
];

// Mock API functions
export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  await simulateDelay(600);
  return createApiResponse(mockProducts);
};

export const getProductById = async (id: string): Promise<ApiResponse<Product | null>> => {
  await simulateDelay(300);
  const product = mockProducts.find((p) => p.id === id);
  return createApiResponse(product || null);
};

export const getProductBySlug = async (
  slug: string,
): Promise<ApiResponse<Product | null>> => {
  await simulateDelay(400);
  const product = mockProducts.find((p) => p.slug === slug);
  return createApiResponse(product || null);
};

export const getProductsByCategory = async (
  category: string,
): Promise<ApiResponse<Product[]>> => {
  await simulateDelay(500);
  const products = mockProducts.filter((p) => p.category === category);
  return createApiResponse(products);
};

export const searchProducts = async (
  query: string,
): Promise<ApiResponse<Product[]>> => {
  await simulateDelay(500);
  const results = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.model.toLowerCase().includes(query.toLowerCase()),
  );
  return createApiResponse(results);
};

export const getRelatedProducts = async (
  productId: string,
): Promise<ApiResponse<Product[]>> => {
  await simulateDelay(300);
  const product = mockProducts.find((p) => p.id === productId);
  if (!product) return createApiResponse([], "No related products found");
  const related = mockProducts
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, 4);
  return createApiResponse(related);
};

export const getNewArrivals = async (
  limit: number = 6,
): Promise<ApiResponse<Product[]>> => {
  await simulateDelay(500);
  const sorted = [...mockProducts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return createApiResponse(sorted.slice(0, limit));
};

// -----------------------------------------------------------------------------
// Product Detail Mock Data
// -----------------------------------------------------------------------------

export const product = mockProducts[1];

export const keyFeatures: string[] = [
  "Vehicle-specific precision fit",
  "Blocks up to 99% harmful UV rays",
  "Reduces cabin heat significantly",
  "Provides daytime privacy",
  "Anti-glare mesh design",
  "No drilling or permanent installation",
  "Durable steel frame construction",
  "Easy foldable storage",
];

export const composition = [
  { label: "Material", value: "Premium Polyester Mesh with Flexible Steel Frame" },
  { label: "UV Protection", value: "Up to 99%" },
  { label: "Heat Reduction", value: "Up to 60%" },
  { label: "Installation", value: "Clip-On | No Tools Required" },
  { label: "Vehicle Fit", value: "Custom Designed" },
  { label: "Frame", value: "Memory Steel Wire" },
  { label: "Color", value: "Black" },
  { label: "Warranty", value: "1 Year Manufacturing Warranty" },
];

export const installationSteps: string[] = [
  "Unfold the sunshade carefully.",
  "Align it with the vehicle window frame.",
  "Insert the upper edge first.",
  "Press the remaining edges into the frame.",
  "Secure using supplied clips if required.",
  "Check proper fit before driving.",
];

export const careInstructions: string[] = [
  "Clean using a soft damp cloth.",
  "Do not machine wash.",
  "Avoid harsh chemicals.",
  "Store folded inside the provided pouch.",
  "Avoid excessive bending of the frame.",
];

export const faqs = [
  { q: "Will these fit my vehicle exactly?", a: "Yes. Each sunshade is manufactured specifically for the supported vehicle model." },
  { q: "Can I roll down the windows?", a: "Yes. Windows can be partially opened while the shades remain installed." },
  { q: "Do they block visibility?", a: "No. You can clearly see outside while reducing glare and maintaining privacy." },
  { q: "Is installation permanent?", a: "No. Installation is completely removable without damaging your vehicle." },
  { q: "Are tools required?", a: "No. Installation takes only a few minutes without any tools." },
];

export const recentlyViewedProducts: Product[] = mockProducts.slice(0, 4);

export const recommendedProducts: Product[] = mockProducts
  .filter((p) => p.id !== product.id)
  .slice(0, 4);

export const relatedProducts: Product[] = mockProducts.filter(
  (p) => p.id !== product.id && p.category === product.category,
);