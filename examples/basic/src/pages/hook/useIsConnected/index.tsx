import { useIsConnected, useJoin } from "agora-rtc-react";
import { Button, Typography } from "antd";
import { useState } from "react";

import { Container } from "../../../components";
import { appConfig } from "../../../utils";
const { Title, Paragraph, Text } = Typography;

export const UseIsConnected = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
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
        <Title>useIsConnected</Title>
        <Paragraph>
          By using <Text keyboard>useIsConnected</Text> hook to determines whether the client is
          successfully connected to Agora server.
        </Paragraph>
        <Paragraph>{`result: ${isConnected}`}</Paragraph>
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

export default UseIsConnected;
