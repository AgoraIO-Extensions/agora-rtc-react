import { useSafePromise } from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { appId, channel, token } from "../constants";
import { appStore } from "../stores/app.store";

import { RoomInfo } from "./RoomInfo";
import { JoinButton, NewButton, ScheduleButton, ScreenShareButton } from "./buttons";

export const Home = observer(function Home() {
  const sp = useSafePromise();
  const [isLoading, setLoading] = useState(false);
  const joinChannel = () => {
    setLoading(true);
    sp(appStore.join(appId, channel, token)).then(() => setLoading(false));
  };

  return (
    <div className="home" hidden={!!appStore.client}>
      <div className="bg">
        <div className="bg-row">Agora</div>
        <div className="bg-row">RTC</div>
        <div className="bg-row">React</div>
      </div>
      <div className="buttons">
        <NewButton />
        <JoinButton isLoading={isLoading} onClick={joinChannel} />
        <ScheduleButton />
        <ScreenShareButton />
      </div>
      <RoomInfo onJoin={joinChannel} />
    </div>
  );
});
