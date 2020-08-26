import {Injectable} from '@angular/core';
import {CanActivate, Router, NavigationEnd} from '@angular/router';
import { SessionService } from './services/session.service';
import {Auth} from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private currentUrl : string = undefined;

  constructor(public router: Router, 
    private session: SessionService) {
  }

  canActivate(): boolean {
    this.currentUrl = this.router.url;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.currentUrl = event.url;
        this.session.setLinkRutaPrevia(this.currentUrl);               
        if (!Auth.getLogin()) {
          this.router.navigate(['/login']);
          return false;
        }
      };
    });

    return true;
  }
}
