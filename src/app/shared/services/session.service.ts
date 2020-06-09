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

  async getDataSelect(){
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-data-select`, null);
    let success = response.success;
    if(success){
      let data = response.data;
      window.sessionStorage.setItem('tipoZona',JSON.stringify(data.tipoZona));
      window.sessionStorage.setItem('tipoSolicitud',JSON.stringify(data.tipoSolicitud));
      window.sessionStorage.setItem('tipoConsignacion',JSON.stringify(data.tipoConsignacion));
      window.sessionStorage.setItem('estadoConsigna',JSON.stringify(data.estadoConsigna));
      window.sessionStorage.setItem('estadoEquipo',JSON.stringify(data.estadoEquipo));
      window.sessionStorage.setItem('tipoMantenimiento',JSON.stringify(data.tipoMantenimiento));
      window.sessionStorage.setItem('subestacion',JSON.stringify(data.subestacion));
      window.sessionStorage.setItem('tipoElemento',JSON.stringify(data.tipoElemento));
      window.sessionStorage.setItem('elemento',JSON.stringify(data.elemento));
    }
    return response;
  }

}
