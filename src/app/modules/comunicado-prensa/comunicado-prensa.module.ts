import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunicadoPrensaFormComponent } from './comunicado-prensa-form/comunicado-prensa-form.component';
import {MatCardModule} from "@angular/material/card";
import {CustomFormsModule} from "../../ui/forms/custom-forms.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [ComunicadoPrensaFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    CustomFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class ComunicadoPrensaModule { }
