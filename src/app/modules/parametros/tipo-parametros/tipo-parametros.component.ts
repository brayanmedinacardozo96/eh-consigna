import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-parametros',
  templateUrl: './tipo-parametros.component.html',
  styleUrls: ['./tipo-parametros.component.scss']
})
export class TipoParametrosComponent implements OnInit {

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
    },codigo: {
      label: 'Código',
      name: 'codigo',
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

  guardar()
  {

  }

}
