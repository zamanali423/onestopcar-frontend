// src/app/about/page.tsx
import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import { WhyChooseUs } from "@/components/shared/WhyChooseUs";
import TeamSection from "@/components/about/TeamSection";
import ServicesOverview from "@/components/about/ServicesOverview";
import CompanyValues from "@/components/about/CompanyValues";
import OurProcess from "@/components/about/OurProcess";
import WorkshopGallery from "@/components/about/WorkshopGallery";
import { Testimonials } from "@/components/shared/Testimonials";
import BrandPartners from "@/components/about/BrandPartners";
import Achievements from "@/components/about/Achievements";
import { FAQSection } from "@/components/shared/FAQSection";
import FinalCTA from "@/components/about/FinalCTA";
import { ContactSection } from "@/components/shared/ContactSection";

export const metadata: Metadata = {
    title: "About Us | One Stop Car – Premium Automotive Accessories & Detailing",
    description: "Learn about One Stop Car — Malaysia's leading premium automotive accessories and professional detailing brand. 10+ years of excellence, 25,000+ happy customers, and a team of certified automotive professionals.",
    keywords: ["One Stop Car", "automotive accessories Malaysia", "car detailing", "PPF", "ceramic coating", "car accessories", "about us"],
    openGraph: {
        title: "About One Stop Car | Premium Automotive Brand",
        description: "Discover our story, team, services, and commitment to premium automotive care.",
        type: "website",
    },
};

export default function About() {
    return (
        <main id="main-content">
            <AboutHero />
            <OurStory />
            <WhyChooseUs variant="features-only" />
            <TeamSection />
            <ServicesOverview />
            <CompanyValues />
            <OurProcess />
            <WorkshopGallery />
            <Testimonials variant="carousel" />
            <BrandPartners />
            <Achievements />
            <FAQSection variant="dark" />
            <FinalCTA />
            <ContactSection variant="preview" />
        </main>
    );
}