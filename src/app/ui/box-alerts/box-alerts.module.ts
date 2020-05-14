import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoxAlertErrorComponent} from './box-alert-error/box-alert-error.component';
import { BoxAlertSuccessComponent } from './box-alert-success/box-alert-success.component';


@NgModule({
  declarations: [BoxAlertErrorComponent, BoxAlertSuccessComponent],
  imports: [
    CommonModule
  ],
  exports: [BoxAlertErrorComponent, BoxAlertSuccessComponent]
})
export class BoxAlertsModule {
}
