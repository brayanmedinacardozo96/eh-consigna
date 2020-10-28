//servidor de pruebas
export const environment = {
  /*
  production: true,
  debug: true, //cuando esté en false ejecutar en el servidor de pruebas, pero apuntando a mapas en producción
  appName: 'Sistema Local de Consignas',
  companyName: 'Electrohuila S.A. - E.S.P.',
  apiTransverseSecurity: 'http://192.9.200.44/back-transverse-security/public/api',
  keyTransverseSecurity: '$2y$10$OjsZGz0JqaUiFvvLHBt1I.sv5oW3bcZTOTavMOqwfAT2TxYhZa1HS',
  apiBackend: 'http://192.9.200.44/back-consignas/public/api',
  urlFiles: 'http://192.9.200.44/back-consignas/',
  urlPublicFiles: 'http://192.9.200.44/back-consignas/public/',
  urlFrontendST: 'http://192.9.200.44/transverse-security/#',
  urlEhmap:'https://enlinea.electrohuila.com.co/ehmaps/circuito',//'http://localhost/ehmaps/circuito',
  urlapp:'https://enlinea.electrohuila.com.co/consignas/#/'
*/

//cuando pase a PRODUCCIÓN
  production: true,
  debug: false, //cuando esté en false ejecutar en el servidor de pruebas, pero apuntando a mapas en producción
  appName: 'Sistema Local de Consignas',
  companyName: 'Electrohuila S.A. - E.S.P.',
  apiTransverseSecurity: 'https://enlinea.electrohuila.com.co/back-transverse-security/public/api',
  keyTransverseSecurity: '$2y$12$R2scCdlaEehOJSkY8po7weQ3aEAQ.i8nL/ap0lxPnNxnrXlL7m.ba',
  apiBackend: 'https://enlinea.electrohuila.com.co/back-consignas/public/api',
  urlFiles: 'https://enlinea.electrohuila.com.co/back-consignas/',
  urlPublicFiles: 'https://enlinea.electrohuila.com.co/back-consignas/public/',
  urlFrontendST: 'https://enlinea.electrohuila.com.co/transverse-security/#',
  urlEhmap:'https://enlinea.electrohuila.com.co/ehmaps/circuito',
  urlapp:'https://enlinea.electrohuila.com.co/consignas/#/'
  
};
