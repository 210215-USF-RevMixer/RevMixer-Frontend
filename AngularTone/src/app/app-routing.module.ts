import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubComponent } from './Components/pages/hub/hub.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ProfileComponent } from './Components/pages/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { UploadComponent } from './Components/pages/upload/upload.component';
import { CreatePlaylistComponent } from './Components/pages/create-playlist/create-playlist.component';
import { ViewPlaylistComponent } from './Components/pages/view-playlist/view-playlist.component';
import { UploadSampleComponent } from './Components/pages/upload-sample/upload-sample.component';


const routes: Routes = [
  {path: '', component: InstrumentComponent},
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
  {path: 'uploadSample', component: UploadSampleComponent, canActivate: [AuthGuard]},
  {path: 'newPlayList', component: CreatePlaylistComponent, canActivate: [AuthGuard]},
  {path: 'viewPlaylist', component: ViewPlaylistComponent, canActivate: [AuthGuard]},
  {path: '**', component: InstrumentComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
