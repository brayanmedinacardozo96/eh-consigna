import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsolidadoComponent } from './consolidado.component';
import {MatCardModule} from "@angular/material/card";
import {CustomFormsModule} from "../../ui/forms/custom-forms.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {CKEditorModule} from "ng2-ckeditor";
import {RouterModule} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from '@angular/material/grid-list';
import { ConsolidadoFormComponent } from './consolidado-form/consolidado-form.component';
import { ConsolidadoConsignaListComponent } from './consolidado-consigna-list/consolidado-consigna-list.component';
import { ConsolidadoComunicadoListComponent } from './consolidado-comunicado-list/consolidado-comunicado-list.component';
import { ConsolidadoListComponent } from './consolidado-list/consolidado-list.component';


@NgModule({
  declarations: [ConsolidadoComponent, ConsolidadoFormComponent, ConsolidadoConsignaListComponent, ConsolidadoComunicadoListComponent, ConsolidadoListComponent],
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
    CKEditorModule,
    RouterModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatGridListModule
  ]
})
export class ConsolidadoModule { }
