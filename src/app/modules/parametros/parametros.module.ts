import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from '../../ui/forms/custom-forms.module';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ParametrosComponent} from './parametros.component';
import { ParametrosRegistroComponent } from './parametros-registro/parametros-registro.component';
import { TipoParametrosComponent } from './tipo-parametros/tipo-parametros.component'

@NgModule({
  declarations: [ParametrosComponent, ParametrosRegistroComponent, TipoParametrosComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    CustomFormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ParametrosModule { }
