# EhInvoiceMassive

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


-------
## Creación de carpetas environments 
* se debe crear 1 carpeta dentro del src con el nombre *environments*
* dentro de *environments* crear dos archivos 
* environment.prod.ts => producción
* environment.ts => desarrollo
* dentro de ella se ingresará el siguiente código

export const environment = {

    configuración  

};

### configuración:
| Variables: Tipo   			| Información    			    |
| :------------- 		        | :--------- 			        |
|production: boolean            |                               |
|debug: boolean                 | //cuando esté en false ejecutar en el servidor de pruebas, pero apuntando a mapas en producción       |
|appName: String                |                               |
|companyName: String            |                               |
|apiTransverseSecurity: String  |                               |
|keyTransverseSecurity: String  |                               |
|apiBackend: String             |                               |
|urlFiles: String               |                               |
|urlPublicFiles: String         |                               |
|urlFrontendST: String          |                               |
|urlEhmap: String               |                               |
|urlapp: String                 |                               |