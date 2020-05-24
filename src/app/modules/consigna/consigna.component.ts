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

  data = [
    {numeroConsigna:'1234',tipoZona:'ZN',estadoConsigna:'Pendiente',
    elementosConsignados:'',trabajosOportunidad:'',maniobras:'',acciones:''}
  ];
  
  dataControls = {
    tipoZona:[
      {nombre:'Zona Norte',codigo:'ZN'},
      {nombre:'Zona Centro',codigo:'ZC'},
      {nombre:'Zona Occidente',codigo:'ZO'},
      {nombre:'Zona Sur',codigo:'ZS'}
    ],
    tipoSolicitud:[
      {nombre:'Plan Semanal',codigo:'ZN'},
      {nombre:'Emergencia',codigo:'ZC'},
    ],
    tipoConsignacion:[
      {nombre:'Plan Semanal',codigo:'ZN'},
      {nombre:'Emergencia',codigo:'ZC'},
    ],
    estadoConsigna:[
      {nombre:'Pendiente',codigo:'P'},
      {nombre:'Aprobada',codigo:'A'},
      {nombre:'Reprogramada',codigo:'R'},
      {nombre:'Ejecutada',codigo:'E'},
      {nombre:'Cancelada',codigo:'C'},
    ],
    estadoEquipo:[
      {nombre:'Riesgo Disparo',codigo:'RD'},
      {nombre:'Apertura',codigo:'A'},
    ],
    solicitante:[
      {nombre:'Brayan Herney Medina Cardozo',identificacion:'1075412102',id:1},
      {nombre:'Jhonatan Parra Almario',identificacion:'1080934291',id:10}
    ],
    subestacion:[
      {nombre:'El Bote',codigo:'12345'},
      {nombre:'Solarte',codigo:'14'},
      {nombre:'Las Brisas',codigo:'15'},
      {nombre:'Timaná',codigo:'1'}
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
    },
    subestacion: {
      label: 'Subestación',
      name: 'subestacion',
      value: null,
      messages: null,
      required: false,
    },
  };
  constructor(private api: ApiService,
              private validations: ValidationService,
              private dateValidation: DateValidationervice) { }

  ngOnInit(): void {
  }

  async search() {
    const responseValidate = this.validations.validateACompleteField(this.form);
    //modificar las fechas por fomatos especificos
    // this.form.fechaSolicitud.value = this.form.fechaSolicitud.value !== null ? this.dateValidation.getYearMounthDay(this.form.fechaSolicitud.value) : null;

    console.log(responseValidate)
  }

  setData(name, event) {
    this.form[name].value = event;
  }

}
