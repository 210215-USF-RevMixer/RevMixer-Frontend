import { Component, OnInit } from '@angular/core';
import { Console } from 'node:console';
import { AmazonS3ApiService } from 'src/app/services/amazon-s3-api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  fileToUpload: any = null;

  constructor(private s3Service: AmazonS3ApiService) {

   }

  ngOnInit(): void {



  }


  uploadFileToAWS() {
    const userId = 1;
    this.s3Service.uploadSong(this.fileToUpload, userId).subscribe(data => {
      console.log('file uploaded successfully');
      
    }, error => {
      console.log(error);
    })
  }

  handleFileInput(event: any){
    this.fileToUpload = event.target.files(0);
  }

}
