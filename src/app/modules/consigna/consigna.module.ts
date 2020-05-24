import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsignaComponent } from './consigna.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CustomFormsModule} from '../../ui/forms/custom-forms.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
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
import { ConsignaNewComponent } from './consigna-new/consigna-new.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ConsignaListComponent } from './consigna-list/consigna-list.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [ConsignaComponent, ConsignaNewComponent, ConsignaListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    CustomFormsModule,
    MatCheckboxModule,
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
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule
  ]
})
export class ConsignaModule { }
