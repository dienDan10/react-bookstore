import {
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/admin/book/addBookSlice";
import { PlusOutlined } from "@ant-design/icons";
import {
  removeDataSlider,
  setDataThumbnail,
  uploadBookImage,
} from "../../../redux/admin/book/updateBookSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function UpdateBookForm({ form, onSubmit }) {
  const dispatch = useDispatch();
  const { loadingCategories, categories } = useSelector(
    (state) => state.addBook
  );
  const { book, dataThumbnail, dataSlider } = useSelector(
    (state) => state.updateBook
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const customRequestThumbnail = ({ file, onSuccess, onProgress, onError }) => {
    // upload file to server
    dispatch(uploadBookImage({ file, onSuccess, type: "thumbnail" }));
  };

  const handleChangeThumbnail = ({ fileList: newFileList }) => {
    console.log(newFileList);
    if (newFileList.length === 0) {
      dispatch(setDataThumbnail([]));
      return;
    }
    // setThumbnail([newFileList[newFileList.length - 1]]);
  };

  const customRequestSlider = ({ file, onSuccess, onProgress, onError }) => {
    dispatch(uploadBookImage({ file, onSuccess, type: "slider" }));
  };

  const onRemoveSlider = (file) => {
    //console.log(file);
    dispatch(removeDataSlider(file));
  };

  useEffect(() => {
    dispatch(fetchCategories());
    //console.log("run");
  }, []);

  form.setFieldsValue({
    title: book.mainText,
    author: book.author,
    price: book.price,
    category: book.category,
    quantity: book.quantity,
    sold: book.sold,
  });

  return (
    <Form form={form} name="Update book form" onFinish={onSubmit}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Title"
            labelCol={{
              span: 24,
            }}
            name="title"
            rules={[
              {
                required: true,
                message: "Please input book title",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Author"
            labelCol={{
              span: 24,
            }}
            name="author"
            rules={[
              {
                required: true,
                message: "Please input author",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={6}>
          <Form.Item
            label="Price"
            labelCol={{
              span: 24,
            }}
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price",
              },
            ]}
          >
            <InputNumber
              addonAfter="VND"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              min={1000}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Category"
            labelCol={{
              span: 24,
            }}
            name="category"
            rules={[
              {
                required: true,
                message: "Please input category",
              },
            ]}
          >
            <Select options={categories} loading={loadingCategories} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Quantity"
            labelCol={{
              span: 24,
            }}
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input quantity",
              },
            ]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Sold"
            labelCol={{
              span: 24,
            }}
            name="sold"
          >
            <InputNumber min={0} style={{ width: "100%" }} defaultValue={0} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <p className="mb-3 tracking-wide">Thumbnail</p>
          <Upload
            //action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            customRequest={customRequestThumbnail}
            listType="picture-card"
            fileList={dataThumbnail}
            onPreview={handlePreview}
            onChange={handleChangeThumbnail}
          >
            {uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Col>
        <Col span={12}>
          <p className="mb-3 tracking-wide">Slider</p>
          <Upload
            //action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            customRequest={customRequestSlider}
            listType="picture-card"
            fileList={dataSlider}
            onPreview={handlePreview}
            //onChange={handleChangeSlider}
            multiple
            onRemove={onRemoveSlider}
          >
            {/* {slider.length >= 8 ? null : uploadButton} */}
            {uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Col>
      </Row>
    </Form>
  );
}

const uploadButton = (
  <button
    style={{
      border: 0,
      background: "none",
    }}
    type="button"
  >
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </button>
);

export default UpdateBookForm;
