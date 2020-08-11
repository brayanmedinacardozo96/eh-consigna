import { Component, OnInit,Input } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { ApiService } from './../../../shared/services/api.service';
import { User } from './../../../shared/models/user';
import { Auth } from './../../../shared/auth';
import { SnackBarService } from './../../../shared/services/snack-bar.service';
import {Aprobar} from '../../autorizar/aprobar';
import { DateValidationervice } from './../../../shared/services/date-validations.service';


@Component({
  selector: 'app-consigna-user',
  templateUrl: './consigna-user.component.html',
  styleUrls: ['./consigna-user.component.scss']
})
export class ConsignaUserComponent implements OnInit {
  

  user: User = Auth.getUserDataPerson();
  request = {
    solicitante: {value: this.user.id},
    codigos: {
      solicitadas: ['S'],
      aprobadas: ['A'],
      ejecutadas: ['E'],
      canceladas: ['C'],
      reprogramadas: ['R']
    }
  };
  total = {
    totalSolicitadas: 0,
    totalAprobadas: 0,
    totalEjecutadas: 0,
    totalCanceladas: 0,
    totalReprogramadas: 0,
    totalAprobar:0,
    totalBitacora:0,

  };
  data = [];
  dataEstado=[];
  dataBitacora=[];

  viewList = false;
  viewListEstado=false;
  viewListBitacora=false;
  isVisible=false;

  constructor(private api: ApiService,
              private snackBar: SnackBarService,
              private aprobar:Aprobar,
              private dateValidation: DateValidationervice) {
    this.viewList = false;
   }

  ngOnInit(): void {
    this.search();
    this.consignaAprobar();
    this.bitacora();
  }

  async buscarConsigna(codigoEstado){
    this.viewList = true;
    this.viewListEstado=false;
    this.viewListBitacora=false;
    let params = {
      solicitante:{value: this.user.id},
      codigoEstadoConsigna:{value:codigoEstado}
    }
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, params);
    if(response.success){
      this.data = response.data;
      if(this.data.length < 1){
        this.snackBar.alert('No se encontraron registros con los parámetros consultados.',5000);
      }
    }
  }

  async search() {
    this.data = [];
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-my-consigna`, this.request);
    if(response.success){
      let data = response.data;
      for(let obj in data){
        if(data.hasOwnProperty(obj)){
          this.total[obj] = data[obj];
        } 
      }
    }
  }

  async testFile(){
    // const response = await this.api.get(`${environment.apiBackend}/test-file/46`);
    //const response = await this.api.get(`${environment.apiBackend}/subestacion/update-spard`);
    // const response = await this.api.get(`${environment.apiBackend}/cliente/update-spard`,null);
    //  const response = await this.api.get(`${environment.apiBackend}/tipo-elemento/update-spard`);
    // const response = await this.api.get(`${environment.apiBackend}/elemento/update-spard`);
    // const response = await this.api.get(`${environment.apiBackend}/parametro/update-division-area-siec`);
    // const response = await this.api.get(`${environment.apiBackend}/usuario-aplicacion/update-info/${environment.keyTransverseSecurity}`);
    // this.dateValidation.validateDateRequest();
  }

  async consignaAprobar()
  {

    var result=this.aprobar.validarPermiso();

    if(result.length>0)
    {
      this.isVisible=true;
      const response = await this.api.get(`${environment.apiBackend}/consigna/getEstadoConsigna/S|R`);
      if(response.message==null && response.data.length>0){
        let data = response.data;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.total.totalAprobar += parseInt(element.numero);
        }
      }
    }

  }

  async bitacora()
  {

    var result=this.aprobar.validarPermiso();

    if(result.length>0)
    {
      this.isVisible=true;
      const response = await this.api.get(`${environment.apiBackend}/bitacora/getNumero/0`);
      if(response.message==null){
        let data = response.data;
        this.total.totalBitacora =data[0].numero;
      }

    }

  }

  async buscarBitacora()
  {
    var params='{"estado":0}';
    const response = await this.api.get(`${environment.apiBackend}/bitacora/get-all?params=${params}`);
    this.dataBitacora = response.data;
    this.viewListBitacora=true;
    this.viewList=false;
    this.viewListEstado=false;
    if (response.data.length === 0) {
      this.snackBar.alert('No se encontraron registros.',5000);
    }
  }

  

  async buscarConsignaAprobar()
  {
    this.viewList = true;
    this.viewListEstado=false;
    this.viewListBitacora=false;
    let params = {
      codigoEstadoConsigna:{value:'S|R'}
    }
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-list-aprobar`, params);
    if(response.success){
      this.data = response.data;
      if(this.data.length < 1){
        this.snackBar.alert('No se encontraron registros con los parámetros consultados.',5000);
      }
    }
  }

  async buscarConsignaEstado()
  {
    this.viewList = false;
    this.viewListBitacora=false;
    this.viewListEstado=true;
    const response = await this.api.get(`${environment.apiBackend}/consigna/getSolicitada`);
    if(response.success){
      this.dataEstado = response;
      if(this.dataEstado.length < 1){
        this.snackBar.alert('No se encontraron registros con los parámetros consultados.',5000);
      }
    }
  }
 
}


