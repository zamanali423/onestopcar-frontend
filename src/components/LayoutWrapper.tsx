// src/components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if the current path is an admin route
    const isAdminRoute = pathname?.startsWith("/admin") ||
        pathname?.startsWith("/dashboard") ||
        pathname?.startsWith("/admin-dashboard") ||
        pathname?.includes("/admin/");

    return (
        <>
            {!isAdminRoute && <AnnouncementBar />}
            {!isAdminRoute && <Navbar />}

            <main>{children}</main>

            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <CartDrawer />}
        </>
    );
}