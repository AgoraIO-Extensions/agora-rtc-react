import "./App.css";

import AgoraRTC from "agora-rtc-sdk-ng";

import { AgoraRTCProvider } from "agora-rtc-react";
import { SVGCamera, SVGCameraMute, SVGMicrophone, SVGMicrophoneMute } from "agora-rtc-react-ui";

import clsx from "clsx";
import { useState } from "react";
import { Container } from "./Container";
import { Room } from "./Room";

AgoraRTC.setLogLevel(/* warning */ 2);

export const App = () => {
  const [client] = useState(() => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [calling, setCalling] = useState(false);
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);

  return (
    <AgoraRTCProvider client={client}>
      <Container>
        {calling && <Room micOn={micOn} cameraOn={cameraOn} />}
        {/* Camera and Microphone Controls */}
        <div className="fixed inset-0 top-a flex justify-center items-center gap-3 px-6 py-3 bg-#21242c c-coolgray-3">
          <button
            className={clsx("btn btn-phone", { "btn-phone-active": calling })}
            onClick={() => setCalling(a => !a)}
          >
            {calling ? <i className="i-mdi-phone-hangup" /> : <i className="i-mdi-phone" />}
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
