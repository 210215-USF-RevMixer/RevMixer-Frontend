import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Console } from 'node:console';
import { AmazonS3ApiService } from 'src/app/services/amazon-s3-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  url: string = environment.AMAZON_REST;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private s3Service: AmazonS3ApiService, private http: HttpClient) {
    this.progress = 0,
    this.message = ''
   }

  ngOnInit(): void {

  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this.url, formData, {reportProgress: true, observe: 'events'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        if(event.total){
          this.progress = Math.round(100 * event.loaded / event.total);
        }
      }
      else if (event.type == HttpEventType.Response) {
        this.message = 'Upload success.';
        if(event.body)
        {
        this.onUploadFinished.emit(event.body);
        }
      }

    })
  }



}
