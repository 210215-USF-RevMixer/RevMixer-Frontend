import { SavedProject } from "./SavedProject";
import { User } from "./User";

export interface UserProject
{
    ID: number,
    userId: number,
    projectId: string,
    owner: boolean,
    
    user: User,
    savedProject: SavedProject
}