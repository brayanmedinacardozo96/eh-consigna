import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabajoOportunidadComponent } from './trabajo-oportunidad.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from '../../ui/forms/custom-forms.module';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [TrabajoOportunidadComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    CustomFormsModule,
    MatSelectModule,
    MatExpansionModule,
  ]
})
export class TrabajoOportunidadModule { }
