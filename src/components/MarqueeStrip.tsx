"use client";

import { Shield, Star, Truck, Award, ThumbsUp, Zap } from "lucide-react";

const items = [
  { icon: <Star size={14} fill="currentColor" />, text: "4.9/5 Customer Rating" },
  { icon: <Shield size={14} />, text: "100% Genuine Products" },
  { icon: <Truck size={14} />, text: "Nationwide Delivery" },
  { icon: <Award size={14} />, text: "15+ Years Experience" },
  { icon: <ThumbsUp size={14} />, text: "50,000+ Happy Customers" },
  { icon: <Zap size={14} />, text: "New Arrivals Daily" },
  { icon: <Star size={14} fill="currentColor" />, text: "Best Prices Guaranteed" },
  { icon: <Shield size={14} />, text: "Easy Returns & Refunds" },
];

const allItems = [...items, ...items];

export default function MarqueeStrip() {
  return (
    <div className="w-full bg-[#E9CC2F] py-3 overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {allItems.map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 mx-6 text-[#1A1A1A] font-bold text-sm flex-shrink-0"
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="whitespace-nowrap">{item.text}</span>
              <span className="mx-4 text-[#B69E24] flex-shrink-0">●</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
}