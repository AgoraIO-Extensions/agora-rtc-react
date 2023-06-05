import {
  LocalUser,
  useJoin,
  useLocalAudioTrack,
  useLocalCameraTrack,
  usePublish,
} from "agora-rtc-react";
import { Button, Typography } from "antd";
import { useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

export const LocalUserComponent = () => {
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
  const [playVideo, setPlayVideo] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  const audioTrack = useLocalAudioTrack();
  const videoTrack = useLocalCameraTrack();
  usePublish([audioTrack, videoTrack]);
  return (
    <Container>
      <div className="h-screen p-3">
        <Title>local user status</Title>
        <div className="p-4 text-xl">
          <Button
            onClick={() => {
              setPlayAudio(a => !a);
            }}
            type={playAudio ? "primary" : "default"}
          >
            playAudio : {JSON.stringify(playAudio)}
          </Button>
        </div>
        <div className="p-4 text-xl">
          <Button
            onClick={() => {
              setPlayVideo(a => !a);
            }}
            type={playVideo ? "primary" : "default"}
          >
            playVideo : {JSON.stringify(playVideo)}
          </Button>
        </div>
        <div className="p-4 text-xl">
          <Button
            onClick={() => {
              setPlayVideo(true);
              setCamera(false);
            }}
            type="primary"
          >
            cameraOn=false playVideo=true
          </Button>
        </div>
        <div className="p-4 text-xl">
          <Button
            onClick={() => {
              setPlayVideo(false);
              setCamera(true);
            }}
            type="primary"
          >
            cameraOn=true playVideo=false
          </Button>
        </div>
        <LocalUser
          audioTrack={audioTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          playAudio={playAudio}
          playVideo={playVideo}
          style={{ width: "300px", height: "300px" }}
          videoTrack={videoTrack}
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

export default LocalUserComponent;
