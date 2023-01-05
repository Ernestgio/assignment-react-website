import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer from "./slices/userSlice";
import fundSourceReducer from "./slices/fundSourceSlice";
import transactionReducer from "./slices/transactionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    fundSource: fundSourceReducer,
    transaction: transactionReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
