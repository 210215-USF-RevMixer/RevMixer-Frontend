import { PlayList } from "./PlayList";
import { UploadMusic } from "./UploadMusic";

export interface MusicPlaylist
{
    ID: number,
    playlistId: number,
    musicId: number,

    playList: PlayList
    uploadMusic: UploadMusic;
}