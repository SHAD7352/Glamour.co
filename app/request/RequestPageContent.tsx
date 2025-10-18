"use client";

// This is the CLIENT component.
// Its only job is to render the ProductDetailsComponent, which needs
// to run in the browser because it uses the useSearchParams hook.

import ProductDetailsComponent from "@/components/product/productdetails";

export default function RequestPageContent() {
    return <ProductDetailsComponent />;
}