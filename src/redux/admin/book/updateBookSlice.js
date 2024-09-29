import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadImage } from "../../../services/apiBook";
import { updateBook as updateBookApi } from "../../../services/apiBook";
import { fetchBook } from "./bookSlice";
import { message, notification } from "antd";

const initialState = {
  book: null,
  dataThumbnail: [],
  dataSlider: [],
};

const updateBookSlice = createSlice({
  name: "updateBook",
  initialState,
  reducers: {
    setBook: (state, action) => {
      const book = action.payload;
      const { thumbnail, slider } = book;
      state.book = book;
      state.dataThumbnail = [
        {
          uid: thumbnail,
          name: thumbnail,
          status: "done",
          url: import.meta.env.VITE_BACKEND_URL + "/images/book/" + thumbnail,
        },
      ];

      state.dataSlider = slider.map((s) => ({
        uid: s,
        name: s,
        status: "done",
        url: import.meta.env.VITE_BACKEND_URL + "/images/book/" + s,
      }));
    },

    setDataThumbnail: (state, action) => {
      state.dataThumbnail = action.payload;
    },

    removeDataSlider: (state, action) => {
      state.dataSlider = state.dataSlider.filter(
        (slider) => slider.uid !== action.payload.uid
      );
    },
  },

  extraReducers: (builder) =>
    builder
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

export const uploadBookImage = createAsyncThunk(
  "updateBook/uploadBookImage",
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

export const updateBook = createAsyncThunk(
  "updateBook/updateBook",
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
      id,
    } = payload;

    const res = await updateBookApi({
      author,
      category,
      price,
      quantity,
      sold,
      title,
      slider,
      thumbnail,
      id,
    });

    if (res && res.data) {
      message.success("Book successfully updated");
      dispatch(fetchBook());
    } else {
      notification.error({
        message: "Something went wrong",
        description: res.message,
      });
    }
  }
);

export const { setBook, setDataThumbnail, removeDataSlider } =
  updateBookSlice.actions;

export default updateBookSlice.reducer;
