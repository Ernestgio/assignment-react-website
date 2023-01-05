export interface LoginResponse {
  code: number;
  message: string;
  data?: {
    token?: string;
  };
}
