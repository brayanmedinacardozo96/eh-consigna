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
import {GenerateInvoicesModule} from './modules/generate-invoices/generate-invoices.module';
import {HistoryInvoicesModule} from './modules/history-invoices/history-invoices.module';
import {ConsignaModule} from './modules/consigna/consigna.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TrabajoOportunidadModule} from './modules/trabajo-oportunidad/trabajo-oportunidad.module';
import {ManiobraModule} from './modules/maniobra/maniobra.module';
import {AutorizarModule} from './modules/autorizar/autorizar.module';
import {ParametrosModule} from './modules/parametros/parametros.module';
import {ComunicadoPrensaModule} from "./modules/comunicado-prensa/comunicado-prensa.module";
import {NotifierModule} from "angular-notifier";

@NgModule({
  declarations: [
    AppComponent,
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
    GenerateInvoicesModule,
    HistoryInvoicesModule,
    ConsignaModule,
    MatSnackBarModule,
    TrabajoOportunidadModule,
    ManiobraModule,
    AutorizarModule,
    ParametrosModule,
    ComunicadoPrensaModule,
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
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ApiService,ValidationService,SnackBarService,FileValidationService,DateValidationervice
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
