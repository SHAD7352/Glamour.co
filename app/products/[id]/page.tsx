import ProductDetailsComponent from "@/components/product/productdetails";
import { AppMetadata } from "@/types/metadata";

export const metadata: AppMetadata = {
    title: "Product",
    description: "product details",
};

export default function SingleProductPage() {
    return <ProductDetailsComponent />;
}