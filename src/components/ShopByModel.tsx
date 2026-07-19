"use client";

import { motion } from "framer-motion";
import { Car, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const carModels = [
  {
    name: "Toyota Corolla",
    years: "2019-2024",
    products: 342,
    color: "#EB0A1E",
    image: "https://images.pexels.com/photos/25189122/pexels-photo-25189122.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    name: "Honda Civic",
    years: "2022-2024",
    products: 287,
    color: "#CC0000",
    image: "https://images.pexels.com/photos/18108314/pexels-photo-18108314.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    name: "Suzuki Cultus",
    years: "2017-2024",
    products: 198,
    color: "#004A97",
    image: "https://images.pexels.com/photos/33268786/pexels-photo-33268786.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
  {
    name: "KIA Sportage",
    years: "2020-2024",
    products: 256,
    color: "#C21B2B",
    image: "https://images.pexels.com/photos/94272/sports-car-pkw-auto-vehicle-94272.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
  },
];

export default function ShopByModel() {
  const router = useRouter();

  const handleShopNow = (modelName: string) => {
    // Create a slug from the model name
    const slug = modelName.toLowerCase().replace(/\s+/g, '-');
    router.push(`/car-models/${slug}`);
  };

  return (
    <section id="shop-by-model" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3 bg-[#E9CC2F]/15 px-4 py-1.5 rounded-full">
            <Car size={16} className="text-[#B69E24]" />
            <span className="text-[#B69E24] font-bold text-sm uppercase tracking-wide">
              Vehicle Specific
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
            Shop Accessories by{" "}
            <span className="text-[#E9CC2F]">Car Model</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Precisely fitted accessories for your specific vehicle model. No more guessing!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {carModels.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="relative overflow-hidden h-44">
                <Image
                  src={car.image}
                  alt={car.name}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div
                    className="text-[10px] font-black px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: car.color }}
                  >
                    {car.years}
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-[#E9CC2F] text-[#1A1A1A] text-[10px] font-black px-2 py-0.5 rounded">
                  {car.products}+ Products
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-black text-[#1A1A1A] text-base mb-1">{car.name}</h3>
                <p className="text-xs text-gray-500 mb-3">
                  {car.products} accessories available
                </p>
                <button
                  onClick={() => handleShopNow(car.name)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1A1A1A] text-[#E9CC2F] rounded-xl text-xs font-bold hover:bg-[#E9CC2F] hover:text-[#1A1A1A] transition-all"
                >
                  Shop Now <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Car Brands Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-4 font-medium">
            &ldquo;One Stop Car Provide Premier Car Accessories &amp; Shipping Available All Over Pakistan&rdquo;
          </p>
          <button
            onClick={() => router.push('/shop')}
            className="btn-primary"
          >
            View All Car Models <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}