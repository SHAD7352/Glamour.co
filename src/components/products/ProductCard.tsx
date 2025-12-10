'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/services/productService';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart, Edit, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (productId: number) => void;
    showAdminActions?: boolean;
}

const ProductCard = ({ product, onEdit, onDelete, showAdminActions = false }: ProductCardProps) => {
    const { addToCart, isInCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Cloudflare R2 public domain from environment or default
    const R2_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_R2_DOMAIN || 'https://pub-ff7d91c76708455393e73ce049051059.r2.dev';

    const getImageUrl = (path?: string) => {
        if (!path) return '/images/placeholder.jpg';
        // If already a full URL (starts with http), return as-is
        if (path.startsWith('http')) return path;
        // Otherwise, construct full URL from R2 domain + relative path
        return `${R2_PUBLIC_DOMAIN}/${path}`;
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAdding(true);
        addToCart(product, quantity);

        // Reset animation after a short delay
        setTimeout(() => {
            setIsAdding(false);
            setQuantity(1);
        }, 600);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit?.(product);
    };

    const handleDelete = (e: React.MouseEvent) => {
        console.log('Delete button clicked!', product.id);  // ADD THIS
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
            onDelete?.(product.id);
        }
    };

    const inCart = isInCart(product.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-dark-2"
        >
            {/* Admin Actions */}
            {showAdminActions && (
                <div className="absolute right-2 top-2 z-20 flex gap-2">
                    <button
                        onClick={handleEdit}
                        className="rounded-full bg-blue-500/90 p-2 text-white backdrop-blur-sm transition-all hover:bg-blue-600 hover:scale-110"
                        title="Edit product"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="rounded-full bg-red-500/90 p-2 text-white backdrop-blur-sm transition-all hover:bg-red-600 hover:scale-110"
                        title="Delete product"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}

            {/* Favorite Button */}
            <button
                className="absolute left-3 top-3 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-black/60 dark:hover:bg-black/80"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                title="Add to favorites"
            >
                <Heart size={18} className="text-gray-700 transition-colors hover:fill-red-500 hover:text-red-500 dark:text-gray-300" />
            </button>

            <Link href={`/products/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
                    <Image
                        src={getImageUrl(product.coverImageUrl)}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                    {/* Quick View Button */}
                    <div className="absolute bottom-4 left-4 right-4 flex translate-y-full gap-2 transition-transform duration-300 group-hover:translate-y-0">
                        <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-semibold text-black shadow-lg transition-all hover:scale-105 hover:bg-gray-100 active:scale-95">
                            <Eye size={16} />
                            Quick View
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                    <h3 className="mb-2 line-clamp-1 text-xl font-bold text-dark transition-colors group-hover:text-primary dark:text-white">
                        {product.name}
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-body-color">
                        {product.description}
                    </p>

                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                            ${product.price?.toFixed(2)}
                        </span>
                        {inCart && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                In Cart
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Section */}
                    <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                        <div className="flex items-center rounded-lg border border-stroke dark:border-gray-700">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setQuantity(Math.max(1, quantity - 1));
                                }}
                                className="px-3 py-2 text-body-color transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                −
                            </button>
                            <span className="min-w-[2.5rem] text-center text-sm font-medium text-dark dark:text-white">
                                {quantity}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setQuantity(quantity + 1);
                                }}
                                className="px-3 py-2 text-body-color transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95 disabled:opacity-70 ${isAdding ? 'scale-95' : ''
                                }`}
                        >
                            <ShoppingCart size={16} className={isAdding ? 'animate-bounce' : ''} />
                            {isAdding ? 'Added!' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
