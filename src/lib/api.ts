import { Product } from "@/types/domain/product"; // Assuming you have a Product type

/**
 * Fetches all products from the API.
 * @returns A promise that resolves to an array of products.
 */
export const getProducts = async (): Promise<Product[]> => {
    debugger;
    const res = await fetch("/products");
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return res.json();
};

/**
 * Fetches a single product by its ID from the external API.
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves to a single product object.
 */
export const getProductById = async (id: string | number): Promise<Product> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/product/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    return res.json();
};

// You could add other functions here like:
// export const createOrder = async (orderData) => { ... };
// export const submitContactForm = async (formData) => { ... };
