import type { ConnectionDisconnectedReason, ConnectionState } from "agora-rtc-react";
import { useClientEvent, useJoin, useRTCClient } from "agora-rtc-react";
import { List, Typography } from "antd";
import { useEffect, useState } from "react";

import { Container, MediaControl, Room } from "../../../components";
import { appConfig } from "../../../utils";

const { Title } = Typography;

export const UseClientEvent = () => {
  const [calling, setCalling] = useState(false);
  const [logSink, setLogSink] = useState<
    Array<{
      eventName: string;
      value: string;
    }>
  >([]);
  const client = useRTCClient();
  useClientEvent(
    client,
    "connection-state-change",
    (
      curState: ConnectionState,
      revState: ConnectionState,
      reason?: ConnectionDisconnectedReason,
    ) => {
      console.log(
        `connection-state-change,curState: ${curState},revState: ${revState},reason: ${reason}`,
      );
      setLogSink(logs =>
        logs.concat({
          eventName: "connection-state-change",
          value: `curState: ${curState},revState: ${revState},reason: ${reason}`,
        }),
      );
    },
  );

  //local
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    calling,
  );
  const renderLocalUser = () => {
    return <></>;
  };

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>UseClientEvent</Title>
        <List
          bordered
          dataSource={logSink}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>[{item.eventName}]</Typography.Text> {item.value}
            </List.Item>
          )}
          style={{ height: "300px", overflow: "auto" }}
        />
      </div>
      {calling && (
        <Room
          cameraOn={false}
          micOn={false}
          renderLocalUser={renderLocalUser}
          showUserInfo={false}
        />
      )}
      <MediaControl
        calling={calling}
        setCalling={() => {
          setCalling(a => !a);
        }}
      />
    </Container>
  );
};

export default UseClientEvent;
