import { Badge, Descriptions } from "antd";
import { format } from "date-fns";

function UserDetail({ user }) {
  return (
    <Descriptions bordered column={2}>
      <Descriptions.Item label="Id">{user._id}</Descriptions.Item>
      <Descriptions.Item label="User name">{user.fullName}</Descriptions.Item>
      <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
      <Descriptions.Item label="Role" span={2}>
        <Badge status="processing" text={user.role} />
      </Descriptions.Item>
      <Descriptions.Item label="Created At">
        {format(new Date(user.createdAt), "dd-MM-yyyy hh:mm:ss")}
      </Descriptions.Item>
      <Descriptions.Item label="Updated At">
        {format(new Date(user.updatedAt), "dd-MM-yyyy hh:mm:ss")}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default UserDetail;
