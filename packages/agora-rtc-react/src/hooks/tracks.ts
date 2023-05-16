import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  MicrophoneAudioTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";

import type { AsyncTaskRunner } from "../utils";

import { useEffect, useRef, useState } from "react";
import { createAsyncTaskRunner, interval, joinDisposers } from "../utils";
import { listen } from "../listen";
import { useRTCClient } from "./context";
import { useIsConnected } from "./client";
import { useAsyncEffect } from "./tools";

interface massUserProps {
  user: IAgoraRTCRemoteUser;
  mediaType: "audio" | "video";
}

/**
 * Auto-subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "video",
  client?: IAgoraRTCClient | null,
): IRemoteVideoTrack | undefined;
/**
 * Auto-subscribe and get remote user audio track.
 * Unsubscribe track on unmount.
 */
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "audio",
  client?: IAgoraRTCClient | null,
): IRemoteAudioTrack | undefined;
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "video" | "audio",
  client?: IAgoraRTCClient | null,
): IRemoteVideoTrack | IRemoteAudioTrack | undefined {
  const resolvedClient = useRTCClient(client);
  const trackName = mediaType === "audio" ? "audioTrack" : "videoTrack";
  const [track, setTrack] = useState(user && user[trackName]);
  const isConnected = useIsConnected();
  const runnerRef = useRef<AsyncTaskRunner | undefined>();

  useEffect(() => {
    if (!user || !isConnected) return;

    let isUnmounted = false;

    const hasTrack = mediaType === "audio" ? "hasAudio" : "hasVideo";
    const uid = user.uid;

    const unsubscribe = async (
      user: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video",
    ): Promise<void> => {
      if (user[trackName] && resolvedClient.remoteUsers.some(({ uid }) => user.uid === uid)) {
        try {
          await resolvedClient.unsubscribe(user, mediaType);
        } catch (error) {
          console.error(error);
        }
      }
      if (!isUnmounted) {
        setTrack(void 0);
      }
    };

    const subscribe = async (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
      try {
        if (!user[trackName] && resolvedClient.remoteUsers.some(({ uid }) => user.uid === uid)) {
          await resolvedClient.subscribe(user, mediaType);
        }
        if (!isUnmounted) {
          setTrack(user[trackName]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const runner = (runnerRef.current ||= createAsyncTaskRunner());

    if (!user[trackName] && user[hasTrack]) {
      runner.run(() => subscribe(user, mediaType));
    } else {
      setTrack(user[trackName]);
    }

    return joinDisposers([
      () => {
        isUnmounted = true;
        runner.dispose();
      },
      listen(resolvedClient, "user-published", (pubUser, pubMediaType) => {
        if (pubUser.uid === uid && pubMediaType === mediaType) {
          runner.run(() => subscribe(pubUser, mediaType));
        }
      }),
      listen(resolvedClient, "user-unpublished", (pubUser, pubMediaType) => {
        if (pubUser.uid === uid && pubMediaType === mediaType) {
          runner.run(() => unsubscribe(pubUser, mediaType));
        }
      }),
    ]);
  }, [isConnected, resolvedClient, user, mediaType, trackName]);

  return track;
}

/**
 * Reports volume of a videoTrack every second.
 *
 * @param audioTrack Local/Remote audio track. `volumeLevel` is 0 if undefined.
 * @returns The volume of the track, ranging from 0 to 1
 */
export function useVolumeLevel(audioTrack?: IRemoteAudioTrack | ILocalAudioTrack): number {
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    if (audioTrack) {
      return interval(() => {
        setVolumeLevel(audioTrack.getVolumeLevel());
      }, 1000);
    }
  }, [audioTrack]);

  return volumeLevel;
}

/**
 * Auto-subscribe and get remote user audio track.
 * Unsubscribe track on unmount.
 */
export function useRemoteAudioTracks(
  users: IAgoraRTCRemoteUser[] | undefined,
  client?: IAgoraRTCClient | null,
): IRemoteAudioTrack[] {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteAudioTrack[]>([]);
  const isConnected = useIsConnected();
  const nextTracks = useRef<IRemoteAudioTrack[]>([]);

  useAsyncEffect(async () => {
    if (!users || !isConnected) return;
    let isUnmounted = false;
    const subscribe = async (user: IAgoraRTCRemoteUser) => {
      if (!user.audioTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          await resolvedClient.subscribe(user, "audio");
        } catch (error) {
          console.error(error);
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

        if (!isUnmounted) {
          setTracks(nextTracks.current);
        }
      }
    };

    const unsubscribe = async (user: IAgoraRTCRemoteUser): Promise<void> => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmounted) {
          nextTracks.current = nextTracks.current.filter(track => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          await resolvedClient.unsubscribe(user, "audio");
        } catch (error) {
          console.error(error);
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
      if (users && users.length > 0 && !users.some(user => user.uid === track.getUserId())) {
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
      await resolvedClient.massUnsubscribe(unsubscribeList);
      if (!isUnmounted) {
        setTracks(nextTracks.current.slice());
      }
    }

    return joinDisposers([
      () => {
        isUnmounted = true;
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
  }, [isConnected, resolvedClient, users]);

  return tracks;
}

/**
 * Auto-subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
export function useRemoteVideoTracks(
  users: IAgoraRTCRemoteUser[] | undefined,
  client?: IAgoraRTCClient | null,
): IRemoteVideoTrack[] {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteVideoTrack[]>([]);
  const isConnected = useIsConnected();
  const nextTracks = useRef<IRemoteVideoTrack[]>([]);

  useAsyncEffect(async () => {
    if (!users || !isConnected) return;
    let isUnmounted = false;
    const subscribe = async (user: IAgoraRTCRemoteUser) => {
      if (!user.videoTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          await resolvedClient.subscribe(user, "video");
        } catch (error) {
          console.error(error);
        }

        if (user.videoTrack && !nextTracks.current.some(track => track.getUserId() === user.uid)) {
          nextTracks.current.push(user.videoTrack);
        }

        // when hot update mode, track will change every time, so need to update nextTracks
        nextTracks.current = nextTracks.current.map(track => {
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
        if (!isUnmounted) {
          setTracks(nextTracks.current);
        }
      }
    };

    const unsubscribe = async (user: IAgoraRTCRemoteUser): Promise<void> => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmounted) {
          nextTracks.current = nextTracks.current.filter(track => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          await resolvedClient.unsubscribe(user, "video");
        } catch (error) {
          console.error(error);
        }
      }
    };

    users.map(user => {
      if (!user.videoTrack && user.hasVideo) {
        subscribe(user);
      }
    });

    const unsubscribeList: massUserProps[] = [];
    for (let i = 0; i < nextTracks.current.length; i++) {
      const track = nextTracks.current[i];
      if (users && users.length > 0 && !users.some(user => user.uid === track.getUserId())) {
        const user = resolvedClient.remoteUsers.find(user => user.uid === track.getUserId());
        if (user) {
          unsubscribeList.push({
            user,
            mediaType: "video",
          });
          nextTracks.current.splice(i, 1);
          i--;
        }
      }
    }
    if (unsubscribeList.length > 0) {
      await resolvedClient.massUnsubscribe(unsubscribeList);
      if (!isUnmounted) {
        setTracks(nextTracks.current.slice());
      }
    }

    return joinDisposers([
      () => {
        isUnmounted = true;
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
  }, [isConnected, resolvedClient, users]);
  return tracks;
}

/**
 * a hook can create a local video track
 * unpublish track on unmount.
 */
export function useLocalVideoTrack(
  ready = true,
  client?: IAgoraRTCClient,
): ICameraVideoTrack | null {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = useState<ICameraVideoTrack | null>(null);

  useAsyncEffect(async () => {
    let isUnmounted = false;

    if (!isUnmounted) {
      if (isConnected && ready && !track) {
        setTrack(await AgoraRTC.createCameraVideoTrack());
      }
      if (!isConnected) {
        setTrack(null);
      }
    }

    return () => {
      isUnmounted = true;
    };
  }, [isConnected, ready]);
  return track;
}

/**
 * a hook can create a local audio track
 * close track on unmount.
 */
export function useLocalAudioTrack(
  ready = true,
  audioTrackConfig: MicrophoneAudioTrackInitConfig = { ANS: true, AEC: true },
  client?: IAgoraRTCClient,
): IMicrophoneAudioTrack | null {
  const isConnected = useIsConnected(client);

  const [track, setTrack] = useState<IMicrophoneAudioTrack | null>(null);

  useAsyncEffect(async () => {
    let isUnmounted = false;

    if (!isUnmounted) {
      if (isConnected && ready && !track) {
        setTrack(await AgoraRTC.createMicrophoneAudioTrack(audioTrackConfig));
      }
      if (!isConnected) {
        setTrack(null);
      }
    }

    return () => {
      isUnmounted = true;
    };
  }, [isConnected, ready]);
  return track;
}

/**
 * publish tacks when readyToPublish is true
 * unpublish on unmount.
 */
export function usePublish(
  tracks: (ILocalTrack | null)[],
  readyToPublish = true,
  client?: IAgoraRTCClient,
): void {
  const resolvedClient = useRTCClient(client);
  const isConnected = useIsConnected(client);
  //maintain an internal ref to track published
  const pubTracks = useRef<(ILocalTrack | null)[]>([]);
  tracks = tracks.filter(track => track !== null && track !== undefined);

  useAsyncEffect(async () => {
    if (!resolvedClient || !isConnected || !readyToPublish) {
      return;
    }
    const baseCheck = (_track: ILocalTrack): boolean => {
      return (
        // need wait web sdk update
        // !(resolvedClient["mode"] === "live" && resolvedClient["role"] === "audience")
        true
      );
    };
    const isPublished = (track: ILocalTrack): boolean => {
      return pubTracks.current.some(
        pubTrack => pubTrack && pubTrack.getTrackId() === track.getTrackId(),
      );
    };
    const canPublish = (track: ILocalTrack): boolean => {
      return baseCheck(track) && track.enabled && readyToPublish && !isPublished(track);
    };

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (track) {
        if (canPublish(track)) {
          try {
            await resolvedClient.publish(track);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
    pubTracks.current = tracks;

    // published tracks will be unpublished on unmount by useJoin
  }, [isConnected, readyToPublish, resolvedClient, tracks]);
}
