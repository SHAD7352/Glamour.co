export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  coverImageUrl?: string; // Cover image for the product
  imageUrls?: string[]; // Additional product images
  shortDescription?: string;
  image?: string;
};

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrls: string[];
// }

// export interface ProductFormData {
//   name: string;
//   description: string;
//   price: number;
//   imageUrls: string[];
// }

// export interface ProductState {
//   products: Product[];
//   isLoading: boolean;
//   error: string | null;
//   selectedProduct: Product | null;
// }