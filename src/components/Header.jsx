import { FaReact } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Badge } from "antd";
import UserOperation from "./UserOperation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";

function Header() {
  const user = useSelector((state) => state.account.user);

  return (
    <header className="py-4 px-4 flex justify-center items-center gap-3 md:gap-9 md:px-20 lg:px-32 xl:px-40 bg-gray-100 shadow-md sticky top-0">
      <SideDrawer position={"left"} />
      <div className="md:flex justify-center items-center gap-4 hidden">
        <FaReact className="text-3xl lg:text-4xl animate-rotate text-indigo-900" />
        <span className="text-xl font-semibold text-indigo-900 tracking-wider">
          React Bookstore
        </span>
      </div>
      <SearchBox />
      <Badge count={5}>
        <HiOutlineShoppingCart className="text-2xl text-indigo-900" />
      </Badge>
      {user?.fullName ? (
        <UserOperation />
      ) : (
        <Link
          to="/login"
          className="text-indigo-900 text-lg font-semibold tracking-wide"
        >
          Sign in
        </Link>
      )}
    </header>
  );
}

export default Header;
