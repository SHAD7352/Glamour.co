import { apiClient } from '../api';
import { Product } from '@/types/domain/product'; // Assuming you have types

// This function knows HOW to get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get('Product');
  return response.data;
};

// This function knows HOW to get a product by ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get(`Product/${id}`);
  return response.data;
};

// This function knows HOW to create a product with form data
export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await apiClient.post('Product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// This function knows HOW to update a product
export const updateProduct = async (id: number, formData: FormData): Promise<Product> => {
  console.log(`Updating product with ID: ${id} at endpoint Product/${id}`);
  const response = await apiClient.put(`Product/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// This function knows HOW to delete a product
export const deleteProduct = async (id: number): Promise<boolean> => {
  const response = await apiClient.delete(`Product/${id}`);
  // Assuming backend returns success message on success, failure on error
  return response.status === 200;
};