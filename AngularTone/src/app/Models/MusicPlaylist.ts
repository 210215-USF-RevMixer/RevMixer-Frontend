import { PlayList } from "./PlayList";
import { UploadMusic } from "./UploadMusic";

export interface MusicPlaylist
{
    id: number,
    playlistId: number,
    musicId: number,

    playList: PlayList
    uploadMusic: UploadMusic;
}