import {Component, OnInit, ViewChild} from '@angular/core';
import {Validations} from "../../../shared/validations";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {InputFileComponent} from "../../../ui/forms/input-file/input-file.component";

@Component({
  selector: 'app-bitacora-form',
  templateUrl: './bitacora-form.component.html',
  styleUrls: ['./bitacora-form.component.scss']
})
export class BitacoraFormComponent implements OnInit {

  @ViewChild(InputFileComponent) inputFileComponent: InputFileComponent;

  dataControls: any;
  consignaID = null;
  dataConsigna = null;
  dataDocumentos = [];
  inputFile: any;
  cerrarBitacora = false;

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
      value: null,
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
              private notifier: NotifierService,) {
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
    const response = await this.api.get(`${environment.apiBackend}/bitacora/get-consigna-by-code/${numeroConsigna}`);

    if (!response.success) {
      this.notifier.notify('error', response.message);
      this.dataConsigna = null;
      this.consignaID = null;
      return false;
    }

    if (response.data) {
      this.dataConsigna = response.data;
      this.consignaID = this.dataConsigna.id;
    }

  }

  getSendData() {
    let formData = new FormData();
    formData.append('consignacion_id', this.consignaID);
    formData.append('completado', this.formCompletado.completado.value);
    formData.append('causal_incum_id', this.formCompletado.causalIncumplimiento.value);
    formData.append('obser_causal_incum', this.formCompletado.observacionCausalIncumplimiento.value);
    formData.append('cerrado', this.cerrarBitacora ? '1' : '0');
    formData.append('elementos', JSON.stringify(this.dataConsigna.lista_elemento));

    for (let i = 0; i < this.dataDocumentos.length; i++) {
      const obj = this.dataDocumentos[i];
      formData.append('files[]', obj.file);
      formData.append('observaciones[]', obj.observacion);
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
    this.dataDocumentos.splice(i, 1);
  }

  validate() {

    if (!this.consignaID) {
      this.notifier.notify('error', 'Debe seleccionar una consigna para continuar.');
      return false;
    }

    if (this.dataConsigna) {
      if (!this.dataConsigna.lista_elemento) {
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

  cancel() {
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
    this.dataConsigna.lista_elemento[index].form[name].value = event;
  }

}
