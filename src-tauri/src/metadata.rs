use serde::{Serialize, Deserialize};
use id3::{Tag, TagLike};
use walkdir::WalkDir;
use std::path::Path;

#[derive(Serialize, Deserialize, Clone)]
pub struct Track {
    pub file_path: String,
    pub title: String,
    pub artist: String,
    pub album: String,
    pub duration: u32,
}

#[tauri::command]
pub fn scan_directory(dir_path: String) -> Result<Vec<Track>, String> {
    let mut tracks = Vec::new();

    for entry in WalkDir::new(&dir_path).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        if path.is_file() {
            if let Some(ext) = path.extension() {
                if ext == "mp3" || ext == "m4a" || ext == "flac" {
                    let path_str = path.to_string_lossy().into_owned();
                    tracks.push(parse_track_meta(&path_str));
                }
            }
        }
    }
    Ok(tracks)
}

fn parse_track_meta(path: &str) -> Track {
    let fallback_name = Path::new(path)
        .file_stem()
        .map(|s| s.to_string_lossy().into_owned())
        .unwrap_or_else(|| "unknown track".to_string());

    match Tag::read_from_path(path) {
        Ok(tag) => Track {
            file_path: path.to_string(),
            title: tag.title().unwrap_or(&fallback_name).to_string(),
            artist: tag.artist().unwrap_or("unknown artist").to_string(),
            album: tag.album().unwrap_or("unknown album).to_string(),
            duration: tag.duration().unwrap_or(0),
        },
        Err(_) => Track {
            file_path: path.to_string(),
            title: fallback_name,
            artist: "unknown artist".to_string(),
            album: "unknown album".to_string(),
            duration: 0,
        },
    }
}
