//needs to be finished -Tate
import { Comments } from "./Comments";
import { MusicPlaylist } from "./MusicPlaylist";
import { User } from "./User";

export interface UploadMusic
{
    id: number,
    userId: number,
    musicFilePath: string,
    name: string,
    uploadDate: Date,
    likes: number,
    plays: number,
    isPrivate: boolean,

    user: User,

    musicPlaylists: MusicPlaylist[],
    comments: Comments[]
}