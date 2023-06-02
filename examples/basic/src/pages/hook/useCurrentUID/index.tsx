import { useCurrentUID, useJoin } from "agora-rtc-react";
import { Button, Typography } from "antd";
import { useState } from "react";

import { Container } from "../../../components";
import { appConfig } from "../../../utils";
const { Title, Paragraph, Text } = Typography;

export const UseCurrentUID = () => {
  const [calling, setCalling] = useState(false);
  const uid = useCurrentUID();
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
        <Title>useCurrentUID</Title>
        <Paragraph>
          By using <Text keyboard>useCurrentUID</Text> hook to get the UID of the current user.
        </Paragraph>
        <Paragraph>{`result: ${uid}`}</Paragraph>
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

export default UseCurrentUID;
