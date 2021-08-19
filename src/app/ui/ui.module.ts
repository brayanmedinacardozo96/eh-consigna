import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LoadingComponent} from './loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {NotFoundComponent} from './not-found/not-found.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoadingComponent, NotFoundComponent, ConfirmDialogComponent, DynamicDialogComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSelectModule,
    RouterModule,
    MatBadgeModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [HeaderComponent, FooterComponent, LoadingComponent],
  entryComponents:[
    DynamicDialogComponent  
  ]
})
export class UiModule {
}
