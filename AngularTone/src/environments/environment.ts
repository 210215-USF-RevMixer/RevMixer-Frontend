// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  USERS_REST: 'https://revmixerapi.azurewebsites.net/api/User',
  UPLOAD_MUSIC_REST: 'https://revmixerapi.azurewebsites.net/api/UploadedMusic',
  COMMENT_REST: 'https://revmixerapi.azurewebsites.net/api/Comments',
  SAVED_PROJECTS_REST: 'https://revmixerapi.azurewebsites.net/api/SavedProjects',
  PLAYLIST_REST: 'https://revmixerapi.azurewebsites.net/api/Playlist',
  AZURE_REST: 'https://revmixerapi.azurewebsites.net/api/AzureBlob',
  AZURE_STORAGE: 'https://revmixerstorage.blob.core.windows.net/revmixersongs'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
