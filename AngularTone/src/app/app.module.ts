
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { HubComponent } from './Components/pages/hub/hub.component';
import { ProfileComponent } from './Components/pages/profile/profile.component';
import { ChatroomComponent } from './Components/pages/chatroom/chatroom.component';

@NgModule({
  declarations: [AppComponent, InstrumentComponent, NavbarComponent, FooterComponent, HubComponent, ProfileComponent, ChatroomComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
