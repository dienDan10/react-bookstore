import { Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { updateUser } from "../../../services/apiUser";
import { useDispatch } from "react-redux";
import { doFetchUser } from "../../../redux/admin/user/userSlice";

function UpdateUserModal({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { _id, fullName, phone, email } = user;

  const onFinish = async (values) => {
    const { fullName, phone, email } = values;
    setIsLoading(true);
    const res = await updateUser({ _id, fullName, phone, email });
    setIsLoading(false);

    if (res && res.data && +res.statusCode === 200) {
      message.success("User updated successfully");
      dispatch(doFetchUser());
      setIsModalOpen(false);
      return;
    }
  };

  // use an useEffect to set initial field values and reset field values when user change
  // because the initalValues of field persit though render
  useEffect(() => {
    if (user && form) {
      form.setFieldsValue({
        fullName: fullName,
        email: email,
        phone: phone,
      });
    }
  }, [user]);

  return (
    <>
      <HiPencil
        className="cursor-pointer text-yellow-600 text-lg"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      <Modal
        title="Update user info"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        centered={true}
        okButtonProps={{
          isLoading: isLoading,
        }}
        okText="Update"
      >
        <Form
          form={form}
          name="Update user form"
          //initialValues={{ fullName: fullName, email: email, phone: phone }}
          className="py-3"
          onFinish={onFinish}
          id={_id}
        >
          <Form.Item
            label="Full Name"
            labelCol={{
              span: 24,
            }}
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
            //initialValue={fullName}
          >
            <Input disabled={isLoading} />
          </Form.Item>
          <Form.Item
            label="Email"
            labelCol={{
              span: 24,
            }}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            //initialValue={email}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            label="Phone"
            labelCol={{
              span: 24,
            }}
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
            //initialValue={phone}
          >
            <Input disabled={isLoading} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateUserModal;
