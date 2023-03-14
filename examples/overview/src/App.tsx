import "./App.css";

import type { IAgoraRTCRemoteUser, UID } from "agora-rtc-sdk-ng";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import {
  AgoraRTCProvider,
  CameraVideoTrack,
  MicrophoneAudioTrack,
  RemoteUser,
  useCamera,
  useMicrophone,
  usePublishedRemoteUsers,
  useRemoteUsers,
  useSafePromise,
} from "agora-rtc-react";

AgoraRTC.setLogLevel(/* warning */ 2);
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

(window as any).AgoraRTC = AgoraRTC;
(window as any).client = client;

export const App = () => {
  const sp = useSafePromise();

  const [uid, setUID] = useState<UID>(0);
  const remoteUsers = useRemoteUsers(client);
  const [firstRemoteUser] = usePublishedRemoteUsers(client) as [IAgoraRTCRemoteUser | undefined];

  const { audioTrack, micOn, setMic } = useMicrophone(client, false, { ANS: true, AEC: true });
  const { videoTrack, cameraOn, setCamera } = useCamera(client, false);

  // join channel on init
  useEffect(() => {
    const [appId, channel, token] = [
      import.meta.env.AGORA_APPID,
      import.meta.env.AGORA_CHANNEL,
      import.meta.env.AGORA_TOKEN,
    ];
    // uid=null: use random uid assigned by Agora server
    sp(client.join(appId, channel, token, null)).then(setUID);
    return () => void sp(client.leave()).then(() => setUID(0));
  }, [sp]);

  return (
    <AgoraRTCProvider client={client}>
      <div className="h-screen flex flex-col bg-coolgray-9 c-coolgray-3">
        <div className="flex items-center p-4">
          <span className="inline-flex">
            <i className="i-mdi-user" />
          </span>
          {uid && <span className="c-green">&nbsp;{uid}</span>}
          {remoteUsers.map(user => (
            <span className={user.uid === firstRemoteUser?.uid ? "c-red" : ""} key={user.uid}>
              &nbsp;{user.uid}
            </span>
          ))}
        </div>
        <div className="flex-1 p-10 p-t-4 grid grid-cols-2 gap-5">
          <div className="local b-1 b-solid b-coolgray-6 rd of-hidden relative">
            {micOn && <MicrophoneAudioTrack track={audioTrack} />}
            {cameraOn && <CameraVideoTrack className="h-full" track={videoTrack} play />}
            <div className="label inline-flex items-center gap-1 absolute bottom-0 bg-black c-white p-x-2">
              <span>{uid}</span>
              {micOn && <i className="i-mdi-volume" />}
            </div>
          </div>
          <div className="remote b-1 b-solid b-coolgray-6 rd of-hidden relative">
            <RemoteUser className="w-full h-full" user={firstRemoteUser} audioOn videoOn />
            {firstRemoteUser && (
              <div className="label inline-flex items-center gap-1 absolute bottom-0 bg-black c-white p-x-2">
                <span>{firstRemoteUser.uid}</span>
                {firstRemoteUser.hasAudio && <i className="i-mdi-volume" />}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 px-6 py-3 bg-coolgray-8 c-coolgray-3">
          <button className="btn" onClick={() => setMic(a => !a)}>
            {micOn ? <i className="i-mdi-microphone" /> : <i className="i-mdi-microphone-off" />}
            <span>Mute</span>
          </button>
          <button className="btn" onClick={() => setCamera(a => !a)}>
            {cameraOn ? <i className="i-mdi-camera" /> : <i className="i-mdi-camera-off" />}
            <span>Stop Video</span>
          </button>
        </div>
      </div>
    </AgoraRTCProvider>
  );
};

export default App;
