//needs to be finished -Tate

import { PlayList } from "./PlayList";
import { Sample } from "./Sample";
import { UploadMusic } from "./UploadMusic";
import { UserProject } from "./UserProject";

export interface User
{
    ID: number,
    userName: string,
    email: string,
    isAdmin: boolean,

    userProjects: UserProject[],
    sample: Sample[],
    comments: Comment[],
    uploadMusics: UploadMusic[],
    playlists: PlayList[]
}