import { Sample } from "./Sample"
import { User } from "./User";

export interface SampleSets{

    id: number,
    userId: number,
    isPrivate: boolean,
    name: string,

    user: User,
    samples: Sample[],
}