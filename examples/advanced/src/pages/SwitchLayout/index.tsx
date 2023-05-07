import AgoraRTC from "agora-rtc-sdk-ng";
import "./index.scss";
import { AgoraRTCProvider } from "agora-rtc-react";
import { SVGCamera, SVGCameraMute, SVGMicrophone, SVGMicrophoneMute } from "agora-rtc-react-ui";

import clsx from "clsx";
import { useState } from "react";

import { Container } from "../../components";
import { Room } from "./Room";
import { Typography } from "antd";
const { Title, Paragraph, Text } = Typography;

AgoraRTC.setLogLevel(/* warning */ 2);

export const SwitchLayout = () => {
  const [client] = useState(() => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [calling, setCalling] = useState(false);
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);

  return (
    <AgoraRTCProvider client={client}>
      <Container>
        {calling ? (
          <Room cameraOn={cameraOn} micOn={micOn} />
        ) : (
          <div className="h-screen p-3">
            <Title>SwitchLayout</Title>
            <Paragraph>
              By using <Text keyboard>useRemoteVideoTracks</Text> hook to dynamically switch the
              camera track, this will not generate a new track, but only dynamically subscribe and
              unsubscribe the track according to your needs.
            </Paragraph>
          </div>
        )}
        {/* Camera and Microphone Controls */}
        <div className="inset-0 top-a flex justify-center items-center gap-3 px-6 py-3 bg-#21242c c-coolgray-3">
          <div className="flex-1 flex top-0 left-0 h-full items-center gap-3 px-6 py-3">
            <button className="btn" onClick={() => setMic(a => !a)}>
              {micOn ? <SVGMicrophone /> : <SVGMicrophoneMute />}
            </button>
            <button className="btn" onClick={() => setCamera(a => !a)}>
              {cameraOn ? <SVGCamera /> : <SVGCameraMute />}
            </button>
          </div>
          <button
            className={clsx("btn btn-phone", { "btn-phone-active": calling })}
            onClick={() => setCalling(a => !a)}
          >
            {calling ? <i className="i-mdi-phone-hangup" /> : <i className="i-mdi-phone" />}
          </button>
        </div>
      </Container>
    </AgoraRTCProvider>
  );
};

export default SwitchLayout;
