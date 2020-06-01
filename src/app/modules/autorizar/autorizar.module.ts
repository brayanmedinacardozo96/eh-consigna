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


@NgModule({
  declarations: [AutorizarComponent, TableElementoCalidadComponent],
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
    MatListModule
  ]
})
export class AutorizarModule { }