//needs to be finished -Tate
import { MusicPlaylist } from "./MusicPlaylist";
import { User } from "./User";

export interface UploadMusic
{
    ID: number,
    userId: number,
    musicFilePath: string,
    name: string,
    uploadDate: Date,
    likes: number,
    plays: number,

    user: User,

    musicPlaylists: MusicPlaylist[],
    comments: Comment[]
}