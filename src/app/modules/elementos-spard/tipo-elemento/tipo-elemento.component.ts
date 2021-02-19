import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Scroll } from './../../../ui/forms/scroll/scroll';
import { ValidationService } from './../../../shared/services/validations.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-tipo-elemento',
  templateUrl: './tipo-elemento.component.html',
  styleUrls: ['./tipo-elemento.component.scss']
})
export class TipoElementoComponent implements OnInit {

  id = null;
  form = {
    redElectrica: {
      label: 'Red eléctrica',
      name: 'redElectrica',
      value: null,
      messages: null,
      required: true,
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
    codigoSpard: {
      label: 'Código Spard',
      name: 'codigoSpard',
      value: null,
      messages: null,
      required: true,
      length: 20,
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
    private validations: ValidationService,
    private api: ApiService,
    private notifier: NotifierService
    ) { }

  ngOnInit(): void {
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  validarRedElectrica(){
    let tipoZona = this.temporales.tipoZona;
    this.dataControls.subestacion = this.temporales.subestacion;
    
    if(this.form.redElectrica.value == 1){
      this.form.tipoZona.disabled = false;
      this.form.subestacion.value = null;

      tipoZona = tipoZona.filter(data => data.codigo != 'NTZ');
      this.dataControls.tipoZona = tipoZona;
    }else{
      this.dataControls.tipoZona = tipoZona;
      let sinZona = this.dataControls.tipoZona.find(data => data.codigo == 'NTZ');
      let sinSubestacion = this.dataControls.subestacion.find(data => data.zona_id == sinZona.id);
      
      this.form.tipoZona.value = sinZona.id;
      this.form.tipoZona.disabled = true;
      this.form.subestacion.value = sinSubestacion.id;
    }
    
    this.form.subestacion.disabled = true;
  }

  validarTipoZona(){
    let subestacion = this.temporales.subestacion;
    this.form.subestacion.value = null;

    this.dataControls.subestacion = subestacion.filter(data => data.zona_id == this.form.tipoZona.value);
    this.form.subestacion.disabled = false;
  }

  async guardar(){
    let validations = this.validations.validateEmptyFields(this.form);
    if(!validations.success){
      return false;
    }
    
    let request = {
      id: this.id,
      redElectrica: this.form.redElectrica.value,
      tipoZona: this.form.tipoZona.value,
      subestacion: this.form.subestacion.value,
      nombre: this.form.nombre.value,
      codigoSpard: this.form.codigoSpard.value
    }

    const response = await this.api.post(`${environment.apiBackend}/tipo-elemento/save-or-update`, request);

    if(response.success){
      this.notifier.notify('success', response.message);
      this.valueChange.emit({success: true});
      this.limpiar();
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
    this.form.tipoZona.disabled = true;
    this.form.subestacion.disabled = true;
    this.id = null;
  }

  setDataTable(data, event) {
    if (event[0] == "select") {
      this.id = event[1].id;
      this.form.redElectrica.value = event[1].red_electrica;
      this.validarRedElectrica();
      this.form.tipoZona.value = parseInt(event[1].zona_id);
      this.validarTipoZona();
      this.form.subestacion.value = parseInt(event[1].subestacion_id);
      this.form.nombre.value = event[1].nombre;
      this.form.codigoSpard.value = event[1].codigo_spard;

      this.boton.color = "btn-success";
      this.boton.value = "Actualizar";
      
      new Scroll("0");
    }

  }

}
