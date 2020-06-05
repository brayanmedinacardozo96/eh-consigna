import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiService} from '../../shared/services/api.service';
import {ValidationService} from './../../shared/services/validations.service';
import {DateValidationervice} from './../../shared/services/date-validations.service';

@Component({
  selector: 'app-consigna',
  templateUrl: './consigna.component.html',
  styleUrls: ['./consigna.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsignaComponent implements OnInit {

  data = [];

  dataControls = {
    tipoZona:[],
    tipoSolicitud:[],
    tipoConsignacion:[],
    estadoConsigna:[],
    estadoEquipo:[],
    solicitante:[
      {nombre:'Brayan Herney Medina Cardozo',identificacion:'1075412102',id:1},
      {nombre:'Jhonatan Parra Almario',identificacion:'1080934291',id:2}
    ]
  };
  form = {
    numeroConsigna:{
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: false,
    },
    consecutivoSnc:{
      label: 'Consecutivo SNC',
      name: 'consecutivoSnc',
      value: null,
      messages: null,
      required: false,
    },
    tipoZona: {
      label: 'Tipo zona',
      name: 'tipoZona',
      value: null,
      messages: null,
      required: false,
    },
    tipoSolicitud: {
      label: 'Tipo de solicitud',
      name: 'tipoSolicitud',
      value: null,
      messages: null,
      required: false,
    },
    tipoConsignacion: {
      label: 'Tipo de consignación',
      name: 'tipoConsignacion',
      value: null,
      messages: null,
      required: false,
    },
    fechaSolicitud: {
      label: 'Fecha de solicitud',
      name: 'fechaSolicitud',
      value: null,
      messages: null,
      required: false,
    },
    estadoConsigna: {
      label: 'Estado consignación',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: false,
    },
    estadoEquipo: {
      label: 'Estado del equipo',
      name: 'estadoEquipo',
      value: null,
      messages: null,
      required: false,
    },
    solicitante: {
      label: 'Solicitante',
      name: 'solicitante',
      value: null,
      messages: null,
      required: false,
    }
  };
  constructor(private api: ApiService,
              private validations: ValidationService,
              private dateValidation: DateValidationervice) { }

  ngOnInit(): void {
    this.getDataSelectConsigna();
  }

  async search() {
    const responseValidate = this.validations.validateACompleteField(this.form);
    this.data = [];
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, this.form);
    if(response.success){
      this.data = response.data;
    }
    //modificar las fechas por fomatos especificos
    // this.form.fechaSolicitud.value = this.form.fechaSolicitud.value !== null ? this.dateValidation.getYearMounthDay(this.form.fechaSolicitud.value) : null;

    console.log(response)
    console.log(this.data)
  }

  setData(name, event) {
    this.form[name].value = event;
    console.log(   this.form[name].value );
  }

  //Llena los selects del formulario
  async getDataSelectConsigna(){
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-data-select`, null);
    let success = response.success;
    let data = response.data;

    if(success){
      this.dataControls.tipoZona = data.tipoZona;
      this.dataControls.tipoSolicitud = data.tipoSolicitud;
      this.dataControls.tipoConsignacion = data.tipoConsignacion;
      this.dataControls.estadoConsigna = data.estadoConsigna;
      this.dataControls.estadoEquipo = data.estadoEquipo;
    }
    let message = response.message;
  }

}
