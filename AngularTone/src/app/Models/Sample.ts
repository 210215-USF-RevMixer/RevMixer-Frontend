import { Track } from "./Track";


//needs to be finished -Tate
//Finished - Joaquin
export interface Sample
{
    id: number,
    sampleName: string,
    sampleLink: string,
    isPrivate: boolean,
    isApproved: boolean,
    isLocked: boolean,

    tracks: Track[]
}