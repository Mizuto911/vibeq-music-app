import { useEffect, useReducer, useRef } from "react";

interface MusicPlayerState {
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  currentSong?: string;
  duration: number;
  muted: boolean;
  isLoading: boolean;
  isLoop: boolean;
}

type MusicPlayerAction =
  | { type: "SONG_LOAD"; song: string }
  | { type: "SONG_LOADED"; duration: number }
  | { type: "TOGGLE_PLAY" }
  | { type: "SET_PLAYING"; isPlaying: boolean }
  | { type: "UPDATE_TIME"; time: number }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "TOGGLE_MUTE" }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "TOGGLE_LOOP" };

function musicPlayerReducer(
  state: MusicPlayerState,
  action: MusicPlayerAction,
): MusicPlayerState {
  switch (action.type) {
    case "SONG_LOAD": {
      return {
        ...state,
        currentTime: 0,
        currentSong: action.song,
        duration: 0,
        isPlaying: false,
      };
    }
    case "SONG_LOADED": {
      return {
        ...state,
        duration: action.duration,
      };
    }
    case "TOGGLE_PLAY": {
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    }
    case "SET_PLAYING": {
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    }
    case "UPDATE_TIME": {
      return {
        ...state,
        currentTime: action.time,
      };
    }
    case "SET_VOLUME": {
      return {
        ...state,
        volume: action.volume,
      };
    }
    case "TOGGLE_MUTE": {
      return {
        ...state,
        muted: !state.muted,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case "TOGGLE_LOOP": {
      return {
        ...state,
        isLoop: !state.isLoop,
      };
    }
  }
}

export default function useMusicPlayerState() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [player, setPlayerState] = useReducer(musicPlayerReducer, {
    isPlaying: false,
    currentTime: 0,
    volume: 1,
    currentSong: undefined,
    duration: 0,
    muted: false,
    isLoading: false,
    isLoop: false,
  });

  const loadSong = (song: string) =>
    setPlayerState({ type: "SONG_LOAD", song });
  const setDuration = (duration: number) =>
    setPlayerState({ type: "SONG_LOADED", duration });
  const togglePlaying = () => setPlayerState({ type: "TOGGLE_PLAY" });
  const setPlaying = (isPlaying: boolean) =>
    setPlayerState({ type: "SET_PLAYING", isPlaying });
  const updateTime = (time: number) =>
    setPlayerState({ type: "UPDATE_TIME", time });
  const setLoading = (isLoading: boolean) =>
    setPlayerState({ type: "SET_LOADING", isLoading });
  const toggleMute = () => setPlayerState({ type: "TOGGLE_MUTE" });
  const setVolume = (volume: number) =>
    setPlayerState({ type: "SET_VOLUME", volume });
  const toggleLoop = () => setPlayerState({ type: "TOGGLE_LOOP" });

  useEffect(() => {
    if (!audioRef.current) return;
    if (player.isPlaying) {
      audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [player.isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (player.muted) {
      audioRef.current.volume = 0;
      return;
    }
    audioRef.current.volume = player.volume;
  }, [player.volume, player.muted]);

  return {
    audioRef,
    player,
    loadSong,
    setDuration,
    togglePlaying,
    setPlaying,
    updateTime,
    setLoading,
    toggleMute,
    setVolume,
    toggleLoop,
  };
}
