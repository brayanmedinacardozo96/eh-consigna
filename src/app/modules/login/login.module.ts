import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {CustomFormsModule} from '../../ui/forms/custom-forms.module';
import {BoxAlertsModule} from '../../ui/box-alerts/box-alerts.module';
import {UiModule} from '../../ui/ui.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    CustomFormsModule,
    BoxAlertsModule,
    UiModule,
  ],
  exports: [
    LoginComponent
  ],
})
export class LoginModule {
}
