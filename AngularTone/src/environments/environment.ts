// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  USERSERVICE_USER: 'https://revmix-user-service.azurewebsites.net/api/User',
  USERSERVICE_REPORT: 'https://revmix-user-service.azurewebsites.net/api/Report',
  MUSICSERVICE_UPLOADMUSIC: 'https://revmixmusic.azurewebsites.net/api/UploadMusic',
  MUSICSERVICE_PLAYLIST: 'https://revmixmusic.azurewebsites.net/api/Playlist',
  MUSICSERVICE_MUSICPLAYLIST: 'https://revmixmusic.azurewebsites.net/api/MusicPlaylist',
  MUSICSERVICE_COMMENTS: 'https://revmixmusic.azurewebsites.net/api/Comments',
  PROJECTSERVICE_USERPROJECT: 'https://revmix-project-service.azurewebsites.net/api/UserProject',
  PROJECTSERVICE_SAVEDPROJECT: 'https://revmix-project-service.azurewebsites.net/api/SavedProject',
  PROJECTSERVICE_TRACK: 'https://revmix-project-service.azurewebsites.net/api/Track',
  PROJECTSERVICE_PATTERN: 'https://revmix-project-service.azurewebsites.net/api/Pattern',

  SAMPLE_STORAGE: 'https://revmixerstorage2.blob.core.windows.net/uploadsample',
  MUSIC_STORAGE: 'https://revmixerstorage2.blob.core.windows.net/uploadmusic',

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
