import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/api";

export interface IUserState {
  userName: string;
  walletId: number;
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  userName: "",
  walletId: 0,
  balance: 0,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk<
  IUser,
  string,
  { rejectValue: string }
>("FETCH_USER", (cookie, { rejectWithValue }) => {
  return fetchUserFromApi(rejectWithValue, cookie);
});

const fetchUserFromApi = async (rejectWithValue: any, cookie: string) => {
  try {
    const response: Response = await fetch("http://localhost:8080/details", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });
    const { data } = await response.json();
    const { first_name, wallet_id, wallet } = data;
    const user = { first_name, wallet_id, balance: wallet.balance };
    return user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        userName: action.payload.first_name,
        walletId: action.payload.wallet_id,
        balance: action.payload.balance,
      };
    });

    builder.addCase(fetchUser.pending, (state) => {
      return { ...state, loading: true };
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      return action.payload
        ? { ...state, booksError: action.payload, booksLoading: false }
        : { ...state, booksError: "unknown error", booksLoading: false };
    });
  },
});

export default userSlice.reducer;

export type UserDispatch = ThunkDispatch<IUserState, any, AnyAction>;
