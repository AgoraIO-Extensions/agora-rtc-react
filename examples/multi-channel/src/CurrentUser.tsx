import { LocalUser, useIsConnected, useRTCClient } from "agora-rtc-react";
import { useAppStore } from "./stores";
import { User } from "./User";

export function CurrentUser() {
  const localTracks = useAppStore(state => state.localTracks);
  const hostRoom = useAppStore(state => state.hostRoom);
  const isConnected = useIsConnected();
  const client = useRTCClient();

  if (
    !isConnected ||
    !localTracks ||
    !client.uid ||
    !hostRoom ||
    hostRoom.client.channelName !== client.channelName
  ) {
    return null;
  }

  return (
    <User uid={client.uid}>
      <LocalUser audioTrack={localTracks[0]} cameraOn micOn videoTrack={localTracks[1]} />
    </User>
  );
}
