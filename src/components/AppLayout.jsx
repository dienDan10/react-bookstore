import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="min-h-screen relative">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default AppLayout;
