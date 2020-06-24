import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {environment} from "../../../../environments/environment";
import {Validations} from "../../../shared/validations";
import {NotifierService} from "angular-notifier";
import {Helpers} from "../../../shared/helpers";
import {Auth} from "../../../shared/auth";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comunicado-prensa-form',
  templateUrl: './comunicado-prensa-form.component.html',
  styleUrls: ['./comunicado-prensa-form.component.scss']
})
export class ComunicadoPrensaFormComponent implements OnInit {

  id = null;
  data = null;
  consignaID = null;
  plantillas = [];
  plantillaSelected = null;
  contenidoComunicadoPrensa: string;
  publicado = null;

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
              private notifier: NotifierService,
              private location: Location,
              private activeRoute: ActivatedRoute,) {

    this.activeRoute.params.subscribe(params => {

      if (params.id !== undefined && params.id !== null) {
        this.id = params.id;
        this.load().then();
      } else {
        this.loadPlantillas().then();
      }

    });

  }

  ngOnInit(): void {

  }

  async load() {
    this.loadPlantillas().then(async () => {
      const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/show/${this.id}`);
      this.loadDataForm(response.data);
    });
  }

  loadDataForm(data) {
    this.consignaID = data.consignacion_id;
    this.contenidoComunicadoPrensa = data.contenido;
    this.publicado = Number(data.publicado);
    this.form.numeroConsigna.value = data.consigna.codigo;
    this.formPlantilla.plantilla.value = Number(data.plantilla_id);
    this.data = data.consigna;
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

    if (!response.success) {
      this.notifier.notify('error', response.message);
      this.data = null;
      return false;
    }

    if (response.data) {
      this.data = response.data;
      this.consignaID = this.data.id;
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

  paramsSave() {
    const user = Auth.getLogin();
    return {
      id: this.id,
      consignacion_id: this.consignaID,
      contenido: this.contenidoComunicadoPrensa,
      usuario_id: user.user_data.id,
      publicado: this.publicado,
      plantilla_id: this.formPlantilla.plantilla.value
    };
  }

  async guardarComunicadoPrensa() {

    if (!this.validate()) {
      return false;
    }

    const params = this.paramsSave();
    let response: any;
    if (!this.id) {
      response = await this.api.post(`${environment.apiBackend}/comunicado-prensa/save`, params);
    } else {
      response = await this.api.post(`${environment.apiBackend}/comunicado-prensa/edit`, params);
    }

    if (response.success) {
      this.notifier.notify('success', response.message);
      this.cancel();
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

    if (this.publicado === null) {
      this.notifier.notify('error', '¡Debe seleccionar si desea publicar el comunicado de prensa!');
      return false;
    }

    return true;
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  cancel() {
    this.location.back();
  }

}
