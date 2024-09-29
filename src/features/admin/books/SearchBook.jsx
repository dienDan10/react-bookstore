import { Button, Col, Form, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, doFilter } from "../../../redux/admin/book/bookSlice";

function SearchBook() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { isLoading } = useSelector((state) => state.book);

  const onFinish = (values) => {
    const { author, category, title } = values;
    dispatch(doFilter({ author, category, title }));
  };

  const clearFields = () => {
    form.resetFields();
    dispatch(clearFilter());
  };

  return (
    <div className="py-10 bg-stone-200 rounded-md px-8">
      <Form
        form={form}
        name="search-user-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={16} wrap={true}>
          <Col sm={24} md={8}>
            <Form.Item
              label="Title"
              name="title"
              labelCol={{ span: 24 }}
              initialValue=""
            >
              <Input />
            </Form.Item>
          </Col>

          <Col sm={24} md={8}>
            <Form.Item
              label="Author"
              name="author"
              labelCol={{ span: 24 }}
              initialValue=""
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} md={8}>
            <Form.Item
              label="Category"
              name="category"
              labelCol={{ span: 24 }}
              initialValue=""
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex gap-5 items-center justify-end">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Search
          </Button>
          <Button htmlType="button" onClick={clearFields}>
            Clear
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SearchBook;
