import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-consigna',
  templateUrl: './consigna.component.html',
  styleUrls: ['./consigna.component.scss']
})
export class ConsignaComponent implements OnInit {

  data = [];
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
  };
  form = {
    numeroConsigna:{
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
    },
    consecutivoSnc:{
      label: 'Consecutivo SNC',
      name: 'consecutivoSnc',
      value: null,
      messages: null,
      required: true,
    },
    tipoZona: {
      label: 'Tipo zona',
      name: 'tipoZona',
      value: null,
      messages: null,
      required: true,
    },
    tipoSolicitud: {
      label: 'Tipo de solicitud',
      name: 'tipoSolicitud',
      value: null,
      messages: null,
      required: true,
    },
    tipoConsignacion: {
      label: 'Tipo de consignación',
      name: 'tipoConsignacion',
      value: null,
      messages: null,
      required: true,
    },
    fechaSolicitud: {
      label: 'Fecha de solicitud',
      name: 'fechaSolicitud',
      value: null,
      messages: null,
      required: true,
    },
    estadoConsigna: {
      label: 'Estado consignación',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: true,
    },
    estadoEquipo: {
      label: 'Estado del equipo',
      name: 'estadoEquipo',
      value: null,
      messages: null,
      required: true,
    },
  };
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  async search() {
    console.log(this.form)
  }

  setData(name, event) {
    this.form[name].value = event;
  }

}
