import { notification } from "antd";

export function useNotification() {
  const [api] = notification.useNotification();

  const notify = ({ type, message, description }) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  return { notify };
}
