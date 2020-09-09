import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/services/api.service';
import { environment } from 'src/environments/environment';
import {NotifierService} from "angular-notifier";
import { Validations } from './../../shared/validations';
import { Helpers } from './../../shared/helpers';
import { ValidationService } from './../../shared/services/validations.service';
import { SessionService } from './../../shared/services/session.service';

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.scss']
})
export class ConsolidadoComponent implements OnInit {

  helpers = new Helpers();
  dataControls = {
    usuario: []
  }
  data = []
  form = {
    numeroConsigna: {
      label: 'Consigna No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
    },
    fechaInicio: {
      label: 'Fecha inicio',
      name: 'fechaInicio',
      value: null,
      messages: null,
      required: true,
    },
    fechaFin: {
      label: 'Fecha fin',
      name: 'fechaFin',
      value: null,
      messages: null,
      required: true,
    },
    usuario: {
      label: 'Usuario',
      name: 'usuario',
      value: null,
      messages: null,
      required: false,
    },
  };

  constructor(private api: ApiService,
    private notifier: NotifierService,
    private session: SessionService,
    private validations: ValidationService,) { }

  ngOnInit(): void {
    this.updateUsuariosAplicacion()
  }

  async search() {

    const responseValidate = this.validations.validateACompleteField(this.form);
    if (!responseValidate.success) {
      return false;
    }
    let params = this.getParams()

    const response = await this.api.post(`${environment.apiBackend}/consolidado-prensa/get-all`,params);
    this.data = response.data;
    if (this.data.length === 0) {
      this.notifier.notify('info', 'No se encontraron registros...');
    }

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
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      usuarioCreacionId: this.form.usuario.value
    };

    return params;
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  cleanFields(){
    this.validations.cleanFields(this.form);
    this.data = [];
  }

  async updateUsuariosAplicacion(){
    const response = await this.api.get(`${environment.apiBackend}/usuario-aplicacion/update-info?key=${environment.keyTransverseSecurity}`);
    var usuario = [];
    let success = response.success;
    if(success){
      this.session.setItem('usuario',response.data.personSeguridadTransversal);
      this.dataControls.usuario = this.session.getPersona();
    }
  }

}
