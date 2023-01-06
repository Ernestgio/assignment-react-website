import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { translateTransactions } from "../../utils/converter";
import { filterTransactions } from "../../utils/filter";

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
  any,
  any,
  { rejectValue: string }
>("FETCH_TRANSACTIONS", (requestParams: any, { rejectWithValue }) => {
  return fetchTransactionFromApi(rejectWithValue, requestParams);
});

const fetchTransactionFromApi = async (
  rejectWithValue: any,
  requestParameters: any
) => {
  try {
    const response: Response = await fetch(
      `${process.env.REACT_APP_API_URL}transactions?size=${requestParameters.size}&sortBy=${requestParameters.sortBy}&sortDir=${requestParameters.sortDir}&search=${requestParameters.search}&page=${requestParameters.page}`,
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requestParameters.token}`,
        },
      }
    );
    const { data } = await response.json();
    const { page, size, count } = data;
    const payload = data.data;
    const transactions: TransactionData[] = translateTransactions(
      payload,
      requestParameters.currentWallet
    );

    const period = requestParameters.period;
    const filteredTransactions = filterTransactions(transactions, period);

    return {
      page,
      size,
      count,
      data: filteredTransactions,
    };
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
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
