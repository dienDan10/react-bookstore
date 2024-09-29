import { Button, Col, Form, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, doFilter } from "../../../redux/admin/user/userSlice";

function SearchUser() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { isLoading } = useSelector((state) => state.user);

  const onFinish = (values) => {
    //console.log("Success:", values);
    const { name, email, phone } = values;
    dispatch(doFilter({ name, email, phone }));
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
        autoComplete="off"
      >
        <Row gutter={16} wrap={true}>
          <Col sm={24} md={8}>
            <Form.Item
              label="Name"
              name="name"
              labelCol={{ span: 24 }}
              initialValue=""
            >
              <Input />
            </Form.Item>
          </Col>

          <Col sm={24} md={8}>
            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              initialValue=""
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} md={8}>
            <Form.Item
              label="Phone"
              name="phone"
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

export default SearchUser;
