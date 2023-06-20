import { useAutoPlayAudioTrack, useJoin, useLocalMicrophoneTrack } from "agora-rtc-react";
import { Typography } from "antd";
import { useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

export const UseAutoPlayAudioTrack = () => {
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );

  const [micOn, setMic] = useState(false);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack();

  useAutoPlayAudioTrack(localMicrophoneTrack, micOn);

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>useAutoPlayAudioTrack</Title>
      </div>
      <MediaControl
        micOn={micOn}
        setMic={() => {
          setMic(a => !a);
        }}
      />
    </Container>
  );
};

export default UseAutoPlayAudioTrack;
