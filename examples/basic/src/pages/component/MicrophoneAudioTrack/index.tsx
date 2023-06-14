import { MicrophoneAudioTrack, useJoin, useLocalAudioTrack, usePublish } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Select, Typography } from "antd";
import { useEffect, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title, Paragraph } = Typography;

export const MicrophoneAudioTrackComponent = () => {
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    true,
  );

  const [micOn, setMic] = useState(false);
  const [audioTrackState, setAudioTrackState] = useState<{
    muted: boolean;
    isPlaying: boolean;
    enabled: boolean;
  }>();
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState("");

  const audioTrack = useLocalAudioTrack();
  usePublish([audioTrack]);

  useEffect(() => {
    AgoraRTC.getMicrophones()
      .then(res => {
        setDeviceList(res);
        setDeviceId(res[0].deviceId);
      })
      .catch();
  }, []);

  useEffect(() => {
    if (audioTrack) {
      setAudioTrackState({
        muted: audioTrack.muted,
        isPlaying: audioTrack.isPlaying,
        enabled: audioTrack.enabled,
      });
    }
  }, [micOn, audioTrack]);

  const handleChange = (value: string) => {
    setDeviceId(value);
  };

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>local audio track status</Title>
        {audioTrackState && (
          <>
            <Paragraph>{`muted: ${audioTrackState?.muted}`}</Paragraph>
            <Paragraph>{`isPlaying: ${audioTrackState.isPlaying}`}</Paragraph>
            <Paragraph>{`enabled: ${audioTrackState?.enabled}`}</Paragraph>
          </>
        )}
        <Select
          fieldNames={{ label: "label", value: "deviceId" }}
          onChange={handleChange}
          options={deviceList}
          value={deviceId}
        />
        <MicrophoneAudioTrack deviceId={deviceId} play={micOn} track={audioTrack} />
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

export default MicrophoneAudioTrackComponent;
