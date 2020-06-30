import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {ValidationService} from '../../../shared/services/validations.service';
import {DateValidationervice} from '../../../shared/services/date-validations.service';
import { FileValidationService } from './../../../shared/services/file-validation.service';
import {environment} from '../../../../environments/environment';
import { SnackBarService } from './../../../shared/services/snack-bar.service';
import { Auth } from './../../../shared/auth';
import { User } from './../../../shared/models/user';
import { ConsignaNewMessageComponent } from './../consigna-new-message/consigna-new-message.component';
import {MatDialog} from '@angular/material/dialog';
import {Router,ActivatedRoute} from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { TrabajoOportunidadComponent } from './../../trabajo-oportunidad/trabajo-oportunidad.component';
import {IframeMapComponent} from '../iframe-map/iframe-map.component';
import { ConsoleReporter } from 'jasmine';
@Component({
  selector: 'app-consigna-new',
  templateUrl: './consigna-new.component.html',
  styleUrls: ['./consigna-new.component.scss']
})
export class ConsignaNewComponent implements OnInit {

  @ViewChild(TrabajoOportunidadComponent) trabajoOportunidad: TrabajoOportunidadComponent;
  @Output() setElemento = new EventEmitter();
  
  action = 'Guardar';
  consignacionId = null;
  data = [];
  argNumConsigna = ['','','',''];
  dataElementos = [];
  dataControls = {
    tipoZona:[],
    tipoSolicitud:[],
    tipoConsignacion:[],
    estadoConsigna:[],
    estadoEquipo:[],
    subestacion:[
    ],
    tipoMantenimiento:[],
    tipoElemento:[],
    elemento:[],
    ramal:[
      {nombre:'Si',value:'1'},
      {nombre:'No',value:'0'}
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
      disable: false,
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
    solicitante: {
      label: 'Solicitante',
      name: 'solicitante',
      value: null,
      messages: null,
      required: true,
    },
    subestacion: {
      label: 'Subestación',
      name: 'subestacion',
      value: null,
      messages: null,
      required: true,
    },
    tipoMantenimiento: {
      label: 'Tipo mantenimiento',
      name: 'tipoMantenimiento',
      value: null,
      messages: null,
      required: true,
    },
    trabajoEfectuar: {
      label: 'Trabajos a efectuar',
      name: 'trabajoEfectuar',
      value: null,
      messages: null,
      required: true,
    },
    justificacion: {
      label: 'Justificación',
      name: 'justificacion',
      value: null,
      messages: null,
      required: true,
    },
    observacionOpeyman: {
      label: 'Observación OPEYMAN',
      name: 'observacionOpeyman',
      value: null,
      messages: null,
      required: true,
    },
    consignaOperativa: {
      label: 'Consigna operativa',
      name: 'consignaOperativa',
      value: null,
      messages: null,
      required: true,
    },
    medidasSeguiridad: {
      label: 'Medidas de seguridad',
      name: 'medidasSeguiridad',
      value: null,
      messages: null,
      required: true,
    },
    jefeTrabajo: {
      label: 'Jefe de trabajo',
      name: 'jefeTrabajo',
      value: null,
      messages: null,
      required: true,
    },
    telefonoJefeTrabajo: {
      label: 'Teléfono jefe de trabajo',
      name: 'telefonoJefeTrabajo',
      value: null,
      messages: null,
      required: true,
    },
    jefeTrabajoContratista: {
      label: 'Jefe de trabajo contratista',
      name: 'jefeTrabajoContratista',
      value: null,
      messages: null,
      required: true,
    },
    telJefeTrabajoContratista: {
      label: 'Telefóno jefe de trabajo contratista',
      name: 'telJefeTrabajoContratista',
      value: null,
      messages: null,
      required: true,
    },
    moviles: {
      label: 'Móviles',
      name: 'moviles',
      value: null,
      messages: null,
      required: true,
    },

  };

  interrupcionesTrabajo = {
    barrios: {
      label: 'Barrios',
      name: 'barrios',
      value: null,
      messages: null,
      required: true,
    },
    clientesNoRegulados: {
      label: 'Clientes No Regulados',
      name: 'clientesNoRegulados',
      value: null,
      messages: null,
      required: true,
    }
  };

  interrupcionesCortoTiempo = {
    barrios: {
      label: 'Barrios',
      name: 'barrios',
      value: null,
      messages: null,
      required: true,
    },
    clientesNoRegulados: {
      label: 'Clientes No Regulados',
      name: 'clientesNoRegulados',
      value: null,
      messages: null,
      required: true,
    }
  };

  formElementos = {
    tipoElemento: {
      label: 'Tipo elemento',
      name: 'tipoElemento',
      value: null,
      messages: null,
      required: true,
    },
    elemento: {
      label: 'Elemento',
      name: 'elemento',
      value: null,
      messages: null,
      required: true,
    },
    ramal: {
      label: 'Ramal',
      name: 'ramal',
      value: null,
      messages: null,
      required: true,
    },
    fechaInicio: {
      label: 'Fecha inicio',
      name: 'fechaInicio',
      value: null,
      messages: null,
      required: true,
    },
    horaInicio: {
      label: 'Hora inicio',
      name: 'horaInicio',
      value: null,
      messages: null,
      required: true,
    },
    fechaFinal: {
      label: 'Fecha final',
      name: 'fechaFinal',
      value: null,
      messages: null,
      required: true,
    },
    horaFinal: {
      label: 'Hora final',
      name: 'horaFinal',
      value: null,
      messages: null,
      required: true,
    },
  };

  inputFile: any;
  fileName = '';
  fileUrl = '';
  fileUpload = {
    success: null,
    message: null,
    files: new FormData()
  };
  areaAFectada=[];
  logAreaAFectada=[];
  messageListaElementos = '';
  user: User = Auth.getUserDataPerson();

  constructor(private api: ApiService,
              private validations: ValidationService,
              private dateValidation: DateValidationervice,
              private fileValidation: FileValidationService,
              private snackBar: SnackBarService,
              public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private session: SessionService
              ) {
                window.scrollTo(0,0);
                this.form.solicitante.value = `${this.user.document_number} - ${this.user.first_name} ${this.user.second_name} ${this.user.first_lastname} ${this.user.second_lastname}`;

                this.activeRoute.params.subscribe(params => {

                  if (params.id !== undefined && params.id !== null) {
                    this.consignacionId = params.id;
                    this.action = 'Editar';
                    // this.search(this.consignacionId).then();
                  }

                });
              }

  async ngOnInit(): Promise<void> {
    this.getDataSelectConsigna();
  }

  async search(id){
    const response = await this.api.get(`${environment.apiBackend}/consigna/get/${id}`);
    if(response.success){
      let dataResponse = response.data[0];
      this.fileUrl = dataResponse.url_diagrama;
      let urlDocument = this.fileUrl.split('/');
      this.form.solicitante.label='Usuario';

      this.form.tipoZona.value = parseInt(dataResponse.zona_id);
      this.form.tipoSolicitud.value = parseInt(dataResponse.tipo_solicitud_id);
      this.form.fechaSolicitud.value = new Date(dataResponse.fecha_solicitud);
      this.form.tipoConsignacion.value = parseInt(dataResponse.tipo_consignacion_id);
      this.form.numeroConsigna.value = dataResponse.codigo;
      this.form.consecutivoSnc.value = dataResponse.codigo_snc;
      this.form.estadoConsigna.value = parseInt(dataResponse.estado_consignacion_id);
      this.form.estadoEquipo.value = parseInt(dataResponse.estado_equipo_id);
      this.form.subestacion.value = parseInt(dataResponse.lista_elemento[0].subestacion_id);
      this.form.tipoMantenimiento.value = parseInt(dataResponse.tipo_mantenimiento_id);
      this.form.trabajoEfectuar.value = dataResponse.trabajo_efectuar;
      this.form.justificacion.value = dataResponse.justificacion;
      this.form.observacionOpeyman.value = dataResponse.observacion_opeyman;
      this.form.consignaOperativa.value = dataResponse.consigna_operativa;
      this.form.medidasSeguiridad.value = dataResponse.medida_seguridad;
      this.form.jefeTrabajo.value = dataResponse.jefe_trabajo;
      this.form.telefonoJefeTrabajo.value = dataResponse.telefono_jefe_trabajo;
      this.form.jefeTrabajoContratista.value = dataResponse.jefe_contratista;
      this.form.telJefeTrabajoContratista.value = dataResponse.telefono_jefe_contratista;
      this.form.moviles.value = dataResponse.movil;
      this.fileName = urlDocument[urlDocument.length-1];

      this.dataElementos = [];
      for(let value of dataResponse.lista_elemento){
        const elemento = {
          id:           {value: value.id},
          tipoElemento: {name: value.elemento.tipo_elemento.nombre,                                     value: value.elemento.tipo_elemento.id},
          elemento:     {name: value.elemento.nombre,                                                   value: value.elemento.id},
          ramal:        {name: value.ramal == '1' ? 'Si' : 'No',                                        value: value.ramal},
          fechaInicio:  {name: this.dateValidation.getYearMounthDay(new Date(value.fech_inicio_prog)),  value: value.fech_inicio_prog },
          horaInicio:   {name: value.hora_inicio_prog,                                                  value: value.hora_inicio_prog },
          fechaFinal:   {name: this.dateValidation.getYearMounthDay(new Date(value.fech_final_prog)),   value: value.fech_final_prog},
          horaFinal:    {name: value.hora_final_prog,                                                   value: value.hora_final_prog},
        }
        this.dataElementos.push(elemento);
      }
    }
  }

  setData(name, event, obj: any = undefined) {
    if(obj == undefined){
      this.form[name].value = event;
    }else{
      obj[name].value = event;
    }
  }

  setDataDatePicker(name, event, obj: any = undefined){
    let day: string = event.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month: string = (event.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    let year = event.getFullYear();
    let date = `${day}-${month}-${year}`;

    if(obj == undefined){
      this.form[name].value = date;
    }else{
      obj[name].value = date;
    }

  }

  async addListElements(){

 
    const responseValidate = this.validations.validateEmptyFields(this.formElementos);

    if (!responseValidate.success) {
      return false;
    }
    var textTipoElemento = ((document.getElementById("form_consigna-tipo_elemento")) as HTMLSelectElement).textContent;
    var textElemento = ((document.getElementById("form_consigna-elemento")) as HTMLSelectElement).textContent;
    var textRamal = ((document.getElementById("form_consigna-ramal")) as HTMLSelectElement).textContent;
    var fechaInicio = this.dateValidation.getYearMounthDay(this.formElementos.fechaInicio.value);
    var horaInicio = this.formElementos.horaInicio.value;
    var fechaFinal = this.dateValidation.getYearMounthDay(this.formElementos.fechaFinal.value);
    var horaFinal = this.formElementos.horaFinal.value;
    await this.getAreaAFectada(  this.getFeederElemento(this.formElementos.elemento.value) );
    
    const elemento = {
      id:           {value: null},
      tipoElemento: {name: textTipoElemento,  value: this.formElementos.tipoElemento.value},
      elemento:     {name: textElemento,      value: this.formElementos.elemento.value},
      ramal:        {name: textRamal,         value: this.formElementos.ramal.value},
      fechaInicio:  {name: fechaInicio,       value: fechaInicio },
      horaInicio:   {name: horaInicio,        value: horaInicio },
      fechaFinal:   {name: fechaFinal,        value: fechaFinal},
      horaFinal:    {name: horaFinal,         value: horaFinal},
      jsonAreaAfectada: {name:'jsonAreaAfectada', value: JSON.stringify( this.areaAFectada[0].municipio )  },
    }
    this.dataElementos.push(elemento);
    this.setElemento.emit(elemento.elemento);

    this.formElementos.tipoElemento.value = null;
    this.formElementos.elemento.value = null;
    this.formElementos.ramal.value = null;
    this.formElementos.ramal.value = null;
    this.formElementos.fechaInicio.value = null;
    this.formElementos.horaInicio.value = null;
    this.formElementos.fechaFinal.value = null;
    this.formElementos.horaFinal.value = null;

    

  }

  removeListElement(id){
    this.dataElementos.splice(id,1);
  }
  response = {
    formData: new FormData(),
    success: false,
    message: null
  }
  
  guardarConsigna(){
    let response = {
      formData: new FormData(),
      success: false,
      message: null
    }

    // let formData: FormData = new FormData();

    if(this.consignacionId != null){
      if(this.inputFile == undefined){
        this.fileUpload.success = true;
      }else{
        this.fileUpload = this.fileValidation.fileUp(this.inputFile);
        this.fileUrl = '';
      }
    }else{
      // valida si se a adjuntado un documento
      this.fileUpload = this.fileValidation.fileUp(this.inputFile);
    }
    if( this.validateEmptyFields() && this.fileUpload.success){
      response.formData = this.fileUpload.files;
      response.formData.append('consignacionId', this.consignacionId);
      response.formData.append('fileUrl', this.fileUrl);
      response.formData.append('form',JSON.stringify(this.form));
      response.formData.append('dataElementos',JSON.stringify(this.dataElementos));
      response.formData.append('interrupcionesTrabajo',JSON.stringify(this.interrupcionesTrabajo));
      response.formData.append('interrupcionesCortoTiempo',JSON.stringify(this.interrupcionesCortoTiempo));
      response.formData.append('argNumConsigna',JSON.stringify(this.argNumConsigna));
      response.formData.append('user',JSON.stringify(this.user));

      response.success = true;

      /* const response = await this.api.post(`${environment.apiBackend}/consigna/save-consigna`, formData);
      let success = response.success;
      let message = response.message;
      if(success){
        this.cleanAllFields();
        this.dialog.open(ConsignaNewMessageComponent,{
          backdropClass: 'cdk-overlay-transparent-backdrop',
          hasBackdrop: false,
          data: {response}
        });
        //si es editar vuelve a redireccionar al inicio
        if(this.consignacionId != null){
          this.router.navigate(['consigna']);
          this.session.setItem('dataConsigna',null);
        }
      }else{
        this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
      } */

    }else{
      response.success = false;
      this.snackBar.alert('Faltan campos a diligenciar',5000)
    }

    return response;

  }

  setInput(event){
    this.inputFile = event;
  }

  validateEmptyFields(){
    this.messageListaElementos = '';
    let success = true;

    if(!this.validations.validateEmptyFields(this.form).success){
      success = false;
    }

    if(this.dataElementos.length < 1){
      this.messageListaElementos = 'Debe ingresar mínimo un valor en la lista de elementos a consignar'
      success = false;
    }
    return success;
  }

  setConsecutivo(position,data,id){
    let value = '';
    // obtiene el código
    for(let val of data){
      if(val.id == id){
        value = position == 2 ? val.codigo.charAt(1): val.codigo;
      }
    }

    switch(position){
      case 0:
          if(value == 'A'){
            this.form.consecutivoSnc.disable = false;
            this.form.consecutivoSnc.required = true;
          }else{
            value = '';
            this.form.consecutivoSnc.disable = true;
            this.form.consecutivoSnc.required = false;
            this.form.consecutivoSnc.messages = '';
            this.form.consecutivoSnc.value = '';
          }
          value = value=='A' ? value : '';
        break;
    }
    this.argNumConsigna[position] = value;

    this.form.numeroConsigna.value = this.argNumConsigna.join('');

    if(position == 2){
      this.getSubestaciones(id);
    }
  }

  //Llena los selects del formulario
  async getDataSelectConsigna(){
    if(this.session.getItem('tipoZona') == null || this.session.getItem('tipoSolicitud') == null
        || this.session.getItem('tipoConsignacion') == null
    ){
      const response = await this.session.getDataSelectConsigna();
      if(response.success){
        this.setSelect();
      }
    }else{
      this.setSelect();1
    }
  }

  setSelect(){
    this.dataControls.tipoZona = this.session.getItem('tipoZona');
    this.dataControls.tipoSolicitud = this.session.getItem('tipoSolicitud');
    this.dataControls.tipoConsignacion = this.session.getItem('tipoConsignacion');
    this.dataControls.estadoConsigna = this.session.getItem('estadoConsigna');
    this.dataControls.estadoEquipo = this.session.getItem('estadoEquipo');
    this.dataControls.tipoMantenimiento = this.session.getItem('tipoMantenimiento');
    // this.dataControls.subestacion = this.session.getItem('subestacion');
    this.dataControls.tipoElemento = this.session.getItem('tipoElemento');
    // this.dataControls.elemento = this.session.getItem('elemento');
  }

  cleanAllFields(){
    this.validations.cleanFields(this.form);
    this.validations.cleanFields(this.formElementos);
    this.validations.cleanFields(this.interrupcionesTrabajo);
    this.validations.cleanFields(this.interrupcionesCortoTiempo);
    this.fileValidation.fileUp(this.inputFile)
    this.dataElementos = [];
  }

  async getSubestaciones(event){
    let request = {
      zona_id: event
    };

    const response = await this.api.post(`${environment.apiBackend}/subestacion/get-subestacion`, request);
    let success = response.success;
    let message = response.message;
    if(success){
      this.dataControls.subestacion = [];
      for(let value of response.data){
        this.dataControls.subestacion.push(value);        
      }
    }else{
      this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
    } 
  }
  async getTipoElementos(event){
    this.dataControls.tipoElemento = [];
    this.dataControls.tipoElemento = this.session.getItem('tipoElemento');    
    let request = {
      subestacion_id: event
    };

    const response = await this.api.post(`${environment.apiBackend}/tipo-elemento/get-tipo-elemento`, request);
    let success = response.success;
    let message = response.message;
    if(success){
      for(let value of response.data){
        this.dataControls.tipoElemento.push(value);        
      }
    }else{
      this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
    } 
  }

  async getElementos(event){
    this.dataControls.elemento = [];
    let request = {
      tipo_elemento_id: event
    };

    const response = await this.api.post(`${environment.apiBackend}/elemento/get-elemento`, request);
    let success = response.success;
    let message = response.message;
    if(success){
      this.dataControls.elemento = response.data;
    }else{
      this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
    } 
  }

  openMap()
  {
    
    var n=new IframeMapComponent(this.dialog);
    n.openDialog();
  }

  async getAreaAFectada(elemento) 
  {

    var data=this.logAreaAFectada.filter(b=>{
      return (b.feeder==elemento)
    });
    console.log(data);
    if(data.length>0){
      return;
    }
    console.log("ENTRO");
    this.logAreaAFectada.push({feeder:elemento});

    const response = await this.api.get(
      `${environment.apiBackend}/consigna/getAreaAfectada/${elemento}`
    );
    
    let obj=[];
    let objCliente=[];
    this.areaAFectada=[];

  
    if (response.message == null) {
      
      let municipio="inicio";
      var barrio="";

      response.data.barrioAfectado.forEach(element => {
         
         if (municipio == "inicio") {
           municipio = element.nombre_muni;
           obj.push(this.crearJsonBarrio(municipio, response.data.barrioAfectado));
         }

         if (municipio != element.nombre_muni) {
           municipio = element.nombre_muni;
           obj.push(this.crearJsonBarrio(municipio, response.data.barrioAfectado));
         }

        barrio += element.barrio + "\r";

      });
      
      var cliente="";
      response.data.clieteAfectado.forEach(element => {

        if (element.tipo_cliente == "No regulado") {
           cliente += element.nombre_completo + "\r";
        }
        objCliente.push({
          nombre: element.nombre_completo,
          emails: this.splitCorreo(element.correos)
        });
      });
 
    }

    this.interrupcionesTrabajo.barrios.value=barrio;
    this.interrupcionesTrabajo.clientesNoRegulados.value=cliente;

    this.areaAFectada.push({municipio:obj,persona:objCliente});

  }

  crearJsonBarrio(municipio,element){
     var barrario=[];
     element.filter(b => {
      return (b.nombre_muni == municipio)
     }).forEach(elemen => {
       barrario.push(elemen.barrio);
     });

     return {municipio:municipio,barrio:barrario};
  }

  splitCorreo(correo) {
    if (correo == undefined || correo == null) {
      return null;
    }
    var array = [];
    correo.split('|').forEach(element => {
      if (element != "") {
        array.push(element);
      }
    });
    return array;
  }

  getFeederElemento(id) {
    var data = this.session.getItem('elemento').filter(b => {
      return (b.id == id)
    })
    return data[0].nemonico;
  }


}
