import { invoke } from '@tauri-apps/api/core';
import { ActiveTab, Track } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  setTracks: (tracks: Track[]) => void;
}

export default function Sidebar({ activeTab, setActiveTab, setTracks }: SidebarProps) {
  const menuItems: { id: ActiveTab; label: string }[] = [
    { id: 'now-playing', label: 'NOW_PLAYING' },
    { id: 'library', label: 'ALL_TRACKS' },
    { id: 'artists', label: 'ARTISTS' },
    { id: 'playlists', label: 'PLAYLISTS' },
  ];

  const handleScan = async () => {
    // Explicit path for local folder scan. Adjust to your platform's directory structure.
    const targetDir = "C:/Users/Public/Music"; 
    try {
      // Invokes the 'scan_directory' Rust command in metadata.rs
      const scanned: Track[] = await invoke('scan_directory', { dirPath: targetDir });
      setTracks(scanned);
    } catch (err) {
      console.error("FS_SCAN_ERR:", err);
    }
  };

  return (
    <div className="w-64 h-full bg-black border-r border-zinc-900 flex flex-col justify-between p-6 select-none font-mono">
      <div className="flex flex-col gap-10">
        {/* Clinical Branding */}
        <h1 className="text-xs font-bold tracking-[0.3em] text-white">STERILE // AUDIO</h1>
        
        {/* Strict ASCII-style Navigation Grid */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-left text-[11px] tracking-wider py-1 transition-colors ${
                activeTab === item.id ? 'text-white font-bold' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              [{activeTab === item.id ? 'X' : ' '}] {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Control Nodes */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={handleScan}
          className="w-full text-center text-[10px] border border-zinc-800 text-zinc-400 py-2 hover:bg-zinc-900 transition-colors"
        >
          EXECUTE_DIRECTORY_SCAN
        </button>
        <div className="text-[9px] text-zinc-700 tracking-tighter uppercase">
          SYS_STATUS: LOCAL_ONLY
        </div>
      </div>
    </div>
  );
}
