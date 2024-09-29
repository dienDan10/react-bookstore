import { Button } from "antd";
import { IoReload } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { reload } from "../../../redux/admin/user/userSlice";
import AddUserModal from "./AddUserModal";
import ImportUser from "./ImportUser";
import ExportExcelButton from "../../../components/ExportExcelButton";

function TableOperation() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  return (
    <div className="flex items-center justify-between px-5 py-3">
      <h2 className="text-lg">Table list users</h2>
      <span className="flex gap-3">
        <ExportExcelButton data={users} fileName={"users.xlsx"} />
        <ImportUser />
        <AddUserModal />

        <Button
          icon={<IoReload />}
          className="flex items-center justify-center border-0"
          onClick={() => dispatch(reload())}
        ></Button>
      </span>
    </div>
  );
}

export default TableOperation;
