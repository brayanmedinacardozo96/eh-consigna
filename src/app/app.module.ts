import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {LoginModule} from './modules/login/login.module';
import {UiModule} from './ui/ui.module';
import {ApiService} from './shared/services/api.service';
import {ValidationService} from './shared/services/validations.service';
import {SnackBarService} from './shared/services/snack-bar.service';
import {FileValidationService} from './shared/services/file-validation.service';
import {DateValidationervice} from './shared/services/date-validations.service';
import {HttpClientModule} from '@angular/common/http';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ConsignaModule} from './modules/consigna/consigna.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TrabajoOportunidadModule} from './modules/trabajo-oportunidad/trabajo-oportunidad.module';
import {ManiobraModule} from './modules/maniobra/maniobra.module';
import {AutorizarModule} from './modules/autorizar/autorizar.module';
import {ParametrosModule} from './modules/parametros/parametros.module';
import {ComunicadoPrensaModule} from "./modules/comunicado-prensa/comunicado-prensa.module";
import {NotifierModule} from "angular-notifier";
import {BitacoraModule} from "./modules/bitacora/bitacora.module";
import {AsignacionSolicitudesModule} from './modules/asignacion-solicitudes/asignacion-solicitudes.module';
import {ActualizarInformacionModule} from './modules/actualizar-informacion/actualizar-informacion.module';
import {ConsolidadoModule} from './modules/consolidado/consolidado.module';
import { ReporteModule } from './modules/reporte/reporte.module';
import { IndicadorZonaComponent } from './modules/indicador-zona/indicador-zona.component';

@NgModule({
  declarations: [
    AppComponent,
    IndicadorZonaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    LoginModule,
    HttpClientModule,
    UiModule,
    DashboardModule,
    ConsignaModule,
    MatSnackBarModule,
    TrabajoOportunidadModule,
    ManiobraModule,
    AutorizarModule,
    ParametrosModule,
    ComunicadoPrensaModule,
    BitacoraModule,
    AsignacionSolicitudesModule,
    ReporteModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'top',
          distance: 100,
          gap: 10,
        }
      }
    }),
    ActualizarInformacionModule,
    ConsolidadoModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ApiService,ValidationService,SnackBarService,FileValidationService,DateValidationervice
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
