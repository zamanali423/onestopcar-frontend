"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Car, ChevronRight } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";

const carMakes = ["Toyota", "Honda", "Suzuki", "KIA", "Hyundai", "Changan", "MG", "Haval"];
const carModels: Record<string, string[]> = {
  Toyota: ["Corolla 2019-2024", "Yaris 2020-2024", "Fortuner 2016-2024", "Hilux", "Land Cruiser"],
  Honda: ["Civic 2022-2024", "City 2021-2024", "BRV 2022-2024", "HR-V", "Accord"],
  Suzuki: ["Cultus 2017-2024", "Alto 2019-2024", "Swift 2022-2024", "Wagon R", "Jimny"],
  KIA: ["Sportage 2020-2024", "Stonic 2021-2024", "Picanto 2019-2024", "Sorento", "Carnival"],
  Hyundai: ["Tucson 2020-2024", "Elantra 2022-2024", "Santa Fe", "Sonata", "i10"],
  Changan: ["Alsvin 2021-2024", "CS35 Plus", "Oshan X7", "Hunter", "UNI-T"],
  MG: ["HS 2021-2024", "ZS 2021-2024", "5 2022-2024", "GT", "RX8"],
  Haval: ["H6 2021-2024", "Jolion 2021-2024", "H2", "H9", "Dargo"],
};

export default function SearchByModel() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const setSelectedCarModel = useFilterStore((state) => state.setModel);

  const handleSearch = () => {
    if (selectedMake && selectedModel) {
      setSelectedCarModel(`${selectedMake} ${selectedModel}`);
    }
  };

  return (
    <section className="bg-[#F8FAFC] py-14">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-2">
            Search By Your{" "}
            <span className="text-[#E9CC2F] relative">
              Car Model
              <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 200 4">
                <path d="M0 2 Q100 0 200 2" stroke="#E9CC2F" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-gray-500 mt-3">Find accessories perfectly matched for your vehicle</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Make Select */}
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Car Make</label>
              <div className="relative">
                <Car size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E9CC2F]" />
                <select
                  value={selectedMake}
                  onChange={(e) => {
                    setSelectedMake(e.target.value);
                    setSelectedModel("");
                  }}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#E9CC2F] bg-[#F8FAFC] appearance-none cursor-pointer"
                >
                  <option value="">Select Make</option>
                  {carMakes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Model Select */}
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Car Model</label>
              <div className="relative">
                <Car size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E9CC2F]" />
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedMake}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#E9CC2F] bg-[#F8FAFC] appearance-none cursor-pointer disabled:opacity-50"
                >
                  <option value="">Select Model</option>
                  {selectedMake &&
                    carModels[selectedMake]?.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={!selectedMake || !selectedModel}
                className="w-full py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <Search size={18} />
                Find Accessories
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Popular Makes */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-xs text-gray-400 font-medium self-center mr-1">Popular:</span>
            {carMakes.slice(0, 6).map((make) => (
              <button
                key={make}
                onClick={() => {
                  setSelectedMake(make);
                  setSelectedModel("");
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${selectedMake === make
                    ? "bg-[#E9CC2F] border-[#E9CC2F] text-[#1A1A1A]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#E9CC2F] hover:text-[#B69E24]"
                  }`}
              >
                {make}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
