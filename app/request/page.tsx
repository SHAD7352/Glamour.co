import { Suspense } from "react";
import { AppMetadata } from "@/types/metadata";
import RequestPageContent from "./RequestPageContent";

export const metadata: AppMetadata = {
    title: "Request Product",
    description: "Request details for a specific product",
};

// A simple loading component to show as a fallback
const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-center text-lg text-gray-500 dark:text-gray-400">
                Loading Product...
            </p>
        </div>
    );
};

// This is a SERVER component. It does NOT use client hooks.
export default function RequestPage() {
    return (
        // The Suspense boundary MUST be in the server page.
        // It wraps the component that needs client-side data.
        <Suspense fallback={<Loading />}>
            <RequestPageContent />
        </Suspense>
    );
}