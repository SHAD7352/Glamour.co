export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrls?: string[]; // <-- It's an array of strings
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