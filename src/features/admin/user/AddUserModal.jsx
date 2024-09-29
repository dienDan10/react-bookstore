import { Button, Form, Input, message, Modal, notification } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { addUser } from "../../../services/apiUser";
import { useDispatch } from "react-redux";
import { doFetchUser } from "../../../redux/admin/user/userSlice";

function AddUserModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    //setIsModalOpen(false);
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    //console.log(values);
    const { fullName, email, password, phone } = values;

    const res = await addUser({ fullName, email, password, phone });
    if (res && res.data) {
      dispatch(doFetchUser());
      setIsModalOpen(false);
      message.success("User created successful");
    } else {
      notification.error({
        message: "Something went wrong!",
        description: res.message,
      });
    }
  };

  return (
    <>
      <Button
        icon={<FaPlus />}
        className="flex items-center gap-2 justify-center"
        type="primary"
        onClick={showModal}
      >
        Add new
      </Button>
      <Modal
        title="Add new user"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        <Form
          form={form}
          name="Add user form"
          initialValues={{ remember: true }}
          className="py-3"
          onFinish={onFinish}
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
            initialValue=""
          >
            <Input />
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
            initialValue=""
          >
            <Input />
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
            initialValue=""
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            labelCol={{
              span: 24,
            }}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            initialValue=""
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddUserModal;
