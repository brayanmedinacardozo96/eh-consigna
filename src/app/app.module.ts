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
import {HttpClientModule} from '@angular/common/http';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {GenerateInvoicesModule} from './modules/generate-invoices/generate-invoices.module';
import {HistoryInvoicesModule} from './modules/history-invoices/history-invoices.module';
import {ConsignaModule} from './modules/consigna/consigna.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
    MatSnackBarModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ApiService,ValidationService,SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
