import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubComponent } from './Components/pages/hub/hub.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ProfileComponent } from './Components/pages/profile/profile.component';
import { AudioPlayerComponent } from './Components/audio/audio-player/audio-player.component';

const routes: Routes = [
  {path: '', component: InstrumentComponent, data: { title: 'Home' }},
  {path: 'hub', component: HubComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'test', component: AudioPlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
