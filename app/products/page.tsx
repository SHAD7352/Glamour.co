import Products from "@/components/product/product";
import { AppMetadata } from "@/types/metadata";

export const metadata: AppMetadata = {
  title: "Products",
  description: "Browse our products",
};

export default function ProductsPage() {
  return <Products />;
}
