"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button"; // Corrected lowercase path
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/domain/product";

interface ProductViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductViewModal({
  product,
  isOpen,
  onClose,
}: ProductViewModalProps) {
  if (!product) {
    return null;
  }

  // --- FIX 1 ---
  // Use the 'imageUrls' array from the product.
  // Provide a fallback if the array is empty.
  const displayImages =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : ["/images/flower/default.jpg"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
      {/* This content is passed as 'children' to the Modal */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Image Gallery */}
        <div className="h-80 w-full md:h-96">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="h-full w-full rounded-lg"
          >
            {/* Map over the new 'displayImages' array */}
            {displayImages.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={imgSrc}
                    alt={`${product.name} - view ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex-grow">
            <p className="mb-4 text-2xl font-semibold text-rose-600">
              {formatPrice(product.price)}
            </p>

            {/* --- FIX 2 ---
                Use 'description' from the API, not 'shortDescription'
            */}
            <p className="text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
            <Button asChild size="lg" className="w-full" onClick={onClose}>
              <Link href={`/products/${product.id}`}>View Full Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
