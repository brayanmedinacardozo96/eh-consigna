import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './modules/login/login.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {AuthGuardService as AuthGuard} from './shared/auth-guard.service';
import {NotFoundComponent} from './ui/not-found/not-found.component';
import {GenerateInvoicesComponent} from './modules/generate-invoices/generate-invoices.component';
import {HistoryInvoicesComponent} from './modules/history-invoices/history-invoices.component';

const routes: Routes = [
  {path: '', component: LoginComponent}
  , {path: 'login', component: LoginComponent}

  , {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
  , {path: 'generate-invoices', component: GenerateInvoicesComponent, canActivate: [AuthGuard]}
  , {path: 'history-invoices', component: HistoryInvoicesComponent, canActivate: [AuthGuard]}
  , {path: 'history-invoices/:package', component: HistoryInvoicesComponent, canActivate: [AuthGuard]}

  , {path: '404', component: NotFoundComponent}
  , {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
