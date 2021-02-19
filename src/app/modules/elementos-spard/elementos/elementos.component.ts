import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Scroll } from './../../../ui/forms/scroll/scroll';
import { ValidationService } from './../../../shared/services/validations.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.scss']
})
export class ElementosComponent implements OnInit {

  id = null;
  form = {
    redElectrica: {
      label: 'Red eléctrica',
      name: 'redElectrica',
      value: null,
      messages: null,
      required: true,
      disabled: false,
    },
    tipoElemento: {
      label: 'Tipo Elemento',
      name: 'tipoElemento',
      value: null,
      messages: null,
      required: true,
      disabled: true
    },
    tipoZona: {
      label: 'Tipo zona',
      name: 'tipoZona',
      value: null,
      messages: null,
      required: true,
      disabled: true
    },
    subestacion: {
      label: 'Subestación',
      name: 'subestacion',
      value: null,
      messages: null,
      required: true,
      disabled: true
    },
    estado: {
      label: 'Estado',
      name: 'estado',
      value: null,
      messages: null,
      required: true,
      disabled: true
    },
    nombre: {
      label: 'Nombre',
      name: 'nombre',
      value: null,
      messages: null,
      required: true,
      length: 80,
      disabled: false,
      visible: false
    },
    grupo: {
      label: 'Grupo',
      name: 'grupo',
      value: null,
      messages: null,
      required: false,
      length: 5,
      disabled: false,
      visible: false
    },
    codigoCreg: {
      label: 'Código Creg',
      name: 'codigoCreg',
      value: null,
      messages: null,
      required: true,
      length: 80,
      disabled: false,
      visible: false
    },
    codigoSpard: {
      label: 'Código Spard',
      name: 'codigoSpard',
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
  };

  boton = {
    value: "Guardar",
    color: "btn-primary"
  }

  @Input() dataControls;
  @Input() temporales;
  @Output() valueChange = new EventEmitter();

  constructor(
      private validations: ValidationService,
      private api: ApiService,
      private notifier: NotifierService
    ) { }

  ngOnInit(): void {
  }

  validarRedElectrica(){
    let tipoElemento = this.temporales.tipoElementos;
    this.dataControls.tipoElementos = this.temporales.tipoElementos;
    // this.form.tipoElemento.disabled = false;
    tipoElemento = tipoElemento.filter(data => data.red_electrica == this.form.redElectrica.value);
    this.dataControls.tipoElementos = this.getSortByName(tipoElemento); 
    this.form.tipoElemento.disabled = false;

    this.dataControls.tipoZona = [];
    this.dataControls.subestacion = [];

    this.form.tipoElemento.value = null;
    this.form.tipoZona.value = null;
    this.form.subestacion.value = null;
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  validarTipoElemento(){
    let dataTipoElemento = this.dataControls.tipoElementos.find(data => data.id == this.form.tipoElemento.value);
    let tipoZona = this.temporales.tipoZona;
    this.dataControls.subestacion = this.temporales.subestacion;

    let subestacion = this.temporales.subestacion;
    this.dataControls.subestacion = [];

    this.form.tipoZona.value = null;
    this.form.subestacion.value = null;

    if(this.form.redElectrica.value == 0 && dataTipoElemento.codigo_spard != 'Consigna-BahiaLinea'){
      tipoZona = tipoZona.filter(data => data.codigo == 'NTZ');
    }else if(this.form.redElectrica.value == 1){
      tipoZona = tipoZona.filter(data => data.id == dataTipoElemento.subestacion.zona_id);
      subestacion = subestacion.filter(data => data.id == dataTipoElemento.subestacion.id);
      this.dataControls.subestacion = subestacion;
    }else{
      tipoZona = tipoZona.filter(data => data.codigo != 'NTZ');
      // tipoZona = tipoZona;
    }

    this.form.tipoZona.disabled = false;
    this.dataControls.tipoZona = tipoZona;    
  }

  validarTipoZona(){
    let subestacion = this.temporales.subestacion;
    this.form.subestacion.value = null;
    let dataTipoElemento = this.dataControls.tipoElementos.find(data => data.id == this.form.tipoElemento.value);

    if(this.dataControls.subestacion.length < 1 || dataTipoElemento.codigo_spard == 'Consigna-BahiaLinea'){
      subestacion = subestacion.filter(data => data.zona_id == this.form.tipoZona.value);
      this.dataControls.subestacion = this.getSortByName(subestacion);
    }
    this.form.subestacion.disabled = false;
  }

  getSortByName(data){
    return data.sort(function(a, b){
      if(a.nombre < b.nombre) { return -1; }
      if(a.nombre > b.nombre) { return 1; }
      return 0;
    })
  }

  async guardar(){
    let validation = this.validations.validateEmptyFields(this.form);
    if(!validation.success){
      return false;
    }

    let request = {
      id: this.id,
      nombre: this.form.nombre.value.trim(),
      codigoCreg: this.form.codigoCreg.value.trim(),
      grupo: this.form.grupo.value.trim(),
      latitud: this.form.latitud.value.trim(),
      longitud: this.form.longitud.value.trim(),
      tipoElementoId: this.form.tipoElemento.value,
      codigoSpard: this.form.codigoSpard.value.trim(),
      subestacionId: this.form.subestacion.value,
      estado: this.form.estado.value,
    }

    const response = await this.api.post(`${environment.apiBackend}/elemento/save-or-update`, request);

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
    this.form.redElectrica.disabled = false;
    this.form.tipoElemento.disabled = true;
    this.form.tipoZona.disabled = true;
    this.form.subestacion.disabled = true;
    this.id = null;
  }

  setDataTable(event) {
    if (event[0] == "select") {
      this.id = event[1].id;

      this.form.redElectrica.value = event[1].tipo_elemento.red_electrica;
      //subestacion
      this.dataControls.subestacion = this.temporales.subestacion;
      this.form.subestacion.value = parseInt(event[1].subestacion_id);

      //zona
      this.dataControls.tipoZona = this.temporales.tipoZona;
      let dataSubestacion = this.temporales.subestacion.find(data => data.id == event[1].subestacion_id);
      let dataZona = this.temporales.tipoZona.find(data => data.id == dataSubestacion.zona_id);
      this.form.tipoZona.value = parseInt(dataZona.id);

      //tipoElemento
      this.dataControls.tipoElementos = this.temporales.tipoElementos;
      this.form.tipoElemento.value = parseInt(event[1].tipo_elemento_id);

      this.form.estado.value = event[1].estado;
      this.form.grupo.value = event[1].grupo != null && event[1].grupo != null ? event[1].grupo : '';
      this.form.nombre.value = event[1].nombre;
      this.form.codigoCreg.value = event[1].codigo_creg;
      this.form.codigoSpard.value = event[1].codigo_spard;
      this.form.latitud.value = event[1].latitud;
      this.form.longitud.value = event[1].longitud;

      this.boton.color = "btn-success";
      this.boton.value = "Actualizar";

      this.form.redElectrica.disabled = true;
      this.form.tipoElemento.disabled = true;
      this.form.tipoZona.disabled = true;
      this.form.subestacion.disabled = true;
      
      new Scroll("0");
    }

  }

  consultar(){
  
  }

}
