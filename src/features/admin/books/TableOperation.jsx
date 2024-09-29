import { Button } from "antd";
import { IoReload } from "react-icons/io5";
import ExportExcelButton from "../../../components/ExportExcelButton";
import { useDispatch, useSelector } from "react-redux";
import { reload } from "../../../redux/admin/book/bookSlice";
import AddBookModel from "./AddBookModel";

function TableOperation() {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <h2 className="text-lg font-semibold">Table list books</h2>
      <div className="flex gap-3">
        <ExportExcelButton data={books} fileName={"books.xlsx"} />
        <AddBookModel />
        <Button className="border-0 text-lg" onClick={() => dispatch(reload())}>
          <IoReload />
        </Button>
      </div>
    </div>
  );
}

export default TableOperation;
