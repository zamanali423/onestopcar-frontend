"use client";

import { Car, Phone, Mail, MapPin, Share2, MessageCircle, Play, AtSign } from "lucide-react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const footerLinks = {
  "Quick Links": [
    "Home",
    "New Arrivals",
    "All Products",
    "Services",
    "Blog",
    "About Us",
    "Contact",
  ],
  Categories: [
    "Sun Shades",
    "Seat Covers",
    "Floor Mats",
    "Car Covers",
    "Steering Covers",
    "PPF Film",
    "Wiper Blades",
  ],
  "Car Brands": [
    "Toyota",
    "Honda",
    "Suzuki",
    "KIA",
    "Hyundai",
    "Changan",
    "MG",
    "Haval",
  ],
  Support: [
    "Track Order",
    "Return Policy",
    "Shipping Info",
    "Privacy Policy",
    "Terms & Conditions",
    "FAQ",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src="/logo-main.jpeg" alt="logo" width={60} height={60} className="rounded-lg w-full" />
              </div>
              <div>
                <div className="font-black text-lg text-white leading-tight tracking-tight">
                  ONE STOP <span className="text-[#E9CC2F]">CAR</span>
                </div>
                <div className="text-[9px] text-gray-500 font-semibold tracking-widest uppercase leading-none">
                  Premium Accessories
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Pakistan&apos;s most trusted car accessories store. We offer premium products for all
              major car brands with nationwide delivery.
            </p>
            <div className="space-y-2.5 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#E9CC2F]" />
                <span>+92 300 0532034</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#E9CC2F]" />
                <span>sales@onestopcar.net</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#E9CC2F]" />
                <span>G Mangolia Park, Gujranwala, Pakistan</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { icon: <FaFacebookF size={16} />, label: "Facebook", href: "https://www.facebook.com/OneStopCar92/" },
                { icon: <FaInstagram size={16} />, label: "Instagram", href: "https://www.instagram.com/one_stop_car_" },
                { icon: <FaYoutube size={16} />, label: "YouTube", href: "https://www.youtube.com/@onestopcar92?feature=shared" },
                { icon: <FaTiktok size={16} />, label: "Tiktok", href: "https://www.tiktok.com/@onestopcar92?_t=8mGVdakbDQF&_r=1" },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E9CC2F] hover:text-[#1A1A1A] hover:border-[#E9CC2F] transition-all text-gray-400"
                  onClick={() => window.open(s.href, "_blank")}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-black text-sm mb-4 uppercase tracking-widest">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 text-xs hover:text-[#E9CC2F] transition-colors hover:pl-1 duration-200 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center">
            © 2024 One Stop Car Pakistan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {["VISA", "MC", "JCZ", "COD"].map((p) => (
                <div
                  key={p}
                  className="bg-white/10 rounded-md px-2 py-1 text-[9px] font-black text-gray-400"
                >
                  {p}
                </div>
              ))}
            </div>
            <span className="text-gray-600 text-xs">
              Made with ❤️ in Pakistan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
