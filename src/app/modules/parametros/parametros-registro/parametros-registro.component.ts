import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametros-registro',
  templateUrl: './parametros-registro.component.html',
  styleUrls: ['./parametros-registro.component.scss']
})
export class ParametrosRegistroComponent implements OnInit {

  constructor() { }
  form = {
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
    },tipo: {
      label: 'Tipo',
      name: 'tipo',
      value: null,
      messages: null,
      required: false,
    }

  }

  dataControls = {
    tipo:[
      {nombre:'xxxxxx',codigo:'1'},
      {nombre:'yyyy',codigo:'2'},
    ],
      options:  ['123', '456', '789']
  }

  ngOnInit(): void {
  }

  setData(name, event) {
    this.form[name].value = event;
  }

}
