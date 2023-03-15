import "./App.css";

import type { UID } from "agora-rtc-sdk-ng";
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

AgoraRTC.setLogLevel(/* warning */ 2);
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

(window as any).AgoraRTC = AgoraRTC;
(window as any).client = client;

export const App = () => {
  const sp = useSafePromise();

  const [uid, setUID] = useState<UID>(0);
  const users = useRemoteUsers(client);
  const published = usePublishedRemoteUsers(client);

  const { audioTrack, micOn, setMic } = useMicrophone(client, false, { ANS: true, AEC: true });
  const { videoTrack, cameraOn, setCamera } = useCamera(client, false);

  const selfPublished = micOn || cameraOn;

  // join channel on init
  useEffect(() => {
    const [appId, channel, token] = [
      import.meta.env.AGORA_APPID,
      import.meta.env.AGORA_CHANNEL,
      import.meta.env.AGORA_TOKEN,
    ];
    // uid = null: use random uid assigned by Agora server
    sp(client.join(appId, channel, token, null)).then(setUID);
    return () => void sp(client.leave()).then(() => setUID(0));
  }, [sp]);

  return (
    <AgoraRTCProvider client={client}>
      <Container>
        <UsersInfo value={published.length + (selfPublished ? 1 : 0)} max={users.length + 1} />
        <AutoLayout>
          {selfPublished && (
            <AutoLayout.Item>
              {micOn && <MicrophoneAudioTrack track={audioTrack} />}
              {cameraOn && <CameraVideoTrack className="w-full h-full" track={videoTrack} play />}
              <Label>{uid}</Label>
            </AutoLayout.Item>
          )}
          {published.map(user => (
            <AutoLayout.Item key={user.uid}>
              <RemoteUser className="w-full h-full" user={user} audioOn videoOn />
              <Label>{user.uid}</Label>
            </AutoLayout.Item>
          ))}
        </AutoLayout>
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
