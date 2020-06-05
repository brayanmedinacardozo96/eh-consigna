import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-consigna-new',
  templateUrl: './consigna-new.component.html',
  styleUrls: ['./consigna-new.component.scss']
})
export class ConsignaNewComponent implements OnInit {
  
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
  fileUpload = {
    success: null,
    message: null,
    files: new FormData()
  };

  messageListaElementos = '';
  user: User = Auth.getUserDataPerson();

  constructor(private api: ApiService,
              private validations: ValidationService,
              private dateValidation: DateValidationervice,
              private fileValidation: FileValidationService,
              private snackBar: SnackBarService,
              public dialog: MatDialog
              ) { 
                window.scrollTo(0,0);
                this.form.solicitante.value = `${this.user.document_number} - ${this.user.first_name} ${this.user.second_name} ${this.user.first_lastname} ${this.user.second_lastname}`;
              }

  ngOnInit(): void {
    this.getDataSelectConsigna();
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
  
  addListElements(){
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
    
    const elemento = {
      tipoElemento: {name: textTipoElemento,  value: this.formElementos.tipoElemento.value},
      elemento:     {name: textElemento,      value: this.formElementos.elemento.value},
      ramal:        {name: textRamal,         value: this.formElementos.ramal.value},
      fechaInicio:  {name: fechaInicio,       value: fechaInicio },
      horaInicio:   {name: horaInicio,        value: horaInicio },
      fechaFinal:   {name: fechaFinal,        value: fechaFinal},
      horaFinal:    {name: horaFinal,         value: horaFinal},
    }
    this.dataElementos.push(elemento);
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

  async guardarConsigna(){
    let formData: FormData = new FormData();
    // valida si se a adjuntado un documento
    this.fileUpload = this.fileValidation.fileUp(this.inputFile);

    if( this.validateEmptyFields() && this.fileUpload.success){
      formData = this.fileUpload.files;
      formData.append('form',JSON.stringify(this.form));
      formData.append('dataElementos',JSON.stringify(this.dataElementos));
      formData.append('interrupcionesTrabajo',JSON.stringify(this.interrupcionesTrabajo));
      formData.append('interrupcionesCortoTiempo',JSON.stringify(this.interrupcionesCortoTiempo));
      formData.append('argNumConsigna',JSON.stringify(this.argNumConsigna));
      formData.append('user',JSON.stringify(this.user));

      const response = await this.api.post(`${environment.apiBackend}/consigna/save-consigna`, formData);
      let success = response.success;
      let message = response.message;
      if(success){
        this.cleanAllFields();
        this.dialog.open(ConsignaNewMessageComponent,{
          backdropClass: 'cdk-overlay-transparent-backdrop',
          hasBackdrop: false,
          data: {response}
        });
      }else{
        this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
      }

    }else{
      this.snackBar.alert('Faltan campos a diligenciar',5000)
    }

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
      this.dataControls.tipoMantenimiento = data.tipoMantenimiento;
      this.dataControls.subestacion = data.subestacion
      this.dataControls.tipoElemento = data.tipoElemento
      this.dataControls.elemento = data.elemento
    }
    let message = response.message;
  }

  cleanAllFields(){
    console.log('entra men');
    this.validations.cleanFields(this.form);
    this.validations.cleanFields(this.formElementos);
    this.validations.cleanFields(this.interrupcionesTrabajo);
    this.validations.cleanFields(this.interrupcionesCortoTiempo);
    this.fileValidation.fileUp(this.inputFile)
    this.dataElementos = [];
  }

}
