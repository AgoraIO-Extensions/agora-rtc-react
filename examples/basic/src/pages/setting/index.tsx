import { Button, Form, Input, notification } from "antd";
import { useState } from "react";

import { Container } from "../../components";
import { appConfig } from "../../utils";

type NotificationType = "success" | "info" | "warning" | "error";

export const Setting = () => {
  const [channel, setChannel] = useState(appConfig.channel);

  const handleChannelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannel(e.target.value);
  };
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Configuration Saved",
      description: "Go to other pages and try it now!",
    });
  };

  const confirm = () => {
    appConfig.channel = channel;
    openNotificationWithIcon("success");
  };

  const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };
  return (
    <Container>
      {contextHolder}
      <div className="p-4">
        <Form.Item label="Channel Name">
          <Input onChange={handleChannelNameChange} style={{ width: "200px" }} value={channel} />
        </Form.Item>
      </div>
      <Form.Item {...buttonItemLayout}>
        <Button onClick={confirm} type="primary">
          Save configuration
        </Button>
      </Form.Item>
    </Container>
  );
};

export default Setting;
