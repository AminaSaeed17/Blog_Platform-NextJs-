

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast/headless";


const initialState = {token: typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null, isLoading: false as boolean, error: null as null | string};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
            state.isLoading = false;
            localStorage.setItem("token", action.payload.token);
            toast.success("Login successful");
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            toast.error(action.payload);
        },
        setRemoveToken: (state) => {
            state.token = null;
            localStorage.removeItem("token")
        }
    }
})


export const {
  setLoading,
  setToken,
  setError,
  setRemoveToken,
} = authSlice.actions;


export const authReducer = authSlice.reducer;

// export const authReducer = authSlice.reducer;