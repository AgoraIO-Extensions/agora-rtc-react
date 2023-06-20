import {
  LocalMicrophoneAndCameraUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
} from "agora-rtc-react";
import { Typography } from "antd";
import { useMemo, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig, fakeAvatar } from "../../../utils";
const { Title } = Typography;

export const LocalMicrophoneAndCameraUserComponent = () => {
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const userAvatar = useMemo(() => fakeAvatar(), []);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  return (
    <Container>
      <div className="h-screen p-3">
        <Title>local microphone and camera</Title>
        <LocalMicrophoneAndCameraUser
          audioTrack={localMicrophoneTrack}
          cameraOn={cameraOn}
          cover={userAvatar}
          micOn={micOn}
          style={{ width: "300px", height: "300px" }}
          videoTrack={localCameraTrack}
        />
      </div>
      <MediaControl
        cameraOn={cameraOn}
        micOn={micOn}
        setCamera={() => {
          setCamera(a => !a);
        }}
        setMic={() => {
          setMic(a => !a);
        }}
      />
    </Container>
  );
};

export default LocalMicrophoneAndCameraUserComponent;
