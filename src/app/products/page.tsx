import Products from "@/features/products/product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our products",
};

export default function ProductsPage() {
  return <Products />;
}
