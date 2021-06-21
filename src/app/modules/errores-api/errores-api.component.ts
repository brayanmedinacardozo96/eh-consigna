import { Component, OnInit } from '@angular/core';
import {ValidationService} from './../../shared/services/validations.service';
import {ApiService} from 'src/app/shared/services/api.service';
import { NotifierService } from 'angular-notifier';
import { Helpers } from './../../shared/helpers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-errores-api',
  templateUrl: './errores-api.component.html',
  styleUrls: ['./errores-api.component.scss']
})
export class ErroresApiComponent implements OnInit {

  form = {
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
      required: false,
    },
  }
  data = [];
  helpers = new Helpers();

  constructor(
      private api: ApiService,
      private validations: ValidationService,
      private notifier: NotifierService
    ) { }

  ngOnInit(): void {
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async search(){
    let validations = this.validations.validateEmptyFields(this.form);
    if(!validations.success){
      return false;
    }
    //con alt + 96
    let params = {
      fechaInicio: this.form.fechaInicio.value ? this.helpers.formatDate(this.form.fechaInicio.value): null
      ,fechaFin: this.form.fechaFin.value ? this.helpers.formatDate(this.form.fechaFin.value): null
    }

    const response = await this.api.post(`${environment.apiBackend}/errores-api/get-list`,params);
    if(response.success){
      this.data = response.data;
      if (this.data.length === 0) {
        this.notifier.notify('warning', 'No se encontraron registros...');
      }
    }else{
      this.notifier.notify('warning',response.message);
    }
  }

  cleanFields(){
    this.validations.cleanFields(this.form);
    this.data = [];
  }

}
