import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private api: ApiService) { }

  setItem(name,value){
    window.sessionStorage.setItem(name,JSON.stringify(value));
  }

  getItem(name){
    return JSON.parse(window.sessionStorage.getItem(name));
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

       persona.push({
         nombre: key.person.first_name + " " + key.person.second_name + " " + key.person.first_lastname + " " + key.person.second_lastname,
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


}
