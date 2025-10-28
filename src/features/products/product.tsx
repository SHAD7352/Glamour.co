"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProductHeader from "./ProductHeader";
import ProductGrid from "./ProductGrid";
import ProductModal from "./ProductModal";

// --- MAIN PRODUCTS PAGE COMPONENT ---
export default function Products() {
  const { isAuthenticated } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Use custom hook for data fetching
  const { data: products, isLoading, isError, error } = useProducts();

  const handleDelete = async (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      // TODO: Implement delete API call
      console.log("Delete product:", productId);
    }
  };

  return (
    <ErrorBoundary>
      <section className="bg-gray-50 py-16 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 md:py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <ProductHeader
            isAuthenticated={isAuthenticated}
            onAddProduct={() => setShowCreateForm(true)}
          />

          {/* Error state */}
          {isError && (
            <p className="text-center font-semibold text-red-500">
              {error?.message ??
                "Failed to fetch products. Please try again later."}
            </p>
          )}

          {/* Products grid */}
          {!isError && (
            <ProductGrid
              products={products}
              isAuthenticated={isAuthenticated}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          )}

          <ProductModal
            isOpen={showCreateForm}
            onClose={() => setShowCreateForm(false)}
          />
        </div>
      </section>
    </ErrorBoundary>
  );
}
