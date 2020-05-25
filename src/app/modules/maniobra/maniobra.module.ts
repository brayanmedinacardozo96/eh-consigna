import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManiobraComponent } from './maniobra.component';
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
//import {InputFileComponent}  from '../../ui/forms/input-file/input-file.component';



@NgModule({
  declarations: [ManiobraComponent],
  imports: [
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
    //InputFileComponent,
  ]
})
export class ManiobraModule { }
