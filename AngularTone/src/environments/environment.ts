// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  USERS_REST: 'https://revmixerapi.azurewebsites.net/api/User',
  UPLOAD_MUSIC_REST: 'https://revmixmusic.azurewebsites.net/api/UploadMusic',
  COMMENT_REST: 'https://revmixerapi.azurewebsites.net/api/Comments',
  SAVED_PROJECTS_REST: 'https://revmixerapi.azurewebsites.net/api/SavedProjects',
  PLAYLIST_REST: 'https://revmixerapi.azurewebsites.net/api/Playlist',
  AZURE_REST: 'https://revmixerapi.azurewebsites.net/api/AzureBlob',
  AZURE_STORAGE: 'https://revmixerstorage2.blob.core.windows.net/revmixersongs',
  MUSIC_PLAYLIST_REST: 'https://revmixerapi.azurewebsites.net/api/MusicPlaylist',
  DOMAIN: 'revmixer.us.auth0.com',
  CLIENT_ID: 'dkWA6cBjs14xdCEU4vWe3tsH7vRNWwra',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
