import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    RouterModule
  ]
})
export class DashboardModule { }
