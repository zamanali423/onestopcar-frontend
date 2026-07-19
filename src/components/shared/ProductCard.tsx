// src/components/shared/ProductCard.tsx
import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    badge?: string;
    badgeColor?: string;
    onQuickAdd?: () => void;
    className?: string;
}

const ProductCardComponent = ({
    id,
    name,
    price,
    originalPrice,
    image,
    rating,
    reviews,
    badge,
    badgeColor = 'bg-[#E9CC2F] text-[#1A1A1A]',
    onQuickAdd,
    className,
}: ProductCardProps) => {
    const addToCart = useCartStore((state:any) => state.addItem);
    const isInWishlist = useWishlistStore((state:any) => state.isInWishlist(id));
    const toggleWishlist = useWishlistStore((state:any) => state.toggleItem);

    const handleAddToCart = () => {
        addToCart({ id, title: name, price, image, category: 'general' });
        onQuickAdd?.();
    };

    const handleWishlist = () => {
        toggleWishlist({ id, name, image });
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={cn(
                'product-card group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#E9CC2F]/30 transition-all',
                className
            )}
        >
            <div className="relative overflow-hidden aspect-square">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {badge && (
                    <div className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-md ${badgeColor}`}>
                        {badge}
                    </div>
                )}
                <button
                    onClick={handleWishlist}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                        isInWishlist
                            ? 'bg-secondary text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <Heart
                        size={16}
                        fill={isInWishlist ? 'currentColor' : 'none'}
                    />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-[#1A1A1A] text-[#E9CC2F] text-[10px] font-black text-center py-1.5 translate-y-full group-hover:translate-y-0 transition-transform">
                    Quick Add +
                </div>
            </div>
            <div className="p-3">
                <h3 className="text-xs font-bold text-[#1A1A1A] mb-1.5 leading-tight line-clamp-2">
                    {name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                    <Star size={10} fill="#E9CC2F" className="text-[#E9CC2F]" />
                    <span className="text-[9px] font-bold text-gray-600">
                        {rating} ({reviews})
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-black text-[#1A1A1A]">
                            PKR {price.toLocaleString()}
                        </div>
                        {originalPrice && (
                            <div className="text-[9px] text-gray-400 line-through">
                                PKR {originalPrice.toLocaleString()}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="w-7 h-7 bg-[#E9CC2F] rounded-lg flex items-center justify-center hover:bg-[#B69E24] transition-colors"
                    >
                        <ShoppingCart size={13} className="text-[#1A1A1A]" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export const ProductCard = memo(ProductCardComponent);