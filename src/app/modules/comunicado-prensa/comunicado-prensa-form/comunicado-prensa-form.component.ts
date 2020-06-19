import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {environment} from "../../../../environments/environment";
import {Validations} from "../../../shared/validations";
import {NotifierService} from "angular-notifier";
import {Helpers} from "../../../shared/helpers";
import {Auth} from "../../../shared/auth";

@Component({
  selector: 'app-comunicado-prensa-form',
  templateUrl: './comunicado-prensa-form.component.html',
  styleUrls: ['./comunicado-prensa-form.component.scss']
})
export class ComunicadoPrensaFormComponent implements OnInit {

  data = null;
  consignaID = null;
  plantillas = [];
  plantillaSelected = null;
  contenidoComunicadoPrensa: string;

  form = {
    numeroConsigna: {
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
    },
  };

  formPlantilla = {
    plantilla: {
      label: 'Seleccione la plantilla',
      name: 'plantilla',
      value: null,
      messages: null,
      required: true,
    },
  };

  constructor(private api: ApiService,
              private notifier: NotifierService,) {

  }

  ngOnInit(): void {
    this.loadPlantillas().then();
  }

  async loadPlantillas() {
    const response = await this.api.get(`${environment.apiBackend}/plantilla/get-active`);
    this.plantillas = response.data;
  }

  async searchConsigna() {

    const responseValidate = Validations.validateEmptyFields(this.form);
    if (!responseValidate.success) {
      return false;
    }

    const numeroConsigna = this.form.numeroConsigna.value;
    const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/get-consigna-by-code/${numeroConsigna}`);
    this.data = response.data;
    this.consignaID = this.data.id;
    if (!this.data) {
      this.notifier.notify('info', response.message);
    }
  }

  async generar() {

    if (!this.consignaID) {
      this.notifier.notify('error', '¡Debe seleccionar una consigna!');
      return false;
    }

    const responseValidate = Validations.validateEmptyFields(this.formPlantilla);
    if (!responseValidate.success) {
      return false;
    }

    const params = {
      consignacion_id: this.consignaID,
      plantilla: this.plantillaSelected.contenido
    };
    const response = await this.api.post(`${environment.apiBackend}/comunicado-prensa/generate`, params);
    if (response.success) {
      this.contenidoComunicadoPrensa = response.data;
    }
  }

  setPlantillaSelected(id) {
    this.plantillaSelected = this.plantillas.find(plantilla => plantilla.id === id);
  }

  openVistaPreviaPlantilla() {
    const helpers = new Helpers();
    const ventana = helpers.popupCenter({url: '', title: 'Vista previa', w: 900, h: 500});
    ventana.document.body.innerHTML = this.plantillaSelected.contenido;
  }

  async guardarComunicadoPrensa() {
    if (!this.validate()) {
      return false;
    }

    const user = Auth.getLogin();
    const params = {
      consignacion_id: this.consignaID,
      contenido: this.contenidoComunicadoPrensa,
      usuario_id: user.user_data.id,
    };
    const response = await this.api.post(`${environment.apiBackend}/comunicado-prensa/save`, params);
    if (response.success) {
      this.notifier.notify('success', response.message);
    } else {
      this.notifier.notify('error', response.message);
    }
  }

  validate() {
    if (!this.consignaID) {
      this.notifier.notify('error', '¡Debe seleccionar una consigna!');
      return false;
    }
    if (!this.formPlantilla.plantilla.value) {
      this.notifier.notify('error', '¡Debe seleccionar una plantilla!');
      return false;
    }
    if (!this.contenidoComunicadoPrensa) {
      this.notifier.notify('error', '¡Debe ingresar el comunicado de prensa!');
      return false;
    }
    return true;
  }

  setData(name, event) {
    this.form[name].value = event;
  }

}
