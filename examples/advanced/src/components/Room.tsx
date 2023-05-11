import type { ICameraVideoTrack, ILocalTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";

import {
  LocalMicrophoneAndCameraUser,
  useAsyncEffect,
  useCurrentUID,
  useIsConnected,
  usePublish,
  usePublishedRemoteUsers,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";

import AgoraRTC from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Label, AutoLayout, UsersInfo } from "./index";
import { fakeAvatar, fakeName } from "../utils";

interface RoomProps {
  renderAction?: () => ReactNode;
  renderLocalUser?: () => ReactNode;
  renderRemoteUsers?: () => ReactNode;
  micOn: boolean;
  cameraOn: boolean;
}

export function Room({
  micOn,
  cameraOn,
  renderAction,
  renderLocalUser,
  renderRemoteUsers,
}: RoomProps) {
  const client = useRTCClient();
  const isConnected = useIsConnected();

  const uid = useCurrentUID() || 0;
  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(uid), [uid]);

  const remoteUsers = useRemoteUsers();
  const publishedUsers = usePublishedRemoteUsers();

  const selfPublished = micOn || cameraOn;

  const [trackList, setTrackList] = useState<ILocalTrack[]>([]);

  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  useAsyncEffect(async () => {
    if (isConnected && micOn && !audioTrack) {
      const track = await AgoraRTC.createMicrophoneAudioTrack({ ANS: true, AEC: true });
      // await client.publish(track);
      setTrackList([...trackList, track]);
      setAudioTrack(track);
    }
  }, [isConnected, micOn, audioTrack, client]);

  const [videoTrack, setVideoTrack] = useState<ICameraVideoTrack | null>(null);
  useAsyncEffect(async () => {
    if (isConnected && cameraOn && !videoTrack) {
      const track = await AgoraRTC.createCameraVideoTrack();
      // await client.publish(track);
      setTrackList([...trackList, track]);

      setVideoTrack(track);
    }
  }, [isConnected, cameraOn, videoTrack, client]);

  usePublish(trackList);
  return (
    <>
      {renderAction ? renderAction() : undefined}
      <UsersInfo
        published={publishedUsers.length + (selfPublished ? 1 : 0)}
        total={remoteUsers.length + 1}
      />
      <AutoLayout>
        {isConnected &&
          (renderLocalUser ? (
            renderLocalUser()
          ) : (
            <AutoLayout.Item>
              <LocalMicrophoneAndCameraUser
                audioTrack={audioTrack}
                cameraOn={cameraOn}
                cover={userAvatar}
                micOn={micOn}
                videoTrack={videoTrack}
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
