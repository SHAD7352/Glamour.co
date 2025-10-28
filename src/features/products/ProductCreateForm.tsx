"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct } from "@/hooks/useProducts";
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

interface ProductCreateFormProps {
  onClose: () => void;
}

export default function ProductCreateForm({ onClose }: ProductCreateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const createMutation = useCreateProduct();

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

    createMutation.mutate(formData, {
      onSuccess: () => onClose(),
      onError: (error: any) => {
        setError("root", {
          message: error.message || "Failed to create product",
        });
      },
    });
  };

  return (
    <Card className="mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name *
            </label>
            <Input
              id="name"
              type="text"
              {...register("name")}
            />
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
              <p className="text-sm text-red-500">{errors.description.message}</p>
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
            <label htmlFor="images" className="mb-1 block text-sm font-medium">
              Images
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
            <Button type="submit" disabled={isSubmitting || createMutation.isPending}>
              {isSubmitting || createMutation.isPending ? "Creating..." : "Create Product"}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
