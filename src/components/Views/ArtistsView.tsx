import { useMemo } from 'react';
import { Track } from '../../types';

export default function ArtistsView({ tracks }: { tracks: Track[] }) {
  const uniqueArtists = useMemo(() => {
    return Array.from(new Set(tracks.map((t) => t.artist))).sort();
  }, [tracks]);

  return (
    <div className="w-full h-full font-mono text-[11px]">
      <div className="mb-4 border-b border-zinc-900 pb-2">
        <span className="text-zinc-500 font-bold">ARTIST_MANIFEST</span>
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto max-h-[70vh]">
        {uniqueArtists.map((artist) => (
          <div key={artist} className="py-1 text-zinc-400 hover:text-white cursor-pointer">
            &gt; {artist}
          </div>
        ))}
      </div>
    </div>
  );
}
