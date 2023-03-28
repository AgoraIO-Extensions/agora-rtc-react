import { create } from "zustand";
import type { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { getAgoraTokens } from "../utils";

const appId = import.meta.env.AGORA_APPID;
const tokens = getAgoraTokens();

AgoraRTC.setLogLevel(/* warning */ 2);

export interface Room {
  channel: string;
  token: string;
  client: IAgoraRTCClient;
}

interface AppState {
  localTracks?: [ILocalAudioTrack, ILocalVideoTrack];
  hostRoom?: Room | null;
  rooms: Room[];
  selectChannel: (channel?: string | null) => Promise<void>;
  dispose: () => void;
}

export const useAppStore = create<AppState>((set, get) => {
  return {
    rooms: tokens.map(({ token, channel }) => {
      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      client.join(appId, channel, token, null);
      return { token, channel, client };
    }),
    selectChannel: async (channel?: string | null) => {
      let { hostRoom, rooms, localTracks } = get();

      if (!channel) {
        if (hostRoom) {
          if (localTracks && hostRoom.client.localTracks.length > 0) {
            await hostRoom.client.unpublish(localTracks);
          }
          hostRoom.client.setClientRole("audience");
          rooms = [...rooms, hostRoom];
          hostRoom = null;
          set({ hostRoom, rooms, localTracks });
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
        rooms = [...rooms, hostRoom];
      }
      hostRoom = rooms.find(room => room.client.channelName === channel);
      if (hostRoom) {
        await hostRoom.client.setClientRole("host");
        if (!localTracks) {
          localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        }
        await hostRoom.client.publish(localTracks);
      }
      rooms = rooms.filter(room => room.client.channelName !== channel);
      set({ localTracks, hostRoom, rooms });
    },
    dispose: () => {
      const { rooms, hostRoom } = get();
      hostRoom?.client.leave();
      for (const room of rooms) {
        room.client.leave();
      }
    },
  };
});