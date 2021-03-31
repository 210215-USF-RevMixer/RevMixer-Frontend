import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArgumentOutOfRangeError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import { bool } from 'aws-sdk/clients/signer';
import { UploadMusic } from '../Models/UploadMusic';
import { UserMedia } from 'tone';
import { User } from "../Models/User";
import { int } from 'aws-sdk/clients/datapipeline';
import { EMPTY } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

// AWS.config.update(
//   {
//     secretAccessKey: environment.AWS_ACCESS_KEY_SECRET,
//     accessKeyId: environment.AWS_ACCESS_KEY_ID
//   }
// )


@Injectable({
  providedIn: 'root'
})
export class AmazonS3ApiService {


  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
    
  }


  dbsongentry: UploadMusic;

  url: string = environment.UPLOADEDMUSIC_REST;


  constructor(private httpClient: HttpClient) { 
    this.dbsongentry =
    {
      ID: 0,
      userId: 0,
      musicFilePath: "",
      name: "",
      uploadDate: new Date,
      likes: 0,
      plays: 0,
      user: 
      {
        ID: 0,
        userName: "",
        email: "",
        isAdmin: false,
        userProjects: [],
        sample: [],
        comments: [], 
        uploadMusics: [],
        playlists: []
      },
      musicPlaylists: [],
      comments: []
    }

  }


  // uploadSong(song: File): Observable<any> {

  //   }
  //}

  // addDbSongEntry(fileName: , userId: int): Observable<any>
  // {
  //   this.dbsongentry.name = song.name;
  //   this.dbsongentry.musicFilePath = song.name;
  //   this.dbsongentry.userId = userId;
  //   return this.httpClient.post<UploadMusic>(this.url, this.dbsongentry, this.httpOptions)


  // }



}
