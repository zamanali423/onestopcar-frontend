// src/components/shared/FAQSection.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, HelpCircle } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  variant?: "default" | "compact" | "dark";
  className?: string;
  showCategory?: boolean;
  defaultOpenIndex?: number | null;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Why buy car accessories from One Stop Car?",
    answer: "One Stop Car is Pakistan's most trusted car accessories store with over 15 years of experience. We offer genuine products from top international brands, vehicle-specific fitting guides, nationwide delivery, and excellent after-sales support.",
    category: "General",
  },
  {
    question: "How do I know which accessories fit my car?",
    answer: "Use our Car Model Search tool on the homepage to find accessories specifically designed for your vehicle. Simply select your car make and model to see all compatible products. You can also contact our support team for personalized recommendations.",
    category: "Products",
  },
  {
    question: "Do you sell only original/genuine accessories?",
    answer: "Yes, absolutely! All products at One Stop Car are 100% original and sourced directly from authorized distributors. We have strict quality control processes and work only with certified brands like 3M, Daewoo, Meguiar's, and more.",
    category: "Products",
  },
  {
    question: "What is your delivery policy?",
    answer: "We offer fast nationwide delivery across Pakistan. Orders over PKR 2,000 get free shipping. Standard delivery takes 2-5 business days for major cities and 5-7 days for remote areas. We use reliable courier services like TCS and Leopard.",
    category: "Delivery",
  },
  {
    question: "Can I return products if they don't fit?",
    answer: "Yes, we have a hassle-free 7-day return policy. If the product doesn't fit your vehicle or you're not satisfied, contact us within 7 days of delivery. Products must be unused and in original packaging. We'll arrange a pickup or exchange.",
    category: "Returns",
  },
  {
    question: "Do you offer PPF and detailing services at home?",
    answer: "Yes! We offer professional PPF installation and car detailing services at our service centers in major cities. We're also expanding our mobile service for select areas. Contact us to schedule an appointment at your convenience.",
    category: "Services",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via WhatsApp at +92 300 1234567, call us at +92 42 1234567, or email us at support@onestopcarpk.com. Our team is available 7 days a week from 9 AM to 9 PM.",
    category: "Support",
  },
];

const aboutFAQs: FAQItem[] = [
  {
    category: "Products",
    question: "Are all your products 100% genuine?",
    answer: "Absolutely. We are authorized dealers and official distributors for every brand we carry. Every product comes with original packaging, serial numbers, and manufacturer warranties. We have a zero-tolerance policy for counterfeit or grey-market goods.",
  },
  {
    category: "Delivery",
    question: "How fast is your delivery service?",
    answer: "We offer same-day dispatch for all in-stock items ordered before 2 PM. Standard delivery takes 1–3 business days for Peninsular Malaysia and 3–7 days for East Malaysia. Express delivery options are available. All shipments are fully insured and trackable.",
  },
  {
    category: "Installation",
    question: "Do you provide professional installation services?",
    answer: "Yes! Our certified installation team is available at our workshop facilities. We offer professional installation for all accessories, audio systems, LED upgrades, PPF, and ceramic coating. Appointments can be booked online or via WhatsApp.",
  },
  {
    category: "Warranty",
    question: "What warranty do your products and services carry?",
    answer: "All products carry the full manufacturer warranty (typically 1–3 years depending on brand). Our installation services come with a 12-month workmanship warranty. Ceramic coating and PPF packages include extended warranties of up to 5 years.",
  },
  {
    category: "Services",
    question: "How long does a ceramic coating or PPF installation take?",
    answer: "A full ceramic coating typically takes 1–2 days depending on paint correction required. A full body PPF installation takes 2–3 days. We provide a courtesy vehicle or pickup/drop-off service upon request for premium packages.",
  },
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, online banking, e-wallets (Touch 'n Go, GrabPay, Boost), bank transfers, and cash at our workshop. For large orders, we offer flexible installment plans with 0% interest through selected banks.",
  },
  {
    category: "Products",
    question: "Can I return a product if it doesn't fit my car?",
    answer: "Yes. We offer a 14-day hassle-free return policy for all unopened, unused products. For fitment issues with opened items, our team will work with you to find the right solution — including exchanges for the correct part or a full refund where applicable.",
  },
  {
    category: "Services",
    question: "Do you offer mobile detailing services?",
    answer: "Yes! Our mobile detailing team can come to your home or office for select services including express wash, interior cleaning, and minor detailing packages. Mobile PPF and ceramic coating are available for specific locations within our service area.",
  },
];

const FAQItem = ({
  faq,
  isOpen,
  onToggle,
  showCategory,
  variant,
}: {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  showCategory: boolean;
  variant?: "default" | "compact" | "dark";
}) => {
  const isDark = variant === "dark";

  return (
    <motion.div
      className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? isDark
            ? "border-[#E9CC2F]/40 bg-[#E9CC2F]/5 shadow-[0_4px_24px_rgba(233,204,47,0.12)]"
            : "border-[#E9CC2F]/40 bg-[#E9CC2F]/5 shadow-[0_4px_24px_rgba(233,204,47,0.12)]"
          : isDark
          ? "border-white/10 bg-white/5 hover:border-[#E9CC2F]/30"
          : "border-slate-200 bg-white hover:border-[#E9CC2F]/30"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
        type="button"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 pr-4">
          {showCategory && faq.category && (
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0 transition-colors duration-300 ${
                isOpen
                  ? "bg-[#E9CC2F] text-[#1A1A1A]"
                  : isDark
                  ? "bg-white/10 text-white/60 group-hover:bg-[#E9CC2F]/20 group-hover:text-[#E9CC2F]"
                  : "bg-slate-100 text-slate-500 group-hover:bg-[#E9CC2F]/15 group-hover:text-[#B69E24]"
              }`}
            >
              {faq.category}
            </span>
          )}
          <span
            className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${
              isDark ? "text-white" : "text-[#1A1A1A]"
            }`}
          >
            {faq.question}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen
              ? "bg-[#E9CC2F] text-[#1A1A1A]"
              : isDark
              ? "bg-white/10 text-white/40"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <Plus className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`px-4 pb-4 sm:px-6 sm:pb-6 text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about One Stop Car",
  items,
  variant = "default",
  className = "",
  showCategory = true,
  defaultOpenIndex = 0,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const faqItems = items || (variant === "dark" ? aboutFAQs : defaultFAQs);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isDark = variant === "dark";
  const isCompact = variant === "compact";

  return (
    <section className={`py-16 ${isDark ? "bg-[#1A1A1A]" : "bg-[#F8FAFC]"} ${className}`}>
      <div className={`max-w-4xl mx-auto px-4 ${isCompact ? "max-w-3xl" : ""}`}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          {variant === "dark" ? (
            <>
              <motion.p
                variants={staggerItem}
                className="text-xs font-bold text-[#E9CC2F] uppercase tracking-[0.2em] mb-3"
              >
                Got Questions?
              </motion.p>
              <motion.h2
                variants={staggerItem}
                className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4"
              >
                {title.split(" ").map((word, i) => 
                  word === "Questions" ? (
                    <span key={i} className="text-[#E9CC2F]">{word} </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="text-lg text-white/50 max-w-2xl mx-auto"
              >
                {subtitle}
              </motion.p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 mb-3 bg-[#E9CC2F]/15 px-4 py-1.5 rounded-full">
                <HelpCircle size={16} className="text-[#B69E24]" />
                <span className="text-[#B69E24] font-bold text-sm uppercase tracking-wide">
                  Help Center
                </span>
              </div>
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3"
              >
                {title}
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="text-gray-500"
              >
                {subtitle}
              </motion.p>
            </>
          )}
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqItems.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
              showCategory={showCategory}
              variant={isDark ? "dark" : "default"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}