import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from './modules/login/login.module';
import {UiModule} from './ui/ui.module';
import {ApiService} from './shared/services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {GenerateInvoicesModule} from './modules/generate-invoices/generate-invoices.module';
import {HistoryInvoicesModule} from './modules/history-invoices/history-invoices.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    HttpClientModule,
    UiModule,
    DashboardModule,
    GenerateInvoicesModule,
    HistoryInvoicesModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
