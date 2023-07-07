import { LocalVideoTrack, useJoin, useLocalCameraTrack, usePublish } from "agora-rtc-react";
import { Typography } from "antd";
import { useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

export const LocalVideoTrackComponent = () => {
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );

  const [cameraOn, setCamera] = useState(false);
  const { localCameraTrack } = useLocalCameraTrack();
  usePublish([localCameraTrack]);
  return (
    <Container>
      <div className="h-screen p-3">
        <Title>local video track</Title>
        <LocalVideoTrack
          disabled={!cameraOn}
          play={cameraOn}
          style={{ width: "300px", height: "300px" }}
          track={localCameraTrack}
        />
      </div>
      <MediaControl
        cameraOn={cameraOn}
        setCamera={() => {
          setCamera(a => !a);
        }}
      />
    </Container>
  );
};

export default LocalVideoTrackComponent;
