import { RemoteVideoPlayer, useJoin, useRemoteUsers, useRemoteVideoTracks } from "agora-rtc-react";
import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { Button, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig, fakeAvatar } from "../../../utils";
const { Title } = Typography;

interface videoTrackStateList {
  isPlay: boolean;
  id: string;
  track: IRemoteVideoTrack;
}

export const RemoteVideoPlayerComponent = () => {
  const [calling, setCalling] = useState(false);
  const userAvatar = useMemo(() => fakeAvatar(), []);

  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    calling,
  );

  const [videoTrackStateList, setVideoTrackStateList] = useState<videoTrackStateList[]>();

  const remoteUsers = useRemoteUsers();
  const videoTracks = useRemoteVideoTracks(remoteUsers);

  useEffect(() => {
    if (videoTracks && videoTracks.length > 0) {
      const stateList: videoTrackStateList[] = [];
      videoTracks.map(track => {
        stateList.push({ isPlay: true, id: track.getTrackId(), track: track });
      });
      setVideoTrackStateList(stateList);
    } else {
      setVideoTrackStateList([]);
    }
  }, [videoTracks]);

  useEffect(() => {
    if (!calling) {
      setVideoTrackStateList([]);
    }
  }, [calling]);

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>RemoteVideoPlayer</Title>
        {videoTrackStateList &&
          videoTrackStateList.length > 0 &&
          videoTrackStateList.map(item => (
            <div key={item.id}>
              <div className="p-4 text-xl">
                <Button
                  onClick={() => {
                    item.isPlay = !item.isPlay;
                    setVideoTrackStateList([...videoTrackStateList]);
                  }}
                  type={item.isPlay ? "default" : "primary"}
                >
                  {`${item.isPlay ? "stop" : "play"} RemoteVideoPlayer`}
                </Button>
              </div>
              <div className="p-4 text-xl">
                <RemoteVideoPlayer
                  cover={userAvatar}
                  playVideo={item.isPlay}
                  style={{ width: "150px", height: "100px" }}
                  track={item.track}
                />
              </div>
            </div>
          ))}
      </div>
      <MediaControl
        calling={calling}
        setCalling={() => {
          setCalling(a => !a);
        }}
      />
    </Container>
  );
};

export default RemoteVideoPlayerComponent;
