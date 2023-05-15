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
import type { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import CryptoJS from "crypto-js";
import { useMemo, useState } from "react";

import { AutoLayout } from "./AutoLayout";
import { Label } from "./Label";
import { UsersInfo } from "./UsersInfo";
import { fakeAvatar, fakeName } from "./utils";

interface RoomProps {
  micOn: boolean;
  cameraOn: boolean;
}

let id = import.meta.env.AGORA_APPID;
if (import.meta.env.AGORA_AES_SALT) {
  // only for github-pages demo
  const bytes = CryptoJS.AES.decrypt(import.meta.env.AGORA_APPID, import.meta.env.AGORA_AES_SALT);
  id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const appId = id;
const channel = import.meta.env.AGORA_CHANNEL || "test";
const token = import.meta.env.AGORA_TOKEN ? import.meta.env.AGORA_TOKEN : null;

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
              audioTrack={audioTrack}
              cameraOn={cameraOn}
              cover={userAvatar}
              micOn={micOn}
              videoTrack={videoTrack}
            >
              {<Label>{`${userName}{${uid}}`}</Label>}
            </LocalMicrophoneAndCameraUser>
          </AutoLayout.Item>
        )}
        {remoteUsers.map(user => (
          <AutoLayout.Item key={user.uid}>
            <RemoteUser cover={fakeAvatar(user.uid)} user={user} />
            <Label>{`${fakeName(user.uid)}{${user.uid}}`}</Label>
          </AutoLayout.Item>
        ))}
      </AutoLayout>
    </>
  );
}
