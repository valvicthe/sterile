export interface Track {
  file_path: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
}

export type ActiveTab = 'now-playing' | 'library' | 'artists' | 'playlists';
