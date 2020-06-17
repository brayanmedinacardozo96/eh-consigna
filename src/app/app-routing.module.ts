import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './modules/login/login.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {AuthGuardService as AuthGuard} from './shared/auth-guard.service';
import {NotFoundComponent} from './ui/not-found/not-found.component';
import {GenerateInvoicesComponent} from './modules/generate-invoices/generate-invoices.component';
import {HistoryInvoicesComponent} from './modules/history-invoices/history-invoices.component';
import {ConsignaComponent} from './modules/consigna/consigna.component';
import {TrabajoOportunidadComponent} from './modules/trabajo-oportunidad/trabajo-oportunidad.component';
import {ManiobraComponent} from './modules/maniobra/maniobra.component';
import {AutorizarComponent}  from './modules/autorizar/autorizar.component'
import { ConsignaTabsComponent } from './modules/consigna/consigna-tabs/consigna-tabs.component';
import { ConsignaUserComponent } from './modules/consigna/consigna-user/consigna-user.component';
import {ParametrosComponent} from './modules/parametros/parametros.component';
import {ComunicadoPrensaFormComponent} from "./modules/comunicado-prensa/comunicado-prensa-form/comunicado-prensa-form.component";
const routes: Routes = [
  {path: '', component: LoginComponent}
  , {path: 'login', component: LoginComponent}

  , {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
  , {path: 'generate-invoices', component: GenerateInvoicesComponent, canActivate: [AuthGuard]}
  , {path: 'history-invoices', component: HistoryInvoicesComponent, canActivate: [AuthGuard]}
  , {path: 'history-invoices/:package', component: HistoryInvoicesComponent, canActivate: [AuthGuard]}
  , {path: 'consigna', component: ConsignaComponent, canActivate: [AuthGuard]}
  , {path: 'mis-consignas', component: ConsignaUserComponent, canActivate: [AuthGuard]}
  , {path: 'consigna/nueva-consigna', component: ConsignaTabsComponent, canActivate: [AuthGuard]}
  , {path: 'consigna/editar/:id', component: ConsignaTabsComponent, canActivate: [AuthGuard]}
  , {path: 'trabajo-oportunidad', component: TrabajoOportunidadComponent, canActivate: [AuthGuard]}
  , {path: 'maniobra', component: ManiobraComponent, canActivate: [AuthGuard]}
  , {path: 'autorizar', component: AutorizarComponent, canActivate: [AuthGuard]}
  , {path: 'parametros', component: ParametrosComponent, canActivate: [AuthGuard]}
  , {path: 'comunicado-prensa/new', component: ComunicadoPrensaFormComponent, canActivate: [AuthGuard]}

  , {path: '404', component: NotFoundComponent}
  , {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
