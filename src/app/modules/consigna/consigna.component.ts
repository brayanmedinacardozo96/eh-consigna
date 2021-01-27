import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiService} from '../../shared/services/api.service';
import {ValidationService} from './../../shared/services/validations.service';
import {DateValidationervice} from './../../shared/services/date-validations.service';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { SessionService } from './../../shared/services/session.service';
import { NotifierService } from 'angular-notifier';
import { MessageService } from 'src/app/shared/services/message.service';

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
      {nombre:'',identificacion:'',id:1},
    ],
    tipoFormatoConsigna: [],
    solicitadaTercero:[ 
      {id: "1",nombre: "Si"},
      {id: "0", nombre: "No"}
    ],
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
    codigoTipoFormato:{
      label: 'Tipo de Formato',
      name: 'codigoTipoFormato',
      value: null,
      messages: null,
      required: true,
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
      label: 'Fecha ejecución',
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
    solicitadaTercero: {
      label: 'Solicitada por un tercero',
      name: 'solicitadaTercero',
      value: null,
      messages: null,
      required: false,
      disabled: false
    },
  };

  dataHeader = [
    {name:'# Consignación', nameColumn:'codigo'},
    {name:'Consecutivo SNC', nameColumn:'codigo_snc'},
    {name:'Fecha Solicitud', nameColumn:'fecha_creacion'},
    {name:'Fecha Ejecución', nameColumn:'fecha_solicitud'},
    {name:'Tipo Formato', nameColumn:'tipo_formato'},
    {name:'Zona', nameColumn:'codigo_zona'},
    {name:'Estado Consignación', nameColumn:'estado_consigna'},
    {name:'Estado Equipo', nameColumn:'estado_equipo_codigo'},
    {name:'Tipo Consignación', nameColumn:'tipo_consignacion'},
    {name:'Solicitante', nameColumn:'usuario_nombre_completo'},
    {name:'Consigna Padre', nameColumn:'consigna_padre_codigo'}
  ];

  constructor(private api: ApiService,
              private validations: ValidationService,
              private dateValidation: DateValidationervice,
              private notifier: NotifierService,
              private messageService: MessageService,
              private session: SessionService) { }

  ngOnInit(): void {
    this.getDataSelectConsigna();
    let dataConsigna = this.session.getItem('dataConsigna');
    if(dataConsigna != null){
      this.data = dataConsigna;
    }
  }

  async search() {
    const validateEmptyFields = this.validations.validateEmptyFields(this.form);
    if(!validateEmptyFields.success){
      return false;
    }
    
    this.data = [];
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, this.form);
    if(response.success){
      this.data = response.data;
      this.session.setItem('dataConsigna',this.data);//agregar en la variable de session
      if(this.data.length < 1){
        this.notifier.notify('warning', this.messageService.get('not-records'));
      }
    }
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  //Llena los selects del formulario
  async getDataSelectConsigna(){
    if(this.session.getItem('tipoZona') == null){
      const response = await this.session.getDataSelectConsigna();
      if(response.success){
        this.setSelect();
      }
    }else{
      this.setSelect();
    }
  }

  setSelect(){
    this.dataControls.tipoZona = this.session.getItem('tipoZona');
    this.dataControls.tipoSolicitud = this.session.getItem('tipoSolicitud');
    this.dataControls.tipoConsignacion = this.session.getItem('tipoConsignacion');
    this.dataControls.estadoConsigna = this.session.getItem('estadoConsigna');
    this.dataControls.estadoEquipo = this.session.getItem('estadoEquipo');
    this.dataControls.tipoFormatoConsigna = this.session.getItem('tipoFormatoConsigna');
    this.dataControls.solicitante= this.session.getPersona();
  }

  cleanFields(){
    this.validations.cleanFields(this.form);
    this.data = [];
    this.session.setItem('dataConsigna',null);
  }

}
