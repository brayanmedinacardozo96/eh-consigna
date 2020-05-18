import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextIconComponent} from './input-text-icon/input-text-icon.component';
import {InputPasswordIconComponent} from './input-password-icon/input-password-icon.component';
import {InputTextComponent} from './input-text/input-text.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { InputNumberComponent } from './input-number/input-number.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [InputTextIconComponent, InputPasswordIconComponent, InputTextComponent, InputNumberComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    InputTextIconComponent, InputPasswordIconComponent, InputTextComponent, InputNumberComponent
  ]
})
export class CustomFormsModule {
}
