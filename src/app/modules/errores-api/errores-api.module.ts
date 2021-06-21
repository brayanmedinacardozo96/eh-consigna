import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormsModule} from '@angular/forms';
import {UiModule} from '../../ui/ui.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ErroresApiComponent} from './errores-api.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CustomFormsModule} from '../../ui/forms/custom-forms.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ErroresApiListComponent } from './errores-api-list/errores-api-list.component';

@NgModule({
  declarations: [ErroresApiComponent, ErroresApiListComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    UiModule,
    MatFormFieldModule,
    MatInputModule,
    CustomFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ErroresApiModule { }
