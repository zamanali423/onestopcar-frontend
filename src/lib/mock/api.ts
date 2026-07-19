// src/lib/mock/api.ts
export const simulateDelay = (ms: number = 600) => 
  new Promise((resolve) => setTimeout(resolve, ms));

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

export const createApiResponse = <T>(
  data: T,
  message: string = 'Success',
  status: number = 200
): ApiResponse<T> => ({
  data,
  status,
  message,
  timestamp: new Date().toISOString(),
});

export const createErrorResponse = (
  message: string = 'An error occurred',
  status: number = 500
): ApiResponse<null> => ({
  data: null,
  status,
  message,
  timestamp: new Date().toISOString(),
});