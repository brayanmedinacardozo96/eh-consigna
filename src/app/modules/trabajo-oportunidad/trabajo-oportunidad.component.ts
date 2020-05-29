import { Component, OnInit,ViewChild } from '@angular/core';
import {MDialogComponent} from '../../ui/forms/m-dialog/m-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Mensaje} from '../../ui/forms/m-dialog/dialog';
import {TableTrabajoOportunidadComponent} from './table-trabajo-oportunidad/table-trabajo-oportunidad.component';

@Component({
  selector: 'app-trabajo-oportunidad',
  templateUrl: './trabajo-oportunidad.component.html',
  styleUrls: ['./trabajo-oportunidad.component.scss']
})
export class TrabajoOportunidadComponent implements OnInit {

  @ViewChild(TableTrabajoOportunidadComponent) child;
  
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
    elemento: {
      label: 'Elemento',
      name: 'elemento',
      value: null,
      messages: null,
      required: false,
    }
  }

  dataControls = {
    elemento:[
      {nombre:'xxxxxx',codigo:'1'},
      {nombre:'yyyy',codigo:'2'},
    ],
      options:  ['123', '456', '789']
  }

  dataTrabajo=[
    {elemento:"elemento",codigo:"1", trabajo:'XXXX', medidaSeguridad:'XXX', jefeTrabajo:'XXX', telefono:'XXX'},
    {elemento:"elemento 2",codigo:"2", trabajo:'yyy', medidaSeguridad:'yy', jefeTrabajo:'yy', telefono:'yy'}
  ]

  

  

  ngOnInit(): void {
    
    //console.log(this.child.message);

  }

  setData(name, event) {
    console.log(this.form[name].value);
    this.form[name].value = event;
  }

  setDataTable(data,event) {

    this.form.trabajo.value=event.trabajo;
    this.form.medidaSeguridad.value=event.medidaSeguridad;
    this.form.telefono.value=event.telefono;
    this.form.jefeTrabajo.value=event.jefeTrabajo;
    this.form.elemento.value=event.codigo;

  }

  dialogConsigna()
  {
    this.dialog.open(MDialogComponent, {
      data: new Mensaje('Consigna #'+this.form.numeroConsigna.value,"<strong>hola</strong>")
    });
  }

  limpiar()
  {
    this.form.trabajo.value="";
    this.form.medidaSeguridad.value="";
    this.form.telefono.value="";
    this.form.jefeTrabajo.value="";
    this.form.elemento.value="";
  }

}
