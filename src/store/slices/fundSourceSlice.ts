import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { IFundSource } from "../../interfaces/api";

export interface IFundSourceState {
  sources: IFundSource[];
}

const initialState: IFundSourceState = {
  sources: [],
};

export const fetchSources = createAsyncThunk<
  IFundSource[],
  string,
  { rejectValue: string }
>("FETCH_SOURCE", (cookie: string, { rejectWithValue }) => {
  return fetchSourcesFromApi(rejectWithValue, cookie);
});

const fetchSourcesFromApi = async (rejectWithValue: any, cookie: string) => {
  try {
    const response: Response = await fetch(
      "http://localhost:8080/transactions/source-of-funds",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
    const { data } = await response.json();
    const sources: IFundSource[] = data.map((source: IFundSource) => {
      return { id: source.id, name: source.name };
    });
    return sources;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
};

export const sourceFundSlice = createSlice({
  name: "fundSource",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSources.rejected, (state) => {
      return {
        ...state,
        sources: [],
      };
    });
    builder.addCase(fetchSources.pending, (state) => {
      return {
        ...state,
        sources: [],
      };
    });

    builder.addCase(fetchSources.fulfilled, (state, action) => {
      return {
        ...state,
        sources: action.payload,
      };
    });
  },
});

export default sourceFundSlice.reducer;
export type FundSourceDispatch = ThunkDispatch<
  IFundSourceState,
  any,
  AnyAction
>;
