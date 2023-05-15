export * from "./store";
import {
  AgoraRTCProvider,
  LocalUser,
  RemoteUser,
  useIsConnected,
  usePublishedRemoteUsers,
  useRTCClient,
} from "agora-rtc-react";
import { memo, useMemo } from "react";
import type { OptionProps } from "react-select";
import Select from "react-select";

import { Container } from "../../components";
import { fakeName } from "../../utils";

import type { Room } from "./store";
import { useAppStore } from "./store";

import "./index.scss";

const Item = memo(function Item({ label }: { label: string }) {
  const remoteUsers = usePublishedRemoteUsers();
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
        {remoteUsers.map(user => (
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
  const rooms = useAppStore(state => state.rooms);
  const selectChannel = useAppStore(state => state.selectChannel);
  const options = useMemo(
    () => rooms.map(room => ({ label: room.channel.replace(/[^0-9]*/, "Room"), value: room })),
    [rooms],
  );

  return (
    <Container>
      <div className="max-w-lg p-10">
        <Select
          components={{ Option: CustomOption }}
          isMulti={false}
          menuIsOpen
          onChange={data => selectChannel(data?.value?.channel)}
          options={options}
        />
      </div>
    </Container>
  );
};

export default MultiChannel;
