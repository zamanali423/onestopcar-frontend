// src/components/shared/Container.tsx
import { cn } from '@/lib/utils';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: boolean;
}

const maxWidthMap = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
};

export const Container = ({
    children,
    className,
    maxWidth = '2xl',
    padding = true,
}: ContainerProps) => {
    return (
        <div
            className={cn(
                'mx-auto w-full',
                maxWidthMap[maxWidth],
                padding && 'px-4 sm:px-6 lg:px-8',
                className
            )}
        >
            {children}
        </div>
    );
};