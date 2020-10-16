import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Auth} from '../../shared/auth';
import {Router} from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { User } from '../../shared/models/user';
import {Aprobar} from '../../modules/autorizar/aprobar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  appName = null;
  auth = Auth;
  numero=null;
  numeroVisto=0;
  
  constructor(
    private router: Router,
    private api: ApiService,
    private aprobar:Aprobar,
    ) {
    this.appName = environment.appName;
  }

  ngOnInit(): void {
  }

  changePassword() {
    const userEncripted = btoa(this.auth.getUser());
    const url = environment.urlFrontendST + `/change-password/${userEncripted}`;
    window.open(url);
  }

  logout() {
    this.numeroVisto = 0;
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  async notificacion() 
  {
    const user: User = Auth.getUserDataPerson();
    if(user!=undefined)
    {
      var result=this.aprobar.validarPermiso();
      var tipo=result.length>0?true:false;

      const response = await this.api.get(`${environment.apiBackend}/consigna/getNotificacion/${user.id}/${tipo}`);
      this.numero=response.numeroSolicitud;
      this.numeroVisto=response.numeroVisto;

    }
    
  }

  clickNotificacion(tipo)
  {
    this.notificacion();
    this.router.navigate([`/mis-consignas/${tipo}`]);
  }

}
