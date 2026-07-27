"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/domain/product";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Heart, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
  showAdminActions?: boolean;
}

const OptimizedProductCard = ({
  product,
  onEdit,
  onDelete,
  showAdminActions = false,
}: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { elementRef, isVisible } = useIntersectionObserver();

  // Cloudflare R2 public domain from environment or default
  const R2_PUBLIC_DOMAIN =
    process.env.NEXT_PUBLIC_R2_DOMAIN ||
    "https://pub-ff7d91c76708455393e73ce049051059.r2.dev";

  const getImageUrl = (path?: string) => {
    if (!path) return "/images/placeholder.jpg";
    if (path.startsWith("http")) return path;
    return `${R2_PUBLIC_DOMAIN}/${path}`;
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    addToCart(product, quantity);

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
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete?.(product.id);
    }
  };

  const inCart = isInCart(product.id);
  const imageUrl = getImageUrl(product.coverImageUrl);

  return (
    <motion.div
      ref={elementRef}
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
            className="rounded-full bg-blue-500/90 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-blue-600"
            title="Edit product"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="rounded-full bg-red-500/90 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-red-600"
            title="Delete product"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* Favorite Button */}
      <button
        className="absolute left-3 top-3 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-black/60 dark:hover:bg-black/80"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        title="Add to favorites"
      >
        <Heart className="h-5 w-5 text-gray-600 transition-colors hover:text-red-500 dark:text-gray-400" />
      </button>

      {/* Product Image - Lazy Loaded */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {isVisible ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
              )}
              <img
                src={imageUrl}
                alt={product.name}
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
            </>
          ) : (
            <div className="h-full w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
          )}

          {/* View Product Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
            <button className="scale-0 transform rounded-full bg-white p-3 text-gray-900 shadow-lg transition-all group-hover:scale-100 dark:bg-gray-800 dark:text-white">
              <Eye size={20} />
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors hover:text-rose-600 dark:text-white dark:hover:text-rose-400">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
        )}

        <div className="mb-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
            ₹{product.price?.toFixed(2) || "0.00"}
          </span>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          animate={isAdding ? { scale: 0.95 } : { scale: 1 }}
          className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white transition-all ${
            inCart
              ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
              : "bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
          }`}
        >
          <ShoppingCart size={18} />
          {inCart ? "In Cart" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OptimizedProductCard;
