import { MusicPlaylist } from "./MusicPlaylist";
import { User } from "./User";

//needs to be finished -Tate
export interface PlayList
{
    id: number,
    userId: number,
    name: string,

    user: User,

    musicPlaylists: MusicPlaylist[]
}