import { Track } from '../../types';

export default function NowPlayingView({ currentTrack }: { currentTrack: Track | null }) {
  if (!currentTrack) {
    return (
      <div className="h-full flex items-center justify-center font-mono text-zinc-700 text-[11px]">
        NO_ACTIVE_STREAM_FOUND
      </div>
    );
  }

  return (
    <div className="font-mono text-[11px] text-zinc-400 max-w-xl">
      <div className="border border-zinc-900 p-6 flex flex-col gap-4 bg-black">
        <div>
          <span className="text-zinc-600 block text-[9px] font-bold uppercase">RESOURCE_TITLE</span>
          <span className="text-white text-sm font-bold">{currentTrack.title}</span>
        </div>
        <div>
          <span className="text-zinc-600 block text-[9px] font-bold uppercase">RESOURCE_ARTIST</span>
          <span className="text-zinc-300">{currentTrack.artist}</span>
        </div>
        <div>
          <span className="text-zinc-600 block text-[9px] font-bold uppercase">RESOURCE_ALBUM</span>
          <span className="text-zinc-500">{currentTrack.album}</span>
        </div>
        <div className="border-t border-zinc-900 pt-4 mt-2">
          <span className="text-zinc-600 block text-[9px] font-bold uppercase">LOCAL_SYSTEM_PATH</span>
          <span className="text-zinc-600 block break-all text-[10px] select-all select-none">{currentTrack.file_path}</span>
        </div>
      </div>
    </div>
  );
}
