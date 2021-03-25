import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';  
@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {


  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;
  constructor() { }

  msaapPlaylist: Track[] = [
    {
      title: 'Song',
      link: 'https://uploaded-music-revmixer.s3.amazonaws.com/song',
      artist: 'Weston',
      duration: 132
    },
  ]
  ngOnInit(): void {
  }

}
