import styles from "./RoomSelector.module.css";

import { memo, useMemo } from "react";

import { AgoraRTCProvider, usePublishedRemoteUsers } from "agora-rtc-react";
import Select from "react-select";
import type { OptionProps } from "react-select";
import { RemoteUserList } from "./RemoteUserList";
import type { Room } from "./stores";
import { useAppStore } from "./stores";
import { CurrentUser } from "./CurrentUser";

const Item = memo(function Item({ label }: { channel: string; label: string }) {
  const remoteUsers = usePublishedRemoteUsers();
  return (
    <div className={styles.item}>
      <i className="i-mdi-chat-processing-outline text-5 color-zinc" />
      <code className="bg-rose color-white px-2 rounded">{label}</code>
      <CurrentUser />
      <RemoteUserList users={remoteUsers} />
    </div>
  );
});

const CustomOption = ({
  innerProps,
  isDisabled,
  label,
  data,
}: OptionProps<{ label: string; value: Room }>) => {
  const { client, channel } = data.value;
  return !isDisabled ? (
    <div {...innerProps}>
      <AgoraRTCProvider client={client}>
        <Item channel={channel} label={label} />
      </AgoraRTCProvider>
    </div>
  ) : null;
};

export const RoomSelector = () => {
  const rooms = useAppStore(state => state.rooms);
  const selectChannel = useAppStore(state => state.selectChannel);
  const options = useMemo(
    () => rooms.map(room => ({ label: room.channel.replace(/[^0-9]*/, "Room"), value: room })),
    [rooms],
  );

  return (
    <div className={styles.container}>
      <Select
        menuIsOpen
        isMulti={false}
        components={{ Option: CustomOption }}
        options={options}
        onChange={data => selectChannel(data?.value?.channel)}
      />
    </div>
  );
};
