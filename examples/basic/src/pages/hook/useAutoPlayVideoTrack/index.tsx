import { useAutoPlayVideoTrack, useJoin, useLocalCameraTrack } from "agora-rtc-react";
import { Typography } from "antd";
import { useRef, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

export const UseAutoPlayVideoTrack = () => {
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );

  const [cameraOn, setCamera] = useState(false);

  const div = useRef<HTMLDivElement | null>(null);
  const { localCameraTrack } = useLocalCameraTrack();
  useAutoPlayVideoTrack(localCameraTrack, cameraOn, div.current);

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>useAutoPlayVideoTrack</Title>
        <div className="p-4 text-xl">
          <div ref={ref => (div.current = ref)} style={{ width: "150px", height: "100px" }} />
        </div>
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

export default UseAutoPlayVideoTrack;
