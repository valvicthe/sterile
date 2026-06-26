import { Track } from '../../types';

interface Props {
  tracks: Track[];
  onPlay: (track: Track) => void;
}

export default function LibraryView({ tracks, onPlay }: Props) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full h-full font-mono text-[11px]">
      <div className="mb-4 flex justify-between items-baseline border-b border-zinc-900 pb-2">
        <span className="text-zinc-500 font-bold">INDEXED_LOCAL_RESOURCES</span>
        <span className="text-zinc-700 text-[10px]">{tracks.length} OBJECTS</span>
      </div>

      <div className="grid grid-cols-12 gap-2 text-zinc-600 font-bold border-b border-zinc-900/60 pb-1 mb-2 text-[10px]">
        <div className="col-span-5">TITLE</div>
        <div className="col-span-4">ARTIST</div>
        <div className="col-span-2">ALBUM</div>
        <div className="col-span-1 text-right">LENGTH</div>
      </div>

      <div className="flex flex-col overflow-y-auto max-h-[68vh] divide-y divide-zinc-950">
        {tracks.map((track, i) => (
          <div
            key={track.file_path}
            onClick={() => onPlay(track)}
            className="grid grid-cols-12 gap-2 py-2 text-zinc-400 hover:bg-zinc-900/40 hover:text-white cursor-pointer transition-colors"
          >
            <div className="col-span-5 truncate flex gap-2">
              <span className="text-zinc-700 w-5">{String(i + 1).padStart(2, '0')}</span>
              <span className="truncate">{track.title}</span>
            </div>
            <div className="col-span-4 truncate text-zinc-500">{track.artist}</div>
            <div className="col-span-2 truncate text-zinc-600">{track.album}</div>
            <div className="col-span-1 text-right text-zinc-600">
              {formatTime(track.duration / 1000)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
