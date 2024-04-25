// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  EncryptKey:'1203199320052021',
  EncryptIV:'1203199320052021',
  BaseURIFileServer:"http://localhost:8080/",
  BaseUriUser:'http://localhost:34435/',
  BaseUriAdmin:'http://localhost:36099/',
  BaseUriHome:'http://localhost:18157/'
  // BaseURIFileServer:"https://hmstest.patanjaliwellness.com:31003/",
  // BaseUriUser:'https://hmstest.patanjaliwellness.com:31008/user/',
  // BaseUriAdmin:'https://hmstest.patanjaliwellness.com:31009/admin/',
  // BaseUriHome:'https://hmstest.patanjaliwellness.com:31001/home/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
