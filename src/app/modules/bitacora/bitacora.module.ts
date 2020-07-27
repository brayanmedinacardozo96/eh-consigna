import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitacoraComponent } from './bitacora.component';
import { BitacoraFormComponent } from './bitacora-form/bitacora-form.component';
import {MatCardModule} from "@angular/material/card";
import {CustomFormsModule} from "../../ui/forms/custom-forms.module";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { BitacoraListComponent } from './bitacora-list/bitacora-list.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [BitacoraComponent, BitacoraFormComponent, BitacoraListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    CustomFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    RouterModule
  ]
})
export class BitacoraModule { }
