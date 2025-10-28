import { Button } from "@/components/ui/Button";

interface ProductHeaderProps {
  isAuthenticated: boolean;
  onAddProduct: () => void;
}

export default function ProductHeader({
  isAuthenticated,
  onAddProduct,
}: ProductHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Our Products
      </h1>
      <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
        Discover our collection of handcrafted flower arrangements.
      </p>
      {isAuthenticated && (
        <div className="mt-6">
          <Button onClick={onAddProduct}>Add New Product</Button>
        </div>
      )}
    </div>
  );
}
