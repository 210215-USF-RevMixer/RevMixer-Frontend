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
  // selectedPlaylist: PlayList;
  allMusic: UploadMusic[] = [];
  musicPlaylist: any[] = [];

  musicStorage: string = environment.MUSIC_STORAGE;
  song2Add: any;
  playlist: any[];
  constructor(private playlistService: PlaylistServiceService, private activeRoute: ActivatedRoute,
    private uploadMusicService: UploadedMusicRestService, private musicPlaylistService: MusicPlaylistRestService,
    private route: Router) {
    this.playlist = []
    this.song2Add = {
      id: 0,
      playListId: 0,
      musicId: 0,
    }
  }
  ngOnInit(): void {
    this.uploadMusicService.GetUploadedSongs().subscribe(
      allSongs => {
        for (let i = 0; i < allSongs.length; i++) {
          this.allMusic.push(allSongs[i])
        }
      }
    )

    this.activeRoute.queryParams.subscribe(
      params => {
        this.playlistService.GetPlaylist(params.id).subscribe(
          currentPlaylist => {
            currentPlaylist.musicPlaylist.forEach(song => {
              this.uploadMusicService.GetSongById(song.musicId).subscribe(
                currentSong => {
                  this.playlist.push(currentSong)
                }
              )
            })
          }
        )
      }
    )

  }

  AddSongToPlaylist(song: any) {
    this.activeRoute.queryParams.subscribe(
      params => {
        this.song2Add.playListId = parseInt(params.id)
        this.song2Add.musicId = song.id
        this.musicPlaylistService.AddMusicPlaylist(this.song2Add).subscribe()
        this.playlist.push(song)
      }
    )
  }

  RemoveSongFromPlaylist(song: any){
    this.activeRoute.queryParams.subscribe(
      params => {
        this.musicPlaylistService.GetAllMusicPlaylists().subscribe(
          results =>
          {
            results.forEach(result =>
              {
                if(result.playListId == params.id && result.musicId == song.id)
                {
                  this.musicPlaylistService.DeleteMusicPlaylistById(result.id).subscribe()
                  this.playlist.splice(this.playlist.indexOf(song), 1)
                }
              })
          }
          )
      }
    )
  }
}