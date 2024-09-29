import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBooks } from "../../../services/apiBook";
import { deleteBook as deleteBookApi } from "../../../services/apiBook";
import { message } from "antd";

const initialState = {
  isLoading: false,
  books: [],
  total: null,
  pageSize: 5,
  currentPage: 1,
  title: "",
  author: "",
  category: "",
  sort: "createdAt",
  direction: "descend",
  showBookRecord: null,
  isShowBookRecord: false,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    doChangePage: (state, action) => {
      state.currentPage = action.payload.currentPage;
      state.pageSize = action.payload.pageSize;
    },

    doSort: (state, action) => {
      state.sort = action.payload.direction ? action.payload.sort : "";
      state.direction = action.payload.direction
        ? action.payload.direction
        : "";
    },

    doFilter: (state, action) => {
      state.title = action.payload.title ? action.payload.title : "";
      state.category = action.payload.category ? action.payload.category : "";
      state.author = action.payload.author ? action.payload.author : "";
    },

    reload: (state, action) => {
      state.pageSize = 5;
      state.currentPage = 1;
      state.title = "";
      state.category = "";
      state.author = "";
      state.sort = "createdAt";
      state.direction = "descend";
    },

    clearFilter: (state, action) => {
      state.title = "";
      state.category = "";
      state.author = "";
    },

    openBookDetail: (state, action) => {
      state.showBookRecord = action.payload;
      state.isShowBookRecord = true;
    },

    closeBookDetail: (state, action) => {
      //state.showBookRecord = null;
      state.isShowBookRecord = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchBook.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.total = action.payload.total;
        state.books = action.payload.books;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false;
      }),
});

export const fetchBook = createAsyncThunk(
  "book/doFetchBook",
  async (payload, { getState, dispatch }) => {
    const { book } = getState();

    const res = await getBooks({
      current: book.currentPage,
      pageSize: book.pageSize,
      title: book.title,
      author: book.author,
      category: book.category,
      sort: book.sort,
      direction: book.direction,
    });

    if (res && res.data) {
      const { data } = res;
      const books = data.result;
      const total = data.meta.total;

      return { books, total };
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/doDeleteBook",
  async (payload, { getState, dispatch }) => {
    const res = await deleteBookApi(payload);

    if (res && res.data) {
      message.success("Book successfully deleted");
      dispatch(fetchBook());
    } else {
      notification.error({
        message: "Something went wrong",
        description: res.message,
      });
    }
  }
);

export const {
  doChangePage,
  doSort,
  reload,
  clearFilter,
  doFilter,
  openBookDetail,
  closeBookDetail,
} = bookSlice.actions;

export default bookSlice.reducer;
