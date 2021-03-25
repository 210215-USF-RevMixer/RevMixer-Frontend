//needs to be finished -Tate

import { UserProject } from "./UserProject";

export interface User
{
    ID: number,
    userName: string,
    email: string,
    isAdmin: boolean,
    userProject: UserProject[]
}