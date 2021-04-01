import { Component, OnInit } from '@angular/core';
import { PlayList } from 'src/app/Models/PlayList';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistServiceService } from 'src/app/services/playlist-service.service';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.scss']
})
export class ViewPlaylistComponent implements OnInit {
  selectedPlaylist: PlayList;

  constructor(private playlistService: PlaylistServiceService, private activeRoute: ActivatedRoute) { 
    this.selectedPlaylist = 
    {
      id: 0,
      userId: 0,
      name: '',
      user: {
        userName: '',
        ID: 0,
        email: '',
        isAdmin: false,
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []
      },
      musicPlaylists: [],
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
          }
        )
      }
    );
  }
  setPlaylist(foundPlaylist: PlayList) {
    this.selectedPlaylist = foundPlaylist;
  }

}
