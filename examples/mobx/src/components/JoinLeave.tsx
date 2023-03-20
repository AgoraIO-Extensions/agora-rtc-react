import { useConnectionState } from "agora-rtc-react";
import { observer } from "mobx-react-lite";
import { appStore } from "../stores/app.store";

const appId = import.meta.env.AGORA_APPID;
const channel = import.meta.env.AGORA_CHANNEL;
const token = import.meta.env.AGORA_TOKEN;

export const JoinLeave = observer(function JoinLeave() {
  const connectionState = useConnectionState(appStore.client);

  return (
    <div>
      <button
        disabled={connectionState !== "DISCONNECTED"}
        onClick={() => appStore.join(appId, channel, token)}
      >
        JOIN
      </button>
      &nbsp;
      <button disabled={connectionState !== "CONNECTED"} onClick={() => appStore.leave()}>
        LEAVE
      </button>
      &nbsp;
      {appStore.uid && <samp>[UID={appStore.uid}]</samp>}
    </div>
  );
});
