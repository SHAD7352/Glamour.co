import { apiClient } from '../api';
import { Product } from '@/types/domain/product'; // Assuming you have types

// This function knows HOW to get all products
export const getAllProducts = async (): Promise<Product[]> => {
  debugger;
  const response = await apiClient.get('/product');
  return response.data;
};

// This function knows HOW to create a product with form data
export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await apiClient.post('/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// This function knows HOW to update a product
export const updateProduct = async (id: number, productData: Partial<Product>): Promise<Product> => {
  const response = await apiClient.put('/product', { id, ...productData });
  return response.data;
};

// This function knows HOW to delete a product
export const deleteProduct = async (id: number): Promise<Product> => {
  const response = await apiClient.delete(`/product?id=${id}`);
  return response.data;
};