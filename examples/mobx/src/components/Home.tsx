import { useSafePromise } from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { appId, channel, token } from "../constants";
import { appStore } from "../stores/app.store";
import { JoinButton, NewButton, ScheduleButton, ScreenShareButton } from "./buttons";
import { RoomInfo } from "./RoomInfo";

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
        <JoinButton onClick={joinChannel} isLoading={isLoading} />
        <ScheduleButton />
        <ScreenShareButton />
      </div>
      <RoomInfo onJoin={joinChannel} />
    </div>
  );
});
