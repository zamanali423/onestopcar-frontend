// src/components/shared/Section.tsx
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'dark' | 'transparent';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

const backgroundMap = {
  white: 'bg-white',
  gray: 'bg-[#F8FAFC]',
  dark: 'bg-[#1A1A1A]',
  transparent: 'bg-transparent',
};

const spacingMap = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
};

export const Section = ({
  children,
  className,
  id,
  background = 'white',
  spacing = 'lg',
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        backgroundMap[background],
        spacingMap[spacing],
        'relative overflow-hidden',
        className
      )}
    >
      {children}
    </section>
  );
};