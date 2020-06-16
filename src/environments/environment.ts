// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: 'Sistema Local de Consignas',
  companyName: 'Electrohuila S.A. - E.S.P.',
  apiTransverseSecurity: 'http://192.9.200.44/back-transverse-security/public/api',
  keyTransverseSecurity: '$2y$10$OjsZGz0JqaUiFvvLHBt1I.sv5oW3bcZTOTavMOqwfAT2TxYhZa1HS',
  apiBackend: 'http://localhost/back-consigna/public/api',
  urlFiles: 'http://localhost/back-consigna/',
  urlFrontendST: 'http://192.9.200.44/transverse-security/#',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
