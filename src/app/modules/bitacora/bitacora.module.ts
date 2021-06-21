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
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { BitacoraListComponent } from './bitacora-list/bitacora-list.component';
import {RouterModule} from "@angular/router";
import { BitacoraDocumentosComponent } from './bitacora-documentos/bitacora-documentos.component';
import { BitacoraElementosComponent } from './bitacora-elementos/bitacora-elementos.component';
import { BitacoraSubelementosComponent } from './bitacora-subelementos/bitacora-subelementos.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from '@angular/material/expansion';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BitacoraSubelementosVistaComponent } from './bitacora-subelementos-vista/bitacora-subelementos-vista.component';

@NgModule({
  declarations: [BitacoraComponent, BitacoraFormComponent, BitacoraListComponent, BitacoraDocumentosComponent, BitacoraElementosComponent, BitacoraSubelementosComponent, BitacoraSubelementosVistaComponent],
    imports: [
        CommonModule,
        MatCardModule,
        CustomFormsModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatCheckboxModule,
        RouterModule,
        MatTabsModule,
        MatExpansionModule,
        ColorPickerModule,
        MatTableModule,
        MatPaginatorModule
       
    ],entryComponents:[
      BitacoraSubelementosVistaComponent
    ]
})
export class BitacoraModule { }
