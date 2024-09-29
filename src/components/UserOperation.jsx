import { DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, message, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../redux/account/accountSlice";
import { Link, useNavigate } from "react-router-dom";

function UserOperation() {
  const user = useSelector((state) => state.account.user);

  let items = [
    {
      label: <p>Account</p>,
      key: "0",
    },
    {
      label: <SignOut />,
      key: "1",
    },
  ];

  if (user?.role === "ADMIN") {
    if (window.location.pathname.includes("/admin")) {
      items.unshift({
        label: <Link to="/">Home</Link>,
        key: "3",
      });
    } else {
      items.unshift({
        label: <Link to="/admin">Dashboard</Link>,
        key: "3",
      });
    }
  }

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
      className="cursor-pointer hidden md:block"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space className="text-indigo-900">
          <Avatar
            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
              user?.avatar
            }`}
          />
          {user.fullName}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}

function SignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSignOut() {
    dispatch(doLogoutAction());
    message.success("Logout successful");
    navigate("/");
  }

  return <p onClick={handleSignOut}>Sign out</p>;
}

export default UserOperation;
