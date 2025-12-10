'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { whatsappService } from '@/services/whatsappService';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();

    const R2_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_R2_DOMAIN || 'https://pub-ff7d91c76708455393e73ce049051059.r2.dev';

    const getImageUrl = (path?: string) => {
        if (!path) return '/images/placeholder.jpg';
        if (path.startsWith('http')) return path;
        return `${R2_PUBLIC_DOMAIN}/${path}`;
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;

        whatsappService.sendOrderViaWhatsApp(cart);

        // Optionally clear cart after sending to WhatsApp
        // clearCart();
        // onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl dark:bg-dark-2 sm:w-96"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-stroke p-6 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-primary" size={24} />
                                <div>
                                    <h2 className="text-xl font-bold text-dark dark:text-white">Shopping Cart</h2>
                                    <p className="text-sm text-body-color">
                                        {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <X size={24} className="text-body-color" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex max-h-[calc(100vh-280px)] flex-col gap-4 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <ShoppingBag size={64} className="mb-4 text-gray-300 dark:text-gray-600" />
                                    <h3 className="mb-2 text-lg font-semibold text-dark dark:text-white">Your cart is empty</h3>
                                    <p className="text-sm text-body-color">Add some products to get started!</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex gap-4 rounded-lg border border-stroke p-3 dark:border-gray-700"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                                            <Image
                                                src={getImageUrl(item.coverImageUrl)}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <h4 className="mb-1 line-clamp-1 text-sm font-semibold text-dark dark:text-white">
                                                    {item.name}
                                                </h4>
                                                <p className="text-sm font-bold text-primary">${item.price.toFixed(2)}</p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 rounded-lg border border-stroke dark:border-gray-700">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <Minus size={14} className="text-body-color" />
                                                    </button>
                                                    <span className="min-w-[1.5rem] text-center text-sm font-medium text-dark dark:text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <Plus size={14} className="text-body-color" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    title="Remove from cart"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 border-t border-stroke bg-white p-6 dark:border-gray-700 dark:bg-dark-2">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-lg font-semibold text-dark dark:text-white">Total</span>
                                    <span className="text-2xl font-bold text-primary">${getTotalPrice().toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="mb-3 w-full rounded-lg bg-green-600 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg active:scale-95"
                                >
                                    Checkout via WhatsApp
                                </button>

                                <button
                                    onClick={() => {
                                        if (window.confirm('Clear all items from cart?')) {
                                            clearCart();
                                        }
                                    }}
                                    className="w-full rounded-lg border border-stroke py-2.5 text-sm font-medium text-body-color transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
