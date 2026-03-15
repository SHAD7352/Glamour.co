"use client";

import { Product } from "@/types/domain/product";
import OptimizedProductCard from "./OptimizedProductCard";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import { useMemo } from "react";

interface OptimizedProductGridProps {
  products?: Product[];
  onDelete: (id: number) => void;
  onEdit?: (product: Product) => void;
  isLoading?: boolean;
  itemsPerPage?: number;
  currentPage?: number;
  showAdminActions?: boolean;
}

export default function OptimizedProductGrid({
  products,
  onDelete,
  onEdit,
  isLoading,
  itemsPerPage = 12,
  currentPage = 1,
  showAdminActions = false,
}: OptimizedProductGridProps) {
  // Paginate products
  const paginatedProducts = useMemo(() => {
    if (!products) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, itemsPerPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="py-12 text-center text-gray-600 dark:text-gray-300">
        No products found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {paginatedProducts.map((product) => (
        <OptimizedProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
          showAdminActions={showAdminActions}
        />
      ))}
    </div>
  );
}
