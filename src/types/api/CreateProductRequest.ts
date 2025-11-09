export interface ProductCreateUpdateDto {
  Name: string;
  Description: string;
  Price: string;
  Images?: File[];
}

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
}

export interface CreateProductRequest extends ProductCreateUpdateDto {}
export interface CreateProductResponse extends ProductDto {}