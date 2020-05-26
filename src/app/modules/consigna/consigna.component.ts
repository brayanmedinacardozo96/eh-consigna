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
      elementosConsignados:[
        {tipo_elemento:'Tp E 1', elemento: 'Elemento 2', ramal: 1, fecha_hora_inicio: '2020-01-20 3:40 PM',  fecha_hora_final: '2020-01-21 10:00 AM'}
      ],trabajosOportunidad:[
        {consecutivo: '854123', descripcion:'La descripción ...',nombre_elemento: 'El elemento 1', trabajos: 'se realizarán trabajos de los desarrollos ', medidas_seguridad:'se aplicarán las 5 reglas de oro', jefe_trabajo: 'Hector Mauricio Coronado', telefono:'3102451024'}
      ],
      maniobras:[
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'La Tercera Descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Cuarta Descripción',url:'aa'},
      ],
      acciones:''
    },
    {numeroConsigna:'536',tipoZona:'ZS',estadoConsigna:'Ejecutada',
      elementosConsignados:[
        {tipo_elemento:'Tp E 4', elemento: 'Elemento 1', ramal: 5, fecha_hora_inicio: '2020-03-30 8:00 AM',  fecha_hora_final: '2020-03-30 10:00 AM'}
      ],
      //'consecutivo', 'descripcion', 'nombre_elemento', 'trabajos', 'medidas_seguridad', 'jefe_trabajo', 'telefono'
      trabajosOportunidad: [
        {consecutivo: '17155', descripcion:'La descripción',nombre_elemento: 'El elemento 2', trabajos: 'se realizarán trabajos de ...', medidas_seguridad:'se aplicarán las 5 reglas de oro', jefe_trabajo: 'Brayan Medina Cardozo', telefono:'3134587856'}
      ],
      maniobras:[
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
      ],
      acciones:''
    },
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
    console.log(   this.form[name].value );
  }

}
