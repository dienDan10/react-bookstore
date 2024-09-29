import { useDispatch, useSelector } from "react-redux";
import SearchUser from "./SearchUser";
import UserTable from "./UserTable";
import { useEffect } from "react";
import { doFetchUser } from "../../../redux/admin/user/userSlice";

function ManageUser() {
  const dispatch = useDispatch();
  const { pageSize, currentPage, name, email, phone, sort, direction } =
    useSelector((state) => state.user);

  useEffect(() => {
    dispatch(doFetchUser());
  }, [pageSize, currentPage, name, email, phone, sort, direction]);

  return (
    <div className="space-y-7">
      <SearchUser />
      <UserTable />
    </div>
  );
}

export default ManageUser;
