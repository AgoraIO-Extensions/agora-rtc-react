import "./App.css";

import type { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useMemo, useState } from "react";

import {
  AgoraRTCProvider,
  LocalMicrophoneAndCameraUser,
  RemoteUser,
  useAsyncEffect,
  useAutoJoin,
  useCurrentUID,
  useIsConnected,
  usePublishedRemoteUsers,
  useRemoteUsers,
} from "agora-rtc-react";
import { SVGCamera, SVGCameraMute, SVGMicrophone, SVGMicrophoneMute } from "agora-rtc-react-ui";
import { AutoLayout } from "./AutoLayout";
import { Container } from "./Container";
import { Label } from "./Label";
import { UsersInfo } from "./UsersInfo";
import { fakeAvatar, fakeName } from "./utils";
import clsx from "clsx";

const appId = import.meta.env.AGORA_APPID;
const channel = import.meta.env.AGORA_CHANNEL;
const token = import.meta.env.AGORA_TOKEN;

AgoraRTC.setLogLevel(/* warning */ 2);
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

setupEasyTesting(client);

export const App = () => {
  const isConnected = useIsConnected(client);

  const uid = useCurrentUID(client) || 0;
  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(uid), [uid]);

  const remoteUsers = useRemoteUsers(client);
  const publishedUsers = usePublishedRemoteUsers(client);

  useAutoJoin(appId, channel, token, null, client);

  const [micOn, setMic] = useState(false);
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  useAsyncEffect(async () => {
    if (micOn && !audioTrack) {
      const track = await AgoraRTC.createMicrophoneAudioTrack({ ANS: true, AEC: true });
      await client.publish(track);
      setAudioTrack(track);
    }
  }, [micOn, audioTrack, client]);
  useEffect(() => {
    if (audioTrack) {
      audioTrack.setEnabled(micOn);
    }
  }, [audioTrack, micOn]);

  const [cameraOn, setCamera] = useState(false);
  const [videoTrack, setVideoTrack] = useState<ICameraVideoTrack | null>(null);
  useAsyncEffect(async () => {
    if (cameraOn && !videoTrack) {
      const track = await AgoraRTC.createCameraVideoTrack();
      await client.publish(track);
      setVideoTrack(track);
    }
  }, [cameraOn, videoTrack, client]);
  useEffect(() => {
    if (videoTrack) {
      videoTrack.setEnabled(cameraOn);
    }
  }, [videoTrack, cameraOn]);

  const selfPublished = micOn || cameraOn;

  return (
    <AgoraRTCProvider client={client}>
      <Container>
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
        {/* Camera and Microphone Controls */}
        <div className="flex justify-center items-center gap-3 px-6 py-3 bg-#21242c c-coolgray-3 relative">
          <button
            className={clsx("btn btn-phone", { "btn-phone-active": isConnected })}
            onClick={() => window.close()}
            disabled={!isConnected}
          >
            {isConnected ? <i className="i-mdi-phone-hangup" /> : <i className="i-mdi-phone" />}
          </button>
          <div className="flex-1 flex absolute top-0 left-0 h-full items-center gap-3 px-6 py-3">
            <button className="btn" onClick={() => setMic(a => !a)}>
              {micOn ? <SVGMicrophone /> : <SVGMicrophoneMute />}
            </button>
            <button className="btn" onClick={() => setCamera(a => !a)}>
              {cameraOn ? <SVGCamera /> : <SVGCameraMute />}
            </button>
          </div>
        </div>
      </Container>
    </AgoraRTCProvider>
  );
};

export default App;

declare global {
  interface Window {
    AgoraRTC: typeof AgoraRTC;
    client: IAgoraRTCClient;
  }
}

/** Expose client to window for easy playing with */
function setupEasyTesting(client: IAgoraRTCClient): void {
  window.AgoraRTC = AgoraRTC;
  window.client = client;
}
