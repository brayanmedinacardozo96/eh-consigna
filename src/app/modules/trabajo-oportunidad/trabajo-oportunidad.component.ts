import { Component, OnInit } from '@angular/core';
import {MDialogComponent} from '../../ui/forms/m-dialog/m-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Mensaje} from '../../ui/forms/m-dialog/dialog';

@Component({
  selector: 'app-trabajo-oportunidad',
  templateUrl: './trabajo-oportunidad.component.html',
  styleUrls: ['./trabajo-oportunidad.component.scss']
})
export class TrabajoOportunidadComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  panelOpenState = false;
  customCollapsedHeight: string = '25px';
  customExpandedHeight: string = '25px';

  form = {
    numeroConsigna:{
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: false,
      url:"https://jsonplaceholder.typicode.com/users"
    },
    trabajo:{
      label: 'Trabajos',
      name: 'trabajo',
      value: null,
      messages: null,
      required: false,
    },
    medidaSeguridad:{
      label: 'Medidas de seguridad',
      name: 'medidaSeguridad',
      value: null,
      messages: null,
      required: false,
    },
    jefeTrabajo:{
      label: 'Jefe de trabajos',
      name: 'jefeTrabajo',
      value: null,
      messages: "",
      required: true,
    },
    telefono:{
      label: 'Telefono',
      name: 'telefono',
      value: null,
      messages: null,
      required: false,
    },
    elemnto: {
      label: 'Elemento',
      name: 'elemento',
      value: null,
      messages: null,
      required: false,
    }
  }

  dataControls = {
    elemento:[
      {nombre:'xxxxxx',codigo:'x'},
      {nombre:'xxxxx',codigo:'x'},
    ],
      options:  ['123', '456', '789']
  }

  

  ngOnInit(): void {
  }

  setData(name, event) {
    console.log(this.form[name].value);
    this.form[name].value = event;
  }

  dialogConsigna()
  {
    this.dialog.open(MDialogComponent, {
      data: new Mensaje('Consigna #'+this.form.numeroConsigna.value,"<strong>hola</strong>")
    });
  }

}
