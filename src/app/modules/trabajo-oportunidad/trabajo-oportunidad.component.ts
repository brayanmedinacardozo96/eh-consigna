import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trabajo-oportunidad',
  templateUrl: './trabajo-oportunidad.component.html',
  styleUrls: ['./trabajo-oportunidad.component.scss']
})
export class TrabajoOportunidadComponent implements OnInit {

  constructor() { }

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
    },
    trabajo:{
      label: 'Trabajos',
      name: 'Trabajos',
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
      messages: null,
      required: false,
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
      name: 'elemnto',
      value: null,
      messages: null,
      required: false,
    }
  }

  dataControls = {
    elemento:[
      {nombre:'xxxxxx',codigo:'x'},
      {nombre:'xxxxx',codigo:'x'},
    ]
  }

  ngOnInit(): void {
  }

  setData(name, event) {
    this.form[name].value = event;
  }

}
