export * from "./store";
import {
  AgoraRTCProvider,
  LocalUser,
  RemoteUser,
  useIsConnected,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";
import { Button, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import type { OptionProps } from "react-select";
import Select from "react-select";

import { Container } from "../../../components";
import { fakeName } from "../../../utils";

import type { Room } from "./store";
import { useAppStore } from "./store";
const { Title, Paragraph } = Typography;

import "./index.scss";

const Item = memo(function Item({ label }: { label: string }) {
  const remoteUsers = useRemoteUsers();
  const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

  const localTracks = useAppStore(state => state.localTracks);
  const hostRoom = useAppStore(state => state.hostRoom);
  const isConnected = useIsConnected();
  const client = useRTCClient();
  return (
    <div className="room-selector-item">
      <i className="i-mdi-chat-processing-outline text-5 color-zinc" />
      <code className="bg-rose color-white px-2 rounded">{label}</code>
      {isConnected &&
        localTracks &&
        client.uid &&
        hostRoom?.client.channelName === client.channelName && (
          <div className="user" key={client.uid}>
            <LocalUser audioTrack={localTracks[0]} cameraOn micOn videoTrack={localTracks[1]} />
            <div className="mask" />
            <label className="label">{fakeName(client.uid)}</label>
          </div>
        )}
      <>
        {publishedUsers.map(user => (
          <div className="user" key={user.uid}>
            <RemoteUser user={user} />
            <div className="mask" />
            <label className="label">{fakeName(user.uid)}</label>
          </div>
        ))}
      </>
    </div>
  );
});

const CustomOption = ({
  innerProps,
  isDisabled,
  label,
  data,
}: OptionProps<{ label: string; value: Room }>) => {
  const { client } = data.value;
  return !isDisabled ? (
    <div {...innerProps}>
      <AgoraRTCProvider client={client}>
        <Item label={label} />
      </AgoraRTCProvider>
    </div>
  ) : null;
};

export const MultiChannel = () => {
  const getRooms = useAppStore(state => state.getRooms);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const rooms = useAppStore(state => state.rooms);
  const selectChannel = useAppStore(state => state.selectChannel);
  const options = useMemo(
    () => rooms?.map(room => ({ label: room.channel.replace(/[^0-9]*/, "Room"), value: room })),
    [rooms],
  );

  return (
    <Container>
      {isReady ? (
        <div className="max-w-lg p-10">
          <Select
            components={{ Option: CustomOption }}
            isMulti={false}
            menuIsOpen
            onChange={data => selectChannel(data?.value?.channel)}
            options={options}
          />
        </div>
      ) : (
        <div className="h-screen p-3">
          <Title>multi-channel</Title>
          <Paragraph>
            This is multi-channel example. By create multi Agora Client. You can join multi-channel
          </Paragraph>
          <div className="text-xl">
            <Button onClick={() => setIsReady(true)} type="primary">
              {`show demo`}
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MultiChannel;
