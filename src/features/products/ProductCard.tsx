import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Product } from "@/types/domain/product";
import { formatPrice, createWhatsAppLinkWithoutNo } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
interface ProductCardProps {
  product: Product;
  isAuthenticated: boolean;
  onDelete: (id: number) => void;
}

export default function ProductCard({
  product,
  isAuthenticated,
  onDelete,
}: ProductCardProps) {
  // 1. Cloudflare R2 public domain from environment or default
  const R2_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_R2_DOMAIN || 'https://pub-ff7d91c76708455393e73ce049051059.r2.dev';

  const getImageUrl = (path?: string) => {
    if (!path) return null;
    // If already a full URL (starts with http), return as-is
    if (path.startsWith('http')) return path;
    // Otherwise, construct full URL from R2 domain + relative path
    return `${R2_PUBLIC_DOMAIN}/${path}`;
  };

  // 2. Get the cover image or first image from the array
  const displayImage = product.coverImageUrl
    ? getImageUrl(product.coverImageUrl)
    : product.imageUrls?.[0]
      ? getImageUrl(product.imageUrls[0])
      : null;

  const message = `Hi, I am interested in ${product.name}. Please share more details.`;
  const whatsappLink = createWhatsAppLinkWithoutNo(message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      <Card className="flex flex-grow flex-col">
        <CardContent className="p-0">
          <div className="relative h-56 w-full md:h-48 lg:h-56">
            {displayImage ? (
              <img
                src={displayImage}
                alt={product.name}
                className="h-full w-full transform rounded-t-2xl object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-t-2xl bg-gray-100 dark:bg-gray-800">
                <span className="text-gray-400 dark:text-gray-600">
                  No Image
                </span>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between">
              <CardTitle>{product.name}</CardTitle>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {formatPrice(product.price ?? 0)}
              </span>
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
              {product.description ??
                product.shortDescription ??
                "Hand-crafted for modern spaces."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="mt-auto flex gap-3 p-4">
          <Button asChild className="flex-1">
            <Link href={`/products/${product.id}`}>View</Link>
          </Button>
          {!isAuthenticated && (
            <Button asChild variant="primary" className="flex-1">
              {/* <Link href={`/products/${product.id}/buy`}>Buy Now</Link> */}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Buy Now
              </a>
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Button asChild variant="secondary" className="flex-1">
                <Link href={`/products/${product.id}/edit`}>Edit</Link>
              </Button>
              <Button
                variant="ghost"
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
