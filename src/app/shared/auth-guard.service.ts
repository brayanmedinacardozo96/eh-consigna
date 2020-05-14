import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Auth} from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) {
  }

  canActivate(): boolean {
    if (!Auth.getLogin()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
