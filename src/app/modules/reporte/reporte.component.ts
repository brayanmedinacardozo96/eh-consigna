import {
  Component,
  OnInit
} from '@angular/core';
import {SessionService} from './../../shared/services/session.service';
import {environment} from 'src/environments/environment';
import { ApiService} from '../../shared/services/api.service';
import {ValidationService} from '../../shared/services/validations.service';
import {SnackBarClass} from '../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Aprobar} from '../../modules/autorizar/aprobar';
import {Auth} from '../../shared/auth';
import { User } from '../../shared/models/user';
import * as moment from 'moment';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  constructor(private session: SessionService,
    private validations: ValidationService,
    private snackBar: MatSnackBar,
    private aprobar:Aprobar,
    private apiService: ApiService, ) {}

  form = {
    reporte: {
      label: 'Reporte',
      name: 'reporte',
      value: null,
      messages: null,
      required: true,
      valor: null
    },
    fechaInicio: {
      label: 'Fecha inicio ejecución',
      name: 'fechaInicio',
      value: null,
      messages: null,
      required: true,
    },
    fechaFin: {
      label: 'Fecha fin ejecución',
      name: 'fechaFin',
      value: null,
      messages: null,
      required: true,
    },
    estadoConsigna: {
      label: 'Estado consignación',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: true,
    },
  }

  dataControls = {
    reporte: [],
    estadoConsigna: []
  }

  dataProgramacion = [{
    zonacodigo: "",
    zonanombre: "",
    estado: "",
    consigna: "",
    estadoequipo: "",
    elemento: "",
    fech_inicio_prog: "",
    hora_inicio_prog: "",
    fech_final_prog: "",
    hora_final_prog: ""
  }];

  dataHeader = []
  dataExcel=[];
  auth = Auth;

  ngOnInit(): void {
    this.getDataSelectConsigna();
    this.session.remove('estadoConsigna');
    this.getReporte();

  }

  setSelect() {
    this.dataControls.estadoConsigna = this.session.getItem('estadoConsigna');
  
  }

  async getDataSelectConsigna() {
    if (this.session.getItem('estadoConsigna') == null) {
      const response = await this.session.getDataSelectConsigna();
      if (response.success) {
        this.setSelect();
      }
    } else {
      this.setSelect();
    }
  }

  async getReporte() {

    const response = await this.apiService.get(`${environment.apiBackend}/parametro/getParametroCodigoTipo/REPOR`);

    if (response.data.length > 0) {
      this.dataControls.reporte = response.data;
    }


  }
  
  tipoReporte(tipo) {
    switch (tipo) {
      case 'RConsignac':
        this.dataHeader.push({
            name: 'Zona',
            nameColumn: 'zonacodigo'
          }, {
            name: 'Estado',
            nameColumn: 'estado'
          }, {
            name: 'No. Consigna',
            nameColumn: 'consigna'
          }, {
            name: 'Estado equipo',
            nameColumn: 'estadoequipo'
          }, {
            name: 'Elemento consignado',
            nameColumn: 'elemento'
          }, {
            name: 'Fecha inicio',
            nameColumn: 'fech_inicio_prog'
          }, {
            name: 'Hora inicio',
            nameColumn: 'hora_inicio_prog'
          }, {
            name: 'Fecha final',
            nameColumn: 'fech_final_prog'
          }, {
            name: 'Hora final',
            nameColumn: 'hora_final_prog'
          }

        )
        break;

      default:
        break;
    }
  }

  setData(name, event) {

    this.form[name].value = event;

  }

  async consultar() {

    if (this.validateEmptyFields()) {

      var result=this.aprobar.validarPermiso();
      const user: User = Auth.getUserDataPerson();

      var obj = {
        reporte: this.form.reporte.value,
        estado: this.form.estadoConsigna.value,
        fechaInicio: moment(this.form.fechaInicio.value).format("YYYY/MM/DD"),
        fechaFin: moment(this.form.fechaFin.value).format("YYYY/MM/DD"),
        perfil:result.length>0?true:false,
        idUsuario:user.id
      }

      const response = await this.apiService.post(`${environment.apiBackend}/reporte/reporte`, obj);
      if (response.message == null && response.data != null) {

        if (response.data.length > 0) {
          this.dataProgramacion = response.data;
          this.tipoReporte(obj.reporte);
          this.dataExcel = response.data;
        } else {
          new SnackBarClass(this.snackBar, 'No se encontraron registros.', 'btn-warning').openSnackBar();
        }

      } else {
        new SnackBarClass(this.snackBar, 'No se puede realizar esta acción.', 'btn-danger').openSnackBar();
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



  }

}