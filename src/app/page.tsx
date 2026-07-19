// src/app/page.tsx
'use client'

import dynamic from 'next/dynamic';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import HeroSection from '@/components/HeroSection';
import MarqueeStrip from '@/components/MarqueeStrip';
import SearchByModel from '@/components/SearchByModel';
import NewArrivals from '@/components/NewArrivals';
import ShopByModel from '@/components/ShopByModel';
import DetailingServices from '@/components/DetailingServices';
import PromoSection from '@/components/PromoSection';
import ShopByBrand from '@/components/ShopByBrand';
import { Testimonials } from '@/components/shared/Testimonials';
import BlogSection from '@/components/BlogSection';
import { FAQSection } from '@/components/shared/FAQSection';
import { ContactSection } from '@/components/shared/ContactSection';

// Lazy load heavy components
const WhyChooseUs = dynamic(
  () => import('@/components/shared/WhyChooseUs').then(mod => mod.WhyChooseUs),
  { ssr: true }
);

export default function Home() {
  return (
    <ProtectedRoute allowedRoles={['guest', 'customer']} requireAuth={false}>
      <div className="min-h-screen">
        <HeroSection />
        <MarqueeStrip />
        <SearchByModel />
        <NewArrivals />
        <ShopByModel />
        <DetailingServices />
        <PromoSection />
        <ShopByBrand />
        <WhyChooseUs />
        <Testimonials variant="carousel" />
        <BlogSection />
        <FAQSection />
        <ContactSection />
      </div>
    </ProtectedRoute>
  );
}