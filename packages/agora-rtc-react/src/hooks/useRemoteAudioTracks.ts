import type {
  IAgoraRTCClient,
  IAgoraRTCError,
  IAgoraRTCRemoteUser,
  IRemoteAudioTrack,
} from "agora-rtc-sdk-ng";
import { useRef, useState } from "react";

import { AgoraRTCReactError } from "../error";
import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { joinDisposers } from "../misc/utils";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import type { massUserProps } from "./types";
import { useIsConnected } from "./useIsConnected";

/**
 * 用于自动订阅和获取远端用户音频轨道。
 *
 * @param `users` {IAgoraRTCRemoteUser[] | undefined} 远端用户列表。
 * @param `client` {IAgoraRTCClient | null} [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。
 * @return audioTracks IRemoteAudioTrack[]
 * @return isLoading boolean
 * @return error AgoraRtcReactError | null
 */
export function useRemoteAudioTracks(
  users: IAgoraRTCRemoteUser[] | undefined,
  client?: IAgoraRTCClient | null,
): { audioTracks: IRemoteAudioTrack[]; isLoading: boolean; error: AgoraRTCReactError | null } {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteAudioTrack[]>([]);
  const isConnected = useIsConnected();
  const nextTracks = useRef<IRemoteAudioTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRTCReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setError(null);
    }

    if (!Array.isArray(users) || !isConnected) return;
    const subscribe = async (user: IAgoraRTCRemoteUser) => {
      if (!user.audioTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          if (!isUnmountRef.current) {
            setIsLoading(true);
          }
          await resolvedClient.subscribe(user, "audio");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRTCReactError("IAgoraRTCClient.subscribe", err as IAgoraRTCError));
          }
        }

        if (user.audioTrack && !nextTracks.current.some(track => track.getUserId() === user.uid)) {
          nextTracks.current.push(user.audioTrack);
        }

        // when hot update mode, track will change every time, so need to update nextTracks
        nextTracks.current = nextTracks.current.map(track => {
          if (
            user.audioTrack &&
            track.getUserId() === user.uid &&
            track.getTrackId() !== user.audioTrack.getTrackId()
          ) {
            return user.audioTrack;
          } else {
            return track;
          }
        });

        if (!isUnmountRef.current) {
          setTracks(nextTracks.current);
          setIsLoading(false);
        }
      }
    };

    const unsubscribe = async (user: IAgoraRTCRemoteUser): Promise<void> => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmountRef.current) {
          nextTracks.current = nextTracks.current.filter(track => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          if (!isUnmountRef.current) {
            setIsLoading(true);
          }
          await resolvedClient.unsubscribe(user, "audio");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRTCReactError("IAgoraRTCClient.unsubscribe", err as IAgoraRTCError));
          }
        }
        if (!isUnmountRef.current) {
          setIsLoading(false);
        }
      }
    };

    users.map(user => {
      if (!user.audioTrack && user.hasAudio) {
        subscribe(user);
      }
    });

    const unsubscribeList: massUserProps[] = [];
    for (let i = 0; i < nextTracks.current.length; i++) {
      const track = nextTracks.current[i];
      if (!users.some(user => user.uid === track.getUserId())) {
        const user = resolvedClient.remoteUsers.find(user => user.uid === track.getUserId());
        if (user) {
          unsubscribeList.push({
            user,
            mediaType: "audio",
          });
          nextTracks.current.splice(i, 1);
          i--;
        }
      }
    }
    if (unsubscribeList.length > 0) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        await resolvedClient.massUnsubscribe(unsubscribeList);
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRTCReactError("IAgoraRTCClient.massUnsubscribe", err as IAgoraRTCError),
          );
        }
      }
      if (!isUnmountRef.current) {
        setTracks(nextTracks.current.slice());
        setIsLoading(false);
      }
    }

    return joinDisposers([
      listen(resolvedClient, "user-published", (pubUser, pubMediaType) => {
        if (users.find(user => user.uid === pubUser.uid) && pubMediaType === "audio") {
          subscribe(pubUser);
        }
      }),
      listen(resolvedClient, "user-unpublished", (pubUser, pubMediaType) => {
        if (users.find(user => user.uid === pubUser.uid) && pubMediaType === "audio") {
          unsubscribe(pubUser);
        }
      }),
    ]);
  }, [isConnected, resolvedClient, users]);

  return { audioTracks: tracks, isLoading: isLoading, error: error };
}
