import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AccessDenied from "./AccessDenied.jsx";

function AdminRole({ children }) {
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  const isAdminPage = window.location.pathname.startsWith("/admin");

  if (isAdminPage && userRole === "ADMIN") return <>{children}</>;
  return <AccessDenied />;
}

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return isAuthenticated ? (
    <AdminRole>{children}</AdminRole>
  ) : (
    // <Navigate to="/login" replace />
    <>Hello</>
  );
}

export default ProtectedRoute;
