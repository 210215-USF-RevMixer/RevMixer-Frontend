import { Track } from "./Track";
import { User } from "./User";

//needs to be finished -Tate
export interface Sample
{
    id: number,
    userId: number,
    sampleName: string,
    sampleLink: string,
    isPrivate: boolean,
    isApproved: boolean,
    isLocked: boolean,

    user: User,
    tracks: Track[]
}