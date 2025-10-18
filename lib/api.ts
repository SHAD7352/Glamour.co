import { Product } from "@/types/product"; // Assuming you have a Product type

/**
 * Fetches all products from the API.
 * @returns A promise that resolves to an array of products.
 */
export const getProducts = async (): Promise<Product[]> => {
    const res = await fetch("/api/products");
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return res.json();
};

/**
 * Fetches a single product by its ID from the API.
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves to a single product object or null if not found.
 */
export const getProductById = async (id: string | number): Promise<Product | null> => {
    // This assumes your API route can handle finding a single product.
    // For now, we'll just re-use the logic from your component.
    const products = await getProducts();
    return products.find(p => p.id == id) || null;
};

// You could add other functions here like:
// export const createOrder = async (orderData) => { ... };
// export const submitContactForm = async (formData) => { ... };
