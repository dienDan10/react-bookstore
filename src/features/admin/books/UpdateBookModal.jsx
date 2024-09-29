import { Form, Modal, notification } from "antd";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import UpdateBookForm from "./UpdateBookForm";
import { useDispatch, useSelector } from "react-redux";
import { setBook, updateBook } from "../../../redux/admin/book/updateBookSlice";

function UpdateBookModal({ book }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { dataSlider, dataThumbnail } = useSelector(
    (state) => state.updateBook
  );

  const handleOpen = () => {
    dispatch(setBook(book));
    setIsModalOpen(true);
  };

  const handleOk = () => {
    //setIsModalOpen(false);
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function onSubmit(values) {
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
      updateBook({
        author,
        category,
        price,
        quantity,
        sold: sold || 0,
        title,
        slider,
        thumbnail,
        id: book._id,
      })
    );

    handleCancel();
  }

  return (
    <>
      <HiPencil
        className="cursor-pointer text-yellow-600 text-lg"
        onClick={handleOpen}
      />
      <Modal
        title="Update book"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={800}
      >
        <UpdateBookForm form={form} onSubmit={onSubmit} />
      </Modal>
    </>
  );
}

export default UpdateBookModal;
