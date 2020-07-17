import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitacoraComponent } from './bitacora.component';
import { BitacoraFormComponent } from './bitacora-form/bitacora-form.component';
import {MatCardModule} from "@angular/material/card";
import {CustomFormsModule} from "../../ui/forms/custom-forms.module";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [BitacoraComponent, BitacoraFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    CustomFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class BitacoraModule { }
