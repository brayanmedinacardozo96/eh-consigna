import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiService} from "../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {Validations} from "../../shared/validations";

@Component({
  selector: 'app-comunicado-prensa',
  templateUrl: './comunicado-prensa.component.html',
  styleUrls: ['./comunicado-prensa.component.scss']
})
export class ComunicadoPrensaComponent implements OnInit {

  data = [];
  form = {
    numeroConsigna: {
      label: 'Consigna No.',
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

  getParams() {
    const params = {
      numero_consigna: this.form.numeroConsigna.value,
    };
    return JSON.stringify(params);
  }

  async search() {

    const responseValidate = Validations.validateEmptyFields(this.form);
    if (!responseValidate.success) {
      return false;
    }

    const params = this.getParams();
    const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/get-all?params=${params}`);
    this.data = response.data;
    if (this.data.length === 0) {
      this.notifier.notify('info', 'No se encontraron registros...');
    }
  }

  setData(name, event) {
    this.form[name].value = event;
  }

}
