import { useDispatch, useSelector } from "react-redux";
import BookTable from "./BookTable";
import { useEffect } from "react";
import { fetchBook } from "../../../redux/admin/book/bookSlice";
import SearchBook from "./SearchBook";

function ManageBook() {
  const dispatch = useDispatch();
  const { pageSize, currentPage, title, author, category, sort, direction } =
    useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBook());
  }, [pageSize, currentPage, title, author, category, sort, direction]);

  return (
    <div className="space-y-8">
      <SearchBook />
      <BookTable />
    </div>
  );
}

export default ManageBook;
