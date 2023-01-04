import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer from "./slices/userSlice";
import fundSourceReducer from "./slices/fundSourceSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    fundSource: fundSourceReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
