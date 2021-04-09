
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';


import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { HubComponent } from './Components/pages/hub/hub.component';
import { ProfileComponent } from './Components/pages/profile/profile.component';
import { ChatroomComponent } from './Components/pages/chatroom/chatroom.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './Components/auth-button/auth-button.component';
import { AudioPlayerComponent } from './Components/audio/audio-player/audio-player.component';
import { UploadComponent } from './Components/pages/upload/upload.component';
import { CommentComponent } from './Components/comment/comment.component';
import { LikebtnComponent } from './Components/likebtn/likebtn.component';
import { CreatePlaylistComponent } from './Components/pages/create-playlist/create-playlist.component';
import { ViewPlaylistComponent } from './Components/pages/view-playlist/view-playlist.component';
import { SampleSetsComponent } from './Components/pages/sample-sets/sample-sets.component';
import { UploadSampleComponent } from './Components/pages/upload-sample/upload-sample.component';
import { CreateSampleSetComponent } from './Components/pages/create-sample-set/create-sample-set.component';
import { EditSongsComponent } from './Components/pages/edit-songs/edit-songs.component';

@NgModule({
  declarations: [AppComponent, InstrumentComponent, NavbarComponent, FooterComponent, HubComponent, ProfileComponent, ChatroomComponent, AudioPlayerComponent, AuthButtonComponent, UploadComponent, CommentComponent, LikebtnComponent, CreatePlaylistComponent, ViewPlaylistComponent, SampleSetsComponent, UploadSampleComponent, CreateSampleSetComponent, EditSongsComponent],





  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSliderModule,
    MatSelectModule,
    HttpClientModule,
    NgxAudioPlayerModule,
    FormsModule,
    AuthModule.forRoot(
      {
        domain: environment.DOMAIN,
        clientId: environment.CLIENT_ID
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
