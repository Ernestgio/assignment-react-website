import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { TransactionRequest } from "../../interfaces/api";

export interface TransactionData {
  id: number;
  from_to_user?: number;
  amount: number;
  description: string;
  created_at: string;
  type: "DEBIT" | "CREDIT";
}

export interface ITransactionState {
  page: number;
  size: number;
  count: number;
  data: TransactionData[];
}

const initialState: ITransactionState = {
  page: 1,
  size: 10,
  count: 0,
  data: [],
};

export const fetchTransactions = createAsyncThunk<
  ITransactionState,
  TransactionRequest,
  { rejectValue: string }
>(
  "FETCH_TRANSACTIONS",
  (requestParams: TransactionRequest, { rejectWithValue }) => {
    return fetchTransactionFromApi(rejectWithValue, requestParams);
  }
);

const fetchTransactionFromApi = async (
  rejectWithValue: any,
  requestParams: TransactionRequest
) => {
  try {
    const response: Response = await fetch(
      "http://localhost:8080/transactions",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requestParams.token}`,
        },
      }
    );
    const { data } = await response.json();
    const { page, size, count } = data;
    const payload = data.data;
    const transactions: TransactionData[] = translateTransactions(
      payload,
      requestParams.currentWallet
    );

    return {
      page,
      size,
      count,
      data: transactions,
    };
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
};

const translateTransactions = (
  data: any,
  currentWallet: number
): TransactionData[] => {
  return data.map((transaction: any) => {
    let fromToUser: number;
    let transactionType: "DEBIT" | "CREDIT";

    if (transaction.to_wallet_id) {
      fromToUser =
        transaction.to_wallet_id === currentWallet
          ? transaction.wallet_id
          : transaction.to_wallet_id;
      transactionType =
        transaction.to_wallet_id === currentWallet ? "DEBIT" : "CREDIT";
    } else {
      fromToUser = transaction.source_of_fund_id;
      transactionType = "CREDIT";
    }

    return {
      id: transaction.id,
      to_wallet_id: transaction.to,
      from_to_user: fromToUser,
      amount: transaction.amount,
      description: transaction.description,
      created_at: transaction.created_at,
      type: transactionType,
    };
  });
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.rejected, (state) => {
      return {
        ...state,
        data: [],
      };
    });
    builder.addCase(fetchTransactions.pending, (state) => {
      return {
        ...state,
        data: [],
      };
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      return {
        ...state,
        page: action.payload.page,
        size: action.payload.size,
        count: action.payload.count,
        data: action.payload.data,
      };
    });
  },
});

export default transactionSlice.reducer;

export type TransactionDispatch = ThunkDispatch<
  ITransactionState,
  any,
  AnyAction
>;
