import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../../services/apiUser";

const initialState = {
  isLoading: false,
  users: [],
  total: null,
  pageSize: 5,
  currentPage: 1,
  name: "",
  email: "",
  phone: "",
  sort: "",
  direction: "",
  showUserRecord: null,
  isShowUserRecord: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    doChangePage: (state, action) => {
      state.currentPage = action.payload.currentPage;
      state.pageSize = action.payload.pageSize;
    },

    doFilter: (state, action) => {
      state.name = action.payload.name ? action.payload.name : "";
      state.email = action.payload.email ? action.payload.email : "";
      state.phone = action.payload.phone ? action.payload.phone : "";
    },

    doSort: (state, action) => {
      state.sort = action.payload.direction ? action.payload.sort : "";
      state.direction = action.payload.direction
        ? action.payload.direction
        : "";
    },

    clearFilter: (state, action) => {
      state.name = "";
      state.email = "";
      state.phone = "";
    },

    reload: (state, action) => {
      state.pageSize = 3;
      state.currentPage = 1;
      state.name = "";
      state.email = "";
      state.phone = "";
      state.sort = "";
      state.direction = "";
    },

    closeUserDetail: (state, action) => {
      state.isShowUserRecord = false;
      //state.showUserRecord = null;
    },

    openUserDetail: (state, action) => {
      state.isShowUserRecord = true;
      state.showUserRecord = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(doFetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(doFetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(doFetchUser.rejected, (state, action) => {
        state.isLoading = false;
      }),
});

//{ getState, dispatch }

export const doFetchUser = createAsyncThunk(
  "user/doFetchUser",
  async (payload, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    console.log(thunkApi);
    const { user } = getState();

    const res = await getUsers({
      current: user.currentPage,
      pageSize: user.pageSize,
      fullName: user.name,
      email: user.email,
      phone: user.phone,
      sort: user.sort,
      direction: user.direction,
    });

    if (res && res.data) {
      const { data } = res;
      const total = data.meta.total;
      const users = data.result;
      // the return result of a thunk will be the payload of the extra reducer
      return { users, total };
    }
  }
);

export const {
  doChangePage,
  doFilter,
  clearFilter,
  doSort,
  closeUserDetail,
  openUserDetail,
  reload,
} = userSlice.actions;

export default userSlice.reducer;
