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
    trabajoEfectuar: {
      label: 'Trabajos a efectuar',
      name: 'trabajoEfectuar',
      value: null,
      messages: null,
      required: false,
    },
    justificacion: {
      label: 'Justificación',
      name: 'justificacion',
      value: null,
      messages: null,
      required: false,
    },
    observacionOpeyman: {
      label: 'Observación OPEYMAN',
      name: 'observacionOpeyman',
      value: null,
      messages: null,
      required: false,
    },
    consignaOperativa: {
      label: 'Consigna operativa',
      name: 'consignaOperativa',
      value: null,
      messages: null,
      required: false,
    },
    medidasSeguiridad: {
      label: 'Medidas de seguridad',
      name: 'medidasSeguiridad',
      value: null,
      messages: null,
      required: false,
    },
    jefeTrabajo: {
      label: 'Jefe de trabajo',
      name: 'jefeTrabajo',
      value: null,
      messages: null,
      required: false,
    },
    telefonoJefeTrabajo: {
      label: 'Teléfono jefe de trabajo',
      name: 'telefonoJefeTrabajo',
      value: null,
      messages: null,
      required: false,
    },
    jefeTrabajoContratista: {
      label: 'Jefe de trabajo contratista',
      name: 'jefeTrabajoContratista',
      value: null,
      messages: null,
      required: false,
    },
    telJefeTrabajoContratista: {
      label: 'Telefóno jefe de trabajo contratista',
      name: 'telJefeTrabajoContratosta',
      value: null,
      messages: null,
      required: false,
    },
    moviles: {
      label: 'Móviles',
      name: 'moviles',
      value: null,
      messages: null,
      required: false,
    },

  };

  interrupcionesTrabajo = {
    barrios: {
      label: 'Barrios',
      name: 'barrios',
      value: null,
      messages: null,
      required: false,
    },
    clientesNoRegulados: {
      label: 'Clientes No Regulados',
      name: 'clientesNoRegulados',
      value: null,
      messages: null,
      required: false,
    }
  };

  interrupcionesCortoTiempo = {
    barrios: {
      label: 'Barrios',
      name: 'barrios',
      value: null,
      messages: null,
      required: false,
    },
    clientesNoRegulados: {
      label: 'Clientes No Regulados',
      name: 'clientesNoRegulados',
      value: null,
      messages: null,
      required: false,
    }
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

  setData(name, event, obj: any = undefined) {
    
    if(obj == undefined){
      this.form[name].value = event;
    }else{
      obj[name].value = event;
    }

  }
  
  addListElements(){
    const responseValidate = this.validations.validateEmptyFields(this.formElementos);

    if (!responseValidate.success) {
      return false;
    }

    var textTipoElemento = ((document.getElementById("form_consigna-tipo_elemento")) as HTMLSelectElement).textContent;
    var textElemento = ((document.getElementById("form_consigna-elemento")) as HTMLSelectElement).textContent;
    var textRamal = ((document.getElementById("form_consigna-ramal")) as HTMLSelectElement).textContent;
    var fechaInicio = this.formElementos.fechaInicio.value;
    var horaInicio = this.formElementos.horaInicio.value;
    var fechaFinal = this.formElementos.fechaFinal.value;
    var horaFinal = this.formElementos.horaFinal.value;
    
    const elemento = {
      tipoElemento: {nombre: textTipoElemento,  valor: this.formElementos.tipoElemento.value},
      elemento:     {nombre: textElemento,      valor: this.formElementos.elemento.value},
      ramal:        {nombre: textRamal,         valor: this.formElementos.ramal.value},
      fechaInicio:  {nombre: fechaInicio,       valor: fechaInicio },
      horaInicio:   {nombre: horaInicio,        valor: horaInicio },
      fechaFinal:   {nombre: fechaFinal,        valor: fechaFinal},
      horaFinal:    {nombre: horaFinal,         valor: horaFinal},
    }

    this.dataElementos.push(elemento);
    console.log(this.dataElementos);
  }

  removeListElement(id){
    this.dataElementos.splice(id,1);
    console.log(id);
    console.log(this.dataElementos);
  }

  changeSelect(dataSelect,id) {
    /* for(let value of dataSelect){
      console.log(value);
    } */
  }

  getNameSelect(dataSelect,id){
    let name = '';
    return name;    
  }

  srcResult: FormData;

  onFileSelected(event) {
    var files = event.target.files;
    var fileName = files [0].name
    
    console.log(files);
    console.log(fileName);
    /* const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);

      console.log(this.srcResult);
    } */
  }
}
