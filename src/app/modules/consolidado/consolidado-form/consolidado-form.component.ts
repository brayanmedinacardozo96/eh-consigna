import { Component, OnInit } from '@angular/core';
import { ConsolidadoConsignaListComponent } from './../consolidado-consigna-list/consolidado-consigna-list.component';
import { ConsolidadoComunicadoListComponent } from './../consolidado-comunicado-list/consolidado-comunicado-list.component';
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../ui/confirm-dialog/confirm-dialog.component";
import {ApiService} from "../../../shared/services/api.service";
import {environment} from "../../../../environments/environment";
import {Validations} from "../../../shared/validations";
import {NotifierService} from "angular-notifier";
import {Helpers} from "../../../shared/helpers";
import {Auth} from "../../../shared/auth";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-consolidado-form',
  templateUrl: './consolidado-form.component.html',
  styleUrls: ['./consolidado-form.component.scss']
})
export class ConsolidadoFormComponent implements OnInit {

  agruparPor;
  tipoComunicadoSelected = null;
  id = null;
  comunicadosID = [];
  data = null;
  dataPorFechas = [];
  consignaID = null;
  dataControls: any;
  plantillaSelected = null;
  contenidoConsolidado: string;
  helpers = new Helpers();
  selectAllConsignas = true;
  msjResultSearch = '';

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
      label: 'Fecha Ejecución Inicio',
      name: 'fechaInicio',
      value: null,
      messages: null,
      required: true,
    },
    fechaFin: {
      label: 'Fecha Ejecución Fin',
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
    private dialogConfirm: MatDialog) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async params => {
      if (params.id !== undefined && params.id !== null && params.id !== 'null') {
        this.id = params.id;
        this.load().then();
      } else {
        this.loadControlsForm().then();
      }
    })
  }

  async load() {
    this.loadControlsForm().then(async () => {
      const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/show/${this.id}`);
      this.loadDataForm(response.data);
    });
  }

  loadDataForm(data) {
    this.consignaID = data.consignacion_id;
    this.contenidoConsolidado = data.contenido;

    if (data.consigna) {
      this.data = data.consigna;
      this.form.numeroConsigna.value = data.consigna.codigo;
    }

    this.formPlantilla.plantilla.value = Number(data.plantilla_id);
    this.tipoComunicadoSelected = data.tipo.codigo;
    this.dataPorFechas = data.consignaciones;

    this.setComunicadosID();

  }

  async loadControlsForm() {
    const response = await this.api.get(`${environment.apiBackend}/consolidado-prensa/load-controls`);
    this.dataControls = response.data;
    // this.tipoId = this.dataControls.tipo_default.id;
    // this.tipoComunicadoSelected = this.dataControls.tipo_default.codigo;
    // this.agruparPor = this.dataControls.agrupacion_default.codigo;
  }

  setDataFormRangoFechas(name, event) {
    this.formRangoFecha[name].value = event;
  }

  async searchComunicaConsolidado() {
    this.msjResultSearch = '';
    const responseValidate = Validations.validateEmptyFields(this.formRangoFecha);
    if (!responseValidate.success) {
      return false;
    }

    const fechaInicio = this.helpers.formatDate(this.formRangoFecha.fechaInicio.value);
    const fechaFin = this.helpers.formatDate(this.formRangoFecha.fechaFin.value);

    const params = {fechaInicio: fechaInicio, fechaFin: fechaFin};
    const response = await this.api.post(`${environment.apiBackend}/consolidado-prensa/get-comunicado-consolidado`,params);

    if (!response.success) {
      this.notifier.notify('error', response.message);
      return false;
    }

    this.msjResultSearch = response.message+'<br>'
    this.dataPorFechas = response.data;

    if (response.data.length === 0) {
      this.msjResultSearch = '';
      this.notifier.notify('info', '¡No se encontraron comunicados de prensa en ese rango de fechas!');
    }

    this.contenidoConsolidado = null;

  }

  checkAll() {
    if (this.dataPorFechas.length > 0) {
      for (let obj of this.dataPorFechas) {
        obj.selected = this.selectAllConsignas;
      }
    }
  }
  

  openVistaPreviaPlantilla() {
    const helpers = new Helpers();
    const ventana = helpers.popupCenter({url: '', title: 'Vista previa', w: 900, h: 500});
    ventana.document.body.innerHTML = this.plantillaSelected.contenido;
  }

  async generar() {

    if (!this.validateConsignaSelected()) {
      return false;
    }

    const responseValidate = Validations.validateEmptyFields(this.formPlantilla);
    if (!responseValidate.success) {
      return false;
    }

    this.setComunicadosID();

    if (!this.contenidoConsolidado) { // Si no ha ingresado nada en el contenido 'editor de texto'

      this.generarConsolidadoAPI().then();

    } else { // Si ya hay texto en el editor, se valida si desea continuar

      const dialogData = new ConfirmDialogModel('Confirmar', `Los cambios realizados en el editor de texto se perderán ¿desea continuar?`);
      const dialogRef = this.dialogConfirm.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          this.generarConsolidadoAPI().then();
        }
      });

    }

  }

  validateConsignaSelected() {
    if (this.dataPorFechas.length === 0) {
      this.notifier.notify('error', '¡Debe realizar la búsqueda de los comunicados por rango de fechas!');
      return false;
    }
    if (!this.validarSeleccioneConsigna()) {
      this.notifier.notify('error', '¡Debe seleccionar al menos un comunicado para generar el consolidado!');
      return false;
    }
    return true;
  }

  setComunicadosID() {
    this.comunicadosID = [];
    for (const obj of this.dataPorFechas) {
      if (obj.selected) {
        this.comunicadosID.push(obj.id);
      }
    }
  }

  async generarConsolidadoAPI() {
    const params = {
      comunicados_id: this.comunicadosID,
      plantilla: this.plantillaSelected.contenido,
    };
    const response = await this.api.post(`${environment.apiBackend}/consolidado-prensa/generate`, params);
    if (response.success) {
      this.contenidoConsolidado = response.data;
    }
  }

  validarSeleccioneConsigna() {
    let selecciono = false;
    for (let obj of this.dataPorFechas) {
      if (obj.selected) {
        selecciono = true;
        return selecciono;
      }
    }
    return selecciono;
  }

  setPlantillaSelected(id) {
    this.plantillaSelected = this.dataControls.plantillas.find(plantilla => plantilla.id === id);
  }

  async guardarConsolidado() {

    if (!this.validate()) {
      return false;
    }

    const params = this.paramsSave();
    let response: any;
    if (!this.id) {
      response = await this.api.post(`${environment.apiBackend}/consolidado-prensa/save`, params);
    } else {
      response = await this.api.post(`${environment.apiBackend}/consolidado-prensa/edit`, params);
    }

    if (response.success) {
      this.notifier.notify('success', response.message);
      this.back();
    } else {
      this.notifier.notify('error', response.message);
    }
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

  back() {
    this.location.back();
  }

  paramsSave() {
    const user = Auth.getLogin();
    const fechaInicio = this.helpers.formatDate(this.formRangoFecha.fechaInicio.value);
    const fechaFin = this.helpers.formatDate(this.formRangoFecha.fechaFin.value);
    return {
      id: this.id,
      contenido: this.contenidoConsolidado,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      usuario_id: user.user_data.id,
      plantilla_id: this.formPlantilla.plantilla.value,
      comunicados_id: this.comunicadosID,
    };
  }

  validate() {

    if (!this.validateConsignaSelected()) {
      return false;
    }

    if (!this.formPlantilla.plantilla.value) {
      this.notifier.notify('error', '¡Debe seleccionar una plantilla!');
      return false;
    }
    if (!this.contenidoConsolidado) {
      this.notifier.notify('error', '¡Debe ingresar el comunicado de prensa!');
      return false;
    }

    return true;
  }

  async openVerConsignas(id){
    const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/show/${id}`);
    if(response.success){
      let consignas = response.data.consignaciones
      const dialogRef = this.dialogConfirm.open(ConsolidadoConsignaListComponent,{
        width:'100%',
        data: {consignas}
      });
    }
  }
  
  async openVerComunicados(id){
    const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/show/${id}`);
    if(response.success){
      let comunicado = response.data.contenido
      const dialogRef = this.dialogConfirm.open(ConsolidadoComunicadoListComponent,{
        width:'100%',
        data: {comunicado}
      });
    }
  }

}
