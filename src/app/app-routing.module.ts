import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './modules/login/login.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {AuthGuardService as AuthGuard} from './shared/auth-guard.service';
import {NotFoundComponent} from './ui/not-found/not-found.component';
import {ConsignaComponent} from './modules/consigna/consigna.component';
import {ManiobraComponent} from './modules/maniobra/maniobra.component';
import {AutorizarComponent}  from './modules/autorizar/autorizar.component'
import { AutorizarJefeZonaComponent } from './modules/autorizar/autorizar-jefe-zona/autorizar-jefe-zona.component';
import { ConsignaTabsComponent } from './modules/consigna/consigna-tabs/consigna-tabs.component';
import { ConsignaUserComponent } from './modules/consigna/consigna-user/consigna-user.component';
import {ParametrosComponent} from './modules/parametros/parametros.component';
import {ComunicadoPrensaFormComponent} from "./modules/comunicado-prensa/comunicado-prensa-form/comunicado-prensa-form.component";
import {ComunicadoPrensaComponent} from "./modules/comunicado-prensa/comunicado-prensa.component";
import {SeguimientoConsignaComponent} from './modules/consigna/seguimiento-consigna/seguimiento-consigna.component';
import {BitacoraFormComponent} from "./modules/bitacora/bitacora-form/bitacora-form.component";
import {BitacoraComponent} from "./modules/bitacora/bitacora.component";
import {AsignacionSolicitudesComponent} from './modules/asignacion-solicitudes/asignacion-solicitudes.component';
import { AsignacionSolicitudesNewComponent } from './modules/asignacion-solicitudes/asignacion-solicitudes-new/asignacion-solicitudes-new.component';
import { ActualizarInformacionComponent } from './modules/actualizar-informacion/actualizar-informacion.component';
import { ConsolidadoComponent } from './modules/consolidado/consolidado.component';
import { ConsolidadoFormComponent } from './modules/consolidado/consolidado-form/consolidado-form.component';
import {ReporteComponent} from './modules/reporte/reporte.component';
import { IndicadorZonaComponent } from './modules/indicador-zona/indicador-zona.component';
import { IndicadoresPowerBiComponent } from './modules/reporte/indicadores-power-bi/indicadores-power-bi.component';
import { ErroresApiComponent } from './modules/errores-api/errores-api.component';

const routes: Routes = [
  {path: '', component: LoginComponent}
  , {path: 'login', component: LoginComponent}

  , {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
  , {path: 'consigna', component: ConsignaComponent, canActivate: [AuthGuard]}
  , {path: 'mis-consignas/:id', component: ConsignaUserComponent, canActivate: [AuthGuard]}
  , {path: 'consigna/nueva-consigna', component: ConsignaTabsComponent, canActivate: [AuthGuard]}
  , {path: 'consigna/editar/:id/:tipo', component: ConsignaTabsComponent, canActivate: [AuthGuard]}
  , {path: 'trabajo-oportunidad/:code', component: ConsignaTabsComponent, canActivate: [AuthGuard]}
  , {path: 'maniobra', component: ManiobraComponent, canActivate: [AuthGuard]}
  , {path: 'autorizar/:id/:tipo', component: AutorizarComponent, canActivate: [AuthGuard]}
  , {path: 'autorizar', component: AutorizarComponent, canActivate: [AuthGuard]}
  , {path: 'jefe-zona/autorizar', component: AutorizarJefeZonaComponent, canActivate: [AuthGuard]}
  , {path: 'jefe-zona/autorizar/:id', component: AutorizarJefeZonaComponent, canActivate: [AuthGuard]}
  , {path: 'parametros', component: ParametrosComponent, canActivate: [AuthGuard]}
  , {path: 'comunicado-prensa', component: ComunicadoPrensaComponent, canActivate: [AuthGuard]}
  , {path: 'comunicado-prensa/new', component: ComunicadoPrensaFormComponent, canActivate: [AuthGuard]}
  , {path: 'comunicado-prensa/edit/:id', component: ComunicadoPrensaFormComponent, canActivate: [AuthGuard]}
  , {path: 'comunicado-prensa/recordatorio/:id/:codigo', component: ComunicadoPrensaFormComponent, canActivate: [AuthGuard]}
  , {path: 'seguimiento-consigna', component: SeguimientoConsignaComponent, canActivate: [AuthGuard]}
  , {path: 'bitacora', component: BitacoraComponent, canActivate: [AuthGuard]}
  , {path: 'bitacora/new/:id', component: BitacoraFormComponent, canActivate: [AuthGuard]}
  , {path: 'bitacora/edit/:id', component: BitacoraFormComponent, canActivate: [AuthGuard]}
  , {path: 'bitacora/edit/:id', component: BitacoraFormComponent, canActivate: [AuthGuard]}
  , {path: 'asignacion-solicitudes', component: AsignacionSolicitudesComponent, canActivate: [AuthGuard]}
  , {path: 'asignacion-solicitudes/new', component: AsignacionSolicitudesNewComponent, canActivate: [AuthGuard]}
  , {path: 'asignacion-solicitudes/editar/:iduser/:rol', component: AsignacionSolicitudesNewComponent, canActivate: [AuthGuard]}
  , {path: 'actualizar-informacion', component: ActualizarInformacionComponent, canActivate: [AuthGuard]}
  , {path: 'consolidado', component: ConsolidadoComponent, canActivate: [AuthGuard]}
  , {path: 'consolidado/new', component: ConsolidadoFormComponent, canActivate: [AuthGuard]}
  , {path: 'reporte', component: ReporteComponent, canActivate: [AuthGuard]}
  , {path: 'reporte/indicadores-power-bi', component: IndicadoresPowerBiComponent, canActivate: [AuthGuard]}
  , {path: 'indicador-zona', component: IndicadorZonaComponent, canActivate: [AuthGuard]}
  , {path: 'errores-api', component: ErroresApiComponent, canActivate: [AuthGuard]}
  , {path: '404', component: NotFoundComponent}
  , {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
