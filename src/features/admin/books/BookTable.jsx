import { Drawer, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  closeBookDetail,
  deleteBook,
  doChangePage,
  doSort,
  openBookDetail,
} from "../../../redux/admin/book/bookSlice";
import { format } from "date-fns";
import TableOperation from "./TableOperation";
import BookDetail from "./BookDetail";
import { formatCurrencyVND } from "../../../utils/helper";
import { HiPencil, HiTrash } from "react-icons/hi";
import UpdateBookModal from "./UpdateBookModal";

function BookTable() {
  const dispatch = useDispatch();
  const {
    isLoading,
    books,
    total,
    pageSize,
    currentPage,
    isShowBookRecord,
    showBookRecord,
  } = useSelector((state) => state.book);

  const columns = [
    {
      title: "Title",
      dataIndex: "mainText",
      key: "title",
      sorter: true,
      render: (text, record, index) => {
        return (
          <p
            className="text-blue-400 cursor-pointer"
            onClick={() => dispatch(openBookDetail(record))}
          >
            {text}
          </p>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
      render: (text, record, index) => {
        return formatCurrencyVND(Number(text));
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: true,
      render: (text, record, index) => {
        return format(new Date(text), "dd-MM-yyyy hh:mm:ss");
      },
    },
    {
      title: "Action",
      key: "title",
      render: (text, record, index) => {
        return (
          <span className="flex justify-center items-center gap-3">
            <UpdateBookModal book={record} />
            <Popconfirm
              title="Delete confirmation!"
              description="Do you really want to delete this book?"
              onConfirm={() => dispatch(deleteBook(record._id))}
              //onCancel={() => {}}
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

  return (
    <>
      <Table
        caption={<TableOperation />}
        columns={columns}
        dataSource={books}
        onChange={onChange}
        pagination={{
          total: total,
          pageSize: pageSize,
          current: currentPage,
          pageSizeOptions: ["3", "5", "7", "9"],
          showSizeChanger: true,
          showTotal: (total, range) => (
            <div>
              {range[0]}-{range[1]} of {total}
            </div>
          ),
        }}
        loading={isLoading}
      ></Table>

      <Drawer
        title="Book Detail"
        onClose={() => dispatch(closeBookDetail())}
        open={isShowBookRecord}
        width={"50%"}
      >
        <BookDetail book={showBookRecord} />
      </Drawer>
    </>
  );
}

export default BookTable;
