import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsignaComponent } from './consigna.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CustomFormsModule} from '../../ui/forms/custom-forms.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {UiModule} from '../../ui/ui.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { ConsignaListComponent } from './consigna-list/consigna-list.component';
import { ConsignaNewComponent } from './consigna-new/consigna-new.component';
import { ConsignaElementoListComponent } from './consigna-elemento-list/consigna-elemento-list.component';
import { ConsignaTrabajoListComponent } from './consigna-trabajo-list/consigna-trabajo-list.component';
import { ConsignaManiobraListComponent } from './consigna-maniobra-list/consigna-maniobra-list.component';
import { ConsignaTabsComponent } from './consigna-tabs/consigna-tabs.component';
import { ConsignaUserComponent } from './consigna-user/consigna-user.component';
import { ConsignaNewMessageComponent } from './consigna-new-message/consigna-new-message.component';
import { TrabajoOportunidadModule } from './../trabajo-oportunidad/trabajo-oportunidad.module';
import { ManiobraModule } from './../maniobra/maniobra.module';
import { IframeMapComponent } from './iframe-map/iframe-map.component';
import {DirectivesModule} from "../../shared/directives/directives.module";
import { ConsignaListDocumentsComponent } from './consigna-list-documents/consigna-list-documents.component';
import { SeguimientoConsignaComponent } from './seguimiento-consigna/seguimiento-consigna.component';
import { TableSeguimientoConsignaComponent } from './seguimiento-consigna/table-seguimiento-consigna/table-seguimiento-consigna.component';
import { ConsignaNewSearchComponent } from './consigna-new/consigna-new-search/consigna-new-search.component';
import { ConsignaSolicitudEstadoComponent } from './consigna-solicitud-estado/consigna-solicitud-estado.component';
import { BitacoraListComponent } from './bitacora-list/bitacora-list.component';

@NgModule({
  declarations: [
    ConsignaComponent,
    ConsignaNewComponent,
    ConsignaListComponent,
    ConsignaElementoListComponent,
    ConsignaTrabajoListComponent,
    ConsignaManiobraListComponent,
    ConsignaTabsComponent,
    ConsignaUserComponent,
    ConsignaNewMessageComponent,
    IframeMapComponent,
    ConsignaListDocumentsComponent,
    SeguimientoConsignaComponent,
    TableSeguimientoConsignaComponent,
    ConsignaNewSearchComponent,
    ConsignaSolicitudEstadoComponent,
    BitacoraListComponent,
    
    
  ],
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        CustomFormsModule,
        MatCheckboxModule,
        FormsModule,
        UiModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatGridListModule,
        MatSelectModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatDialogModule,
        MatTabsModule,
        MatListModule,
        TrabajoOportunidadModule,
        ManiobraModule,
        DirectivesModule,
        
    ],
    
})
export  class ConsignaModule { }
