import { Track } from "./Track";
import { User } from "./User";

//needs to be finished -Tate
export interface Sample
{
    ID: number,
    userId: number,
    sampleName: string,
    sampleLink: string,

    user: User,
    tracks: Track[]
}