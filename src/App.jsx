import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Spinner from "./components/Spinner";
import LoginPage from "./pages/LoginPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BookPage from "./pages/BookPage.jsx";
import Home from "./pages/Home.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { getAccount as getAccountApi } from "./services/apiAuth.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice.js";
import PageNotFound from "./pages/PageNotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminDashBoard from "./features/admin/dashboard/AdminDashBoard.jsx";
import ManageUser from "./features/admin/user/ManageUser.jsx";
import ManageBook from "./features/admin/books/ManageBook.jsx";
import AdminPage from "./pages/AdminPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "book",
        element: <BookPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AdminDashBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <ManageUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "book",
        element: (
          <ProtectedRoute>
            <ManageBook />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  useEffect(() => {
    async function getAccount() {
      if (
        // window.location.pathname === "/" ||
        window.location.pathname === "/login" ||
        window.location.pathname === "/register"
      )
        return;

      setIsLoading(true);
      const res = await getAccountApi();
      //console.log(res);
      if (res && res.data) {
        dispatch(doGetAccountAction(res.data.user));
      }
      setIsLoading(false);
    }
    getAccount();
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return isAuthenticated ||
    window.location.pathname === "/" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/register" ? (
    <RouterProvider router={router} />
  ) : (
    <Spinner />
  );
}

export default App;
