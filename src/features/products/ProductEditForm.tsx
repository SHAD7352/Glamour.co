"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUpdateProduct } from "@/hooks/useProducts";
import { getProductById } from "@/services/products/products.service";
import { Product } from "@/types/domain/product";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
  price: z.number().min(0.01, "Price must be greater than 0"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductEditForm() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);

  // Fetch existing product data
  const {
    data: product,
    isLoading: loading,
    isError,
    error,
  } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
    },
  });

  // Reset form when product data loads
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description || "",
        price: product.price,
      });
    }
  }, [product, reset]);

  const updateMutation = useUpdateProduct();

  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Description", data.description);
    formData.append("Price", data.price.toString());

    // Handle file uploads if needed
    const fileInput = document.getElementById("images") as HTMLInputElement;
    if (fileInput?.files) {
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append("Images", fileInput.files[i]);
      }
    }

    updateMutation.mutate(
      { id: productId, formData },
      {
        onSuccess: () => {
          router.push("/products");
        },
        onError: (error: any) => {
          setError("root", {
            message: error.message || "Failed to update product",
          });
        },
      },
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16">
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          Loading product...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-16">
        <p className="text-center font-semibold text-red-500">
          {error?.message ?? "Failed to load product."}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-16">
        <p className="text-center font-semibold text-red-500">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <Card className="mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Name *
              </label>
              <Input id="name" type="text" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium"
              >
                Description *
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-medium">
                Price *
              </label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="images"
                className="mb-1 block text-sm font-medium"
              >
                Images (optional - leave empty to keep existing)
              </label>
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                className="w-full"
              />
            </div>

            {errors.root && (
              <p className="text-sm text-red-500">{errors.root.message}</p>
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSubmitting || updateMutation.isPending}
              >
                {isSubmitting || updateMutation.isPending
                  ? "Updating..."
                  : "Update Product"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/products")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
