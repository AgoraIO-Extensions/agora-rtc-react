import type { ILocalAudioTrack, ILocalTrack, ILocalVideoTrack } from "agora-rtc-react";
import {
  LocalVideoTrack,
  useJoin,
  useLocalScreenTrack,
  usePublish,
  useTrackEvent,
} from "agora-rtc-react";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";

import { Container } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

export const UseLocalScreenTrack = () => {
  //screen share
  const [screenShareOn, setScreenShareOn] = useState(false);
  const [screenVideoTrack, setScreenVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [screenAudioTrack, setScreenAudioTrack] = useState<ILocalAudioTrack | null>(null);

  //join room
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
      uid: appConfig.ShareScreenUID,
    },
    screenShareOn,
  );

  //create screen share track
  const { screenTrack, error } = useLocalScreenTrack(screenShareOn, {}, "auto");

  //get screen share video track and audio track
  useEffect(() => {
    if (!screenTrack) {
      setScreenAudioTrack(null);
      setScreenVideoTrack(null);
    } else {
      if (Array.isArray(screenTrack)) {
        setScreenVideoTrack(
          screenTrack.filter(
            (track: ILocalTrack) => track.trackMediaType === "video",
          )[0] as ILocalVideoTrack,
        );
        setScreenAudioTrack(
          screenTrack.filter(
            (track: ILocalTrack) => track.trackMediaType === "audio",
          )[0] as ILocalAudioTrack,
        );
      } else {
        setScreenVideoTrack(screenTrack);
      }
    }
  }, [screenTrack]);

  //publish screen share
  usePublish([screenVideoTrack, screenAudioTrack], screenShareOn);

  //if screen got error, close screen share and leave room
  useEffect(() => {
    setScreenShareOn(false);
  }, [error]);

  //screen share closed
  useTrackEvent(screenVideoTrack, "track-ended", () => {
    console.log("screen sharing ended");
    setScreenShareOn(false);
  });

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>useLocalScreenTrack</Title>
        <Button onClick={() => setScreenShareOn(a => !a)} type="primary">
          {screenShareOn ? "stop share screen" : "start share screen"}
        </Button>
        {screenShareOn && screenVideoTrack && (
          <LocalVideoTrack
            disabled={!screenShareOn}
            play={screenShareOn}
            style={{ width: "600px", height: "400px" }}
            track={screenVideoTrack}
          />
        )}
      </div>
    </Container>
  );
};

export default UseLocalScreenTrack;
