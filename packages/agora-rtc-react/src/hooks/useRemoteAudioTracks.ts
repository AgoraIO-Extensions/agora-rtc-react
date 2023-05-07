import type { IAgoraRTCClient, IAgoraRTCRemoteUser, IRemoteAudioTrack } from "agora-rtc-sdk-ng";

import { useCallback, useEffect, useState } from "react";
import { joinDisposers } from "../utils";
import { listen } from "../listen";
import { useRTCClient } from "./context";
import { useIsConnected } from "./client";

/**
 * Auto-subscribe and get remote user audio track.
 * Unsubscribe track on unmount.
 */
export function useRemoteAudioTracks(
  users: IAgoraRTCRemoteUser[] | undefined,
  client?: IAgoraRTCClient | null,
): {
  audioTracks: IRemoteAudioTrack[];
  ready: boolean;
  error: unknown;
} {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteAudioTrack[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const isConnected = useIsConnected();

  const subscribe = useCallback(
    async (user: IAgoraRTCRemoteUser) => {
      try {
        setReady(false);
        if (!user.audioTrack && resolvedClient.remoteUsers.some(({ uid }) => user.uid === uid)) {
          await resolvedClient.subscribe(user, "audio");
          // when HMR track will be changed, need update tracks
          let nextTracks = [...tracks];

          if (user.audioTrack && !tracks.some(track => track.getUserId() === user.uid)) {
            nextTracks = [...tracks, user.audioTrack];
          }

          // when HMR track will be changed, need update tracks
          nextTracks = nextTracks.map(track => {
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
          setTracks(nextTracks);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    },
    [resolvedClient, tracks],
  );

  const unsubscribe = useCallback(
    async (user: IAgoraRTCRemoteUser): Promise<void> => {
      try {
        setReady(false);
        if (resolvedClient.remoteUsers.some(({ uid }) => user.uid === uid)) {
          setTracks(tracks.filter(track => track.getUserId() !== user.uid));
          await resolvedClient.unsubscribe(user, "audio");
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    },
    [resolvedClient, tracks],
  );

  const removeTrackByUsers = useCallback(() => {
    tracks.forEach(track => {
      if (users && users.length > 0 && !users.some(user => user.uid === track.getUserId())) {
        const user = resolvedClient.remoteUsers.find(user => user.uid === track.getUserId());
        if (user) {
          unsubscribe(user);
        }
      }
    });
  }, [tracks, resolvedClient, unsubscribe, users]);

  useEffect(() => {
    if (!users || !isConnected) return;

    users.forEach(user => {
      if (!user.audioTrack && user.hasAudio) {
        subscribe(user);
      }
    });
    removeTrackByUsers();
    return joinDisposers([
      () => {
        setReady(true);
      },
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
  }, [isConnected, removeTrackByUsers, resolvedClient, subscribe, unsubscribe, users]);
  return {
    audioTracks: tracks,
    ready,
    error,
  };
}
