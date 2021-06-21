import {Component, OnInit} from '@angular/core';
import {SessionService} from './../../shared/services/session.service';
import {ApiService} from '../../shared/services/api.service';
import {environment} from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ValidationService} from '../../shared/services/validations.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-indicador-zona',
  templateUrl: './indicador-zona.component.html',
  styleUrls: ['./indicador-zona.component.scss']
})
export class IndicadorZonaComponent implements OnInit {

  constructor(
    private session: SessionService,
    private apiService: ApiService,
    private notifier: NotifierService,
    private validations: ValidationService,
  ) {}

  form = {
    tipoZona: {
      label: 'Tipo zona',
      name: 'tipoZona',
      value: null,
      messages: null,
      required: true
    },
    anio: {
      label: 'Año',
      name: 'anio',
      value: null,
      messages: null,
      required: true
    },
    eneroSAIDI: {
      label: '',
      name: 'eneroSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    eneroSAIFI: {
      label: '',
      name: 'eneroSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    eneroTrabajadoSAIDI: {
      label: '',
      name: 'eneroTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    eneroTrabajadoSAIFI: {
      label: '',
      name: 'eneroTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    febreroSAIDI: {
      label: '',
      name: 'febreroSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    febreroSAIFI: {
      label: '',
      name: 'febreroSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    febreroTrabajadoSAIDI: {
      label: '',
      name: 'febreroTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    febreroTrabajadoSAIFI: {
      label: '',
      name: 'febreroTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    marzoSAIDI: {
      label: '',
      name: 'marzoSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    marzoSAIFI: {
      label: '',
      name: 'marzoSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    marzoTrabajadoSAIDI: {
      label: '',
      name: 'marzoTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    marzoTrabajadoSAIFI: {
      label: '',
      name: 'marzoTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    abrilSAIDI: {
      label: '',
      name: 'abrilSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    abrilSAIFI: {
      label: '',
      name: 'abrilSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    abrilTrabajadoSAIDI: {
      label: '',
      name: 'abrilTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    abrilTrabajadoSAIFI: {
      label: '',
      name: 'abrilTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    mayoSAIDI: {
      label: '',
      name: 'mayoSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    mayoSAIFI: {
      label: '',
      name: 'mayoSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    mayoTrabajadoSAIDI: {
      label: '',
      name: 'mayoTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    mayoTrabajadoSAIFI: {
      label: '',
      name: 'mayoTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },


    junioSAIDI: {
      label: '',
      name: 'junioSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    junioSAIFI: {
      label: '',
      name: 'junioSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    junioTrabajadoSAIDI: {
      label: '',
      name: 'junioTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    junioTrabajadoSAIFI: {
      label: '',
      name: 'junioTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    julioSAIDI: {
      label: '',
      name: 'julioSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    julioSAIFI: {
      label: '',
      name: 'julioSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    julioTrabajadoSAIDI: {
      label: '',
      name: 'julioTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    julioTrabajadoSAIFI: {
      label: '',
      name: 'julioTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    agostoSAIDI: {
      label: '',
      name: 'agostoSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    agostoSAIFI: {
      label: '',
      name: 'agostoSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    agostoTrabajadoSAIDI: {
      label: '',
      name: 'agostoTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    agostoTrabajadoSAIFI: {
      label: '',
      name: 'agostoTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },


    septiembreSAIDI: {
      label: '',
      name: 'septiembreSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    septiembreSAIFI: {
      label: '',
      name: 'septiembreSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    septiembreTrabajadoSAIDI: {
      label: '',
      name: 'septiembreTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    septiembreTrabajadoSAIFI: {
      label: '',
      name: 'septiembreTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },


    octubreSAIDI: {
      label: '',
      name: 'octubreSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    octubreSAIFI: {
      label: '',
      name: 'octubreSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    octubreTrabajadoSAIDI: {
      label: '',
      name: 'octubreTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    octubreTrabajadoSAIFI: {
      label: '',
      name: 'octubreTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },


    noviembreSAIDI: {
      label: '',
      name: 'noviembreSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    noviembreSAIFI: {
      label: '',
      name: 'noviembreSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    noviembreTrabajadoSAIDI: {
      label: '',
      name: 'noviembreTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    noviembreTrabajadoSAIFI: {
      label: '',
      name: 'noviembreTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    diciembreSAIDI: {
      label: '',
      name: 'diciembreSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    diciembreSAIFI: {
      label: '',
      name: 'diciembreSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    diciembreTrabajadoSAIDI: {
      label: '',
      name: 'diciembreTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    diciembreTrabajadoSAIFI: {
      label: '',
      name: 'diciembreTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

  }

  dataControls = {
    tipoZona: [],
    anio: []
  };

  mesKey = [
    ['enero', 1],
    ['febrero', 2],
    ['marzo', 3],
    ['abril', 4],
    ['mayo', 5],
    ['junio', 6],
    ['julio', 7],
    ['agosto', 8],
    ['septiembre', 9],
    ['octubre', 10],
    ['noviembre', 11],
    ['diciembre', 12]
  ]
  tipoZona = null;
  anio = null;

  anioInicio = 2020;

  ngOnInit(): void {
    this.getDataSelectConsigna();
  }

  //Llena los selects del formulario
  async getDataSelectConsigna() {
    if (this.session.getItem('tipoZona') == null) {
      const response = await this.session.getDataSelectConsigna();
      if (response.success) {
        this.setSelect();
      }
    } else {
      this.setSelect();
    }
  }

  setSelect() {
    this.dataControls.tipoZona = this.session.getItem('tipoZona');
    this.cargarAnio();
  }


  cargarAnio() {

    var anio = new Date().getFullYear() + 1

    for (let index = 0; this.anioInicio <= anio; index++) {

      var obj = {
        "id": 0,
        "nombre": 0,
        "codigo": 0
      }

      obj.codigo = this.anioInicio;
      obj.id = this.anioInicio;
      obj.nombre = this.anioInicio;

      this.dataControls.anio.push(obj);

      this.anioInicio++;


    }
  }

  setData(name, event) {

    this.form[name].value = event;


  }

  async cargarTabla(name, event) {

    this.limpiar();

    if (name == "tipoZona") {
      this.tipoZona = event;
    }
    if (name == "anio") {
      this.anio = event;
    }

    if (this.tipoZona != null && this.anio != null) {

      const response = await this.apiService.get(`${environment.apiBackend}/indicador-zona/getIndicadorZonaAnio/${this.anio}/${this.tipoZona}`);
      if (response.success) {

        response.data.forEach(element => {

          var mes = this.mesKey[element.mes - 1];
          var key = mes[0]

          this.form[`${key}SAIDI`].value = element.asignadosaidi
          this.form[`${key}SAIFI`].value = element.asignadosaifi

          this.form[`${key}TrabajadoSAIDI`].value = element.trabajadosaidi
          this.form[`${key}TrabajadoSAIFI`].value = element.trabajadosaifi


        });
      }else{
        this.notifier.notify('warning',response.message);
      }

    }
  }

  async guardar() {

    if (this.validateEmptyFields()) {

      var obj = [];

      this.mesKey.forEach(element => {

        var keySaidi = `${element[0]}SAIDI`
        var keySaifi = `${element[0]}SAIFI`

        obj.push({
          id: null,
          zona: this.form.tipoZona.value,
          anio: this.form.anio.value,
          mes: element[1],
          asignadoSaidi: this.form[keySaidi].value == null ? 0 : this.form[keySaidi].value,
          asignadoSaifi: this.form[keySaifi].value == null ? 0 : this.form[keySaifi].value
        })
      })

      var response;
      
      response = await this.apiService.post(`${environment.apiBackend}/indicador-zona/postIndicadorZona`, {
        data: obj
      });

      if(response.success){
        this.notifier.notify('success', response.message);
      }else{
        this.notifier.notify('warning', response.message);
      }
    }
  }

  validateEmptyFields() {

    let success = true;

    if (!this.validations.validateEmptyFields(this.form).success) {
      success = false;
    }

    return success;
  }

  limpiar() {

    this.mesKey.forEach(element => {

      var key = element[0]


      this.form[`${key}SAIDI`].value = null
      this.form[`${key}SAIFI`].value = null

      this.form[`${key}TrabajadoSAIDI`].value = null
      this.form[`${key}TrabajadoSAIFI`].value = null


    })

  }

}
