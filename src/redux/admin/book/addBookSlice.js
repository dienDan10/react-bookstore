import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBook,
  getCategories,
  uploadImage,
} from "../../../services/apiBook";
import { fetchBook } from "./bookSlice";
import { message } from "antd";

const initialState = {
  isModalOpen: false,
  loadingCategories: false,
  dataThumbnail: [],
  dataSlider: [],
  categories: [],
};

const addBookSlice = createSlice({
  name: "addBook",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
    },

    setDataThumbnail: (state, action) => {
      state.dataThumbnail = action.payload;
    },

    setDataSlider: (state, action) => {
      state.dataSlider = action.payload;
    },

    removeDataSlider: (state, action) => {
      state.dataSlider = state.dataSlider.filter(
        (slider) => slider.uid !== action.payload.uid
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.loadingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.map((cate) => ({
          label: cate,
          value: cate,
        }));
        state.loadingCategories = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingCategories = false;
      })
      .addCase(uploadBookImage.pending, (state, action) => {
        //console.log(action.meta.arg);
        const { file, type } = action.meta.arg;
        const dummy = {
          uid: file.uid,
          name: file.name,
          status: "uploading",
          url: "",
        };

        if (type === "thumbnail") {
          state.dataThumbnail = [dummy];
        } else if (type === "slider") {
          state.dataSlider.push(dummy);
        }
      })
      .addCase(uploadBookImage.fulfilled, (state, action) => {
        if (action.payload.type === "thumbnail") {
          state.dataThumbnail = [action.payload.file];
        } else if (action.payload.type === "slider") {
          const { file } = action.payload;
          state.dataSlider = state.dataSlider.map((slide) =>
            slide.uid === file.uid
              ? { ...slide, url: file.url, status: "done", name: file.name }
              : slide
          );
        }
      }),
});

export const fetchCategories = createAsyncThunk(
  "addBook/fetchCategories",
  async (payload, { getState, dispatch }) => {
    const res = await getCategories();
    if (res && res.data && +res.statusCode === 200) {
      return res.data;
    }
  }
);

export const uploadBookImage = createAsyncThunk(
  "addBook/uploadBookImage",
  async (payload, { getState, dispatch }) => {
    const res = await uploadImage(payload.file);
    if (res && res.data) {
      payload.onSuccess("ok");
      return payload.type === "thumbnail"
        ? {
            file: {
              uid: payload.file.uid,
              name: res.data.fileUploaded,
              status: "done",
              url:
                import.meta.env.VITE_BACKEND_URL +
                "/images/book/" +
                res.data.fileUploaded,
            },
            type: "thumbnail",
          }
        : {
            file: {
              uid: payload.file.uid,
              name: res.data.fileUploaded,
              status: "done",
              url:
                import.meta.env.VITE_BACKEND_URL +
                "/images/book/" +
                res.data.fileUploaded,
            },
            type: "slider",
          };
    }
  }
);

export const createNewBook = createAsyncThunk(
  "addBook/createBook",
  async (payload, { getState, dispatch }) => {
    const {
      author,
      category,
      price,
      quantity,
      sold,
      title,
      slider,
      thumbnail,
    } = payload;
    console.log(payload);

    const res = await createBook({
      thumbnail,
      slider,
      title,
      author,
      price,
      sold,
      quantity,
      category,
    });

    if (res && res.data) {
      message.success("Book created successfully");
      dispatch(fetchBook());
    }
  }
);

export const {
  openModal,
  closeModal,
  removeDataSlider,
  setDataSlider,
  setDataThumbnail,
} = addBookSlice.actions;

export default addBookSlice.reducer;
