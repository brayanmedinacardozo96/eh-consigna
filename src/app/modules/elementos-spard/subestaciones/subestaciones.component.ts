import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { Scroll } from './../../../ui/forms/scroll/scroll';
import { ValidationService } from './../../../shared/services/validations.service';

@Component({
  selector: 'app-subestaciones',
  templateUrl: './subestaciones.component.html',
  styleUrls: ['./subestaciones.component.scss']
})
export class SubestacionesComponent implements OnInit {

  id = null;
  form = {
    tipoZona: {
      label: 'Tipo zona',
      name: 'tipoZona',
      value: null,
      messages: null,
      required: true,
      disabled: false
    },
    nombre: {
      label: 'Nombre',
      name: 'nombre',
      value: null,
      messages: null,
      required: true,
      length: 50,
      disabled: false,
      visible: false
    },
    codigo: {
      label: 'Código',
      name: 'codigo',
      value: null,
      messages: null,
      required: true,
      length: 80,
      disabled: false,
      visible: false
    },
    latitud: {
      label: 'Latitud',
      name: 'latitud',
      value: null,
      messages: null,
      required: true,
      length: 20,
      disabled: false,
      visible: true
    },
    longitud: {
      label: 'Longitud',
      name: 'longitud',
      value: null,
      messages: null,
      required: true,
      length: 20,
      disabled: false,
      visible: true
    },
    codigoCreg: {
      label: 'Código Creg',
      name: 'codigoCreg',
      value: null,
      messages: null,
      required: false,
      length: 80,
      disabled: false,
      visible: false
    },
  };

  boton = {
    value: "Guardar",
    color: "btn-primary"
  }

  @Input() dataControls;
  @Input() temporales;
  @Output() valueChange = new EventEmitter();

  constructor(
      private api: ApiService,
      private notifier: NotifierService,
      private validations: ValidationService,
    ) { }

  ngOnInit(): void {
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async guardar(){
    let validation = this.validations.validateEmptyFields(this.form);
    if(!validation.success){
      return false;
    }

    let request = {
      id: this.id,
      nombre: this.form.nombre.value.trim(),
      codigo: this.form.codigo.value.trim(),
      latitud: this.form.latitud.value.trim(),
      longitud: this.form.longitud.value.trim(),
      zonaId: this.form.tipoZona.value,
      codigoCreg: this.form.codigoCreg.value.trim(),
    }

    const response = await this.api.post(`${environment.apiBackend}/subestacion/save-or-update`, request);

    if(response.success){
      this.notifier.notify('success', response.message);
      this.limpiar();
      this.valueChange.emit({success: true});
    }else{
      this.notifier.notify('warning', response.message);
    }

  }

  limpiar(){
    this.boton = {
      value: "Guardar",
      color: "btn-primary"
    }
    new Scroll("0");
    this.validations.cleanFields(this.form);
    this.id = null;
  }

  setDataTable(event) {
    if (event[0] == "select") {
      this.id = event[1].id;

      this.form.tipoZona.value = parseInt(event[1].zona_id);
      this.form.nombre.value = event[1].nombre;
      this.form.codigo.value = event[1].codigo;
      this.form.latitud.value = event[1].latitud;
      this.form.longitud.value = event[1].longitud;
      
      this.form.codigoCreg.value = event[1].codigo_creg != null && event[1].codigo_creg != null ? event[1].codigo_creg : '';
      this.boton.color = "btn-success";
      this.boton.value = "Actualizar";
      
      new Scroll("0");
    }
  }

}
