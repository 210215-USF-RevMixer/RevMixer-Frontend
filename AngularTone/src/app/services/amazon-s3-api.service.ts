import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import { bool } from 'aws-sdk/clients/signer';
import { UploadMusic } from '../Models/UploadMusic';
import { UserMedia } from 'tone';
import { User } from "../Models/User";
import { int } from 'aws-sdk/clients/datapipeline';
import { EMPTY } from 'rxjs';

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
      ID: 1,
      userId: 1,
      musicFilePath: "cool_song",
      name: "Jumping Jacks",
      uploadDate: new Date,
      likes: 3409,
      plays: 90845,
      user: 
      {
        ID: 0,
        userName: "jlong",
        email: "jacklong@gmail.com",
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

  uploadSong(song: File, userId: int): Observable<any> {
    var result = true;
    const contentType = song.type;
    const bucket = new S3 (
      {
        secretAccessKey: environment.AWS_ACCESS_KEY_SECRET,
        accessKeyId: environment.AWS_ACCESS_KEY_ID
      }
    );
    const params = {
      Bucket: 'uploaded-music-revmixer',
      Key: song.name,
      Body: song,
      ACL: 'public-read',
      ContentType: contentType
    };
    bucket.upload(params, function (err:any, data:any) {
      if (err) {
        console.log('error uploading file: ', err);
        result = false;
      }
      console.log('successfully uploaded file', data);
      result = true;
    })

    if(result == true)
    {
      return this.addDbSongEntry(song, userId);
    }
    else{
      return EMPTY;
    }
  }

  addDbSongEntry(song: File, userId: int): Observable<any>
  {
    this.dbsongentry.name = song.name;
    this.dbsongentry.musicFilePath = song.name;
    this.dbsongentry.userId = userId;
    return this.httpClient.post<UploadMusic>(this.url, this.dbsongentry, this.httpOptions)


  }



}
