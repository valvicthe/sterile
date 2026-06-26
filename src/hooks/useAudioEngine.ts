import { useState, useEffect } from 'react';
import { convertFileSrc } from '@tauri-apps/api/core';
import { Track } from '../types';

export function useAudioEngine() {
  const [audio] = useState(new Audio());
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    audio.src = convertFileSrc(track.file_path);
    audio.play().catch((err) => console.error("AUDIO_STREAM_ERR:", err));
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("AUDIO_STREAM_ERR:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (seconds: number) => {
    audio.currentTime = seconds;
    setCurrentTime(seconds);
  };

  return { currentTrack, isPlaying, currentTime, playTrack, togglePlay, seek };
}
