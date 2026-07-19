// src/components/shared/SectionHeader.tsx
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  titleHighlight?: string;
}

export const SectionHeader = ({
  title,
  subtitle,
  badge,
  badgeIcon,
  className,
  align = 'center',
  titleHighlight,
}: SectionHeaderProps) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const highlightText = (text: string) => {
    if (!titleHighlight) return text;
    const parts = text.split(titleHighlight);
    if (parts.length === 1) return text;
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && (
          <span className="text-[#E9CC2F]">{titleHighlight}</span>
        )}
      </span>
    ));
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('mb-10', alignmentClasses[align], className)}
    >
      {badge && (
        <motion.div
          variants={staggerItem}
          className="inline-flex items-center gap-2 mb-3 bg-[#E9CC2F]/15 px-4 py-1.5 rounded-full"
        >
          {badgeIcon}
          <span className="text-[#B69E24] font-bold text-sm uppercase tracking-wide">
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={staggerItem}
        className="text-3xl md:text-4xl font-black text-[#1A1A1A]"
      >
        {highlightText(title)}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={staggerItem}
          className="text-gray-500 max-w-xl mx-auto mt-2"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};