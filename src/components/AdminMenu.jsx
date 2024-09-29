import { Menu } from "antd";
import { useState } from "react";
import { FaBook, FaRegUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function AdminMenu({ collapsed }) {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(() => {
    const path = window.location.pathname;
    if (path === "/admin") return "1";
    if (path === "/admin/user") return "crud-user";
    if (path === "/admin/book") return "3";
  });

  const items = [
    {
      key: "1",
      icon: <MdOutlineDashboard />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <FaRegUser />,
      label: "Manage Users",
      children: [
        {
          key: "crud-user",
          icon: <FaUserGroup />,
          label: "CRUD",
          onClick: () => {
            navigate("/admin/user");
            setSelectedKey("crud-user");
          },
        },
      ],
    },
    {
      key: "3",
      icon: <FaBook />,
      label: "Manage Books",
      onClick: () => {
        navigate("/admin/book");
        setSelectedKey("3");
      },
    },
    {
      key: "4",
      icon: <RiMoneyDollarCircleLine />,
      label: "Manage Order",
    },
  ];

  return (
    <div className="bg-white rounded-tr-lg rounded-br-lg leading-none">
      <h1 className={`text-center py-9`}>{collapsed || "Admin"}</h1>

      <Menu
        //defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        //defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        className="bg-transparent"
      />
    </div>
  );
}

export default AdminMenu;
