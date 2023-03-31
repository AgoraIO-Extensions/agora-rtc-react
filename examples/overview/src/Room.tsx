import type { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";

import {
  LocalMicrophoneAndCameraUser,
  RemoteUser,
  useAsyncEffect,
  useAutoJoin,
  useCurrentUID,
  useIsConnected,
  usePublishedRemoteUsers,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useMemo, useState } from "react";
import { AutoLayout } from "./AutoLayout";
import { Label } from "./Label";
import { UsersInfo } from "./UsersInfo";
import { fakeAvatar, fakeName } from "./utils";

interface RoomProps {
  micOn: boolean;
  cameraOn: boolean;
}

const appId = import.meta.env.AGORA_APPID;
const channel = import.meta.env.AGORA_CHANNEL;
const token = import.meta.env.AGORA_TOKEN;

export function Room({ micOn, cameraOn }: RoomProps) {
  useAutoJoin(appId, channel, token);

  const client = useRTCClient();
  const isConnected = useIsConnected();

  const uid = useCurrentUID() || 0;
  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(uid), [uid]);

  const remoteUsers = useRemoteUsers();
  const publishedUsers = usePublishedRemoteUsers();

  const selfPublished = micOn || cameraOn;

  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  useAsyncEffect(async () => {
    if (isConnected && micOn && !audioTrack) {
      const track = await AgoraRTC.createMicrophoneAudioTrack({ ANS: true, AEC: true });
      await client.publish(track);
      setAudioTrack(track);
    }
  }, [isConnected, micOn, audioTrack, client]);

  const [videoTrack, setVideoTrack] = useState<ICameraVideoTrack | null>(null);
  useAsyncEffect(async () => {
    if (isConnected && cameraOn && !videoTrack) {
      const track = await AgoraRTC.createCameraVideoTrack();
      await client.publish(track);
      setVideoTrack(track);
    }
  }, [isConnected, cameraOn, videoTrack, client]);

  return (
    <>
      <UsersInfo
        published={publishedUsers.length + (selfPublished ? 1 : 0)}
        total={remoteUsers.length + 1}
      />
      <AutoLayout>
        {isConnected && (
          <AutoLayout.Item>
            <LocalMicrophoneAndCameraUser
              cameraOn={cameraOn}
              micOn={micOn}
              videoTrack={videoTrack}
              audioTrack={audioTrack}
              cover={userAvatar}
            >
              {<Label>{`${userName}{${uid}}`}</Label>}
            </LocalMicrophoneAndCameraUser>
          </AutoLayout.Item>
        )}
        {remoteUsers.map(user => (
          <AutoLayout.Item key={user.uid}>
            <RemoteUser user={user} cover={fakeAvatar(user.uid)} />
            <Label>{`${fakeName(user.uid)}{${user.uid}}`}</Label>
          </AutoLayout.Item>
        ))}
      </AutoLayout>
    </>
  );
}
