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

export interface TopupResponse {
  code: number;
  message: string;
  data?: {
    id: number;
    source_of_fund_id: number;
    description: string;
  };
}

export interface IUser {
  first_name: string;
  wallet_id: number;
  balance: number;
}

export interface IFundSource {
  id: number;
  name: string;
}