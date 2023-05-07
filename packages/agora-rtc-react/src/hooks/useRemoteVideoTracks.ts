import type { IAgoraRTCClient, IAgoraRTCRemoteUser, IRemoteVideoTrack } from "agora-rtc-sdk-ng";

import { useCallback, useEffect, useState } from "react";
import { joinDisposers } from "../utils";
import { listen } from "../listen";
import { useRTCClient } from "./context";
import { useIsConnected } from "./client";

/**
 * Auto-subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
export function useRemoteVideoTracks(
  users: IAgoraRTCRemoteUser[] | undefined,
  client?: IAgoraRTCClient | null,
): {
  videoTracks: IRemoteVideoTrack[];
  ready: boolean;
  error: unknown;
} {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteVideoTrack[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const isConnected = useIsConnected();

  const subscribe = useCallback(
    async (user: IAgoraRTCRemoteUser) => {
      try {
        setReady(false);
        if (!user.videoTrack && resolvedClient.remoteUsers.some(({ uid }) => user.uid === uid)) {
          await resolvedClient.subscribe(user, "video");
          // when HMR track will be changed, need update tracks
          let nextTracks = [...tracks];

          if (user.videoTrack && !tracks.some(track => track.getUserId() === user.uid)) {
            nextTracks = [...tracks, user.videoTrack];
          }

          // when HMR track will be changed, need update tracks
          nextTracks = nextTracks.map(track => {
            if (
              user.videoTrack &&
              track.getUserId() === user.uid &&
              track.getTrackId() !== user.videoTrack.getTrackId()
            ) {
              return user.videoTrack;
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
          await resolvedClient.unsubscribe(user, "video");
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
      if (!user.videoTrack && user.hasVideo) {
        subscribe(user);
      }
    });
    removeTrackByUsers();
    return joinDisposers([
      () => {
        setReady(true);
      },
      listen(resolvedClient, "user-published", (pubUser, pubMediaType) => {
        if (users.find(user => user.uid === pubUser.uid) && pubMediaType === "video") {
          subscribe(pubUser);
        }
      }),
      listen(resolvedClient, "user-unpublished", (pubUser, pubMediaType) => {
        if (users.find(user => user.uid === pubUser.uid) && pubMediaType === "video") {
          unsubscribe(pubUser);
        }
      }),
    ]);
  }, [isConnected, removeTrackByUsers, resolvedClient, subscribe, unsubscribe, users]);
  return {
    videoTracks: tracks,
    ready,
    error,
  };
}
