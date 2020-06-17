import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {environment} from "../../../../environments/environment";
import {Validations} from "../../../shared/validations";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-comunicado-prensa-form',
  templateUrl: './comunicado-prensa-form.component.html',
  styleUrls: ['./comunicado-prensa-form.component.scss']
})
export class ComunicadoPrensaFormComponent implements OnInit {

  data = [];
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
              private notifier: NotifierService,) {
  }

  ngOnInit(): void {

  }

  async searchConsigna() {

    const responseValidate = Validations.validateEmptyFields(this.form);
    if (!responseValidate.success) {
      return false;
    }

    const numeroConsigna = this.form.numeroConsigna.value;
    const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/get-consigna-by-code/${numeroConsigna}`);
    this.data = response.data;
    if (!this.data) {
      this.notifier.notify('info', response.message);
    }
  }

  setData(name, event) {
    this.form[name].value = event;
  }


}
