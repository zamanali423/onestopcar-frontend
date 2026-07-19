"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Phone,
  Menu,
  X,
  ChevronDown,
  Search,
  Car,
  Tag,
  Layers,
  Wrench,
  Shield,
  Heart,
  User,
  LogOut,
  Settings,
  UserCircle,
  LayoutDashboard,
  ShieldCheck,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  {
    label: "Categories",
    icon: <Layers size={14} />,
    items: ["Sun Shades", "Seat Covers", "Floor Mats", "Car Covers", "Steering Wheels"],
  },
  {
    label: "By Car Model",
    icon: <Car size={14} />,
    items: ["Toyota", "Honda", "Suzuki", "KIA", "Hyundai", "Changan"],
  },
  {
    label: "Services",
    icon: <Wrench size={14} />,
    items: ["Car Detailing", "PPF Installation", "Ceramic Coating", "Window Tinting"],
  },
  {
    label: "Brands",
    icon: <Tag size={14} />,
    items: ["Daewoo", "3M", "Meguiar's", "Turtle Wax", "AutoGlym"],
  },
  {
    label: "Protection",
    icon: <Shield size={14} />,
    items: ["PPF Film", "Ceramic Coat", "Paint Sealant", "Glass Coating"],
  },
];

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, isGuest, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.getTotalItems());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const wishlistCount = useWishlistStore((s) => s.getCount());
  const isOpen = useCartStore((s) => s.isOpen);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user) return "G";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserColor = () => {
    if (isAdmin) return "bg-[#E9CC2F] text-[#1A1A1A]";
    if (isGuest) return "bg-gray-500 text-white";
    return "bg-[#1A1A1A] text-white";
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1A1A1A] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={11} />
              <span>+92 300 0532034</span>
            </span>
            <span className="hidden sm:inline text-[#E9CC2F]">|</span>
            <span className="hidden sm:inline">Free Delivery on Every Order</span>
          </div>
          <div className="flex items-center gap-4 text-[#E9CC2F] font-semibold">
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => router.push("/track-order")}>Track Order</span>
            <span className="hidden sm:inline cursor-pointer hover:text-white transition-colors" onClick={() => router.push("/blog")}>
              Blog
            </span>
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => router.push("/contact")}>Contact</span>
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => router.push("/about")}>About</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => router.push("/")}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo-main.jpeg"
                  alt="logo"
                  width={64}
                  height={76}
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <div className="font-black text-xl md:text-2xl text-[#1A1A1A] leading-tight tracking-tight">
                  ONE STOP <span className="text-[#E9CC2F]">CAR</span>
                </div>
                <div className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase leading-none">
                  Premium Accessories
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#B69E24] transition-colors rounded-lg hover:bg-[#E9CC2F]/10">
                    {link.icon}
                    {link.label}
                    <ChevronDown
                      size={12}
                      className={`transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 w-52 py-2 z-50"
                      >
                        {link.items.map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E9CC2F]/10 hover:text-[#B69E24] font-medium transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E9CC2F]" />
                            {item}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8FAFC] border border-gray-200 text-sm text-gray-400 hover:border-[#E9CC2F] transition-colors min-w-[160px]">
                <Search size={14} />
                <span>Search products...</span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="relative flex items-center gap-2 p-2 rounded-xl bg-[#F8FAFC] border border-gray-200 hover:border-[#E9CC2F] transition-all group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getUserColor()}`}>
                    {user ? getUserInitials() : <User size={16} />}
                  </div>
                  <ChevronDown
                    size={12}
                    className={`text-gray-400 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 z-50 overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-[#1A1A1A] text-sm">
                          {user?.name || "Guest User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || "guest@onestopcar.com"}
                        </p>
                        <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${isAdmin ? 'bg-[#E9CC2F] text-[#1A1A1A]' : isGuest ? 'bg-gray-200 text-gray-600' : 'bg-[#1A1A1A] text-white'}`}>
                          {isAdmin ? 'Admin' : isGuest ? 'Guest' : 'Customer'}
                        </span>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {isAuthenticated && !isGuest && (
                          <>
                            <Link
                              href={isAdmin ? "/admin" : "/dashboard"}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E9CC2F]/10 hover:text-[#B69E24] transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              {isAdmin ? (
                                <LayoutDashboard size={16} />
                              ) : (
                                <UserCircle size={16} />
                              )}
                              {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                            </Link>
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E9CC2F]/10 hover:text-[#B69E24] transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Settings size={16} />
                              Profile Settings
                            </Link>
                            <Link
                              href="/orders"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E9CC2F]/10 hover:text-[#B69E24] transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <ShoppingCart size={16} />
                              My Orders
                            </Link>
                            <div className="border-t border-gray-100 my-1" />
                          </>
                        )}
                        {!isAuthenticated && !isGuest ? (
                          <>
                            <Link
                              href="/auth/login"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E9CC2F]/10 hover:text-[#B69E24] transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <LogIn size={16} />
                              Sign In
                            </Link>
                            <Link
                              href="/auth/register"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E9CC2F]/10 hover:text-[#B69E24] transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <UserPlus size={16} />
                              Create Account
                            </Link>
                          </>
                        ) : (
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => router.push("/wishlist")}
                className="relative p-2.5 bg-[#F8FAFC] rounded-xl border border-gray-200 hover:bg-[#E9CC2F] hover:border-[#E9CC2F] transition-colors group"
              >
                <Heart
                  size={18}
                  className="text-[#1A1A1A] group-hover:text-[#1A1A1A]"
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-black text-white flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2.5 bg-[#1A1A1A] rounded-xl hover:bg-[#E9CC2F] transition-colors group"
              >
                <ShoppingCart size={18} className="text-white group-hover:text-[#1A1A1A]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E9CC2F] rounded-full text-[10px] font-black text-[#1A1A1A] flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleCart}
                className="lg:hidden p-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {/* User Info in Mobile */}
                {user && (
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getUserColor()}`}>
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A] text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-sm text-gray-400 mb-3">
                  <Search size={14} />
                  <span>Search products...</span>
                </div>
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#E9CC2F]/10 font-bold text-sm text-[#1A1A1A]">
                      {link.icon}
                      {link.label}
                    </div>
                    <div className="ml-4 mt-1 space-y-1">
                      {link.items.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block px-3 py-1.5 text-sm text-gray-600 hover:text-[#B69E24]"
                        >
                          → {item}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
