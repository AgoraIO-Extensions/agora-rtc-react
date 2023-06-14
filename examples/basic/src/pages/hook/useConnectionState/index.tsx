import { useConnectionState, useJoin } from "agora-rtc-react";
import { Button, Typography } from "antd";
import { useState } from "react";

import { Container } from "../../../components";
import { appConfig } from "../../../utils";
const { Title, Paragraph, Text } = Typography;

export const UseConnectionState = () => {
  const [calling, setCalling] = useState(false);
  const connectionState = useConnectionState();
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    calling,
  );

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>useConnectionState</Title>
        <Paragraph>
          By using <Text keyboard>useConnectionState</Text> hook to get the current connection state
          of the client.
        </Paragraph>
        <Paragraph>{`result: ${connectionState}`}</Paragraph>
        <Paragraph>
          <Button className="m-1" onClick={() => setCalling(true)} type="primary">
            Join
          </Button>
          <Button className="m-1" onClick={() => setCalling(false)} type="default">
            Leave
          </Button>
        </Paragraph>
      </div>
    </Container>
  );
};

export default UseConnectionState;
