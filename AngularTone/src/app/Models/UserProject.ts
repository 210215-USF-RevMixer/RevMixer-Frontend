import { SavedProject } from "./SavedProject";
import { User } from "./User";

export interface UserProject
{
    id: number,
    userId: number,
    projectId: number,
    owner: boolean,
    
    user: User,
    savedProject: SavedProject
}