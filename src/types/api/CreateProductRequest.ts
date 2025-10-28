export interface CreateProductRequest {
  Name: string;
  Description: string;
  Price: string;
  Images?: File[];
}

export interface CreateProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
}