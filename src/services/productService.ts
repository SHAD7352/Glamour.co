import { apiClient } from './api/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7188/api/';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    coverImageUrl?: string;
    imageUrls?: string[];
}

export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    coverImage: File;
    images: File[];
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    coverImage?: File;
    images?: File[];
}

export const productService = {
    getAllProducts: async () => {
        const response = await apiClient.get<Product[]>('Product');
        return response.data;
    },

    getProductById: async (id: number) => {
        const response = await apiClient.get<Product>(`Product/${id}`);
        return response.data;
    },

    createProduct: async (data: CreateProductDto) => {
        const formData = new FormData();
        formData.append('Name', data.name);
        formData.append('Description', data.description);
        formData.append('Price', data.price.toString());

        if (data.coverImage) {
            formData.append('CoverImage', data.coverImage);
        }

        if (data.images && data.images.length > 0) {
            data.images.forEach((image) => {
                formData.append('Images', image);
            });
        }

        const response = await apiClient.post<Product>('Product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateProduct: async (id: number, data: UpdateProductDto) => {
        const formData = new FormData();

        if (data.name) formData.append('Name', data.name);
        if (data.description) formData.append('Description', data.description);
        if (data.price !== undefined) formData.append('Price', data.price.toString());

        if (data.coverImage) {
            formData.append('CoverImage', data.coverImage);
        }

        if (data.images && data.images.length > 0) {
            data.images.forEach((image) => {
                formData.append('Images', image);
            });
        }

        const response = await apiClient.put<Product>(`Product/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteProduct: async (id: number) => {
        debugger;
        const response = await apiClient.delete(`Product/${id}`);
        return response.data;
    },
};
