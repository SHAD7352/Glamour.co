import ProductDetailsComponent from "@/features/products/OptimizedProductDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
  description: "product details",
};

export default function SingleProductPage() {
  return <ProductDetailsComponent />;
}
