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
  dataHeader = [
    {name:'Número de consigna', nameColumn:'codigo'},
    {name:'Completado', nameColumn:'completado'},
    {name:'Causal de incumplimiento', nameColumn:'nombre'},
    {name:'Observación', nameColumn:'obser_causal_incum'},
    {name:'Bitácora cerrada', nameColumn:'cerrado'},
    {name:'Fecha cierre', nameColumn:'fecha_cierre'},
    {name:'Fecha creación', nameColumn:'created_at'}
  ];
  dataExcel = [];
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
    this.setDataExcel();
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
    this.setDataExcel();
  }

  setDataExcel(){
    this.dataExcel = [];
    for(let value of this.data){
      this.dataExcel.push({
        codigo: value.consigna.codigo,
        completado: value.completado === '1' ? 'SI' : 'NO',
        nombre: value.causal_incumplimiento.nombre,
        obser_causal_incum: value.completado === '0' ? value.obser_causal_incum : '',
        cerrado: value.cerrado === '1' ? 'SI' : 'NO',
        fecha_cierre: value.fecha_cierre,
        created_at: value.created_at
      })
    }
  }

}
