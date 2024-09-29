import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  Rate,
  Row,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { fetchCategories } from "../../redux/admin/book/addBookSlice";

function FilterForm() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loadingCategories, categories } = useSelector(
    (state) => state.addBook
  );

  const onSubmit = (value) => {
    console.log(value);
  };

  const onFieldsChange = (values) => {
    console.log(values);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  if (loadingCategories) return <ClipLoader />;

  return (
    <>
      <Form
        name="filter form"
        form={form}
        onFinish={onSubmit}
        onFieldsChange={onFieldsChange}
      >
        <p className="mb-3 px-3 text-base tracking-wide">Categories</p>
        <Form.Item name="category">
          <Checkbox.Group>
            <Row className="pl-4">
              {categories.map((cate) => (
                <Col span={24} className="py-1">
                  <Checkbox value={cate.value}>{cate.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Divider />

        <div className="flex px-3 gap-3">
          <Form.Item name={["range", "min"]} className="flex-1">
            <InputNumber min={1} placeholder="Min" className="w-full" />
          </Form.Item>
          <span className="mt-2"> to </span>
          <Form.Item name={["range", "max"]} className="flex-1">
            <InputNumber min={1} placeholder="Max" className="w-full" />
          </Form.Item>
        </div>

        <div className="px-3">
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </div>
        <Divider />
      </Form>

      <div className="px-3 pb-5">
        <div className="flex flex-col  my-2">
          <span>Awesome!</span>
          <Rate disabled defaultValue={5} />
        </div>
        <div className="flex flex-col  my-2">
          <span>Good!</span>
          <Rate disabled defaultValue={4} />
        </div>
        <div className="flex flex-col  my-2">
          <span>It's ok!</span>
          <Rate disabled defaultValue={3} />
        </div>
        <div className="flex flex-col  my-2">
          <span>Not so good!</span>
          <Rate disabled defaultValue={2} />
        </div>
        <div className="flex flex-col  my-2">
          <span>Problematic!</span>
          <Rate disabled defaultValue={1} />
        </div>
      </div>
    </>
  );
}

export default FilterForm;
