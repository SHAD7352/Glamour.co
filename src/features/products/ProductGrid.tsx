import { Product } from "@/types/domain/product";
import ProductCard from "./ProductCard";
import ProductSkeleton from "@/components/ui/ProductSkeleton";

interface ProductGridProps {
  products?: Product[];
  isAuthenticated: boolean;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export default function ProductGrid({
  products,
  isAuthenticated,
  onDelete,
  isLoading,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        No products found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAuthenticated={isAuthenticated}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
