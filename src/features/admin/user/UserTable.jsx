import { Drawer, message, notification, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  closeUserDetail,
  doChangePage,
  doFetchUser,
  doSort,
  openUserDetail,
} from "../../../redux/admin/user/userSlice";
import UserDetail from "./UserDetail";
import TableOperation from "./TableOperation";
import { HiTrash } from "react-icons/hi";
import UpdateUserModal from "./UpdateUserModal";
import { deleteUser } from "../../../services/apiUser";

function UserTable() {
  const dispatch = useDispatch();
  const {
    isLoading,
    users,
    total,
    pageSize,
    currentPage,
    showUserRecord,
    isShowUserRecord,
  } = useSelector((state) => state.user);

  const onChange = (pagination, filters, sorter, extra) => {
    //console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize: updatedPageSize } = pagination;
    if (current !== currentPage || pageSize !== updatedPageSize) {
      dispatch(
        doChangePage({ currentPage: current, pageSize: updatedPageSize })
      );
    }

    if (sorter.field) {
      dispatch(doSort({ sort: sorter.field, direction: sorter.order }));
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "name",
      sorter: true,
      render: (text, record, index) => {
        return (
          <p
            className="text-blue-400 cursor-pointer"
            onClick={() => dispatch(openUserDetail(record))}
          >
            {text}
          </p>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <span className="flex justify-center items-center gap-3">
            <UpdateUserModal user={record} />
            <Popconfirm
              title="Delete confirmation!"
              description="Do you really want to delete this user?"
              onConfirm={() => handleDeleteUser(record._id)}
              onCancel={() => {}}
              cancelText="Cancel"
              okText="Delete"
              placement="leftTop"
            >
              <HiTrash className="cursor-pointer text-red-600 text-lg" />
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const handleDeleteUser = async (id) => {
    const res = await deleteUser(id);
    if (res && res.data && +res.statusCode === 200) {
      message.success("User deleted successfully");
      dispatch(doFetchUser());
    }

    if (res && res.error) {
      notification.error({
        message: "Something went wrong!",
        description: res.message,
      });
    }
  };

  return (
    <>
      <Table
        caption={<TableOperation />}
        columns={columns}
        dataSource={users}
        pagination={{
          total: total,
          pageSize: pageSize,
          current: currentPage,
          showSizeChanger: true,
          pageSizeOptions: ["3", "5", "7", "9"],
          showTotal: (total, range) => (
            <div>
              {range[0]}-{range[1]} of {total}
            </div>
          ),
        }}
        onChange={onChange}
        loading={isLoading}
      ></Table>

      <Drawer
        title="User Detail"
        onClose={() => dispatch(closeUserDetail())}
        open={isShowUserRecord}
        width={"50%"}
      >
        <UserDetail user={showUserRecord} />
      </Drawer>
    </>
  );
}

export default UserTable;
