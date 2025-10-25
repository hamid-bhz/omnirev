export type Market = string;
export type Category = string;

export interface ApiError {
  error: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}
