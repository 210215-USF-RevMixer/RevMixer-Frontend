import { Component, OnInit } from '@angular/core';
import { PlayList } from 'src/app/Models/PlayList';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';
import { UploadedMusicRestService } from 'src/app/services/uploaded-music-rest.service';
import { UploadMusic } from 'src/app/Models/UploadMusic';
import { Track } from 'ngx-audio-player'; 
import { MusicPlaylist } from 'src/app/Models/MusicPlaylist';
import { MusicPlaylistRestService } from 'src/app/services/music-playlist-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.scss']
})
export class ViewPlaylistComponent implements OnInit {
  selectedPlaylist: PlayList;
  allMusic: UploadMusic [] = [];
  musicPlaylist: any;
  allMusicPlaylist: MusicPlaylist[] = [];
  playlistMusicPlaylist: MusicPlaylist[] =[];
  playlistMusic: UploadMusic[] = [];
  songlink: string = environment.MUSIC_STORAGE;
  constructor(private playlistService: PlaylistServiceService, private activeRoute: ActivatedRoute, 
    private uploadMusicService: UploadedMusicRestService, private musicPlaylistService: MusicPlaylistRestService,
    private route: Router) { 
    this.selectedPlaylist = 
    {
      id: 0,
      userId: 0,
      name: '',
      user: {
        userName: '',
        id: 0,
        email: '',
        role: '',
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []
      },
      musicPlaylists: [],
    }
    this.musicPlaylist =
    {
      id: 0,
      playlistId: 0,
      musicId: 0,
    }
  }
  ngOnInit(): void {
    //Unpack parameters from queryParameters to get selected playlist
    this.activeRoute.queryParams
    .subscribe(
      params =>
      {
        this.playlistService.GetPlaylist(params.id).subscribe(
          foundPlaylist => {
            this.setPlaylist(foundPlaylist);
            //Gets the music playlist for this particular playlist!
            this.SetAllMusicPlaylistToThisPlaylist(foundPlaylist.id);
          }
        )
      }
    );
    //Get all songs from the DB
      this.uploadMusicService.GetUploadedSongs().subscribe(
        (result) =>
        {
          let songs = result;
          this.GetAllSongs(songs);
        }
      )
    //Get songs currently in the playlist
    this.musicPlaylistService.GetAllMusicPlaylists().subscribe(
      (result) =>
      {
        let musicPlaylist2 = result;
        this.GetAllMusicPlaylists(musicPlaylist2);
      }
    )
    //Set music playlist for this playlist
    //this.SetAllMusicPlaylistToThisPlaylist(this.allMusicPlaylist);
  }
  setPlaylist(foundPlaylist: PlayList) {
    this.selectedPlaylist = foundPlaylist;
  }
  GetAllSongs(songs: UploadMusic[]) {
    songs.forEach(song =>
      {
        this.allMusic.push(song);
      })
      console.log('all the musics');
      console.log(this.allMusic);
  }

  //Set all music playlists to this playlist
  SetAllMusicPlaylistToThisPlaylist(playlistID: number) {
    this.musicPlaylistService.GetAllMusicPlaylists().subscribe(
      (result => {
        result.forEach(song => {
          if(song.playListId == playlistID) {
            this.playlistMusicPlaylist.push(song);
          }
        })
        let x = this.playlistMusicPlaylist;
        this.GetUploadedMusicForPlaylist(x);
      })
    )
    console.log(this.playlistMusicPlaylist);
  }
  //Get the uploaded music for this playlist
  GetUploadedMusicForPlaylist(musicPlaylist: MusicPlaylist[]) {
    this.uploadMusicService.GetUploadedSongs().subscribe(
      (result) =>
      {
        let x: UploadMusic[] = result;
        this.ActuallyGetUploadedMusicForPlaylist(musicPlaylist, x);
      }
    )
  }
  //Actually get the uploaded music for this playlist
  ActuallyGetUploadedMusicForPlaylist(musicPlaylist: MusicPlaylist[], songs: UploadMusic[]) {
    songs.forEach(song => {
      musicPlaylist.forEach(playlist => {
        if(song.id ==playlist.musicId)
        {
          this.playlistMusic.push(song);
        }
      })
    })
    console.log('music from playlist')
    console.log(this.playlistMusic);
  }
  //Get all music playlists
  GetAllMusicPlaylists(musicPlaylist2: MusicPlaylist[]) {
    musicPlaylist2.forEach(musicPlaylist => {
        this.allMusicPlaylist.push(musicPlaylist);
    })
    console.log(this.allMusicPlaylist);
  }
  //Add a song to the playlist
  AddSongToPlaylist(id: number) {
    this.musicPlaylist.id = 0;
    this.musicPlaylist.playlistId = this.selectedPlaylist.id;
    this.musicPlaylist.musicId = id;
    this.musicPlaylistService.AddMusicPlaylist(this.musicPlaylist).subscribe();
  }

}
