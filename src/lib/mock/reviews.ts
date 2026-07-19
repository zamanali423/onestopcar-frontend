// src/lib/mock/reviews.ts
import { simulateDelay, createApiResponse, type ApiResponse } from './api';

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userInitials: string;
  avatarColor: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userName: 'Muhammad Asad',
    userInitials: 'MA',
    avatarColor: '#E9CC2F',
    rating: 5,
    title: 'Excellent quality!',
    comment: 'Absolutely amazing quality! Ordered sun shades for my Toyota Corolla and they fit perfectly. Fast delivery, great packaging. Will definitely order again!',
    date: '2 weeks ago',
    verified: true,
    helpful: 24,
  },
  {
    id: 'r2',
    productId: '2',
    userName: 'Fatima Khan',
    userInitials: 'FK',
    avatarColor: '#3B82F6',
    rating: 5,
    title: 'Best car accessories shop in Pakistan!',
    comment: 'Got my Honda Civic leather seat covers and they look premium. Customer service was excellent too.',
    date: '1 month ago',
    verified: true,
    helpful: 18,
  },
  {
    id: 'r3',
    productId: '3',
    userName: 'Ahmed Raza',
    userInitials: 'AR',
    avatarColor: '#10B981',
    rating: 5,
    title: 'Top-notch PPF installation!',
    comment: 'PPF installation service is top-notch! The team was professional and the film quality is excellent. My car looks brand new. Highly recommended!',
    date: '3 weeks ago',
    verified: true,
    helpful: 32,
  },
];

export const getProductReviews = async (productId: string): Promise<ApiResponse<Review[]>> => {
  await simulateDelay(300);
  const reviews = mockReviews.filter(r => r.productId === productId);
  return createApiResponse(reviews);
};

export const getAllReviews = async (): Promise<ApiResponse<Review[]>> => {
  await simulateDelay(400);
  return createApiResponse(mockReviews);
};