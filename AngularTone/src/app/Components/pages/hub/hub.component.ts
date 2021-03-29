import { Component, OnInit } from '@angular/core';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { HubRestService } from 'src/app/services/hub-rest.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  upload: UploadMusic[];
  constructor(private hubService: HubRestService) { 
  
    this.upload =[
    {
      ID: 0,
      userId: 0,
      musicFilePath: '',
      name: '',
      likes: 0,
      plays: 0,
      user:
      {
        ID: 0,
        userName: '',
        email: '',
        isAdmin: false,
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []
      },
      musicPlaylists: [],
      comments: [],
      uploadDate: new Date
    }
  ]
}
    


  ngOnInit(): void {
    this.hubService.GetAllUpload().subscribe
    (
      foundUser =>
      {
        this.upload = foundUser;
      }
    )
  }
  
  GetComments()
  {
    var counter = 0;
    // foundDbComment.forEach(songFound => {
    //   if(counter == 0){
    //     this.audioCollection[counter].artist = songFound.user.email;
    //     this.audioCollection[counter].link = this.S3Bucket + "/" + songFound.musicFilePath;
    //     this.audioCollection[counter].title = songFound.name;
    //     counter++;
    //   }
    //   else {
    //     var fileToAddToPlaylist = new Track;

    //     fileToAddToPlaylist.artist = songFound.user.email;
    //     fileToAddToPlaylist.link = this.S3Bucket + "/" + songFound.musicFilePath;
    //     fileToAddToPlaylist.title = songFound.name;
    //     this.audioCollection.push(fileToAddToPlaylist);
      }
  }
