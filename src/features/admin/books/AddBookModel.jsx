import { Button, Form, Modal, notification } from "antd";
import { FaPlus } from "react-icons/fa6";
import AddBookForm from "./AddBookForm";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  createNewBook,
  openModal,
  setDataSlider,
  setDataThumbnail,
} from "../../../redux/admin/book/addBookSlice";

function AddBookModel() {
  const dispatch = useDispatch();
  const { isModalOpen, dataSlider, dataThumbnail } = useSelector(
    (state) => state.addBook
  );
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    dispatch(closeModal());
    form.resetFields();
    dispatch(setDataThumbnail([]));
    dispatch(setDataSlider([]));
  };

  const onSubmit = (values) => {
    // check for empty slider or thumbnail
    if (dataSlider.length < 1 || dataThumbnail.length < 1) {
      notification.error({
        message: "Data invalid",
        description: "Thumbnail or slider pictures must be added",
      });
      return;
    }
    console.log(values);
    const { author, category, price, quantity, sold, title } = values;
    const slider = dataSlider.map((slider) => slider.name);
    const thumbnail = dataThumbnail.map((thumbnail) => thumbnail.name).at(0);

    dispatch(
      createNewBook({
        author,
        category,
        price,
        quantity,
        sold: sold || 0,
        title,
        slider,
        thumbnail,
      })
    );

    handleCancel();
  };

  return (
    <>
      <Button
        type="primary"
        className="flex justify-center items-center gap-2"
        onClick={() => dispatch(openModal())}
      >
        <FaPlus />
        Add new
      </Button>
      <Modal
        title="Add new book"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={800}
      >
        <AddBookForm form={form} onSubmit={onSubmit} />
      </Modal>
    </>
  );
}

export default AddBookModel;
