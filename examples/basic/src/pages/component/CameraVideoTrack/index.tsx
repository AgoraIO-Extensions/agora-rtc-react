import { CameraVideoTrack, useJoin, useLocalCameraTrack, usePublish } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Select, Typography } from "antd";
import { useEffect, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

export const CameraVideoTrackComponent = () => {
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );

  const [cameraOn, setCamera] = useState(false);
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState("");

  const videoTrack = useLocalCameraTrack();
  usePublish([videoTrack]);

  useEffect(() => {
    AgoraRTC.getCameras()
      .then(res => {
        setDeviceList(res);
        setDeviceId(res[0].deviceId);
      })
      .catch();
  }, []);

  const handleChange = (value: string) => {
    setDeviceId(value);
  };

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>CameraVideoTrack</Title>
        <Select
          fieldNames={{ label: "label", value: "deviceId" }}
          onChange={handleChange}
          options={deviceList}
          value={deviceId}
        />
        <CameraVideoTrack
          deviceId={deviceId}
          play={cameraOn}
          style={{ width: "300px", height: "300px" }}
          track={videoTrack}
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

export default CameraVideoTrackComponent;
