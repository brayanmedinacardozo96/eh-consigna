import {Component, OnInit} from '@angular/core';
import {Validations} from "../../../shared/validations";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-bitacora-form',
  templateUrl: './bitacora-form.component.html',
  styleUrls: ['./bitacora-form.component.scss']
})
export class BitacoraFormComponent implements OnInit {

  consignaID = null;
  dataConsigna = null;
  form = {
    numeroConsigna: {
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
    },
  };

  constructor(private api: ApiService,
              private notifier: NotifierService) {
  }

  ngOnInit(): void {
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
      return false;
    }

    if (response.data) {
      this.dataConsigna = response.data;
      this.consignaID = this.dataConsigna.id;
    }

  }

  guardar() {
  }

  cancel() {
  }

  setData(name, event) {
    this.form[name].value = event;
  }

}
