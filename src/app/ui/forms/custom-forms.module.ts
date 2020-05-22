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

@NgModule({
  declarations: [
    InputTextIconComponent,
    InputPasswordIconComponent,
    InputTextComponent,
    InputNumberComponent,
    InputTextAreaComponent,
    InputFileComponent,
    InputAutocompleteComponent
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
    ReactiveFormsModule
  ],
  exports: [
    InputTextIconComponent, 
    InputPasswordIconComponent, 
    InputTextComponent, 
    InputNumberComponent,
    InputTextAreaComponent,
    InputFileComponent,
    InputAutocompleteComponent
  ]
})
export class CustomFormsModule {
}
