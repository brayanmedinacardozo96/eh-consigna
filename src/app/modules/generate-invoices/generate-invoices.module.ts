import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateInvoicesComponent } from './generate-invoices.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BoxAlertsModule} from '../../ui/box-alerts/box-alerts.module';
import {RouterModule} from '@angular/router';
import { GenerateInvoicesListComponent } from './generate-invoices-list/generate-invoices-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [GenerateInvoicesComponent, GenerateInvoicesListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    BoxAlertsModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ]
})
export class GenerateInvoicesModule { }
