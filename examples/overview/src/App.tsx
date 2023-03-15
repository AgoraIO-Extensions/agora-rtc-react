import "./App.css";

import type { IAgoraRTCClient, UID } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import {
  AgoraRTCProvider,
  CameraVideoTrack,
  MicrophoneAudioTrack,
  RemoteUser,
  SVGCamera,
  SVGCameraMute,
  SVGMicrophone,
  SVGMicrophoneMute,
  useCamera,
  useMicrophone,
  usePublishedRemoteUsers,
  useRemoteUsers,
  useSafePromise,
} from "agora-rtc-react";
import { Container } from "./Container";
import { UsersInfo } from "./UsersInfo";
import { AutoLayout } from "./AutoLayout";
import { Label } from "./Label";

const [appId, channel, token] = [
  import.meta.env.AGORA_APPID,
  import.meta.env.AGORA_CHANNEL,
  import.meta.env.AGORA_TOKEN,
];

AgoraRTC.setLogLevel(/* warning */ 2);
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

setupEasyTesting(client);

export const App = () => {
  const sp = useSafePromise();

  const [uid, setUID] = useState<UID>(0);
  const remoteUsers = useRemoteUsers(client);
  const publishedUsers = usePublishedRemoteUsers(client);

  const { audioTrack, micOn, setMic } = useMicrophone(client, false, { ANS: true, AEC: true });
  const { videoTrack, cameraOn, setCamera } = useCamera(client, false);

  const selfPublished = micOn || cameraOn;

  // join channel on init
  useEffect(() => {
    // uid = null: use random uid assigned by Agora server
    sp(client.join(appId, channel, token, null)).then(setUID);
    return () => void sp(client.leave()).then(() => setUID(0));
  }, [sp]);

  return (
    <AgoraRTCProvider client={client}>
      <Container>
        <UsersInfo
          published={publishedUsers.length + (selfPublished ? 1 : 0)}
          total={remoteUsers.length + 1}
        />
        <AutoLayout>
          {selfPublished && (
            <AutoLayout.Item>
              <CameraVideoTrack className="w-full h-full" track={videoTrack} play={cameraOn} />
              <MicrophoneAudioTrack track={audioTrack} play={micOn} />
              <Label>{uid}</Label>
            </AutoLayout.Item>
          )}
          {publishedUsers.map(user => (
            <AutoLayout.Item key={user.uid}>
              <RemoteUser className="w-full h-full" user={user} playAudio playVideo />
              <Label>{user.uid}</Label>
            </AutoLayout.Item>
          ))}
        </AutoLayout>
        {/* Camera and Microphone Controls */}
        <div className="flex gap-3 px-6 py-3 bg-#21242c c-coolgray-3">
          <button className="btn" onClick={() => setMic(a => !a)}>
            {micOn ? <SVGMicrophone /> : <SVGMicrophoneMute />}
          </button>
          <button className="btn" onClick={() => setCamera(a => !a)}>
            {cameraOn ? <SVGCamera /> : <SVGCameraMute />}
          </button>
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
