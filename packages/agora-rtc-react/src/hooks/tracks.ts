import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  MicrophoneAudioTrackInitConfig,
} from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useRef, useState } from "react";

import { AgoraRtcReactError } from "../error";
import type { AgoraRTCError } from "../listen";
import { listen } from "../listen";
import type { AsyncTaskRunner } from "../utils";
import { createAsyncTaskRunner, interval, joinDisposers } from "../utils";

import { useIsConnected } from "./client";
import { useRTCClient } from "./context";
import { compareVersion, useAsyncEffect, useIsUnmounted } from "./tools";

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
): { track: IRemoteVideoTrack | undefined; isLoading: boolean; error: AgoraRtcReactError | null };
/**
 * Auto-subscribe and get remote user audio track.
 * Unsubscribe track on unmount.
 */
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "audio",
  client?: IAgoraRTCClient | null,
): { track: IRemoteAudioTrack | undefined; isLoading: boolean; error: AgoraRtcReactError | null };
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "video" | "audio",
  client?: IAgoraRTCClient | null,
): {
  track: IRemoteVideoTrack | IRemoteAudioTrack | undefined;
  isLoading: boolean;
  error: AgoraRtcReactError | null;
} {
  const resolvedClient = useRTCClient(client);
  const trackName = mediaType === "audio" ? "audioTrack" : "videoTrack";
  const [track, setTrack] = useState(user && user[trackName]);
  const isConnected = useIsConnected();
  const runnerRef = useRef<AsyncTaskRunner | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRtcReactError | null>(null);

  useEffect(() => {
    if (!user || !isConnected) return;

    let isUnmounted = false;

    if (!isUnmounted) {
      setError(null);
    }

    const hasTrack = mediaType === "audio" ? "hasAudio" : "hasVideo";
    const uid = user.uid;

    const unsubscribe = async (
      user: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video",
    ): Promise<void> => {
      if (user[trackName] && resolvedClient.remoteUsers.some(({ uid }) => user.uid === uid)) {
        try {
          if (!isUnmounted) {
            setIsLoading(true);
          }
          await resolvedClient.unsubscribe(user, mediaType);
        } catch (err) {
          if (!isUnmounted) {
            setError(new AgoraRtcReactError("IAgoraRTCClient.unsubscribe", err as AgoraRTCError));
          }
          console.error(err);
        }
      }
      if (!isUnmounted) {
        setTrack(void 0);
        setIsLoading(false);
      }
    };

    const subscribe = async (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
      try {
        if (!user[trackName] && resolvedClient.remoteUsers.some(({ uid }) => user.uid === uid)) {
          if (!isUnmounted) {
            setIsLoading(true);
          }
          await resolvedClient.subscribe(user, mediaType);
        }
        if (!isUnmounted) {
          setTrack(user[trackName]);
        }
      } catch (err) {
        if (!isUnmounted) {
          setError(new AgoraRtcReactError("IAgoraRTCClient.subscribe", err as AgoraRTCError));
        }
        console.error(err);
      }
      if (!isUnmounted) {
        setIsLoading(false);
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

  return { track: track, isLoading: isLoading, error: error };
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
): { audioTracks: IRemoteAudioTrack[]; isLoading: boolean; error: AgoraRtcReactError | null } {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteAudioTrack[]>([]);
  const isConnected = useIsConnected();
  const nextTracks = useRef<IRemoteAudioTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRtcReactError | null>(null);
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
            setError(new AgoraRtcReactError("IAgoraRTCClient.subscribe", err as AgoraRTCError));
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
            setError(new AgoraRtcReactError("IAgoraRTCClient.unsubscribe", err as AgoraRTCError));
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
          setError(new AgoraRtcReactError("IAgoraRTCClient.massUnsubscribe", err as AgoraRTCError));
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

/**
 * Auto-subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
export function useRemoteVideoTracks(
  users: IAgoraRTCRemoteUser[] | undefined,
  client?: IAgoraRTCClient | null,
): { videoTracks: IRemoteVideoTrack[]; isLoading: boolean; error: AgoraRtcReactError | null } {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteVideoTrack[]>([]);
  const isConnected = useIsConnected();
  const nextTracks = useRef<IRemoteVideoTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRtcReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setError(null);
    }

    if (!Array.isArray(users) || !isConnected) return;
    const subscribe = async (user: IAgoraRTCRemoteUser) => {
      if (!user.videoTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          if (!isUnmountRef.current) {
            setIsLoading(true);
          }
          await resolvedClient.subscribe(user, "video");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRtcReactError("IAgoraRTCClient.subscribe", err as AgoraRTCError));
          }
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
          await resolvedClient.unsubscribe(user, "video");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRtcReactError("IAgoraRTCClient.unsubscribe", err as AgoraRTCError));
          }
        }
        if (!isUnmountRef.current) {
          setIsLoading(false);
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
      if (!users.some(user => user.uid === track.getUserId())) {
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
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        await resolvedClient.massUnsubscribe(unsubscribeList);
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(new AgoraRtcReactError("IAgoraRTCClient.massUnsubscribe", err as AgoraRTCError));
        }
      }
      if (!isUnmountRef.current) {
        setTracks(nextTracks.current.slice());
        setIsLoading(false);
      }
    }

    return joinDisposers([
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
  return { videoTracks: tracks, isLoading: isLoading, error: error };
}

/**
 * a hook can create a local video track, this track will only be created once until Component is destroyed.
 * when you ready to create track, set ready to true.
 * unpublish track on unmount.
 */
export function useLocalCameraTrack(
  ready = true,
  client?: IAgoraRTCClient,
): {
  localCameraTrack: ICameraVideoTrack | null;
  isLoading: boolean;
  error: AgoraRtcReactError | null;
} {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = useState<ICameraVideoTrack | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRtcReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setIsLoading(false);
      setError(null);
    }

    if (isConnected && ready && !track) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        const result = await AgoraRTC.createCameraVideoTrack();
        if (!isUnmountRef.current) {
          setTrack(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRtcReactError("IAgoraRTC.createCameraVideoTrack", err as AgoraRTCError),
          );
        }
      }
      if (!isUnmountRef.current) {
        setIsLoading(false);
      }
    }
    if (!isConnected && !isUnmountRef.current) {
      setTrack(null);
    }
  }, [isConnected, ready]);
  return { localCameraTrack: track, isLoading: isLoading, error: error };
}

/**
 * a hook can create a local audio track, this track will only be created once until Component is destroyed.
 * when you ready to create track, set ready to true.
 * close track on unmount.
 */
export function useLocalMicrophoneTrack(
  ready = true,
  audioTrackConfig: MicrophoneAudioTrackInitConfig = { ANS: true, AEC: true },
  client?: IAgoraRTCClient,
): {
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
  isLoading: boolean;
  error: AgoraRtcReactError | null;
} {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRtcReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (isConnected && ready && !track) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        const result = await AgoraRTC.createMicrophoneAudioTrack(audioTrackConfig);
        if (!isUnmountRef.current) {
          setTrack(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRtcReactError("IAgoraRTC.createMicrophoneAudioTrack", err as AgoraRTCError),
          );
        }
      }
      if (!isUnmountRef.current) {
        setIsLoading(false);
      }
    }
    if (!isConnected && !isUnmountRef.current) {
      setTrack(null);
    }
  }, [isConnected, ready]);
  return { localMicrophoneTrack: track, isLoading: isLoading, error: error };
}

/**
 * publish tacks when readyToPublish is true
 * unpublish on unmount.
 */
export function usePublish(
  tracks: (ILocalTrack | null)[],
  readyToPublish = true,
  client?: IAgoraRTCClient,
): {
  isLoading: boolean;
  error: AgoraRtcReactError | null;
} {
  const resolvedClient = useRTCClient(client);
  const isConnected = useIsConnected(client);
  //maintain an internal ref to track published
  const pubTracks = useRef<(ILocalTrack | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRtcReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setIsLoading(false);
      setError(null);
    }
    if (!resolvedClient || !isConnected || !readyToPublish) {
      return;
    }

    const filterTracks = tracks.filter(Boolean);
    const baseCheck = (_track: ILocalTrack): boolean => {
      return compareVersion(AgoraRTC.VERSION, "4.18.1") >= 0
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          resolvedClient.mode !== "live" || resolvedClient.role !== "audience"
        : true;
    };
    const isPublished = (track: ILocalTrack): boolean => {
      return pubTracks.current.some(
        pubTrack => pubTrack && pubTrack.getTrackId() === track.getTrackId(),
      );
    };
    const canPublish = (track: ILocalTrack): boolean => {
      return baseCheck(track) && track.enabled && readyToPublish && !isPublished(track);
    };

    for (let i = 0; i < filterTracks.length; i++) {
      const track = filterTracks[i];
      if (track) {
        if (canPublish(track)) {
          try {
            if (!isUnmountRef.current) {
              setIsLoading(true);
            }
            await resolvedClient.publish(track);
          } catch (err) {
            console.error(err);
            if (!isUnmountRef.current) {
              setError(new AgoraRtcReactError("IAgoraRTCClient.publish", err as AgoraRTCError));
            }
          }
          if (!isUnmountRef.current) {
            setIsLoading(false);
          }
        }
      }
    }
    pubTracks.current = filterTracks;

    // published tracks will be unpublished on unmount by useJoin
  }, [isConnected, readyToPublish, resolvedClient, tracks]);

  return { isLoading: isLoading, error: error };
}
