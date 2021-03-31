import { UploadMusic } from "./UploadMusic";
import { User } from "./User";

export interface Comments
{
    Id: number,
    comment: string,
    commentData: Date,
    userId: number,
    uploadMusicId: number,
    
    user: User,
    uploadMusic: UploadMusic
}