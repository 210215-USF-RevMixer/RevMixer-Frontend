import { Sample } from "./Sample"
import { User } from "./User";

export interface SampleSet{
    id: number,
    name: string,
    userId: number,
    isPrivate: boolean,
    user: User,
    samples: Sample[],
}