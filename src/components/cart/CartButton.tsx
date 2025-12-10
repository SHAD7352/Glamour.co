'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartButtonProps {
    onClick: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
    const { getTotalItems } = useCart();
    const itemCount = getTotalItems();

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-20 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-2xl transition-all hover:shadow-3xl sm:h-14 sm:w-14"
            title="Open cart"
        >
            <ShoppingCart size={24} className="text-white" />

            {/* Badge */}
            <AnimatePresence>
                {itemCount > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-lg"
                    >
                        {itemCount > 99 ? '99+' : itemCount}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pulse Effect when items added */}
            {itemCount > 0 && (
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
            )}
        </motion.button>
    );
}
