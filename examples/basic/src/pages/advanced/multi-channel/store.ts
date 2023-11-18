import type { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-react";
import { create } from "zustand";

import { appConfig, getAgoraTokens } from "../../../utils";

const appId = appConfig.appId;
const tokens = getAgoraTokens();

export interface Room {
  channel: string;
  token: string;
  client: IAgoraRTCClient;
}

interface AppState {
  localTracks?: [ILocalAudioTrack, ILocalVideoTrack];
  hostRoom?: Room | null;
  rooms?: Room[];
  getRooms: () => void;
  selectChannel: (channel?: string | null) => Promise<void>;
  dispose: () => void;
}

export const useAppStore = create<AppState>((set, get) => {
  return {
    getRooms: () => {
      let { rooms } = get();

      rooms = tokens.map(({ token, channel }) => {
        const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
        client.join(appId, channel, token ? token : null, null);
        return { channel, token, client };
      });
      set({ rooms });
    },
    selectChannel: async (channel?: string | null) => {
      let { hostRoom, localTracks } = get();
      const { rooms } = get();

      if (!channel) {
        if (hostRoom) {
          if (localTracks && hostRoom.client.localTracks.length > 0) {
            await hostRoom.client.unpublish(localTracks);
          }
          hostRoom.client.setClientRole("audience");
          hostRoom = null;
          set({ hostRoom, localTracks });
        }
        return;
      }

      if (hostRoom) {
        if (hostRoom.client.channelName === channel) {
          return;
        }
        if (localTracks) {
          await hostRoom.client.unpublish(localTracks);
        }
        await hostRoom.client.setClientRole("audience");
      }
      hostRoom = rooms?.find(room => room.client.channelName === channel);
      if (hostRoom) {
        await hostRoom.client.setClientRole("host");
        if (!localTracks) {
          localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        }
        await hostRoom.client.publish(localTracks);
      }

      set({ localTracks, hostRoom });
    },
    dispose: () => {
      const { rooms, hostRoom } = get();
      hostRoom?.client.leave();
      if (rooms) {
        for (const room of rooms) {
          room.client.leave();
        }
      }
    },
  };
});
