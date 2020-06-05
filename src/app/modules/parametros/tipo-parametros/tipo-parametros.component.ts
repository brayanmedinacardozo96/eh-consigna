import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {environment} from 'src/environments/environment';
import {SnackBarClass} from '../../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmComponent} from "../../../ui/forms/modal-confirm/modal-confirm.component";
import {Mensaje} from '../../../ui/forms/modal-confirm/mensaje';

@Component({
  selector: 'app-tipo-parametros',
  templateUrl: './tipo-parametros.component.html',
  styleUrls: ['./tipo-parametros.component.scss']
})

export class TipoParametrosComponent implements OnInit {

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private dialogo: MatDialog) {}


  form = {
    id: {
      value: null,
    },
    nombre: {
      label: 'Nombre',
      name: 'nombre',
      value: null,
      messages: null,
      required: false,
    },
    descripcion: {
      label: 'Descripción',
      name: 'descripcion',
      value: null,
      messages: null,
      required: false,
    },
    codigo: {
      label: 'Código',
      name: 'codigo',
      value: null,
      messages: null,
      required: false,
      length: 5
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
    this.form.descripcion.value = "";
    this.form.codigo.value = "";
  }

  async guardar() {


    var obj = {
      id: this.form.id,
      codigo: this.form.codigo.value,
      nombre: this.form.nombre.value,
      descripcion: this.form.descripcion.value
    }

    var response;
    var mensaje = [];

    if (this.boton.value == "Guardar") {
      response = await this.apiService.post(`${environment.apiBackend}/tipo-elemento/postElemento`, obj);
      mensaje = ["Guardado con éxito", "btn-primary"];
    } else {

      response = await this.apiService.post(`${environment.apiBackend}/tipo-elemento/putElemento`, obj);
      mensaje = ["Registro actualizado", "btn-success"];
    }

    this.evaluar(response, mensaje);

  }

  async select() {

    const response = await this.apiService.get(`${environment.apiBackend}/tipo-elemento/getElemento`);

    if (response.length > 0) {
      this.data = response;

    }

  }

  async eliminar(key) {
    var mensaje = [];

    var response = await this.apiService.post(`${environment.apiBackend}/tipo-elemento/deleteElemento`, {
      id: key.id
    });

    mensaje = ["Registro eliminado", "btn-default"];

    this.evaluar(response, mensaje);

  }


  evaluar(response, mensaje) {

    if (response.message == null) {

      this.data = response.data;
      this.limpiar();

    } else {

      mensaje = ["Algo ha ocurrido", "btn-danger"];
    }

    new SnackBarClass(this.snackBar, mensaje[0], mensaje[1]).openSnackBar();
  }


}
