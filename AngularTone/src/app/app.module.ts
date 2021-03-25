
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAudioPlayerModule } from 'ngx-audio-player';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';


import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { HubComponent } from './Components/pages/hub/hub.component';
import { ProfileComponent } from './Components/pages/profile/profile.component';
import { ChatroomComponent } from './Components/pages/chatroom/chatroom.component';
import { AudioPlayerComponent } from './Components/audio/audio-player/audio-player.component';

@NgModule({
  declarations: [AppComponent, InstrumentComponent, NavbarComponent, FooterComponent, HubComponent, ProfileComponent, ChatroomComponent, AudioPlayerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSliderModule,
    HttpClientModule,
    NgxAudioPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
