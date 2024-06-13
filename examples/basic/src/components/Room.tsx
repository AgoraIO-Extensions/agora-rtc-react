import {
  useCurrentUID,
  useIsConnected,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { LocalMicrophoneAndCameraUser } from "agora-rtc-react-ui";
import type { ReactNode } from "react";
import { useMemo } from "react";

import { fakeAvatar, fakeName } from "../utils";

import { AutoLayout, Label, UsersInfo } from "./index";

interface RoomProps {
  renderAction?: () => ReactNode;
  renderLocalUser?: () => ReactNode;
  renderRemoteUsers?: () => ReactNode;
  micOn: boolean;
  cameraOn: boolean;
  showUserInfo?: boolean;
}

export function Room({
  micOn,
  cameraOn,
  renderAction,
  renderLocalUser,
  renderRemoteUsers,
  showUserInfo = true,
}: RoomProps) {
  const isConnected = useIsConnected();

  const uid = useCurrentUID() || 0;
  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(), []);

  const remoteUsers = useRemoteUsers();
  const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

  const selfPublished = micOn || cameraOn;

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  return (
    <>
      {renderAction ? renderAction() : undefined}
      {showUserInfo && (
        <UsersInfo
          published={publishedUsers.length + (selfPublished ? 1 : 0)}
          total={remoteUsers.length + 1}
        />
      )}
      <AutoLayout>
        {isConnected &&
          (renderLocalUser ? (
            renderLocalUser()
          ) : (
            <AutoLayout.Item>
              <LocalMicrophoneAndCameraUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                cover={userAvatar}
                micOn={micOn}
                videoTrack={localCameraTrack}
              >
                {<Label>{`${userName}{${uid}}`}</Label>}
              </LocalMicrophoneAndCameraUser>
            </AutoLayout.Item>
          ))}
        {renderRemoteUsers ? renderRemoteUsers() : undefined}
      </AutoLayout>
    </>
  );
}
