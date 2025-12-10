"use client";

import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Product } from "@/types/domain/product";
import { getProductById } from "@/services/products/products.service";
import { createWhatsAppLinkWithoutNo, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button"; // Corrected lowercase path
import { useQuery } from "@tanstack/react-query"; // 1. Import useQuery
import { useDeleteProduct } from "@/hooks/useProducts";

export default function ProductDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id || searchParams.get("productId");

  // Always call hooks at the top level, before any conditional returns
  const deleteMutation = useDeleteProduct();

  // 2. Replace useState/useEffect with useQuery
  const {
    data: product,
    isLoading: loading, // Use 'isLoading' as 'loading'
    isError,
    error,
  } = useQuery<Product, Error>({
    queryKey: ["product", id], // Dynamic query key
    queryFn: () => getProductById(parseInt(id as string)),
    enabled: !!id, // Only run the query if 'id' exists
  });

  // 3. Handle 'id' not existing (replaces logic from old useEffect)
  if (!id) {
    return (
      <p className="py-20 text-center font-semibold text-red-500">
        No product ID specified.
      </p>
    );
  }

  // 4. Handle loading state
  if (loading) {
    return (
      <p className="py-20 text-center text-lg text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    );
  }

  // 5. Handle error state
  if (isError) {
    return (
      <p className="py-20 text-center font-semibold text-red-500">
        {error?.message ?? "Failed to load product details."}
      </p>
    );
  }

  // 6. Handle product not found
  if (!product) {
    return (
      <p className="py-20 text-center font-semibold text-red-500">
        Product not found.
      </p>
    );
  }

  // 7. Use Cloudflare R2 public domain for images
  const R2_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_R2_DOMAIN || 'https://pub-ff7d91c76708455393e73ce049051059.r2.dev';

  const getImageUrl = (path?: string) => {
    if (!path) return '/images/placeholder.jpg';
    // If already a full URL (starts with http), return as-is
    if (path.startsWith('http')) return path;
    // Otherwise, construct full URL from R2 domain + relative path
    return `${R2_PUBLIC_DOMAIN}/${path}`;
  };

  const displayImages =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls.map(getImageUrl)
      : product.coverImageUrl
        ? [getImageUrl(product.coverImageUrl)]
        : null;

  const message = `Hi, I am interested in ${product.name}. Please share more details.`;
  const whatsappLink = createWhatsAppLinkWithoutNo(message);

  const handleDelete = async (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(productId, {
        onSuccess: () => {
          // Product deleted successfully, redirect to products page
          window.location.href = "/products";
        },
        onError: (error) => {
          alert(`Failed to delete product: ${error.message}`);
        },
      });
    }
  };

  return (
    <section className="bg-gray-100 py-12 text-gray-900 dark:bg-gray-900 dark:text-white md:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-dark lg:grid lg:grid-cols-2 lg:gap-12"
        >
          <div className="h-80 w-full md:h-96 lg:h-auto">
            {displayImages && displayImages.length > 0 ? (
              <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="h-full w-full"
              >
                {/* 8. Map over the 'displayImages' array */}
                {displayImages.map((imgSrc, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-full w-full">
                      <img
                        src={imgSrc}
                        alt={`${product.name} - view ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                <span className="text-gray-400 dark:text-gray-600">
                  No Image Available
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex-grow">
              <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                {product.name}
              </h1>
              <p className="mb-6 text-2xl font-semibold text-rose-600">
                {formatPrice(product.price)}
              </p>
              {/* 9. FIX: Use 'description' from your API */}
              <p className="mb-8 text-base text-gray-700 dark:text-gray-300 lg:text-lg">
                {product.description}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 dark:border-gray-700 sm:flex-row">
              <Button asChild className="flex-1" size="lg">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order via WhatsApp
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="flex-1">
                <Link href="/products">Back to Products</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
