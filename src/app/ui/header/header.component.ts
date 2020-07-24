import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Auth} from '../../shared/auth';
import {Router} from '@angular/router';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  appName = null;
  auth = Auth;
  numero=0;

  constructor(
    private router: Router,
    private api: ApiService,
    ) {
    this.appName = environment.appName;
  }

  ngOnInit(): void {
    this.notificacion();
  }

  changePassword() {
    const userEncripted = btoa(this.auth.getUser());
    const url = environment.urlFrontendST + `/change-password/${userEncripted}`;
    window.open(url);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  async notificacion() 
  {
    const response = await this.api.get(`${environment.apiBackend}/consigna/getSolicitada`);
    this.numero=response.numero;
    console.log(response);
  }

}
