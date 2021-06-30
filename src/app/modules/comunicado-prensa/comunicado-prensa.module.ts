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
import { ComunicadoPrensaComponent } from './comunicado-prensa.component';
import { ComunicadoPrensaListComponent } from './comunicado-prensa-list/comunicado-prensa-list.component';
import {RouterModule} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import { ClientesAfectadosComponent } from './clientes-afectados/clientes-afectados.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from '@angular/material/grid-list';
import { DirectivesModule } from './../../shared/directives/directives.module';
import { ConfirmDialogComponent } from 'src/app/ui/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ComunicadoPrensaFormComponent, ComunicadoPrensaComponent, ComunicadoPrensaListComponent, ClientesAfectadosComponent],
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
        MatGridListModule,
        DirectivesModule,
    ],entryComponents:[
      ConfirmDialogComponent
    ]
})
export class ComunicadoPrensaModule { }
