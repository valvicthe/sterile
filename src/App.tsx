import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import LibraryView from './components/Views/LibraryView';
import NowPlayingView from './components/Views/NowPlayingView';
import ArtistsView from './components/Views/ArtistsView';
import PlaylistsView from './components/Views/PlaylistsView';
import { useAudioEngine } from './hooks/useAudioEngine';
import { ActiveTab, Track } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('library');
  const [tracks, setTracks] = useState<Track[]>([]);
  const { currentTrack, isPlaying, currentTime, playTrack, togglePlay, seek } = useAudioEngine();

  return (
    <div className="flex flex-col h-screen w-screen bg-zinc-950 text-white overflow-hidden select-none">
      <div className="flex flex-1 w-full h-[calc(100vh-64px)]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setTracks={setTracks} />
        
        <main className="flex-1 p-8 bg-zinc-950 overflow-y-auto">
          {activeTab === 'library' && <LibraryView tracks={tracks} onPlay={playTrack} />}
          {activeTab === 'now-playing' && <NowPlayingView currentTrack={currentTrack} />}
          {activeTab === 'artists' && <ArtistsView tracks={tracks} />}
          {activeTab === 'playlists' && <PlaylistsView />}
        </main>
      </div>

      <PlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        onTogglePlay={togglePlay}
        onSeek={seek}
      />
    </div>
  );
}
