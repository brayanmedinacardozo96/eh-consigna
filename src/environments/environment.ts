// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: 'Sistema Local de Consignas',
  companyName: 'Electrohuila S.A. - E.S.P.',
  // apiTransverseSecurity: 'http://localhost:8000/back-transverse-security/public/api',
  apiTransverseSecurity: 'https://enlinea.electrohuila.com.co/transverse-security/#',
  //keyTransverseSecurity: '$2y$10$OjsZGz0JqaUiFvvLHBt1I.sv5oW3bcZTOTavMOqwfAT2TxYhZa1HS',
  keyTransverseSecurity: '$2y$12$BemQm04jgWMJnbNRcQDhneWiOEfWSDfn7a7OjDoTmrd9IxH.Fpem6',
  apiBackend: 'http://localhost:8000/eh-consigna-backend/public/api',
  urlFiles: 'http://localhost:8000/eh-consigna-backend/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
