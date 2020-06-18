import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { ApiService } from './../../../shared/services/api.service';
import { User } from './../../../shared/models/user';
import { Auth } from './../../../shared/auth';
import { SnackBarService } from './../../../shared/services/snack-bar.service';
import {Aprobar} from '../../autorizar/aprobar';
@Component({
  selector: 'app-consigna-user',
  templateUrl: './consigna-user.component.html',
  styleUrls: ['./consigna-user.component.scss']
})
export class ConsignaUserComponent implements OnInit {


  user: User = Auth.getUserDataPerson();
  request = {
    solicitante: {value: this.user.id},
    codigoSolicitada: ['S'],
    codigoAprobEjecu: ['A','E'],
    codigoCancelRepro: ['C','R']
  };
  total = {
    totalPendientes: 0,
    totalAprobEjecu: 0,
    totalCancelRepro: 0,
    totalAprobar:0,
  };
  data = [];

  viewList = false;
  isVisible=false;

  constructor(private api: ApiService,
              private snackBar: SnackBarService,
              private aprobar:Aprobar) {
    this.viewList = false;
   }

  ngOnInit(): void {
    this.search();
    this.consignaAprobar();
  }

  async buscarConsigna(codigoEstado){
    this.viewList = true;
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
      this.total.totalPendientes = data.totalPendientes;
      this.total.totalAprobEjecu = data.totalAprobEjecu;
      this.total.totalCancelRepro = data.totalCancelRepro;
    }
  }

  async testFile(){
    const response = await this.api.post(`${environment.apiBackend}/test-file`, this.request);
  }

  async consignaAprobar()
  {

    var result=this.aprobar.validarPermiso();

    if(result.length>0)
    {
      this.isVisible=true;
      const response = await this.api.get(`${environment.apiBackend}/consigna/getEstadoConsigna/S`);
      if(response.message==null){
        let data = response.data;
        this.total.totalAprobar =data[0].numero;

      }

    }

  }

  async buscarConsignaAprobar()
  {
    this.viewList = true;
    let params = {
      codigoEstadoConsigna:{value:'S'}
    }
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, params);
    if(response.success){
      this.data = response.data;
      if(this.data.length < 1){
        this.snackBar.alert('No se encontraron registros con los parámetros consultados.',5000);
      }
    }
  }
}
