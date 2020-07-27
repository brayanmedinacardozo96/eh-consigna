import {Component, OnInit, ViewChild} from '@angular/core';
import {Validations} from "../../../shared/validations";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {InputFileComponent} from "../../../ui/forms/input-file/input-file.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../ui/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";

@Component({
  selector: 'app-bitacora-form',
  templateUrl: './bitacora-form.component.html',
  styleUrls: ['./bitacora-form.component.scss']
})
export class BitacoraFormComponent implements OnInit {

  @ViewChild(InputFileComponent) inputFileComponent: InputFileComponent;
  env = environment;

  dataControls: any;
  consignaID = null;
  bitacoraID = null;
  dataConsigna = null;
  dataDocumentos = [];
  documentosEliminados = [];
  inputFile: any;
  cerrarBitacora = false;
  selectAllElementos = false;

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
              private location: Location) {
  }

  ngOnInit(): void {
    this.loadControls().then();
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
      return false;
    }

    if (response.data) {
      this.dataConsigna = response.data;
      this.consignaID = this.dataConsigna.consigna_id;
      this.bitacoraID = this.dataConsigna.bitacora_id;

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
    let formData = new FormData();
    formData.append('bitacora_id', this.bitacoraID);
    formData.append('consignacion_id', this.consignaID);
    formData.append('completado', this.formCompletado.completado.value);
    formData.append('causal_incum_id', this.formCompletado.causalIncumplimiento.value);
    formData.append('obser_causal_incum', this.formCompletado.observacionCausalIncumplimiento.value);
    formData.append('cerrado', this.cerrarBitacora ? '1' : '0');
    formData.append('elementos', JSON.stringify(this.dataConsigna.bitacora_elementos));
    formData.append('documentos_eliminados', JSON.stringify(this.documentosEliminados));

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
      this.cancel();
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

    if (this.formCompletado.completado.value === 0) {
      if (!this.formCompletado.causalIncumplimiento.value) {
        this.notifier.notify('error', 'Debe indicar la razón del incumplimiento.');
        return false;
      }
    }

    return true;
  }

  cleanDataBitacora() {
    this.dataDocumentos = [];
    this.documentosEliminados = [];
    this.formCompletado.completado.value = null;
    this.formCompletado.causalIncumplimiento.value = null;
    this.formCompletado.observacionCausalIncumplimiento.value = null;
  }

  cancel() {
    this.location.back();
  }

  checkAll() {
    for (let obj of this.dataConsigna.bitacora_elementos) {
      obj.form.completado = this.selectAllElementos;
    }
    this.setCumplioCompleto();
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
