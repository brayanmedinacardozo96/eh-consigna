import {
  Component,
  OnInit
} from '@angular/core';
import {
  SessionService
} from './../../shared/services/session.service';
import {
  ApiService
} from '../../shared/services/api.service';
import {
  environment
} from 'src/environments/environment';
import {
  SnackBarClass
} from '../../ui/snack-bar/snack-bar';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {ValidationService} from '../../shared/services/validations.service';

@Component({
  selector: 'app-indicador-zona',
  templateUrl: './indicador-zona.component.html',
  styleUrls: ['./indicador-zona.component.scss']
})
export class IndicadorZonaComponent implements OnInit {

  constructor(
    private session: SessionService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
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
      label: 'SAIDI',
      name: 'eneroSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    eneroSAIFI: {
      label: 'SAIFI',
      name: 'eneroSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    eneroTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'eneroTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    eneroTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'eneroTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    febreroSAIDI: {
      label: 'SAIDI',
      name: 'febreroSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    febreroSAIFI: {
      label: 'SAIFI',
      name: 'febreroSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    febreroTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'febreroTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    febreroTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'febreroTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    marzoSAIDI: {
      label: 'SAIDI',
      name: 'marzoSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    marzoSAIFI: {
      label: 'SAIFI',
      name: 'marzoSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    marzoTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'marzoTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    marzoTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'marzoTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    abrilSAIDI: {
      label: 'SAIDI',
      name: 'abrilSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    abrilSAIFI: {
      label: 'SAIFI',
      name: 'abrilSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    abrilTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'abrilTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    abrilTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'abrilTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    mayoSAIDI: {
      label: 'SAIDI',
      name: 'mayoSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    mayoSAIFI: {
      label: 'SAIFI',
      name: 'mayoSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    mayoTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'mayoTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    mayoTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'mayoTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },


    junioSAIDI: {
      label: 'SAIDI',
      name: 'junioSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    junioSAIFI: {
      label: 'SAIFI',
      name: 'junioSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    junioTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'junioTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    junioTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'junioTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    julioSAIDI: {
      label: 'SAIDI',
      name: 'julioSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    julioSAIFI: {
      label: 'SAIFI',
      name: 'julioSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    julioTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'julioTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    julioTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'julioTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    agostoSAIDI: {
      label: 'SAIDI',
      name: 'agostoSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    agostoSAIFI: {
      label: 'SAIFI',
      name: 'agostoSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    agostoTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'agostoTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    agostoTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'agostoTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },


    septiembreSAIDI: {
      label: 'SAIDI',
      name: 'septiembreSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    septiembreSAIFI: {
      label: 'SAIFI',
      name: 'septiembreSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    septiembreTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'septiembreTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    septiembreTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'septiembreTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },


    octubreSAIDI: {
      label: 'SAIDI',
      name: 'octubreSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    octubreSAIFI: {
      label: 'SAIFI',
      name: 'octubreSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },


    octubreTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'octubreTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    octubreTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'octubreTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },


    noviembreSAIDI: {
      label: 'SAIDI',
      name: 'noviembreSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    noviembreSAIFI: {
      label: 'SAIFI',
      name: 'noviembreSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    noviembreTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'noviembreTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    noviembreTrabajadoSAIFI: {
      label: 'SAIFI',
      name: 'noviembreTrabajadoSAIFI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },

    diciembreSAIDI: {
      label: 'SAIDI',
      name: 'diciembreSAIDI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    diciembreSAIFI: {
      label: 'SAIFI',
      name: 'diciembreSAIFI',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },

    diciembreTrabajadoSAIDI: {
      label: 'SAIDI',
      name: 'diciembreTrabajadoSAIDI',
      value: null,
      messages: null,
      required: false,
      disable: true,
      maxLength: 20,
    },
    diciembreTrabajadoSAIFI: {
      label: 'SAIFI',
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
      if (response.message == null && response.data != null) {

        response.data.forEach(element => {

          var mes = this.mesKey[element.mes - 1];
          var key = mes[0]

          this.form[`${key}SAIDI`].value = element.asignadosaidi
          this.form[`${key}SAIFI`].value = element.asignadosaifi

          this.form[`${key}TrabajadoSAIDI`].value = element.trabajadosaidi
          this.form[`${key}TrabajadoSAIFI`].value = element.trabajadosaifi


        });

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
      var mensaje = [];

      response = await this.apiService.post(`${environment.apiBackend}/indicador-zona/postIndicadorZona`, {
        data: obj
      });
      mensaje = ["Guardado con éxito", "btn-primary"];

      if (response.message != null) {
        mensaje = ["Problemas con la ejecución", "btn-primary"];
        console.log(response.message)
      }

      new SnackBarClass(this.snackBar, mensaje[0], mensaje[1]).openSnackBar();
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
