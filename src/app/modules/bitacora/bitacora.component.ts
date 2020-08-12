import {Component, OnInit} from '@angular/core';
import {Helpers} from "../../shared/helpers";
import {ApiService} from "../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {ValidationService} from "../../shared/services/validations.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {

  helpers = new Helpers();
  data = [];
  form = {
    numeroConsigna: {
      label: 'Consigna No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
    },
    fechaInicio: {
      label: 'Fecha inicio creación',
      name: 'fechaInicio',
      value: null,
      messages: null,
      required: true,
    },
    fechaFin: {
      label: 'Fecha fin creación',
      name: 'fechaFin',
      value: null,
      messages: null,
      required: true,
    },
  };

  constructor(private api: ApiService,
              private notifier: NotifierService,
              private validations: ValidationService,) {
  }

  ngOnInit(): void {

  }

  getParams() {
    let fechaInicio = null;
    if (this.form.fechaInicio.value) {
      fechaInicio = this.helpers.formatDate(this.form.fechaInicio.value);
    }

    let fechaFin = null;
    if (this.form.fechaFin.value) {
      fechaFin = this.helpers.formatDate(this.form.fechaFin.value);
    }

    const params = {
      numero_consigna: this.form.numeroConsigna.value,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    };

    return JSON.stringify(params);
  }

  async search() {

    const responseValidate = this.validations.validateACompleteField(this.form);
    if (!responseValidate.success) {
      return false;
    }

    const params = this.getParams();
    const response = await this.api.get(`${environment.apiBackend}/bitacora/get-all?params=${params}`);
    this.data = response.data;
    if (this.data.length === 0) {
      this.notifier.notify('info', 'No se encontraron registros...');
    }

  }

  setData(name, event) {
    this.form[name].value = event;
  }

  cleanFields() {
    this.validations.cleanFields(this.form);
    this.data = [];
  }

}
