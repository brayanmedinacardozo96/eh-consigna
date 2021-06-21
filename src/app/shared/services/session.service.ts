import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private api: ApiService,
    private router: Router,
    private notifier: NotifierService,
    ) { }

  setItem(name,value){
    window.sessionStorage.setItem(name,JSON.stringify(value));
  }

  getItem(name){
    return JSON.parse(window.sessionStorage.getItem(name));
  }

  remove(name){
    window.sessionStorage.removeItem(name);
  }

  async getDataSelectConsigna(){
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-data-select`, null);
    let success = response.success;
    if(success){
      let data = response.data;
      for(let obj in data){
        if(data.hasOwnProperty(obj)){
          window.sessionStorage.setItem(obj,JSON.stringify(data[obj]));
        }        
      }
      await this.getUsuario();
    }else{
      this.notifier.notify('warning', response.message);
    }
    return response;
  }

  async getUsuario()
  {
    const response = await this.api.get(`${environment.apiBackend}/usuario-aplicacion/update-info?key=${environment.keyTransverseSecurity}`);
    if(response.success)
    {
       window.sessionStorage.setItem('usuario',JSON.stringify(response.data.personSeguridadTransversal));
    }

  }

   getPersona() {
     var persona = [];

     this.getItem('usuario').forEach(async (key) => {
        let nombre = '';
        nombre = key.person.first_name + " ";
        nombre += (key.person.second_name != 'null' &&  key.person.second_name != null && key.person.second_name != undefined) ? key.person.second_name : '';
        nombre += " " + key.person.first_lastname + " ";
        nombre += (key.person.second_lastname != 'null' && key.person.second_lastname != null && key.person.second_lastname != undefined) ? key.person.second_lastname : '';
        
       persona.push({
         nombre: nombre,
         identificacion: key.person.document_number,
         id: key.id

       });
     });

     return persona;
   }

  getDataInfo(nameSession, field, id){
    const response = {success: true, data: []};
    let data = this.getItem(nameSession) != undefined ? this.getItem(nameSession) : null;
    if(data != null){
      for(let value of data){
        if(value[field] == id){
          response.data.push(value);
        }
      }
    }

    return response;
  }

  setLinkRutaPrevia(url){
    let urlArray = ['autorizar','jefe-zona'];
    for(let value of urlArray){
      if(url.includes(value)){
        sessionStorage.setItem('linkRutaPrevia',url);
      }
    }
  }

  validarLinkRutaPrevia(){
    if(sessionStorage.getItem('linkRutaPrevia') != undefined){
      this.router.navigate([sessionStorage.getItem('linkRutaPrevia')]);
      sessionStorage.removeItem('linkRutaPrevia');
    }else{
      this.router.navigate(['/mis-consignas/info']);
    }
  }

}
