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
      length: 50,
      disabled: false,
      visible: false
    },
    grupo: {
      label: 'Grupo',
      name: 'grupo',
      value: null,
      messages: null,
      required: true,
      length: 50,
      disabled: false,
      visible: false
    },
    codigoCreg: {
      label: 'Código Creg',
      name: 'codigoCreg',
      value: null,
      messages: null,
      required: true,
      length: 50,
      disabled: false,
      visible: false
    },
    codigoSpard: {
      label: 'Código Spard',
      name: 'codigoSpard',
      value: null,
      messages: null,
      required: true,
      length: 50,
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

  constructor() { }

  ngOnInit(): void {
  }

  validarRedElectrica(){
    let tipoElemento = this.temporales.tipoElementos;
    this.dataControls.tipoElementos = this.temporales.tipoElementos;
    // this.form.tipoElemento.disabled = false;
    
    this.dataControls.tipoElementos = tipoElemento.filter(data => data.red_electrica == this.form.redElectrica.value);
    this.form.tipoElemento.disabled = false;


  }

  setData(name, event) {
    this.form[name].value = event;
  }

  validarTipoZona(){
    
  }

}
