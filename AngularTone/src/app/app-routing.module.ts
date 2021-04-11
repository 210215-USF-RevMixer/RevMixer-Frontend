import { CreateSampleSetComponent } from './Components/pages/create-sample-set/create-sample-set.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubComponent } from './Components/pages/hub/hub.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ProfileComponent } from './Components/pages/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { UploadComponent } from './Components/pages/upload/upload.component';
import { CreatePlaylistComponent } from './Components/pages/create-playlist/create-playlist.component';
import { ViewPlaylistComponent } from './Components/pages/view-playlist/view-playlist.component';
import { SampleSetsComponent } from './Components/pages/sample-sets/sample-sets.component';
import { UploadSampleComponent } from './Components/pages/upload-sample/upload-sample.component';
import { ViewSampleSetComponent } from './Components/pages/view-sample-set/view-sample-set.component';


const routes: Routes = [
  {path: '', component: InstrumentComponent},
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
  {path: 'uploadSample', component: UploadSampleComponent, canActivate: [AuthGuard]},
  {path: 'newPlayList', component: CreatePlaylistComponent, canActivate: [AuthGuard]},
  {path: 'viewPlaylist', component: ViewPlaylistComponent, canActivate: [AuthGuard]},
  {path: 'sampleSets', component: SampleSetsComponent, canActivate: [AuthGuard]},
  {path: 'newSampleSet',  component: CreateSampleSetComponent, canActivate: [AuthGuard] },
  {path: 'viewSampleSet', component: ViewSampleSetComponent, canActivate: [AuthGuard]},
  {path: '**', component: InstrumentComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
