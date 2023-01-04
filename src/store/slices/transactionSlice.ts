export interface TransactionData {
  id: number;
  to_wallet_id: number;
  to_user?: IToUser;
  amount: number;
  description: string;
  source_of_fund_id?: number;
}

interface IToUser {
  wallet_id: number;
}

export interface ITransactionState {
  page: number;
  size: number;
  count: number;
  data: TransactionData[];
}
