import ProductEditForm from "@/features/products/ProductEditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product",
  description: "Edit product details",
};

export default function EditProductPage() {
  return <ProductEditForm />;
}
