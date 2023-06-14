import { useJoin, useNetworkQuality } from "agora-rtc-react";
import { Typography } from "antd";

import { Container } from "../../../components";
import { appConfig } from "../../../utils";
const { Title, Paragraph } = Typography;

export const UseNetworkQuality = () => {
  const networkQuality = useNetworkQuality();
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>useNetworkQuality</Title>
        <Paragraph>{`result: ${JSON.stringify(networkQuality)}`}</Paragraph>
      </div>
    </Container>
  );
};

export default UseNetworkQuality;
