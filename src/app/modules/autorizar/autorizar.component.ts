import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../shared/services/session.service';
import { ApiService } from '../../shared/services/api.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.scss']
})
export class AutorizarComponent implements OnInit {


  constructor(private activeRoute: ActivatedRoute,
    private session: SessionService,
    private api: ApiService) {
    this.activeRoute.params.subscribe(params => {

      if (params.id !== undefined && params.id !== null) {
         console.log(params.id );
         this.buscarConsigna(params.id );
      }

    });
   }

  form = {
    numeroConsigna: {
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: false,
      url: "https://jsonplaceholder.typicode.com/users"
    },
    usuario: {
      label: 'Autorizador',
      name: 'autorizador',
      value: "Brayan Herney Medina",
      messages: null,
      required: false,
      disable:true,
    },
    observacion: {
      label: 'Observación',
      name: 'observacion',
      value: "",
      messages: null,
      required: false,
      disable:true,
    },
    estadoConsigna: {
      label: 'Estado consigna',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: true,
    }
  }

  dataControls={
    estadoConsigna:[]
  }

  dataElementoCalidad=[
    {elemento:"xxx", sDesconexion:"100", desMax:"10", feMax:"10", deHora:"10",feHora:"10"}
  ]
  viewList = false;
  data = [];

  ngOnInit(): void {
    this.getDataSelectConsigna();
  }

  limpiar()
  {

  }

  setData(name, event) {
    this.form[name].value = event;
  }

  setSelect()
  {
    this.dataControls.estadoConsigna = this.session.getItem('estadoConsigna');
  }

  async getDataSelectConsigna(){
    if(this.session.getItem('estadoConsigna') == null){
      const response = await this.session.getDataSelectConsigna();
      if(response.success){
        this.setSelect();
      }
    }else{
      this.setSelect();
    }
  }

  async buscarConsigna(id){

    let params = {
      consignacion_id:{value:id}
    }
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, params);
    if(response.success){
      this.viewList = true;
      this.data = response.data;
      console.log(this.data);
      if(this.data.length < 1){
       // this.snackBar.alert('No se encontraron registros con los parámetros consultados.',5000);
      }
    }
  }

}
