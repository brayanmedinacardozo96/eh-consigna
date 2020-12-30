import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {ValidationService} from '../../../shared/services/validations.service';
import {DateValidationervice} from '../../../shared/services/date-validations.service';
import { FileValidationService } from './../../../shared/services/file-validation.service';
import {environment} from '../../../../environments/environment';
import { SnackBarService } from './../../../shared/services/snack-bar.service';
import { Auth } from './../../../shared/auth';
import { User } from './../../../shared/models/user';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {Router,ActivatedRoute} from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { TrabajoOportunidadComponent } from './../../trabajo-oportunidad/trabajo-oportunidad.component';
import { InputFileDynamicComponent } from './../../../ui/forms/input-file-dynamic/input-file-dynamic.component';
import { InputFileMultipleComponent } from './../../../ui/forms/input-file-multiple/input-file-multiple.component';
import { ModalConfirmComponent } from './../../../ui/forms/modal-confirm/modal-confirm.component';
import { Mensaje } from './../../../ui/forms/m-dialog/dialog';
import { ConsignaNewSearchComponent } from './consigna-new-search/consigna-new-search.component';
import * as moment from 'moment';
import {BitacoraSubelementosVistaComponent} from "../../bitacora/bitacora-subelementos-vista/bitacora-subelementos-vista.component";
import { element } from 'protractor';


@Component({
  selector: 'app-consigna-new',
  templateUrl: './consigna-new.component.html',
  styleUrls: ['./consigna-new.component.scss']
})
export class ConsignaNewComponent implements OnInit {

  @ViewChild(TrabajoOportunidadComponent) trabajoOportunidad: TrabajoOportunidadComponent;
  @ViewChild(InputFileDynamicComponent) inputFileDynamic: InputFileDynamicComponent;
  @ViewChild(InputFileMultipleComponent) inputFileMultiple: InputFileMultipleComponent;
  @Output() setElemento = new EventEmitter();
  
  action = 'Guardar';
  consignacionId = null;
  consignaPadreId = null;
  tempTipoFormatoConsigna = 'C';
  tipoFormato = 'Consignación';
  data = [];
  argNumConsigna = ['','','',''];
  dataElementos = [];
  dataControls = {
    tipoFormatoConsigna:[],
    divisionArea:[],
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
    ],
    redElectrica:[
      {nombre:'Si',value:'1'},
      {nombre:'No',value:'0'}
    ],
    solicitadaTercero:[ 
      {id: "1",nombre: "Si"},
      {id: "0", nombre: "No"}
    ],
    tipoTercerosConsigna:[],
    selectYear: this.dateValidation.getSelectCurrentDate(true),
  };

  form = {
    tipoFormatoConsigna:{
      label: 'Tipo de Formato',
      name: 'tipoFormatoConsigna',
      value: null,
      messages: null,
      required: true,
    },
    divisionArea:{
      label: 'División Area',
      name: 'divisionArea',
      value: null,
      messages: null,
      required: true,
      disabled: false
    },
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
      length: 50,
      disabled: false
    },
    tipoZona: {
      label: 'Tipo zona',
      name: 'tipoZona',
      value: null,
      messages: null,
      required: true,
      disabled: false
    },
    tipoSolicitud: {
      label: 'Tipo de solicitud',
      name: 'tipoSolicitud',
      value: null,
      messages: null,
      required: true,
      disabled: false
    },
    tipoConsignacion: {
      label: 'Tipo de consignación',
      name: 'tipoConsignacion',
      value: null,
      messages: null,
      required: true,
      disabled: false
    },
    fechaSolicitud: {
      label: 'Fecha ejecución',
      name: 'fechaSolicitud',
      value: null,
      messages: null,
      required: true,
      disabled: false
    },
    estadoConsigna: {
      label: 'Estado consignación',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: true,
      disabled: false
    },
    estadoEquipo: {
      label: 'Estado del equipo',
      name: 'estadoEquipo',
      value: null,
      messages: null,
      required: true,
      disabled: false
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
      disabled: false
    },
    tipoMantenimiento: {
      label: 'Tipo mantenimiento',
      name: 'tipoMantenimiento',
      value: null,
      messages: null,
      required: true,
      disabled: false
    },
    trabajoEfectuar: {
      label: 'Trabajos a efectuar',
      name: 'trabajoEfectuar',
      value: null,
      messages: null,
      length: 9000,
      required: true,
    },
    justificacion: {
      label: 'Justificación',
      name: 'justificacion',
      value: null,
      messages: null,
      length: 500,
      required: true,
    },
    observacionOpeyman: {
      label: 'Observación OPEYMAN',
      name: 'observacionOpeyman',
      value: null,
      messages: null,
      length: 500,
      required: false,
    },
    consignaOperativa: {
      label: 'Consigna operativa',
      name: 'consignaOperativa',
      value: null,
      messages: null,
      length: 9000,
      required: true,
    },
    medidasSeguiridad: {
      label: 'Medidas de seguridad',
      name: 'medidasSeguiridad',
      value: null,
      messages: null,
      length: 500,
      required: true,
    },
    jefeTrabajo: {
      label: 'Jefe de trabajo',
      name: 'jefeTrabajo',
      value: null,
      messages: null,
      length: 70,
      required: true,
    },
    telefonoJefeTrabajo: {
      label: 'Teléfono jefe de trabajo',
      name: 'telefonoJefeTrabajo',
      value: null,
      messages: null,
      maxLength: 20,
      required: true,
    },
    jefeTrabajoContratista: {
      label: 'Jefe de trabajo contratista',
      name: 'jefeTrabajoContratista',
      value: null,
      messages: null,
      length: 70,
      required: true,
    },
    telJefeTrabajoContratista: {
      label: 'Telefóno jefe de trabajo contratista',
      name: 'telJefeTrabajoContratista',
      value: null,
      messages: null,
      maxLength: 20,
      required: true,
    },
    moviles: {
      label: 'Móviles',
      name: 'moviles',
      value: null,
      messages: null,
      length: 70,
      required: true,
    },
    urlMapa: {
      label: 'urlMapa',
      name: 'urlMapa',
      value: [],
      messages: null,
      required: false,
    },
    solicitadaTercero: {
      label: 'Solicitada por un tercero',
      name: 'solicitadaTercero',
      value: null,
      messages: null,
      required: true,
      disabled: false
    },
    tipoTercero: {
      label: 'Tipo de Tercero',
      name: 'tipoTercero',
      value: null,
      messages: null,
      required: false,
      disabled: false,
      visible: false
    },
    terceroNumeroContrato: {
      label: 'Número Contrato',
      name: 'terceroNumeroContrato',
      value: null,
      messages: null,
      required: false,
      length: 20,
      disabled: false,
      visible: false
    },
    terceroAnio: {
      label: 'Año del Contrato',
      name: 'terceroAnio',
      value: null,
      messages: null,
      required: false,
      disabled: false,
      visible: false
    },
    terceroDescripcion: {
      label: 'Descripción',
      name: 'terceroDescripcion',
      value: null,
      messages: null,
      required: false,
      length: 500,
      disabled: false,
      visible: false
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

  interrupcionesTrabajoCortoTiempo = {
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
    redElectrica: {
      label: '¿Es red eléctrica?',
      name: 'redElectrica',
      value: null,
      messages: null,
      required: true,
    },
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
    afectaUsuarios: {
      label: 'Afecta a usuarios',
      name: 'afectaUsuarios',
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
  areaAFectadaCortoTiempo=[];
  logAreaAFectada=[];
  messageListaElementos = '';
  user: User = Auth.getUserDataPerson();
  login:User=Auth.getLogin();
  fileAnexos = {
    placeholder: 'Ingrese los anexos',
    typeExtension: ['pdf','png','jpg','jpeg','xls','xlsx','doc','docx','txt','ppt','pptx'],
    maxSize: '5',
    messages: '',
    fileName: '',
    fileUrl:  '',
    required:  false,
    package: 'anexos'
  };

  dataInputFile = [
    { 
      placeholder: 'Ingrese la topología de inicio (obligatorio)', 
      required: true,
      typeExtension: ['png','jpg','jpeg'],
      maxSize: '5',
      fileName: '',
      fileUrl: '',
      nameDocument: 'topologia inicio'
    },
    { 
      placeholder: 'Ingrese la topología de fin (opcional)', 
      required: false,
      typeExtension: ['png','jpg','jpeg'],
      maxSize: '5',
      fileName: '',
      fileUrl: '',
      nameDocument: 'topologia fin'
    }
  ];

  jsonMapa = ''; 
  numeroAreaAfectada={
    barrios:0,
    clienteRegulado:0,
    clienteNoRegulado:0
  };
  numeroAreaAfectadaCortoT={
    barrios:0,
    clienteRegulado:0,
    clienteNoRegulado:0
  };
  
  mostrarPanelElemento=true;
  elementUpdateID=null;
  esRedElectrica=true;

  verMapaSelect = 'hidden';

  indicador={
    totalUsuarios:0,
    interrupcionUsuario:0,
    Saidi:0,
    Saifi:0,
    tiempoMaximo:0,
    horaTrabajo:0
  }

  usuarioAfectadoTemp={
    interrupcion:0,
    interrupcionCorta:0
  }

  panelOpenStateResumen=false;
  
  constructor(private api: ApiService,
              private validations: ValidationService,
              private dateValidation: DateValidationervice,
              private fileValidation: FileValidationService,
              private snackBar: SnackBarService,
              public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private session: SessionService,
              private dialogo: MatDialog,
              ) {
                window.scrollTo(0,0);
                this.getDataSolicitante();
                this.activeRoute.params.subscribe(params => {

                  if (params.id !== undefined && params.id !== null) {
                    this.consignacionId = params.id;
                    this.action = 'Editar';
                    if(params.tipo=="v")
                    {
                      document.getElementById("vtoolbar").style.visibility='hidden';
                    }
                    // this.search(this.consignacionId).then();
                  }

                });
              }

  async ngOnInit(): Promise<void> {
    this.getDataSelectConsigna();
    this. valoresPorDefecto();
  }

  valoresPorDefecto(){
    this.form.solicitadaTercero.value = "0";
  }

  getDataSolicitante(){
    this.form.solicitante.value = `${this.user.document_number} - ${this.user.first_name} ${this.user.second_name} ${this.user.first_lastname} ${this.user.second_lastname}`;
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
  
  setListElementoFecha(name, event, obj: any = undefined) {
    this.setData(name, event, obj);
    if(name == 'fechaInicio'){
      this.setData('fechaFinal',event,obj);
    }else{
      this.setData('fechaInicio',event,obj);
    }
  }

  validateHours(){
    let response = {
      success: true
    }

    if(this.formElementos.horaInicio.value != undefined && this.formElementos.horaInicio.value != null && this.formElementos.horaInicio.value != ''
      && this.formElementos.horaFinal.value != undefined && this.formElementos.horaFinal.value != null && this.formElementos.horaFinal.value != ''
    ){
        let horaInicio = moment(this.formElementos.horaInicio.value, 'h:mm a');
        let horaFinal = moment(this.formElementos.horaFinal.value, 'h:mm a');

        if(horaInicio > horaFinal){
          response.success = false;
          this.snackBar.alert('La hora de inicio es mayor a la hora final!',5000);
        }
    }
    return response;

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

  validateListElements(){
    this.jsonMapa = document.getElementById("jsonDataMapa").innerText;
    const responseValidate = this.validations.validateEmptyFields(this.formElementos);

    if(this.form.estadoEquipo.value==null)
    {
      this.form.estadoEquipo.messages="Este campo es requerido.";
      return;
    }

    if (!responseValidate.success) {
      return false;
    }

    const respValidateHours = this.validateHours();
    
    if (!respValidateHours.success) {
      return false;
    }
    
    const respValidateListElemRepetido = this.validateListaElemetoRepetido();
    if(!respValidateListElemRepetido.success){
      this.dialogo
            .open(ModalConfirmComponent, {
            data: new Mensaje("Mensaje:",respValidateListElemRepetido.message)
          })
          .afterClosed()
          .subscribe((confirmado: Boolean) => {
            if(confirmado) {
              this.validateJsonMapa();
            }else{
              this.validateJsonMapa();
            }
          });  
    }else{
      this.validateJsonMapa();
    }   
  }

  validateJsonMapa(){

    if ((this.jsonMapa != null && this.jsonMapa != '' && this.jsonMapa != undefined)) {
      this.addListElements();
    } else {
      if (this.esRedElectrica) {
        
        this.snackBar.alert('No ha seleccionado un mapa para el elemento.',5000)
      
      } else {
        this.addListElements();
      }
    }
  }

  validateListaElemetoRepetido(){
    let response = {
      success: true,
      message: '¡Existe un tipo de elemento y elemento previamente guardado! ¿Desea guardarlo?'
    }
    for(let value of this.dataElementos ){
      if(this.formElementos.tipoElemento.value == value.tipoElemento.value 
        && this.formElementos.elemento.value == value.elemento.value ){
          response.success = false;
          return response;
      }
    }
    return response;
  }

  async addListElements(){

    this.usuarioAfectadoTemp.interrupcion=0;
    this.usuarioAfectadoTemp.interrupcionCorta=0;

    var textRedElectrica = ((document.getElementById("form_consigna-red_electrica")) as HTMLSelectElement).textContent;
    var textTipoElemento = ((document.getElementById("form_consigna-tipo_elemento")) as HTMLSelectElement).textContent;
    var textElemento = ((document.getElementById("form_consigna-elemento")) as HTMLSelectElement).textContent;
    var textRamal = ((document.getElementById("form_consigna-ramal")) as HTMLSelectElement).textContent;
    var textAfectaUsuarios = ((document.getElementById("form_consigna-afecta-usuarios")) as HTMLSelectElement).textContent;
    var fechaInicio = this.dateValidation.getYearMounthDay(this.formElementos.fechaInicio.value);
    var horaInicio = this.formElementos.horaInicio.value;
    var fechaFinal = this.dateValidation.getYearMounthDay(this.formElementos.fechaFinal.value);
    var horaFinal = this.formElementos.horaFinal.value;
    var feeder= this.getFeederElemento(this.formElementos.elemento.value);
    await this.getAreaAFectada( feeder);
    
    
    var jsonAreaAfectada="";//[[],[]]
    var jsonPersona="";//[]

    var jsonAreaAfectadaCortoT="";//[[],[]]
    var jsonPersonaCortoT="";//[]
 
    if(this.formElementos.afectaUsuarios.value==1)
    {
      if(this.areaAFectada.length>0)
      {
        jsonAreaAfectada=JSON.stringify( this.areaAFectada[0].area );
        jsonPersona= JSON.stringify( this.areaAFectada[0].persona );
      }
      
      if (this.areaAFectadaCortoTiempo.length > 0) {
        jsonAreaAfectadaCortoT = JSON.stringify(this.areaAFectadaCortoTiempo[0].area);
        jsonPersonaCortoT = JSON.stringify(this.areaAFectadaCortoTiempo[0].persona);
      }
    }

    const elemento = {
      id:             {value: null},
      redElectrica:   {name: textRedElectrica,  value: this.formElementos.redElectrica.value},
      tipoElemento:   {name: textTipoElemento,  value: this.formElementos.tipoElemento.value},
      elemento:       {name: textElemento,      value: this.formElementos.elemento.value},
      ramal:          {name: textRamal,         value: this.formElementos.ramal.value},
      afectaUsuarios: {name: textAfectaUsuarios,value: this.formElementos.afectaUsuarios.value},
      fechaInicio:    {name: fechaInicio,       value: fechaInicio },
      horaInicio:     {name: horaInicio,        value: horaInicio },
      fechaFinal:     {name: fechaFinal,        value: fechaFinal},
      horaFinal:      {name: horaFinal,         value: horaFinal},
      jsonAreaAfectada: {name:'jsonAreaAfectada', value: jsonAreaAfectada   },
      jsonPersona:{name:'jsonPersona',value: jsonPersona},
      jsonAreaAfectadaCortoT: {name:'jsonAreaAfectadaCortoT', value: jsonAreaAfectadaCortoT   },
      jsonPersonaCortoT:{name:'jsonPersonaCortoT',value: jsonPersonaCortoT},
      jsonElementoMapa:{name:'jsonElementoMapa', value: this.jsonMapa},
      feeder:feeder,
      jsonIntervenirElementoMapa:{name:'jsonIntervenirElementoMapa', value: document.getElementById("jsonElementoIntervenirMapa").innerText } ,
      jsonIntervenirElementoMapaCortoT:{name:'jsonElementoIntervenirMapaCortoTiempo', value: document.getElementById("jsonElementoIntervenirMapaCortoTiempo").innerText } ,
      jsonTiempo:{name:'jsonTiempo',value:document.getElementById('jsonTiempo').innerText},
      totalUsuarioInterrupcion:{name:'totalUsuarioInterrupcion',value:this.usuarioAfectadoTemp.interrupcion},
      totalUsuarioInterrupcionCorta:{name:'totalUsuarioInterrupcionCorta',value:this.usuarioAfectadoTemp.interrupcionCorta}
    }
    
    this.dataElementos.push(elemento);
    this.getElementoMapa();

    this.setElemento.emit(elemento.elemento);
    this.escribrirAreaAfectada();

    this.calcularIdicador();

    //oculta el boton de ver mapa seleccionado
    var botonVerMapaSelec = document.getElementById("botonVerMapaSelec");
    botonVerMapaSelec.style.visibility = "hidden";
    this.jsonMapa = '';
    document.getElementById("jsonDataMapa").textContent = '';
    document.getElementById("jsonElementoIntervenirMapa").textContent ="";
    document.getElementById("jsonMapaTipo").textContent="";

    this.formElementos.tipoElemento.value = null;
    this.formElementos.elemento.value = null;
    this.formElementos.ramal.value = null;
    this.formElementos.afectaUsuarios.value = null;
    this.formElementos.fechaInicio.value = this.form.fechaSolicitud.value;
    this.formElementos.horaInicio.value = null;
    this.formElementos.fechaFinal.value = this.form.fechaSolicitud.value;
    this.formElementos.horaFinal.value = null;

  }

  calcularIdicador() {

    //solo apertura
    console.log( this.validarEstadoEquipo() )
    if (this.validarEstadoEquipo() == "A") {

      //hola
      var total = 0;
      var tiempo = 0


      this.dataElementos.forEach(element => {

        var jsonTiempo = 0;

        if(element.totalUsuarioInterrupcion.value!="" && element.totalUsuarioInterrupcion.value!=null)
        {
          total += parseInt( element.totalUsuarioInterrupcion.value );
        }
        

        if (element.jsonTiempo.value != "") {
          jsonTiempo = parseInt(element.jsonTiempo.value)

          if (jsonTiempo > this.indicador.tiempoMaximo) {

            if(element.totalUsuarioInterrupcionCorta.value!="" && element.totalUsuarioInterrupcionCorta.value!=null)
            {
              total +=  element.totalUsuarioInterrupcionCorta.value;
            }
            
          }

        }


        if (element.totalUsuarioInterrupcion.value > 0 || (jsonTiempo > this.indicador.tiempoMaximo && element.totalUsuarioInterrupcionCorta.value > 0)) {
          var horaInicio = new Date(`${moment(element.fechaInicio.value).format('YYYY/MM/DD') }, ${element.horaInicio.value}`);
          var horaFinal = new Date(`${moment(element.fechaInicio.value).format('YYYY/MM/DD') }, ${element.horaFinal.value}`);

          var hora = horaFinal.getHours() - horaInicio.getHours()
          var minutos = horaFinal.getMinutes() - horaInicio.getMinutes()
          hora = hora + (minutos > 0 ? minutos / 60 : 0)

          tiempo += hora;
        }



      });

      this.indicador.interrupcionUsuario = total;
      this.indicador.horaTrabajo = tiempo;
      var mlt = tiempo * total;
     
      if(this.indicador.totalUsuarios>0)
      {
        this.indicador.Saidi = mlt > 0 ? (mlt / this.indicador.totalUsuarios) : 0
        this.indicador.Saifi = total > 0 ? (total / this.indicador.totalUsuarios) : 0
      }
      

    }



  }

  validarEstadoEquipo(){

    var result= this.session.getItem('estadoEquipo').filter(b=>{
      return (b.id==this.form.estadoEquipo.value)
    }) 
   
    return result.length==0?"":result[0].codigo;
    
  }

  getElementoMapa(){
    this.form.urlMapa.value = [];
    for(let value of this.dataElementos){
      if(value.jsonElementoMapa != '' && value.jsonElementoMapa != undefined && value.jsonElementoMapa != null){
       if (value.jsonElementoMapa.value != "" && value.jsonElementoMapa.value != null) {
         var dataJson = JSON.parse(value.jsonElementoMapa.value);
         if (typeof dataJson == 'string') {
           dataJson = JSON.parse(dataJson);
         }
         this.form.urlMapa.value.push(dataJson.url);
       }
      }
    }
  }

  removeListElement(id){
    this.dialogo
      .open(ModalConfirmComponent, {
      data: new Mensaje("Eliminar:","¿Está seguro de eliminar el registro?")
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if(confirmado) {

        var elemento=this.dataElementos[id];
        var feederEli= elemento.feeder;
        this.dataElementos.splice(id,1);
        this.logAreaAFectada=[];

        for (let index = 0; index < this.dataElementos.length; index++) {
          const element = this.dataElementos[index];
          
          if (element.feeder == feederEli) {
            var data = this.logAreaAFectada.filter(b => {
              return (b.feeder == elemento)
            });
            
            if (data.length == 0) {
              if (element.jsonAreaAfectada.value == "") {//[[],[]]
                element.jsonAreaAfectada.value = elemento.jsonAreaAfectada.value;
              }
              if (element.jsonPersona.value == "") {//[]
                element.jsonPersona.value = elemento.jsonPersona.value;
              }
            }
          }

          this.logAreaAFectada.push({feeder: element.feeder});

        }
        this.escribrirAreaAfectada();
        this.getElementoMapa();
        this.calcularIdicador();
      }
    });    
  }

  selectListElement(id)
  {
    if(id==null)
    {
      this.mostrarPanelElemento=true;
      this.elementUpdateID=null;
      this.validacionUpdate("");
      
    }else{
      this.elementUpdateID=id;
      this.mostrarPanelElemento=false;
    }
    
  }

  updateElement()
  {

    if(this.formElementos.fechaInicio.value==null || this.formElementos.fechaFinal.value==null ||
       this.formElementos.horaInicio.value==null || this.formElementos.horaFinal.value==null || this.form.estadoEquipo.value==null )
    {
      this.validacionUpdate("Este campo es requerido.");
       return;
    }
    var elemento=this.dataElementos[this.elementUpdateID];
    var fechaInicio = this.dateValidation.getYearMounthDay(this.formElementos.fechaInicio.value);
    var horaInicio = this.formElementos.horaInicio.value;
    var fechaFinal = this.dateValidation.getYearMounthDay(this.formElementos.fechaFinal.value);
    var horaFinal = this.formElementos.horaFinal.value;
    elemento.fechaInicio.name=fechaInicio;
    elemento.fechaInicio.value=fechaInicio;
    elemento.horaInicio.name=horaInicio;
    elemento.horaInicio.value=horaInicio;
    elemento.fechaFinal.name=fechaFinal;
    elemento.fechaFinal.value=fechaFinal;
    elemento.horaFinal.name=horaFinal;
    elemento.horaFinal.value=horaFinal;
    this.dataElementos[this.elementUpdateID]=elemento;
    this.validacionUpdate("");
    this.selectListElement(null);
    this.escribrirAreaAfectada();
    
  }

  validacionUpdate(mensaje)
  {
    this.formElementos.fechaInicio.messages=mensaje;
    this.formElementos.fechaFinal.messages=mensaje;
    this.formElementos.horaInicio.messages=mensaje;
    this.formElementos.horaFinal.messages=mensaje;
    this.form.fechaSolicitud.messages=mensaje;
    this.form.estadoEquipo.messages=mensaje;
  }


  guardarConsigna(){
    let response = {
      formData: new FormData(),
      success: false,
      message: null
    }

    let inputFile = this.inputFileDynamic.fileUp();//subir los documentos Topología 
    let inputFileMultiple = this.inputFileMultiple.fileUp();//subir los documentos anexos 
    // let formData: FormData = new FormData();

    // if(this.consignacionId != null){
    //   if(this.inputFile == undefined){
    //     this.fileUpload.success = true;
    //   }else{
    //     this.fileUpload = this.fileValidation.fileUp(this.inputFile);
    //     this.fileUrl = '';
    //   }
    // }else{
    //   // valida si se a adjuntado un documento
    //   this.fileUpload = this.fileValidation.fileUp(this.inputFile);
    // }
    // if( this.validateEmptyFields() && this.fileUpload.success){

    if( this.validateEmptyFields() && inputFile.success && inputFileMultiple.success && this.validarTiempoElmento()){

      response.formData = inputFile.files;
      //adjuntar los documentos(anexos)
      let fileMultiple = this.inputFileMultiple.getFiles();
      if(fileMultiple != undefined){
        for(let i = 0;i< fileMultiple.length; i++){
          let fileUpload = fileMultiple[i];
          response.formData.append("anexos[]", fileUpload);
        }
      }

      response.formData.append('consignacionId', this.consignacionId);
      response.formData.append('consignaPadreId', this.consignaPadreId);
      response.formData.append('fileUrl', this.fileUrl);
      response.formData.append('form',JSON.stringify(this.form));
      response.formData.append('dataElementos',JSON.stringify(this.dataElementos));
      response.formData.append('interrupcionesTrabajo',JSON.stringify(this.interrupcionesTrabajo));
      response.formData.append('interrupcionesCortoTiempo',JSON.stringify(this.interrupcionesCortoTiempo));
      response.formData.append('argNumConsigna',JSON.stringify(this.argNumConsigna));
      response.formData.append('user',JSON.stringify(this.user));
      //response.formData.append('personaAfectada',JSON.stringify(this.areaAFectada[0].persona));

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

  validarTiempoElmento() {
    var valido = true;
    if (this.form.tipoFormatoConsigna.value == "CH") {
      this.dataElementos.forEach(element => {
        if (element.fechaFinal.name == null || element.horaInicio.name == null ||
          element.fechaFinal.name == null || element.horaFinal.name == null) {
          valido = false;
        }
      });
    }
    return valido;
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
            this.form.consecutivoSnc.disabled = false;
            this.form.consecutivoSnc.required = true;
          }else{
            value = '';
            this.form.consecutivoSnc.disabled = true;
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
    const response = await this.session.getDataSelectConsigna();
    if(response.success){
      this.setSelect();
      
      if(response.data.totalUsuario.length>0)
      {
        this.indicador.totalUsuarios=response.data.totalUsuario[0].usuarios;
      }

      if(response.data.validarTiempoIntCorta.length>0)
      {
        var valor=response.data.validarTiempoIntCorta[0].valor;
        this.indicador.tiempoMaximo=valor!=""? parseInt(valor):0;
      }
      
    }
  }

  setSelect(){
    this.dataControls.divisionArea = this.session.getItem('divisionArea');
    this.dataControls.tipoZona = this.session.getItem('tipoZona');
    this.dataControls.tipoSolicitud = this.session.getItem('tipoSolicitud');
    this.dataControls.tipoConsignacion = this.session.getItem('tipoConsignacion');
    this.dataControls.estadoEquipo = this.session.getItem('estadoEquipo');
    this.dataControls.tipoMantenimiento = this.session.getItem('tipoMantenimiento');
    // this.dataControls.subestacion = this.session.getItem('subestacion');
    // this.dataControls.tipoElemento = this.session.getItem('tempTipoElemento');
    // this.dataControls.elemento = this.session.getItem('elemento');
    this.form.medidasSeguiridad.value=this.session.getItem('medidaSeguridad')[0]['descripcion'];
    this.dataControls.tipoFormatoConsigna = this.session.getItem('tipoFormatoConsigna');
    this.dataControls.tipoTercerosConsigna = this.session.getItem('tipoTercerosConsigna');
    this.setDefaultTipoConsigna();
    //cuando es nueva agregar solo la solicitada
    this.dataControls.estadoConsigna = this.session.getItem('estadoConsigna').filter(b => {
      return (b.codigo == 'S')
    })
    
  }

  cleanAllFields(){
    this.validations.cleanFields(this.form);
    this.validations.cleanFields(this.formElementos);
    this.validations.cleanFields(this.interrupcionesTrabajo);
    this.validations.cleanFields(this.interrupcionesCortoTiempo);
    this.fileValidation.fileUp(this.inputFile);
    this.dataElementos = [];
    this.getDataSolicitante();
    this.setSelect();
    this.numeroAreaAfectada.barrios = 0;
    this.numeroAreaAfectada.clienteRegulado = 0;
    this.numeroAreaAfectada.clienteNoRegulado = 0;
    this.inputFileDynamic.cleanFiles();
    this.inputFileMultiple.cleanFiles();
  }

  async getSubestaciones(event){
    this.dataControls.tipoElemento = [];
    this.dataControls.elemento = [];
    let request = {
      zona_id: event
    };

    let dataSubestacion = this.session.getDataInfo('subestacion','zona_id',event);
    if(dataSubestacion.success && dataSubestacion.data.length >0){
      this.dataControls.subestacion = dataSubestacion.data;
    }else{
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
  }

  validateSubestacion(){
    this.dataControls.tipoElemento = [];
    this.dataControls.elemento = [];
    var dataConsigna = [];

    this.getTipoElementos();
  }

  async validateElementos(event, tipoSelect){

    // validar si existe una consigna con la misma subestación y solicitada
    if(this.consignaPadreId == null && this.form.tipoFormatoConsigna.value == 'C'){
      var fechaInicio = moment().format('YYYY/MM/DD');
      var fechaFinal = moment(fechaFinal).endOf('month').format('YYYY/MM/DD');//fecha final del mes

      let request = {
        codigoEstadoConsigna:{ //consultar unicamente las solicitadas
          value: 'S'
        },
        fechaSolicitudInicio:{
          value: fechaInicio
        },
        fechaSolicitudFinal:{
          value: fechaFinal
        },
        /*codigoTipoFormato:{
          value: this.form.tipoFormatoConsigna.value
        }*/
      }
      const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, request);
      if(response.success){
        //si el select es una subestacion
        if(tipoSelect == 'S'){ 
          for(let value of response.data){
            if(event == parseInt(value.subestacion_id)){
              var message = "Existe una solicitud con la subestación seleccionada en estado pendiente para la fecha ejecución "+moment(value.fecha_solicitud).format('YYYY/MM/DD')+" ¿desea crear la solicitud como trabajo de oportunidad?"
              this.dialogo
                .open(ModalConfirmComponent, {
                data: new Mensaje("Atención:", message)
              })
              .afterClosed()
              .subscribe((confirmado: Boolean) => {
                if(confirmado) {
                  this.tempTipoFormatoConsigna = "TDO";
                  this.form.tipoFormatoConsigna.value = "TDO";
                  this.setDataFormAndDisable(value);
                }
              });
              return;
            }
          }
        }
        var dataConsigna = response.data;
        //si el select es un elemento
        if(tipoSelect == 'E'){
          for(let value of response.lista_elemento){
            if(parseInt(value.subestacion_id) == this.form.subestacion.value && 
              parseInt(value.elemento_id) == event){
                var message = "Existe una solicitud con la subestación y elemento seleccionado en estado pendiente para la fecha ejecución "+moment(value.fecha_solicitud).format('YYYY/MM/DD')+" ¿desea crear la solicitud como trabajo de oportunidad?"
                this.dialogo
                  .open(ModalConfirmComponent, {
                  data: new Mensaje("Atención:", message)
                })
                .afterClosed()
                .subscribe((confirmado: Boolean) => {
                  if(confirmado) {
                    for(let data of dataConsigna){
                      if(data.consignacion_id == value.consignacion_id){
                        this.tempTipoFormatoConsigna = "TDO";
                        this.form.tipoFormatoConsigna.value = "TDO";
                        this.setDataFormAndDisable(data);
                      }
                    }
                  }
                });
                return;
            }
          }
        }
      }
    }
  }

  async getTipoElementos(){
    this.dataControls.tipoElemento = [];
    this.dataControls.elemento = [];

    if(this.form.subestacion.value != null && this.form.subestacion.value != undefined){
      if(this.formElementos.redElectrica.value != null && this.formElementos.redElectrica.value != undefined){
        this.esRedElectrica=this.formElementos.redElectrica.value=="1"?true:false;
        if(this.formElementos.redElectrica.value == '1'){
          let request = {
            subestacion_id: event
          };
  
          let dataSession = this.session.getDataInfo('tipoElemento','subestacion_id',this.form.subestacion.value);
          if(dataSession.success && dataSession.data.length >0){
            for(let value of dataSession.data){
              this.dataControls.tipoElemento.push(value);
            }
          }else{
            const response = await this.api.post(`${environment.apiBackend}/tipo-elemento/get-tipo-elemento`, request);
            let success = response.success;
            let message = response.message;
            if(success){
              if(response.data.length > 0){
                for(let value of response.data){
                  this.dataControls.tipoElemento.push(value);        
                }
              }else{
                this.snackBar.alert('No se encontró información con la subestación seleccionada!',5000);
              }
            }else{
              this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
            } 
          }
        }else{
          this.dataControls.tipoElemento = this.session.getItem('tempTipoElemento');
        }
        this.getElementos(this.formElementos.tipoElemento.value);        
      }      
    }else{
      this.snackBar.alert('seleccione una subestación!',5000);
    }
  }

  async getElementos(event){
    if(event != null && event != undefined){
      this.dataControls.elemento = [];
      let request = {
        tipo_elemento_id: event
      };
  
      let dataSession = this.session.getDataInfo('elemento','tipo_elemento_id',event);
      if(dataSession.success && dataSession.data.length >0){
        this.dataControls.elemento = dataSession.data;
      }else{
        const response = await this.api.post(`${environment.apiBackend}/elemento/get-elemento`, request);
        let success = response.success;
        let message = response.message;
        if(success){
          this.dataControls.elemento = response.data;
        }else{
          this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
        } 
      }    
    }
  }

 getJsonMapa(){
  //  para ocultar el boton de ver el mapa
   var botonVerMapaSelec = document.getElementById("botonVerMapaSelec");
   this.verMapaSelect = "hidden";
   botonVerMapaSelec.style.visibility = this.verMapaSelect;
   this.jsonMapa = '';
   document.getElementById("jsonDataMapa").innerText = ''

    var child;
    var date = new Date();
    var key = date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();

    // definimos la anchura y altura de la ventana
    const height = 600;
    const width = 1000;

    // calculamos la posicion x, y para centrar la ventana
    const y = Number((window.innerHeight / 2) - (height / 2));
    const x = Number((window.innerWidth / 2) - (width / 2));
    var snackBar = this.snackBar;
    
    if(this.formElementos.elemento.value!=null){
      var feeders=this.getFeederElemento(this.formElementos.elemento.value);
      var data = "data="+this.utf8_to_b64('{"feeders":[{"code":"'+feeders+'"}],"tipo":"feeders"}')+'&user='+this.utf8_to_b64(JSON.stringify(this.user));
      child = window.open(environment.urlEhmap+ '?' + data + '&key=' + key, "MsgWindow", 'width=' + width + ',height=' + height + ',top=' + y + ',left=' + x + ',toolbar=no,resizable=no');
      // child = window.open('http://192.9.200.44/hijo.html?key='+key+'&data={"feeders":[{"code":"'+feeders+'"}]}', 'Mapa', 'width=' + width + ',height=' + height + ',top=' + y + ',left=' + x + ',toolbar=no,resizable=no');
      var apiLocal = this.api;
      var jsonLocal = '';
      var jsonIntervenirElementoMapa='';
      var jsonElementoIntervenirMapaCortoTiempo='';
      var intentos = 0;
      var timer = setInterval(async function () {
        if (child.closed) {
          let response = null;
          // Se realiza el llamado del api que obtiene la data del mapa a partir del key
          if(environment.debug && environment.production){
            //https://enlinea.electrohuila.com.co/back-consignas/public/api
            response = await apiLocal.get(`${environment.apiBackend}/integracion-mapa/get/${key}`);
          }else{
            response = await apiLocal.get(`${environment.apiBackend}/integracion-mapa/get/${key}`);
          }
          intentos += 1;
          if(response.success){
            var objJson=JSON.parse( response.data );
          
            jsonLocal =JSON.stringify({url: objJson });//url JSON.stringify(response.data.url);
            
            if(objJson.interrupcion!=null)
            {
              var jdata=objJson.interrupcion.data;//JSON.parse(objJson.interrupcion.data);
              jsonIntervenirElementoMapa=JSON.stringify( jdata.json ) ;
              document.getElementById("jsonElementoIntervenirMapa").textContent = jsonIntervenirElementoMapa;
              document.getElementById("jsonMapaTipo").textContent = jdata.tipo;
            }

            if(objJson.interrupcionCorta!=null)
            {
              var jdata=objJson.interrupcionCorta.data;//JSON.parse(objJson.interrupcionCorta.data);
              jsonElementoIntervenirMapaCortoTiempo=JSON.stringify( jdata.json ) ;
              document.getElementById('jsonTiempo').textContent=jdata.tiempo;
              document.getElementById("jsonElementoIntervenirMapaCortoTiempo").textContent=jsonElementoIntervenirMapaCortoTiempo;
              document.getElementById("jsonMapaTipoCortoTiempo").textContent = jdata.tipo;
            }

            document.getElementById("jsonDataMapa").textContent = jsonLocal;
            

            this.verMapaSelect = "visible";
            botonVerMapaSelec.style.visibility = this.verMapaSelect;
            clearInterval(timer);
            
          }else{
            if(intentos <= 1 && this.verMapaSelect !== "visible"){
              snackBar.alert('No se encontró registro de mapa para guardar!',5000);
            }
          }
          clearInterval(timer);
        }
      }, 500);

    }else{
      this.formElementos.elemento.messages="Este campo es requerido.";
    }
    
  }

  verMapaGuardado(){
    this.jsonMapa = document.getElementById("jsonDataMapa").innerText;
    this.openMap(this.jsonMapa);
  }

  openMap(data = null){

    var url="";
    if(data != '' && data != null && data != undefined){
      if(typeof data == 'string'){
        data = JSON.parse(data);
        var interrupcion="";
        if(data.url.interrupcion!=null)
        {
           interrupcion=data.url.interrupcion.data.url;// JSON.parse(data.url.interrupcion.data).url;
        }
        var interrupcionCorta="";
        if(data.url.interrupcionCorta!=null)
        {
           interrupcionCorta=data.url.interrupcionCorta.data.url;//JSON.parse(data.url.interrupcionCorta.data).url;
        }
        
        url=`visor=${interrupcion}@${interrupcionCorta}`;
      }
    
      var child = window.open(environment.urlEhmap+'?'+url+'&user='+this.utf8_to_b64(JSON.stringify(this.user)),"MsgWindow", "width=1200,height=600");
    }else{
      this.snackBar.alert('No se encontró mapa',5000);
    }    
  }

  
  async getAreaAFectada(elemento) {

    this.areaAFectada = [];
    //VALIDAR EL FEEDER PARA NO REPETIR
    var data = this.logAreaAFectada.filter(b => {
      return (b.feeder == elemento)
    });
    if (data.length > 0 || this.formElementos.afectaUsuarios.value == 0) {
      return;
    }

    var padre = "";

    if (document.getElementById("jsonMapaTipo").innerText == "getAbrir" || document.getElementById("jsonMapaTipoCortoTiempo").innerText == "getAbrir" ) {

      var elementoMapa = document.getElementById("jsonElementoIntervenirMapa").innerText;
      if (elementoMapa != "") {
        JSON.parse(elementoMapa).TRANSFOR.forEach(element => {
          if (padre == "") {
            padre = padre + element.CODE;
          } else {
            padre = padre + "|" + element.CODE + "|";
          }
          /* this.logAreaAFectada.push({
             feeder: element.CODE
           });*/
        });
        if(padre!="")
        {
          await this.getDataAreaAfectada(`transf/${padre}`, true);
        }
        
      }


      var elementoMapa = document.getElementById("jsonElementoIntervenirMapaCortoTiempo").innerText;

      if (elementoMapa != "") {
        JSON.parse(elementoMapa).TRANSFOR.forEach(element => {
          if (padre == "") {
            padre = padre + element.CODE;
          } else {
            padre = padre + "|" + element.CODE + "|";
          }
          /* this.logAreaAFectada.push({
             feeder: element.CODE
           });*/
        });
        if(padre!="")
        {
          await this.getDataAreaAfectada(`transf/${padre}`, false);
        }
        
      }

      //  elemento = "transf/" + padre;

    } else {
      // this.logAreaAFectada.push({feeder:elemento});
      elemento = "feeder/" + elemento;
    }
  }

  

  async getDataAreaAfectada(elemento,duraTrabajo)
  {

    var response = await this.api.get(
      `${environment.apiBackend}/consigna/getAreaAfectada/${elemento}`
    );
    
    var obj=[];
    var objSector=[];
    var objCliente=[];
    
    if (response.message == null || response.message=="") {
      
      var municipio="inicio";
    
      if(response.data.barrioAfectado!=undefined)
      {
        response.data.barrioAfectado.forEach(element => {
         
          if (municipio == "inicio") {
             municipio = element.nombre_muni;
             obj.push(this.crearJsonBarrio(municipio, response.data.barrioAfectado));
             objSector.push(this.crearJsonSector(municipio, response.data.barrioAfectado));
          }
 
          if (municipio != element.nombre_muni) {
             municipio = element.nombre_muni;
             obj.push(this.crearJsonBarrio(municipio, response.data.barrioAfectado));
             objSector.push(this.crearJsonSector(municipio, response.data.barrioAfectado));
          }

       });

      }
      
      
      if( response.data.clieteAfectado!=undefined)
      {
        response.data.clieteAfectado.forEach(element => {
          objCliente.push({
            nombre: element.nombre_completo,
            cuenta:element.code,
            emails: this.splitCorreo(element.correos),
            tipo:element.tipo_usuario
          });
        });
      }
      
    }
      // hola
      
    if(duraTrabajo)
    {
      this.areaAFectada.push({area:[obj,objSector],persona:objCliente});
      this.usuarioAfectadoTemp.interrupcion=objCliente.length
      console.log(objCliente.length)
    }else{
      this.areaAFectadaCortoTiempo.push({area:[obj,objSector],persona:objCliente});
      this.usuarioAfectadoTemp.interrupcionCorta=objCliente.length
      console.log(objCliente.length)
    }
    

  }

  crearJsonBarrio(municipio,element){
     var barrario=[];
     var varBarrio="";
     var varDepartamento="";
     element.filter(b => {
      return (b.nombre_muni == municipio)
     }).forEach(elemen => {

       if(varBarrio!=elemen.barrio)
       {
         if (elemen.barrio != null) {
           barrario.push(elemen.barrio);
           varBarrio = elemen.barrio;
           varDepartamento = elemen.nombre_depto;
         }
       
       }
       
     });
     
     return {departamento:varDepartamento,municipio:municipio,barrio:barrario};
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

  crearJsonSector(municipio, element) {
    var sector = [];
    var name = "";
    var varDepartamento="";
    element.filter(b => {
      return (b.nombre_muni == municipio)
    }).forEach(elemen => {
      if (name != elemen.nombre_sector) {
        sector.push(elemen.nombre_sector);
        name = elemen.nombre_sector;
        varDepartamento=elemen.nombre_depto;
      }
    });

    return {departamento:varDepartamento, municipio: municipio,sector: sector};
  }

  getFeederElemento(id) {
    var data = this.session.getItem('elemento').filter(b => {
      return (b.id == id)
    })
    return data[0].nemonico;
  }

  escribrirAreaAfectada() {

     if (this.formElementos.afectaUsuarios.value == 0 ) {
       return;
     }

     this.recorrerAreafectada();

     this.recorrerAreafectadaCortoT();
      
  }

  recorrerAreafectada() {
    var barrio = "";
    var cliente = "";
    this.numeroAreaAfectada.barrios = 0;
    this.numeroAreaAfectada.clienteRegulado = 0;
    this.numeroAreaAfectada.clienteNoRegulado = 0;
    this.dataElementos.forEach(element => {


      if (element.jsonAreaAfectada.value != "") {
        var data = JSON.parse(element.jsonAreaAfectada.value)[0];
        if (data != undefined) {

          if (data.length > 0) {
            data.forEach(elemen => {
              elemen.barrio.forEach(element => {
                if(barrio!=null)
                {
                  barrio += element + "\r";
                  this.numeroAreaAfectada.barrios++;
                }
              });
            });
          }
        }
      }

      if (element.jsonPersona.value != "") {
        data = JSON.parse(element.jsonPersona.value);
        if (data != undefined) {
          data.forEach(element => {
            if (element.tipo == "No regulado") { //
              cliente += element.nombre + "\r";
              this.numeroAreaAfectada.clienteNoRegulado++;
            } else {
              this.numeroAreaAfectada.clienteRegulado++;
            }
          })
        };
      }
    });


    this.interrupcionesTrabajo.barrios.value = barrio;
    this.interrupcionesTrabajo.clientesNoRegulados.value = cliente;
  }

  recorrerAreafectadaCortoT() {
    var barrio = "";
    var cliente = "";
    this.numeroAreaAfectadaCortoT.barrios = 0;
    this.numeroAreaAfectadaCortoT.clienteRegulado = 0;
    this.numeroAreaAfectadaCortoT.clienteNoRegulado = 0;
    this.dataElementos.forEach(element => {
      if (element.jsonAreaAfectadaCortoT.value != "") {
        var data = JSON.parse(element.jsonAreaAfectadaCortoT.value)[0];
        if (data != undefined) {

          if (data.length > 0) {
            data.forEach(elemen => {
              elemen.barrio.forEach(element => {
                if(barrio!=null)
                {
                  barrio += element + "\r";
                  this.numeroAreaAfectadaCortoT.barrios++;
                }
              });
            });
          }
        }
      }

      if (element.jsonPersonaCortoT.value != "") {
        data = JSON.parse(element.jsonPersonaCortoT.value);
        if (data != undefined) {
          data.forEach(element => {
            if (element.tipo == "No regulado") { //
              cliente += element.nombre + "\r";
              this.numeroAreaAfectadaCortoT.clienteNoRegulado++;
            } else {
              this.numeroAreaAfectadaCortoT.clienteRegulado++;
            }
          })
        };
      }
    });

    /* this.interrupcionesTrabajoCortoTiempo.barrios.value = barrio;
    this.interrupcionesTrabajoCortoTiempo.clientesNoRegulados.value = cliente;*/
    this.interrupcionesCortoTiempo.barrios.value = barrio;
    this.interrupcionesCortoTiempo.clientesNoRegulados.value = cliente;
    
  }

  utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
  }

  setDefaultTipoConsigna(){
    this.form.tipoFormatoConsigna.value = 'C';
  }

  validateTipoFormato(data){
    if(this.consignacionId != null || this.consignaPadreId != null){
      this.dialogo
        .open(ModalConfirmComponent, {
        data: new Mensaje("Atención:","Si realiza esta acción, se eliminará los registros guardados anteriormente. ¿ Desea realizarlo ?")
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if(confirmado) {
          this.limpiarForm();
          this.dataElementos = [];
          this.showDialogBuscarConsigna(data);
        }else{
          this.form.tipoFormatoConsigna.value = this.tempTipoFormatoConsigna;
        }
      });  
    }else{
      this.showDialogBuscarConsigna(data);
    }
  }

  showDialogBuscarConsigna(data){
    var response = {
      success: true,
      message: 'por favor agregue un consecutivo!'
    };
    this.setDisableForm(this.form,false);

    if(this.form.tipoFormatoConsigna.value != 'C'){
      const dialogRef = this.dialog.open(ConsignaNewSearchComponent, {
        width:'100%',
        data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result == undefined){
          response.success = false;
          this.snackBar.alert('por favor agregue un consecutivo!', 5000);
          this.form.tipoFormatoConsigna.value = 'C';
        }else if(result.data[0] == undefined){
          response.success = false;
          this.snackBar.alert('por favor agregue un consecutivo!', 5000);
          this.form.tipoFormatoConsigna.value = 'C';
        }else{
          this.tempTipoFormatoConsigna = this.form.tipoFormatoConsigna.value;
          var data = result.data[0];
          this.setDataFormAndDisable(data);

          if(this.form.tipoFormatoConsigna.value == 'CH'){
            this.dataElementos = result.listaElemento;
            this.recorrerAreafectada();
          }
        }

        if(!response.success){
          this.limpiarForm();
        }

        this.tipoFormato = ((document.getElementById("form_consigna-tipo_formato")) as HTMLSelectElement).textContent;
      });
    }
  }

  setDataFormAndDisable(data){
    
    this.consignaPadreId = data.consignacion_id;
    this.form.divisionArea.value = parseInt(data.division_area_id);
    this.form.tipoZona.value = parseInt(data.zona_id);
    this.getSubestaciones(this.form.tipoZona.value);
    this.form.tipoSolicitud.value = parseInt(data.tipo_solicitud_id);
    this.form.fechaSolicitud.value = new Date(data.fecha_solicitud);
    this.form.tipoConsignacion.value = parseInt(data.tipo_consignacion_id);
    this.form.numeroConsigna.value = data.codigo;
    this.form.consecutivoSnc.value = data.codigo_snc;
    this.form.estadoConsigna.value = parseInt(data.estado_id);
    this.form.estadoEquipo.value = parseInt(data.estado_equipo_id);
    this.form.subestacion.value = parseInt(data.subestacion_id);
    this.form.tipoMantenimiento.value = parseInt(data.tipo_mantenimiento_id);

    this.getTipoElementos();
    this.setElementoFechaSolicitud();
    this.setDisableForm(this.form,true);

    if (this.form.tipoFormatoConsigna.value == "CH") {
      if (data.estado_consigna == "Ejecutada") {
        var estadoConsigna = this.session.getItem("estadoConsigna").filter(b => {
          return (b.codigo == "S")
        });
        this.form.estadoConsigna.value = parseInt(estadoConsigna[0].id);
        this.form.fechaSolicitud.disabled=false;
        this.form.fechaSolicitud.value=null;
        this.formElementos.fechaInicio.value=null;
        this.formElementos.fechaFinal.value=null;
      }
    }

  }

  limpiarForm(){
    this.consignaPadreId = null;
    this.form.divisionArea.value = null;
    this.form.tipoZona.value = null;
    this.form.tipoSolicitud.value = null;
    this.form.fechaSolicitud.value = null;
    this.form.tipoConsignacion.value = null;
    this.form.numeroConsigna.value = null;
    this.form.consecutivoSnc.value = null;
    this.form.estadoConsigna.value = null;
    this.form.estadoEquipo.value = null;
    this.form.subestacion.value = null;
    this.form.tipoMantenimiento.value = null;
  }

  setDisableForm(object, state){
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
          if(object[key].disabled != undefined) {
            object[key].disabled = state;
          } 
      }
    }
  }

  async validateFechaSolicitud(){
    var message = '';

    //valida que no exista un id para identificar que sea una consigna nueva
    if(this.consignacionId == null && this.consignaPadreId == null && this.form.fechaSolicitud.value != null){

      if(moment(this.form.fechaSolicitud.value).format('YYYY/MM/DD') >= moment().format('YYYY/MM/DD')){
        this.form.fechaSolicitud.messages = message;

        if(this.form.tipoSolicitud.value != null){
          var tipoSolicitud = this.dataControls.tipoSolicitud.filter(b=>{
            return (b.id == this.form.tipoSolicitud.value)
          });
  
          var codTipoSolicitud = tipoSolicitud[0].codigo;
          //valida que no sea una solicitud de emergencia
          if(codTipoSolicitud != 'E'){
            var dataFechaSolicitud = this.session.getItem('validacionFechaSolicitud');
            var valorValidacion = null;
            if(dataFechaSolicitud == null){ //valida si trae información
              const response = await this.session.getDataSelectConsigna();
              if(response.success){
                dataFechaSolicitud = this.session.getItem('validacionFechaSolicitud');
              }
            }
        
            for(let value of dataFechaSolicitud){
              if(value.estado == '1' && value.codigo == 'FDS'){
                valorValidacion = value.valor
              }
            }
            
            if(valorValidacion != null && valorValidacion != undefined){
              //var diaSemana = moment(this.form.fechaSolicitud.value).day(); //0 a 6, donde 0 = Domingo
              var diaSemanaActual = moment().isoWeekday();//1 a 7, donde 7 = Domingo
              var fechaValidacion = moment().add(1, 'weeks').startOf('isoWeek');//inicia la semana el lunes
        
              if(diaSemanaActual > parseInt(valorValidacion)){
                fechaValidacion = moment().add(2, 'weeks').startOf('isoWeek');//inicia la semana el lunes
              }        
              if(this.form.fechaSolicitud.value < fechaValidacion){
                message = 'No se puede agregar para la fecha indicada';              
              }
            }
          }
        }
        
      }else{
        message = 'La fecha debe ser mayor o igual a la actual';
      }

      if(message != ''){
        this.snackBar.alert(message, 5000);
        this.form.fechaSolicitud.value = null; 
        this.form.fechaSolicitud.messages = message;
      }
      
    }
    this.setElementoFechaSolicitud();
  }
  
  setElementoFechaSolicitud(){
    this.formElementos.fechaInicio.value = this.form.fechaSolicitud.value;
    this.formElementos.fechaFinal.value = this.form.fechaSolicitud.value;
  }

  unique(value, index, self) { 
    return self.indexOf(value) === index;
  }

  validarSelectSolicitaTercero(){
    if(this.form.solicitadaTercero.value == "1"){
      this.form.tipoTercero.visible = true
      this.form.tipoTercero.required = true
    }else{
      this.form.tipoTercero.value = null
      this.form.tipoTercero.visible = false
      this.form.tipoTercero.required = false

      this.form.terceroNumeroContrato.value = null
      this.form.terceroNumeroContrato.visible = false
      this.form.terceroNumeroContrato.required = false

      this.form.terceroAnio.value = null
      this.form.terceroAnio.visible = false
      this.form.terceroAnio.required = false

      this.form.terceroDescripcion.value = null
      this.form.terceroDescripcion.visible = false
      this.form.terceroDescripcion.required = false

    }
  }

  validarTipoTercero(){
    //obtiene el codigo del tipo tercero
    if(this.form.tipoTercero.value != null){
      let code = ""
      for(let value of this.dataControls?.tipoTercerosConsigna){
        if(parseInt(value.id) == parseInt(this.form.tipoTercero.value)){
          code = value.codigo
        }
      }

      if(code == 'CTA'){
        this.form.terceroNumeroContrato.visible = true
        this.form.terceroNumeroContrato.required = true

        this.form.terceroAnio.visible = true
        this.form.terceroAnio.required = true

        this.form.terceroDescripcion.visible = true
        this.form.terceroDescripcion.required = true
      }else{
        this.form.terceroNumeroContrato.value = null
        this.form.terceroNumeroContrato.visible = false
        this.form.terceroNumeroContrato.required = false

        this.form.terceroAnio.value = null
        this.form.terceroAnio.visible = false
        this.form.terceroAnio.required = false

        this.form.terceroDescripcion.visible = true
        this.form.terceroDescripcion.required = true
      }
    }else{
      this.form.terceroNumeroContrato.value = null
      this.form.terceroNumeroContrato.visible = false
      this.form.terceroNumeroContrato.required = false

      this.form.terceroAnio.value = null
      this.form.terceroAnio.visible = false
      this.form.terceroAnio.required = false

      this.form.terceroDescripcion.value = null
      this.form.terceroDescripcion.visible = false
      this.form.terceroDescripcion.required = false
    }

  }

  abrirSubelementos(obj) {

    try {

      if (JSON.parse(obj.jsonElementoMapa.value).url.interrupcion == null) {
        this.snackBar.alert('El elemento seleccionado no contiene subelementos.', 5000)
        return false;
      }

      var elemento = JSON.parse(obj.jsonElementoMapa.value).url.interrupcion.data.json;

      if (!elemento) {
        this.snackBar.alert('El elemento seleccionado no contiene subelementos.', 5000)
        return false;
      }

      const dialogConfig = new MatDialogConfig();
      dialogConfig.minWidth = 500;
      dialogConfig.minHeight = 650;
      dialogConfig.data = {
        data: elemento,

      };
      this.dialog.open(BitacoraSubelementosVistaComponent, dialogConfig);
    } catch (error) {
      this.snackBar.alert('El elemento seleccionado no contiene subelementos.', 5000)
    }
  }

  abrirSubelementosCortoTiempo(obj) {
   
    try {
      if (JSON.parse(obj.jsonElementoMapa.value).url.interrupcionCorta == null) {
        this.snackBar.alert('El elemento seleccionado no contiene subelementos.', 5000)
        return false;
      }

      var elemento = JSON.parse(obj.jsonElementoMapa.value).url.interrupcionCorta.data.json;

      if (!elemento) {
        this.snackBar.alert('El elemento seleccionado no contiene subelementos.', 5000)
        return false;
      }

      const dialogConfig = new MatDialogConfig();
      dialogConfig.minWidth = 500;
      dialogConfig.minHeight = 650;
      dialogConfig.data = {
        data: elemento,
      };
      this.dialog.open(BitacoraSubelementosVistaComponent, dialogConfig);
    } catch (error) {
      this.snackBar.alert('El elemento seleccionado no contiene subelementos.', 5000)
    }

    }

    async resumenMapa() {
      
      var url = "";
      var interrupcion = "";
      var interrupcionCorta = "";

      this.dataElementos.forEach(element => {

        if (element.jsonElementoMapa.value != "") {
          var elemento = JSON.parse(element.jsonElementoMapa.value);

          if (elemento.url.interrupcion != null) {
            url += elemento.url.interrupcion.data.url;
            interrupcion += elemento.url.interrupcion.data.url;
          }

          if (elemento.url.interrupcionCorta != null) {
            url += elemento.url.interrupcionCorta.data.url;
            interrupcionCorta += elemento.url.interrupcionCorta.data.url
          }

        }

        console.log(url);

      });

      if (url != "") {

        var date = new Date();
        var key = date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();

        var parametro = {
          key: key,
          data: JSON.stringify({
            interrupcion: interrupcion,
            interrupcionCorta: interrupcionCorta,
          })
        }

        const response = await this.api.post(`${environment.apiBackend}/integracion-mapa/set`, parametro);

        console.log(response);

        // definimos la anchura y altura de la ventana
        const height = 600;
        const width = 1000;

        // calculamos la posicion x, y para centrar la ventana
        const y = Number((window.innerHeight / 2) - (height / 2));
        const x = Number((window.innerWidth / 2) - (width / 2));

        window.open(environment.urlEhmap + '?keyload=' + key + '&user=' + this.utf8_to_b64(JSON.stringify(this.user)), "MsgWindow", 'width=' + width + ',height=' + height + ',top=' + y + ',left=' + x + ',toolbar=no,resizable=no');

      } else {
        this.snackBar.alert('El elemento seleccionado no contiene subelementos.', 5000)
      }

    }

  
  
}