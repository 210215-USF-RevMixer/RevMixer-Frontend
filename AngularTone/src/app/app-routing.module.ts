import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubComponent } from './Components/pages/hub/hub.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ProfileComponent } from './Components/pages/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AudioPlayerComponent } from './Components/audio/audio-player/audio-player.component';
import { UploadComponent } from './Components/pages/upload/upload.component';
import { CreatePlaylistComponent } from './Components/pages/create-playlist/create-playlist.component';


const routes: Routes = [
  {path: '', component: InstrumentComponent},
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'test', component: AudioPlayerComponent, canActivate: [AuthGuard]},
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
  {path: 'newPlayList', component: CreatePlaylistComponent, canActivate: [AuthGuard]},
  {path: '**', component: InstrumentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
