import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {environment} from 'src/environments/environment';
import {SnackBarClass} from '../../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmComponent} from "../../../ui/forms/modal-confirm/modal-confirm.component";
import {Mensaje} from '../../../ui/forms/modal-confirm/mensaje';
import {ValidationService} from '../../../shared/services/validations.service';
import {Scroll} from '../../../ui/forms/scroll/scroll';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-tipo-parametros',
  templateUrl: './tipo-parametros.component.html',
  styleUrls: ['./tipo-parametros.component.scss']
})

export class TipoParametrosComponent implements OnInit {

  constructor(private apiService: ApiService,
      private notifier: NotifierService,
      private dialogo: MatDialog,
      private validations: ValidationService) {}


  form = {
    id: {
      value: null,
    },
    nombre: {
      label: 'Nombre',
      name: 'nombre',
      value: null,
      messages: null,
      length: 100,
      required: true,
    },
    descripcion: {
      label: 'Descripción',
      name: 'descripcion',
      value: null,
      messages: null,
      length: 1000,
      required: true,
    },
    codigo: {
      label: 'Código',
      name: 'codigo',
      value: null,
      messages: null,
      required: true,
      length: 5,
      disabled: false
    }

  }

  boton = {
    value: "Guardar",
    color: "btn-primary"
  }

  data = [{
    nombre: "",
    codigo: "",
    descripcion: ""
  }];

  ngOnInit(): void {
    this.select();
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  setDataTable(data, event) {


    if (event[0] == "select") {

      this.form.nombre.value = event[1].nombre;
      this.form.descripcion.value = event[1].descripcion;
      this.form.codigo.value = event[1].codigo;
      this.form.id = event[1].id;
      this.boton.color = "btn-success";
      this.boton.value = "Actualizar";
      this.form.codigo.disabled=true;
      new Scroll("0");
    }

    if (event[0] == "delete") {
      this.dialogo
        .open(ModalConfirmComponent, {
          data: new Mensaje("Eliminar:", event[1].nombre)
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.eliminar(event[1]);
          }
        });

    }


  }

  limpiar() {
    this.boton = {
      value: "Guardar",
      color: "btn-primary"
    }
    this.form.nombre.value = "";
    this.form.nombre.messages="";
    this.form.descripcion.value = "";
    this.form.descripcion.messages="";
    this.form.codigo.value = "";
    this.form.codigo.messages="";
    this.form.codigo.disabled=false;
    new Scroll("0");
  }

  async guardar() {

    if(this.validateEmptyFields())
    {
      var obj = {
        id: this.form.id,
        codigo: this.form.codigo.value,
        nombre: this.form.nombre.value,
        descripcion: this.form.descripcion.value
      }

      var response;

      if (this.boton.value == "Guardar") {
        response = await this.apiService.post(`${environment.apiBackend}/tipo-parametro/postTipoParametro`, obj);
      } else {
        response = await this.apiService.post(`${environment.apiBackend}/tipo-parametro/putTipoParametro`, obj);
      }

      if(response.success){
        this.notifier.notify('success', response.message);
        this.data = response.data;
        this.limpiar();
      }else{
        this.notifier.notify('warning', response.message);
      }
    }
  }

  async select() {
    const response = await this.apiService.get(`${environment.apiBackend}/tipo-parametro/getTipoParametro`);

    if (response.length > 0) {
      this.data = response;
    }
  }

  async eliminar(key) {
    var mensaje = [];

    var response = await this.apiService.post(`${environment.apiBackend}/tipo-parametro/deleteTipoParametro`, {
      id: key.id
    });

    if(response.success){
      this.notifier.notify('success', response.message);
      this.data = response.data;
      this.limpiar();
    }else{
      this.notifier.notify('warning', response.message);
    }
  }

  validateEmptyFields() {

    let success = true;

    if (!this.validations.validateEmptyFields(this.form).success) {
      success = false;
    }

    return success;
  }

}
