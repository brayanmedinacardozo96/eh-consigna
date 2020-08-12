import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Helpers} from '../helpers';

@Directive({
  selector: '[appUserCan]'
})
export class UserCanDirective {

  helpers: any;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
    this.helpers = new Helpers();
  }

  @Input() set appUserCan(paramActions) {

    paramActions.forEach((paramAction) => {

      if (this.helpers.validateActionUser(paramAction)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }

    });

  }

}
