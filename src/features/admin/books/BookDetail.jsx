import { Badge, Descriptions, Divider, Image, Space, Upload } from "antd";
import { format } from "date-fns";
import { formatCurrencyVND } from "../../../utils/helper";

function BookDetail({ book }) {
  const { thumbnail, slider } = book;
  const bookImage = [thumbnail, ...slider];

  return (
    <>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Id">{book._id}</Descriptions.Item>
        <Descriptions.Item label="Title">{book.mainText}</Descriptions.Item>
        <Descriptions.Item label="Author">{book.author}</Descriptions.Item>
        <Descriptions.Item label="Price">
          {formatCurrencyVND(book.price)}
        </Descriptions.Item>
        <Descriptions.Item label="Quantity">{book.quantity}</Descriptions.Item>
        <Descriptions.Item label="Sold">{book.sold}</Descriptions.Item>
        <Descriptions.Item label="Category" span={2}>
          <Badge status="processing" text={book.category} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {format(new Date(book.createdAt), "dd-MM-yyyy hh:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {format(new Date(book.updatedAt), "dd-MM-yyyy hh:mm:ss")}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">Pictures</Divider>
      <Image.PreviewGroup>
        <Space size="middle">
          {bookImage.map((image, i) => (
            <Image
              key={i + image}
              width={100}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${image}`}
            />
          ))}
        </Space>
      </Image.PreviewGroup>
    </>
  );
}

export default BookDetail;
