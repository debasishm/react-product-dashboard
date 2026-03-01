export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  rating: number | null | undefined;
  stock: number;
  discountPercentage: number;
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  thumbnail: string;
  brand: string;
  reviews?: Review[];
}
