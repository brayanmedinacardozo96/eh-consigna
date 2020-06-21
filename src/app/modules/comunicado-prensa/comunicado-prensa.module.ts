import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunicadoPrensaFormComponent } from './comunicado-prensa-form/comunicado-prensa-form.component';
import {MatCardModule} from "@angular/material/card";
import {CustomFormsModule} from "../../ui/forms/custom-forms.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {CKEditorModule} from "ng2-ckeditor";



@NgModule({
  declarations: [ComunicadoPrensaFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    CustomFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CKEditorModule
  ]
})
export class ComunicadoPrensaModule { }
