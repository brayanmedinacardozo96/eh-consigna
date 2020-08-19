import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {environment} from "../../../../environments/environment";
import {Validations} from "../../../shared/validations";
import {NotifierService} from "angular-notifier";
import {Helpers} from "../../../shared/helpers";
import {Auth} from "../../../shared/auth";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../ui/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-comunicado-prensa-form',
  templateUrl: './comunicado-prensa-form.component.html',
  styleUrls: ['./comunicado-prensa-form.component.scss']
})
export class ComunicadoPrensaFormComponent implements OnInit {

  tipoId;
  agruparPor;
  tipoComunicadoSelected = null;
  id = null;
  consignacionesID = [];
  data = null;
  dataPorFechas = [];
  consignaID = null;
  dataControls: any;
  plantillaSelected = null;
  contenidoComunicadoPrensa: string;
  publicado = null;
  helpers = new Helpers();

  form = {
    numeroConsigna: {
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
    },
  };

  formRangoFecha = {
    fechaInicio: {
      label: 'Fecha Inicio',
      name: 'fechaInicio',
      value: null,
      messages: null,
      required: true,
    },
    fechaFin: {
      label: 'Fecha Fin',
      name: 'fechaFin',
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
              private activeRoute: ActivatedRoute,
              private dialogConfirm: MatDialog,) {

    this.activeRoute.params.subscribe(params => {

      if (params.id !== undefined && params.id !== null) {
        this.id = params.id;
        this.load().then();
      } else {
        this.loadControlsForm().then();
      }

    });

  }

  ngOnInit(): void {

  }

  async load() {
    this.loadControlsForm().then(async () => {
      const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/show/${this.id}`);
      this.loadDataForm(response.data);
    });
  }

  loadDataForm(data) {
    this.consignaID = data.consignacion_id;
    this.contenidoComunicadoPrensa = data.contenido;
    this.publicado = Number(data.publicado);

    if (data.consigna) {
      this.data = data.consigna;
      this.form.numeroConsigna.value = data.consigna.codigo;
    }

    this.formPlantilla.plantilla.value = Number(data.plantilla_id);
    this.tipoId = Number(data.tipo_id);
    this.tipoComunicadoSelected = data.tipo.codigo;
    this.dataPorFechas = data.consignaciones;

    this.setConsignacionesID();

  }

  async loadControlsForm() {
    const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/load-controls`);
    this.dataControls = response.data;
    this.tipoId = this.dataControls.tipo_default.id;
    this.tipoComunicadoSelected = this.dataControls.tipo_default.codigo;
    this.agruparPor = this.dataControls.agrupacion_default.codigo;
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

    this.contenidoComunicadoPrensa = null;

  }

  async searchConsignaByDates() {
    const responseValidate = Validations.validateEmptyFields(this.formRangoFecha);
    if (!responseValidate.success) {
      return false;
    }

    const fechaInicio = this.helpers.formatDate(this.formRangoFecha.fechaInicio.value);
    const fechaFin = this.helpers.formatDate(this.formRangoFecha.fechaFin.value);

    const params = `fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
    const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/get-consigna-by-dates?${params}`);
    this.dataPorFechas = response.data;

    if (response.data.length === 0) {
      this.notifier.notify('info', '¡No se encontraron consignaciones aprobadas en ese rango de fechas!');
    }

    this.contenidoComunicadoPrensa = null;

  }

  async generar() {

    if (!this.validateConsignaSelected()) {
      return false;
    }

    const responseValidate = Validations.validateEmptyFields(this.formPlantilla);
    if (!responseValidate.success) {
      return false;
    }

    this.setConsignacionesID();

    if (!this.contenidoComunicadoPrensa) { // Si no ha ingresado nada en el contenido 'editor de texto'

      this.generarComunicadoAPI().then();

    } else { // Si ya hay texto en el editor, se valida si desea continuar

      const dialogData = new ConfirmDialogModel('Confirmar', `Los cambios realizados en el editor de texto se perderán ¿desea continuar?`);
      const dialogRef = this.dialogConfirm.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          this.generarComunicadoAPI().then();
        }
      });

    }

  }

  async generarComunicadoAPI() {
    const params = {
      consignaciones_id: this.consignacionesID,
      plantilla: this.plantillaSelected.contenido,
      agrupar_por: this.agruparPor,
    };
    const response = await this.api.post(`${environment.apiBackend}/comunicado-prensa/generate`, params);
    if (response.success) {
      this.contenidoComunicadoPrensa = response.data;
    }
  }

  setConsignacionesID() {
    this.consignacionesID = [];
    if (this.tipoComunicadoSelected === 'PC') {
      this.consignacionesID.push(this.consignaID);
    } else {
      for (const obj of this.dataPorFechas) {
        this.consignacionesID.push(obj.id);
      }
    }
  }

  setPlantillaSelected(id) {
    this.plantillaSelected = this.dataControls.plantillas.find(plantilla => plantilla.id === id);
  }

  openVistaPreviaPlantilla() {
    const helpers = new Helpers();
    const ventana = helpers.popupCenter({url: '', title: 'Vista previa', w: 900, h: 500});
    ventana.document.body.innerHTML = this.plantillaSelected.contenido;
  }

  selectTipoComunicado(event) {
    this.tipoComunicadoSelected = event.source.id;
    this.consignaID = null;
    this.data = [];
    this.dataPorFechas = [];
  }

  paramsSave() {
    const user = Auth.getLogin();
    return {
      id: this.id,
      consignacion_id: this.consignaID,
      contenido: this.contenidoComunicadoPrensa,
      usuario_id: user.user_data.id,
      usuario: user.user_data,
      publicado: this.publicado,
      plantilla_id: this.formPlantilla.plantilla.value,
      tipo_id: this.tipoId,
      consignaciones_id: this.consignacionesID,
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
      this.back();
    } else {
      this.notifier.notify('error', response.message);
    }
  }

  validate() {

    if (!this.validateConsignaSelected()) {
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

  validateConsignaSelected() {
    if (!this.tipoId) {
      this.notifier.notify('error', '¡Debe seleccionar el tipo de comunicado de prensa!');
      return false;
    }
    if (this.tipoComunicadoSelected === 'PC' && !this.consignaID) {
      this.notifier.notify('error', '¡Debe seleccionar una consigna!');
      return false;
    }
    if (this.tipoComunicadoSelected === 'PRF' && this.dataPorFechas.length === 0) {
      this.notifier.notify('error', '¡Debe realizar la búsqueda de las consignas por rango de fechas!');
      return false;
    }
    return true;
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  setDataFormRangoFechas(name, event) {
    this.formRangoFecha[name].value = event;
  }

  cancel() {

    const dialogData = new ConfirmDialogModel('Confirmar', `¿Está seguro(a) de cancelar el comunicado de prensa?`);
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

  back(){
    this.location.back();
  }

}
