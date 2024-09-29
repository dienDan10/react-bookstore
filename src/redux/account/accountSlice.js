import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "../../services/apiAuth";
import { message } from "antd";

const initialState = {
  isAuthenticated: false,
  user: {
    email: null,
    phone: null,
    fullName: null,
    role: null,
    avatar: null,
    id: null,
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    // doLogoutAction: (state, action) => {
    //   localStorage.removeItem("access_token");
    //   state.isAuthenticated = false;
    //   state.user = {
    //     email: null,
    //     phone: null,
    //     fullName: null,
    //     role: null,
    //     avatar: null,
    //     id: null,
    //   };
    // },
  },
  extraReducers: (builder) =>
    builder
      .addCase(doLogoutAction.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = {
          email: null,
          phone: null,
          fullName: null,
          role: null,
          avatar: null,
          id: null,
        };
      })
      .addCase(doLogoutAction.rejected, (state) => {
        message.error("there was some problem when logging out");
      }),
});

export const doLogoutAction = createAsyncThunk(
  "account/doLogoutAction",
  logout
);

export const { doLoginAction, doGetAccountAction } = accountSlice.actions;

export default accountSlice.reducer;
