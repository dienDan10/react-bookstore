import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserBulk } from "../../../services/apiUser";
import { notification } from "antd";

const initialState = {
  isLoading: false,
  isModalOpen: false,
  tableData: [],
  fileList: [],
};

const importUserSlice = createSlice({
  name: "importUser",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
    },

    closeModal: (state, action) => {
      state.isModalOpen = false;
      state.tableData = [];
      state.fileList = [];
    },

    uploadFile: (state, action) => {
      state.tableData = action.payload.tableData;
      state.fileList = action.payload.fileList;
    },

    setTableData: (state, action) => {
      state.tableData = action.payload;
    },

    setFileList: (state, action) => {
      state.fileList = action.payload;
    },

    removeFile: (state, action) => {
      state.tableData = [];
      state.fileList = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(uploadUserBulk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(uploadUserBulk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isModalOpen = false;
        state.fileList = [];
        state.tableData = {};
        const { countSuccess, countError } = action.payload;
        notification.success({
          message: "Users successfully uploaded",
          description: `Success: ${countSuccess}, Error: ${countError}`,
        });
      })
      .addCase(uploadUserBulk.rejected, (state, action) => {
        state.isLoading = false;
        notification.error({
          message: "Something went wrong",
          description: action.payload,
        });
      }),
});

export const uploadUserBulk = createAsyncThunk(
  "importUser/uploadUserBulk",
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const {
      importUser: { tableData },
    } = getState();
    const userData = tableData.map((user) => ({ ...user, password: "123456" }));

    const res = await addUserBulk(userData);

    if (res && res.error) return rejectWithValue(res.message?.at(0));

    if (res && res.data) return res.data;
  }
);

export const {
  openModal,
  closeModal,
  uploadFile,
  removeFile,
  setFileList,
  setTableData,
} = importUserSlice.actions;

export default importUserSlice.reducer;
