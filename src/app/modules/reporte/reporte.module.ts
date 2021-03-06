import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from '../../ui/forms/custom-forms.module';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {ConsignaModule} from '../consigna/consigna.module';
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReporteComponent} from './reporte.component';
import { IndicadoresPowerBiComponent } from './indicadores-power-bi/indicadores-power-bi.component';
import { TableProgramacionComponent } from './table-programacion/table-programacion.component';
import { TableEjecucionComponent } from './table-ejecucion/table-ejecucion.component';
import { TableBitacoraElementosComponent } from './table-ejecucion/table-bitacora-elementos/table-bitacora-elementos.component';
import { ModalBitacoraSubelementoComponent } from './table-ejecucion/modal-bitacora-subelemento/modal-bitacora-subelemento.component'
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ScrollingModule} from '@angular/cdk/scrolling'; 

@NgModule({
  declarations: [
    ReporteComponent, 
    IndicadoresPowerBiComponent, 
    TableProgramacionComponent, TableEjecucionComponent, TableBitacoraElementosComponent, ModalBitacoraSubelementoComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    CustomFormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    ConsignaModule,
    MatSortModule,
    MatTooltipModule,
    MatTabsModule,
    MatCheckboxModule,
    ScrollingModule
  ]
})
export class ReporteModule { }
