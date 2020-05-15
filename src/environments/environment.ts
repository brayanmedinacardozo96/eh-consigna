// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: 'Sistema Local de Consignas',
  companyName: 'Electrohuila S.A. - E.S.P.',
  apiTransverseSecurity: 'http://localhost/back-transverse-security/public/api',
  keyTransverseSecurity: '$2y$12$RlpDrLNHdXV/n84cK2D3AeKZyw3YedG6IPhq.i.hW1ZQuvsOwsPWW',
  apiBackend: 'http://localhost/back-en-linea/public/api',
  urlFiles: 'http://localhost/back-en-linea/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
