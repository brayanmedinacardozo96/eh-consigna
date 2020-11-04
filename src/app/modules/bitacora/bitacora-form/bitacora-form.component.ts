import {Component, OnInit, ViewChild} from '@angular/core';
import {Validations} from "../../../shared/validations";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {InputFileComponent} from "../../../ui/forms/input-file/input-file.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../ui/confirm-dialog/confirm-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {BitacoraSubelementosComponent} from "../bitacora-subelementos/bitacora-subelementos.component";
import * as moment from 'moment';
import {Auth} from "../../../shared/auth";

@Component({
  selector: 'app-bitacora-form',
  templateUrl: './bitacora-form.component.html',
  styleUrls: ['./bitacora-form.component.scss']
})
export class BitacoraFormComponent implements OnInit {

  @ViewChild(InputFileComponent) inputFileComponent: InputFileComponent;
  env = environment;

  dataControls: any;
  validaciones = [];
  consignaID = null;
  bitacoraID = null;
  dataConsigna = null;
  dataDocumentos = [];
  documentosEliminados = [];
  inputFile: any;
  cerrarBitacora = false;
  selectAllElementos = false;
  action = '';
  afecta='';

  form = {
    numeroConsigna: {
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
    },
  };

  formDocumentos = {
    observacion: {
      label: 'Observación',
      name: 'observacion',
      value: '',
      messages: null,
      length: 500,
      required: false,
    },
  };

  formCompletado = {
    completado: {
      label: '¿La consigna se cumplió por completo?',
      name: 'completado',
      value: null,
      messages: null,
      required: false,
    },
    causalIncumplimiento: {
      label: 'Seleccione la razón del incumplimiento',
      name: 'causalIncumplimiento',
      value: null,
      messages: null,
      required: false,
    },
    observacionCausalIncumplimiento: {
      label: 'Observación',
      name: 'observacionCausalIncumplimiento',
      value: null,
      messages: null,
      required: false,
    },
  };

  constructor(private api: ApiService,
              private notifier: NotifierService,
              private dialogConfirm: MatDialog,
              private location: Location,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog) {

    this.activeRoute.params.subscribe(params => {

      if (params.id !== undefined && params.id !== null) {
        this.form.numeroConsigna.value = params.id;
        this.load().then();
        this.action = 'edit';
      } else {
        this.loadControls().then();
        this.action = 'new';
      }

    });

  }

  ngOnInit(): void {

  }

  async load() {
    this.loadControls().then(async () => {
      this.searchConsigna().then();
    });
  }

  async loadControls() {

    const response = await this.api.get(`${environment.apiBackend}/bitacora/load-controls`);
    if (response.data) {
      this.dataControls = response.data;
    }

  }

  async searchConsigna() {

    const responseValidate = Validations.validateEmptyFields(this.form);
    if (!responseValidate.success) {
      return false;
    }

    const numeroConsigna = this.form.numeroConsigna.value;
    const response = await this.api.get(`${environment.apiBackend}/bitacora/get-bitacora-by-code-consigna/${numeroConsigna}`);

    if (!response.success) {
      this.notifier.notify('error', response.message);
      this.dataConsigna = null;
      this.consignaID = null;
      this.bitacoraID = null;
      this.validaciones = [];
      return false;
    }

    if (response.data) {
      this.dataConsigna = response.data;
      this.consignaID = this.dataConsigna.consigna_id;
      this.bitacoraID = this.dataConsigna.bitacora_id;
      this.validaciones = response.validaciones;
      this.afecta=response.afecta;
      if (this.bitacoraID) {
        this.loadDataBitacora(this.dataConsigna);
      } else {
        this.cleanDataBitacora();
      }

      this.setCumplioCompleto();

    }

  }

  loadDataBitacora(data) {

    this.dataDocumentos = [];
    for (let value of data.bitacora_json_files) {
      this.dataDocumentos.push({
        file: null,
        name: value.archivo,
        url: value.public_path,
        observacion: value.observacion,
      });
    }

    this.formCompletado.completado.value = parseInt(data.bitacora_completado);
    this.formCompletado.causalIncumplimiento.value = data.bitacora_causal_incum_id ? parseInt(data.bitacora_causal_incum_id) : null;
    this.formCompletado.observacionCausalIncumplimiento.value = data.bitacora_obser_causal_incum;

  }

  getSendData() {

    const dataLogin = Auth.getLogin();

    let formData = new FormData();
    formData.append('bitacora_id', this.bitacoraID);
    formData.append('consignacion_id', this.consignaID);
    formData.append('completado', this.formCompletado.completado.value);
    formData.append('causal_incum_id', this.formCompletado.causalIncumplimiento.value);
    formData.append('obser_causal_incum', this.formCompletado.observacionCausalIncumplimiento.value);
    formData.append('cerrado', this.cerrarBitacora ? '1' : '0');
    formData.append('elementos', JSON.stringify(this.dataConsigna.bitacora_elementos));
    formData.append('documentos_eliminados', JSON.stringify(this.documentosEliminados));
    formData.append('usuario', JSON.stringify(dataLogin.user_data));

    for (let i = 0; i < this.dataDocumentos.length; i++) {
      const obj = this.dataDocumentos[i];
      formData.append('file_' + i, obj.file);
      formData.append('namesFiles[]', obj.name);
      formData.append('urlsFiles[]', obj.url);
      formData.append('observacionesFiles[]', obj.observacion);
    }

    return formData;
  }

  async guardar() {

    if (!this.validate()) {
      return false;
    }

    const data = this.getSendData();
    const response = await this.api.post(`${environment.apiBackend}/bitacora/save`, data);
    if (response.success) {
      this.notifier.notify('success', response.message);
      this.back();
    } else {
      this.notifier.notify('error', response.message);
    }

  }

  addDocumento() {

    if (!this.inputFile) {
      this.notifier.notify('error', 'Debe adjuntar un documento.');
      return false;
    }

    const file = this.inputFile;
    this.dataDocumentos.push({
      file: file,
      name: file.name,
      url: null,
      observacion: this.formDocumentos.observacion.value,
    });

    this.inputFile = null;
    this.inputFileComponent.setFileName('');
    this.formDocumentos.observacion.value = null;
  }

  deleteDocumento(obj, i) {

    const dialogData = new ConfirmDialogModel('Confirmar', `¿Está seguro(a) de borrar el documento: ${obj.name}?`);
    const dialogRef = this.dialogConfirm.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        if (obj.url) {
          this.documentosEliminados.push(obj.url);
        }
        this.dataDocumentos.splice(i, 1);
      }
    });
  }

  validate() {

    if (!this.consignaID) {
      this.notifier.notify('error', 'Debe seleccionar una consigna para continuar.');
      return false;
    }

    if (this.dataConsigna) {
      if (!this.dataConsigna.bitacora_elementos) {
        this.notifier.notify('error', 'Ups! Parece que esta consigna no tiene ningún elemento.');
        return false;
      }
    }

    if (this.formCompletado.completado.value === null) {
      this.notifier.notify('error', 'Debe indicar si la consigna se realizó completamente.');
      return false;
    }

    if (!this.validateHorasElementos()) {
      return false;
    }

    if (this.formCompletado.completado.value === 0 && this.cerrarBitacora) {
      if (!this.formCompletado.causalIncumplimiento.value) {
        this.notifier.notify('error', 'Debe indicar la razón del incumplimiento.');
        return false;
      }
    }

    return true;
  }

  validateRangeHour(horaInicioFormat, horaFinFormat, elemento = null) {
    if (horaInicioFormat != null && horaFinFormat != null) {
      let horaInicio = moment(horaInicioFormat, 'h:mm a');
      let horaFinal = moment(horaFinFormat, 'h:mm a');

      if (horaInicio > horaFinal) {
        const message = elemento != null ? `¡Hora inicio es mayor a la hora fin del elemento ${elemento}!` : '¡La hora inicio es mayor a la hora fin!'
        this.notifier.notify('error', message);
        return false;
      }
    }
    return true;
  }

  validarHorasIntermedias(horaInicioFormat, horaFinFormat, horaIntermediaFormat, nombreHora, elemento = null) {
    let horaInicio = moment(horaInicioFormat, 'h:mm a');
    let horaFinal = moment(horaFinFormat, 'h:mm a');
    let horaIntermedio = moment(horaIntermediaFormat, 'h:mm a');

    if (!(horaIntermedio >= horaInicio && horaIntermedio <= horaFinal)) {
      const commonMessage = `La ${nombreHora} debe estar entre ${horaInicioFormat} y ${horaFinFormat}`;
      const message = elemento != null ? `${commonMessage} para el elemento: ${elemento}` : commonMessage;
      this.notifier.notify('error', message);
      return false;
    }
    return true;
  }

  validateHorasElementos() {
    let response = true;
    if (this.cerrarBitacora) { // Solo se valida cuando se cierre la bitacora
      for (let value of this.dataConsigna.bitacora_elementos) {
        const obj = value.form;
        if (obj.completado) { // Solo se valida para los elementos seleccionados

          // Valida que no hayan campos vacios
          if (obj.hora_inicio.value == null || obj.hora_entrega.value == null || obj.hora_devolucion.value == null ||
            obj.hora_maniobra.value == null || obj.hora_fin.value == null) {
            this.notifier.notify('error', 'Debe diligenciar las horas para el elemento: ' + value.elemento);
            response = false;
            break;
          }

          // Valida que la hora final sea mayor a la inicial
          if (!this.validateRangeHour(obj.hora_inicio.value, obj.hora_fin.value, value.elemento)) {
            response = false;
            break;
          }

          // Valida que la hora se encuentre en el rango de hora inicio y hora fin
          if (!this.validarHorasIntermedias(obj.hora_inicio.value, obj.hora_fin.value, obj.hora_entrega.value,
            'Hora de entrega', value.elemento)) {
            response = false;
            break;
          }

          // Valida que la hora se encuentre en el rango de hora inicio y hora fin
          if (!this.validarHorasIntermedias(obj.hora_inicio.value, obj.hora_fin.value, obj.hora_devolucion.value,
            'Hora de devolución', value.elemento)) {
            response = false;
            break;
          }

          // Valida que la hora se encuentre en el rango de hora inicio y hora fin
          if (!this.validarHorasIntermedias(obj.hora_inicio.value, obj.hora_fin.value, obj.hora_maniobra.value,
            'Hora de maniobra', value.elemento)) {
            response = false;
            break;
          }

          // ---- Valida los sub-elementos ----
          if (!this.validarMinimoIntervenirSubelemento(value, ['SWITCH', 'SWITCHES', 'TRANSFOR', 'RECLOSER'])) {
            response = false;
            break;
          }

          let responseValid = this.validarHorasSubElementos(value, 'SWITCH', obj.hora_entrega.value, obj.hora_devolucion.value);
          if (!responseValid.success) {
            this.notifier.notify('error', responseValid.message);
            response = false;
            break;
          }

          responseValid = this.validarHorasSubElementos(value, 'SWITCHES', obj.hora_entrega.value, obj.hora_devolucion.value);
          if (!responseValid.success) {
            this.notifier.notify('error', responseValid.message);
            response = false;
            break;
          }

          responseValid = this.validarHorasSubElementos(value, 'TRANSFOR', obj.hora_entrega.value, obj.hora_devolucion.value);
          if (!responseValid.success) {
            this.notifier.notify('error', responseValid.message);
            response = false;
            break;
          }

          responseValid = this.validarHorasSubElementos(value, 'RECLOSER', obj.hora_entrega.value, obj.hora_devolucion.value);
          if (!responseValid.success) {
            this.notifier.notify('error', responseValid.message);
            response = false;
            break;
          }

        }
      }
    }
    return response;
  }

  validarHorasSubElementos(data, grupo, horaInicioFormat, horaFinFormat) {
    let response = {success: true, message: null};

    if (!data.json_elemento_mapa) {
      return response;
    }

    const elements = data.json_elemento_mapa[grupo];

    if (!Array.isArray(elements)) {
      return response;
    }

    const horaInicioPadre = moment(horaInicioFormat, 'h:mm a');
    const horaFinPadre = moment(horaFinFormat, 'h:mm a');

    for (let value of elements) {

      const horaInicio = moment(value.form.hora_inicio.value, 'h:mm a');
      const horaFin = moment(value.form.hora_fin.value, 'h:mm a');

      if (!(horaInicio >= horaInicioPadre && horaInicio <= horaFinPadre)) {
        response.message = `¡La hora inicio debe estar entre ${horaInicioFormat} y ${horaFinFormat} para el subelemento ${value.CODE} que pertenece al elemento ${data.elemento}!`;
        response.success = false;
        break;
      }

      if (!(horaFin >= horaInicioPadre && horaFin <= horaFinPadre)) {
        response.message = `¡La hora final debe estar entre ${horaInicioFormat} y ${horaFinFormat} para el subelemento ${value.CODE} que pertenece al elemento ${data.elemento}!`;
        response.success = false;
        break;
      }

    }

    return response;

  }

  validarMinimoIntervenirSubelemento(data, grupos) {
    let response = true;
    let totalIntervenidos = 0;
    let totalSubelementos = 0;

    if (!data.json_elemento_mapa) {
      return response;
    }

    for (let grupo of grupos) {
      const elementos = data.json_elemento_mapa[grupo];
      if (Array.isArray(elementos)) {
        for (let elemento of elementos) {

          totalSubelementos++;

          if (elemento.form.completado) {
            totalIntervenidos++;
          }

        }
      }
    }

    if (totalSubelementos > 0) {
      if (totalIntervenidos === 0) {
        this.notifier.notify('error', `¡Debe intervenir al menos un subelemento para el elemento ${data.elemento}!`);
        response = false;
      }
    }

    return response;
  }

  cleanDataBitacora() {
    this.dataDocumentos = [];
    this.documentosEliminados = [];
    this.formCompletado.completado.value = null;
    this.formCompletado.causalIncumplimiento.value = null;
    this.formCompletado.observacionCausalIncumplimiento.value = null;
  }

  cancel() {

    const dialogData = new ConfirmDialogModel('Confirmar', `¿Está seguro(a) de cancelar la bitácora?`);
    const dialogRef = this.dialogConfirm.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.back();
      }
    });

  }

  back() {
    this.location.back();
  }

  checkAll() {
    for (let obj of this.dataConsigna.bitacora_elementos) {
      obj.form.completado = this.selectAllElementos;
    }
    this.setCumplioCompleto();
  }

  abrirSubelementos(obj) {
    
    if (!obj.json_elemento_mapa) {
      this.notifier.notify('error', 'El elemento seleccionado no contiene subelementos.');
      return false;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 500;
    dialogConfig.minHeight = 650;
    dialogConfig.data = {
      data: obj.json_elemento_mapa,
      horas: {
        hora_inicio: obj.form.hora_entrega.value,
        hora_fin: obj.form.hora_devolucion.value,
      },
    };
    this.dialog.open(BitacoraSubelementosComponent, dialogConfig);
  }

  abrirSubelementosCortoTiempo(obj) {
  
    if (!obj.json_elemento_mapa_corto) {
      this.notifier.notify('error', 'El elemento seleccionado no contiene subelementos.');
      return false;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 500;
    dialogConfig.minHeight = 650;
    dialogConfig.data = {
      data: obj.json_elemento_mapa_corto,
      horas: {
        hora_inicio: obj.form.hora_entrega.value,
        hora_fin: obj.form.hora_devolucion.value,
      },
    };
    this.dialog.open(BitacoraSubelementosComponent, dialogConfig);
  }

  setCumplioCompleto() {

    const totalElementos = this.dataConsigna.bitacora_elementos.length;
    let elementosSeleccionados = 0;
    for (let obj of this.dataConsigna.bitacora_elementos) {
      if (obj.form.completado) {
        elementosSeleccionados++;
      }
    }

    if (totalElementos == elementosSeleccionados) {
      this.formCompletado.completado.value = 1;
    } else {
      this.formCompletado.completado.value = 0;
    }

  }

  setInput(event) {
    if (event) {
      this.inputFile = event.target.files[0];
    }
  }

  setData(form, name, event) {
    form[name].value = event;
  }

  setDinamicData(name, event, index) {
    this.dataConsigna.bitacora_elementos[index].form[name].value = event;
  }

}
