export class WebResponse<T> {
  message?: string;
  status_code?: number;
  success: boolean;
  data?: T;
  error?: string;
  token?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
