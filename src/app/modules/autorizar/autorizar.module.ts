import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{AutorizarComponent} from './autorizar.component'
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
import {TableElementoCalidadComponent} from './table-elemento-calidad/table-elemento-calidad.component';
import {ConsignaModule} from '../consigna/consigna.module';
import {TableAprobarConsignaComponent} from './table-aprobar-consigna/table-aprobar-consigna.component';
import { AutorizarJefeZonaComponent } from './autorizar-jefe-zona/autorizar-jefe-zona.component';
import {DirectivesModule} from "../../shared/directives/directives.module";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AutorizarComponent,
    TableElementoCalidadComponent,
    TableAprobarConsignaComponent,
    AutorizarJefeZonaComponent
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
    DirectivesModule,
    MatSortModule,
    MatTooltipModule,

  ]
})
export class AutorizarModule { }
