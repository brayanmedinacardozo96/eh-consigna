import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCanDirective} from './user-can.directive';

@NgModule({
  declarations: [UserCanDirective],
  imports: [
    CommonModule
  ],
  exports: [UserCanDirective]
})
export class DirectivesModule {
}
