import { Track } from '../types';

interface PlayerBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
}

export default function PlayerBar({ currentTrack, isPlaying, currentTime, onTogglePlay, onSeek }: PlayerBarProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="h-16 w-full bg-zinc-950 border-t border-zinc-900 px-6 flex items-center justify-between font-mono text-[11px] text-zinc-400 select-none">
      <div className="w-1/4 truncate">
        {currentTrack ? (
          <div className="truncate">
            <span className="text-white block truncate">{currentTrack.title}</span>
            <span className="text-zinc-600 text-[10px] block truncate">{currentTrack.artist}</span>
          </div>
        ) : (
          <span className="text-zinc-700">SYSTEM_IDLE</span>
        )}
      </div>

      <div className="w-2/4 flex flex-col items-center gap-1">
        <button 
          onClick={onTogglePlay} 
          className="text-white hover:text-zinc-300 font-bold tracking-widest text-[10px]"
        >
          {isPlaying ? "[ PAUSE ]" : "[ PLAY ]"}
        </button>
        
        <div className="w-full flex items-center gap-2">
          <span className="text-[9px] text-zinc-600">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={currentTrack ? currentTrack.duration / 1000 : 100}
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="flex-1 accent-white bg-zinc-800 h-[2px] cursor-pointer appearance-none"
            disabled={!currentTrack}
          />
          <span className="text-[9px] text-zinc-600">
            {currentTrack ? formatTime(currentTrack.duration / 1000) : "0:00"}
          </span>
        </div>
      </div>

      <div className="w-1/4 text-right text-zinc-700 text-[9px]">
        ENG_MODE: RAW_OUTPUT
      </div>
    </div>
  );
}
