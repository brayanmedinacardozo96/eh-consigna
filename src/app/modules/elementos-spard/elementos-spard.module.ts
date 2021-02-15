import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementosSpardComponent } from './elementos-spard.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CustomFormsModule} from '../../ui/forms/custom-forms.module';
import {FormsModule} from '@angular/forms';
import {UiModule} from '../../ui/ui.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { TipoElementoComponent } from './tipo-elemento/tipo-elemento.component';
import { ElementosComponent } from './elementos/elementos.component';
import { TableTipoElementoComponent } from './tipo-elemento/table-tipo-elemento/table-tipo-elemento.component';
import { TableElementosComponent } from './elementos/table-elementos/table-elementos.component';

@NgModule({
  declarations: [ElementosSpardComponent, TipoElementoComponent, ElementosComponent, TableTipoElementoComponent, TableElementosComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CustomFormsModule,
    FormsModule,
    UiModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
  ]
})
export class ElementosSpardModule { }
