import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextIconComponent} from './input-text-icon/input-text-icon.component';
import {InputPasswordIconComponent} from './input-password-icon/input-password-icon.component';
import {InputTextComponent} from './input-text/input-text.component';
import {InputTextAreaComponent} from './input-text-area/input-text-area.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { InputNumberComponent } from './input-number/input-number.component';
import {MatSelectModule} from '@angular/material/select';
import {InputFileComponent} from './input-file/input-file.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DatepickerComponent } from './datepicker/datepicker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MDialogComponent } from './m-dialog/m-dialog.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {ModalConfirmComponent} from './modal-confirm/modal-confirm.component';
import { InputFileDynamicComponent } from './input-file-dynamic/input-file-dynamic.component';
import { InputFileMultipleComponent } from './input-file-multiple/input-file-multiple.component'

@NgModule({
  declarations: [
    InputTextIconComponent,
    InputPasswordIconComponent,
    InputTextComponent,
    InputNumberComponent,
    InputTextAreaComponent,
    InputFileComponent,
    InputAutocompleteComponent,
    DatepickerComponent,
    MDialogComponent,
    DateTimePickerComponent,
    ModalConfirmComponent,
    InputFileDynamicComponent,
    InputFileMultipleComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule
  ],
  exports: [
    InputTextIconComponent,
    InputPasswordIconComponent,
    InputTextComponent,
    InputNumberComponent,
    InputTextAreaComponent,
    InputFileComponent,
    InputAutocompleteComponent,
    DatepickerComponent,
    DateTimePickerComponent,
    ModalConfirmComponent,
    InputFileDynamicComponent,
    InputFileMultipleComponent
  ]
})
export class CustomFormsModule {
}
