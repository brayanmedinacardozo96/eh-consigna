import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {ValidationService} from '../../../shared/services/validations.service';

@Component({
  selector: 'app-consigna-new',
  templateUrl: './consigna-new.component.html',
  styleUrls: ['./consigna-new.component.scss']
})
export class ConsignaNewComponent implements OnInit {
  data = [];
  dataElementos = [];
  dataControls = {
    tipoZona:[
      {nombre:'Zona Norte',codigo:'ZN'},
      {nombre:'Zona Centro',codigo:'ZC'},
      {nombre:'Zona Occidente',codigo:'ZO'},
      {nombre:'Zona Sur',codigo:'ZS'}
    ],
    tipoSolicitud:[
      {nombre:'Plan Semanal',codigo:'ZN'},
      {nombre:'Emergencia',codigo:'ZC'},
    ],
    tipoConsignacion:[
      {nombre:'Plan Semanal',codigo:'ZN'},
      {nombre:'Emergencia',codigo:'ZC'},
    ],
    estadoConsigna:[
      {nombre:'Pendiente',codigo:'P'},
      {nombre:'Aprobada',codigo:'A'},
      {nombre:'Reprogramada',codigo:'R'},
      {nombre:'Ejecutada',codigo:'E'},
      {nombre:'Cancelada',codigo:'C'},
    ],
    estadoEquipo:[
      {nombre:'Riesgo Disparo',codigo:'RD'},
      {nombre:'Apertura',codigo:'A'},
    ],
    solicitante:[
      {nombre:'Brayan Herney Medina Cardozo',identificacion:'1075412102',id:1},
      {nombre:'Jhonatan Parra Almario',identificacion:'1080934291',id:10}
    ],
    subestacion:[
      {nombre:'El Bote',codigo:'12345'},
      {nombre:'Solarte',codigo:'14'},
      {nombre:'Las Brisas',codigo:'15'},
      {nombre:'Timaná',codigo:'1'}
    ],
    tipoMantenimiento:[
      {nombre:'Preventivo Sin Reposición Equipoe', valor:'12345'},
      {nombre:'Correctivo',valor:'14'},
      {nombre:'Preventivo Con Reposición Equipo ',valor:'15'},
      {nombre:'Trabajo Expansión',valor:'1'}
    ],
    tipoElemento:[
      {nombre:'tp E 1',codigo:'12345'},
      {nombre:'tp E 2',codigo:'14'},
      {nombre:'tp E 3',codigo:'15'},
      {nombre:'tp E 4',codigo:'1'},
      {nombre:'tp E 5',codigo:'1'},
      {nombre:'tp E 6',codigo:'1'},
      {nombre:'tp E 7',codigo:'1'},
      {nombre:'tp E 8',codigo:'1'},
      {nombre:'tp E 9',codigo:'1'}
    ],
    elemento:[
      {nombre:'E 1',codigo:'12345'},
      {nombre:'E 2',codigo:'14'},
      {nombre:'E 3',codigo:'15'},
      {nombre:'E 4',codigo:'1'},
      {nombre:'E 5',codigo:'1'},
      {nombre:'E 6',codigo:'1'}
    ],
    ramal:[
      {nombre:'Si',value:'1'},
      {nombre:'No',value:'0'}
    ]
  };
  form = {
    numeroConsigna:{
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: false,
    },
    consecutivoSnc:{
      label: 'Consecutivo SNC',
      name: 'consecutivoSnc',
      value: null,
      messages: null,
      required: false,
    },
    tipoZona: {
      label: 'Tipo zona',
      name: 'tipoZona',
      value: null,
      messages: null,
      required: false,
    },
    tipoSolicitud: {
      label: 'Tipo de solicitud',
      name: 'tipoSolicitud',
      value: null,
      messages: null,
      required: false,
    },
    tipoConsignacion: {
      label: 'Tipo de consignación',
      name: 'tipoConsignacion',
      value: null,
      messages: null,
      required: false,
    },
    fechaSolicitud: {
      label: 'Fecha de solicitud',
      name: 'fechaSolicitud',
      value: null,
      messages: null,
      required: false,
    },
    estadoConsigna: {
      label: 'Estado consignación',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: false,
    },
    estadoEquipo: {
      label: 'Estado del equipo',
      name: 'estadoEquipo',
      value: null,
      messages: null,
      required: false,
    },
    solicitante: {
      label: 'Solicitante',
      name: 'solicitante',
      value: null,
      messages: null,
      required: false,
    },
    subestacion: {
      label: 'Subestación',
      name: 'subestacion',
      value: null,
      messages: null,
      required: false,
    },
    tipoMantenimiento: {
      label: 'Tipo mantenimiento',
      name: 'tipoMantenimiento',
      value: null,
      messages: null,
      required: false,
    },    
  };

  formElementos = {
    tipoElemento: {
      label: 'Tipo elemento',
      name: 'tipoElemento',
      value: null,
      messages: null,
      required: true,
    },
    elemento: {
      label: 'Elemento',
      name: 'elemento',
      value: null,
      messages: null,
      required: true,
    },
    ramal: {
      label: 'Ramal',
      name: 'ramal',
      value: null,
      messages: null,
      required: true,
    },
    fechaInicio: {
      label: 'Fecha inicio',
      name: 'fechaInicio',
      value: null,
      messages: null,
      required: true,
    },
    horaInicio: {
      label: 'Hora inicio',
      name: 'horaInicio',
      value: null,
      messages: null,
      required: true,
    },
    fechaFinal: {
      label: 'Fecha final',
      name: 'fechaFinal',
      value: null,
      messages: null,
      required: true,
    },
    horaFinal: {
      label: 'Hora final',
      name: 'horaFinal',
      value: null,
      messages: null,
      required: true,
    },
  };

  constructor(private api: ApiService,
              private validations: ValidationService
              ) { }

  ngOnInit(): void {
  }

  async search() {
    console.log(this.form)
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  setDataFormElementos(name, event) {
    this.formElementos[name].value = event;
  }

  addListElements(){
    const responseValidate = this.validations.validateEmptyFields(this.formElementos);

    if (!responseValidate.success) {
      return false;
    }

    var DropdownList = (document.getElementById("consigna-tipo_elemento")) as HTMLSelectElement;
    var tipoElemento = DropdownList.selectedIndex;
    
    console.log(DropdownList);
    console.log(tipoElemento);
    
    const elemento = {
      id:'1',
      tipoElemento:{nombre: tipoElemento,valor:'2'},
      elemento:{nombre:'bb',valor:'3'},
      ramal:{nombre:'Si',valor:'1'},
      fechaInicio:{nombre:'12/12/2020',valor:'12/12/2020'},
      fechaFinal:{nombre:'01/01/2020',valor:'01/01/2020'},
    }

    this.dataElementos.push(elemento);
    console.log(this.formElementos);

  }

  removeListElement(id){
    console.log(id);
  }

  onSelectName(e) {
    console.log(e);
    const select = e.target;
    const value = select.value;
    const desc = select.selectedOptions[0].text;
    console.log(desc);
 }

}
