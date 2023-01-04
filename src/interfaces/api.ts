export interface RegisterResponse {
  code: number;
  message: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data?: {
    token?: string;
  };
}

export interface IUser {
  first_name: string;
  wallet_id: number;
  balance: number;
}
