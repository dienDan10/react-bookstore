import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./redux/account/accountSlice";
import userReducer from "./redux/admin/user/userSlice";
import importUserReducer from "./redux/admin/user/importUserSlice";
import bookReducer from "./redux/admin/book/bookSlice";
import addBookReducer from "./redux/admin/book/addBookSlice";
import updateBookReducer from "./redux/admin/book/updateBookSlice";
// const defaultMiddlewareConfig = {
//   serializableCheck: {
//     ignorePaths: ["importUser.fileList.0.lastModifiedDate"],
//   },
// };

const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    importUser: importUserReducer,
    book: bookReducer,
    addBook: addBookReducer,
    updateBook: updateBookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
