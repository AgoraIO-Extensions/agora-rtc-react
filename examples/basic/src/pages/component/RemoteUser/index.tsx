import type { IAgoraRTCRemoteUser, UID } from "agora-rtc-react";
import { RemoteUser, useJoin, useRemoteUsers } from "agora-rtc-react";
import { Button, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig, fakeAvatar } from "../../../utils";
const { Title } = Typography;

interface userList {
  playVideo: boolean;
  playAudio: boolean;
  id: UID;
  user: IAgoraRTCRemoteUser;
}

export const RemoteUserComponent = () => {
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

  const [userList, setUserList] = useState<userList[]>();

  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    if (remoteUsers.length > 0) {
      const stateList: userList[] = [];
      remoteUsers.map(user => {
        stateList.push({ playVideo: true, playAudio: true, id: user.uid, user: user });
      });
      setUserList(stateList);
    } else {
      setUserList([]);
    }
  }, [remoteUsers]);

  useEffect(() => {
    if (!calling) {
      setUserList([]);
    }
  }, [calling]);

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>RemoteUser</Title>
        {userList &&
          userList.length > 0 &&
          userList.map(item => (
            <div key={item.id}>
              <div className="text-xl">
                <Button
                  className="m-2"
                  onClick={() => {
                    item.playVideo = !item.playVideo;
                    setUserList([...userList]);
                  }}
                  type={item.playVideo ? "default" : "primary"}
                >
                  {`${item.playVideo ? "stop" : "play"} RemoteUser Video`}
                </Button>
                <Button
                  className="m-2"
                  onClick={() => {
                    item.playAudio = !item.playAudio;
                    setUserList([...userList]);
                  }}
                  type={item.playAudio ? "default" : "primary"}
                >
                  {`${item.playAudio ? "stop" : "play"} RemoteUser Audio`}
                </Button>
              </div>
              <div className="p-4 text-xl">
                <RemoteUser
                  cover={userAvatar}
                  playAudio={item.playAudio}
                  playVideo={item.playVideo}
                  style={{ width: "150px", height: "100px" }}
                  user={item.user}
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

export default RemoteUserComponent;
