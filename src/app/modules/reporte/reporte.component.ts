import {Component,  OnInit} from '@angular/core';
import {SessionService} from './../../shared/services/session.service';
import {environment} from 'src/environments/environment';
import { ApiService} from '../../shared/services/api.service';
import {ValidationService} from '../../shared/services/validations.service';
import {SnackBarClass} from '../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Aprobar} from '../../modules/autorizar/aprobar';
import {Auth} from '../../shared/auth';
import { User } from '../../shared/models/user';
import { DateValidationervice } from './../../shared/services/date-validations.service';
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
    private apiService: ApiService, 
    private dateValidation: DateValidationervice,) {}

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
      required: false,
    },
    solicitadaTercero: {
      label: 'Solicitada por un tercero',
      name: 'solicitada_tercero',
      value: null,
      disabled: false,
      messages: null,
      required: false,
    },
    tipoTercero: {
      label: 'Tipo tercero',
      name: 'tipo_tercero',
      value: null,
      disabled: false,
      messages: null,
      visible: false,
      required: false,
    },
    terceroNumeroContrato: {
      label: 'Número Contrato',
      name: 'terceroNumeroContrato',
      value: null,
      messages: null,
      required: false,
      length: 20,
      disabled: false,
      visible: false
    },
    terceroAnio: {
      label: 'Año del Contrato',
      name: 'terceroAnio',
      value: null,
      messages: null,
      required: false,
      disabled: false,
      visible: false
    },
  }

  dataControls = {
    reporte: [],
    estadoConsignacion: [],
    tipoTerceros: [],
    solicitadaTercero:[ 
      {id: "1",nombre: "Si"},
      {id: "0", nombre: "No"}
    ],
    selectYear: this.dateValidation.getSelectCurrentDate(true),
  }

  dataExcel = [];
  dataHeader = [];
  auth = Auth;

  displayedColumns: string[] = [];
  data = [];

  ngOnInit(): void {
    this.getDataControls();
  }

  async getDataControls(){
    const response = await this.apiService.get(`${environment.apiBackend}/reporte/get-data-controls`);
    let data = response.data;
    if(response.success){
      for(let obj in data){
        if(data.hasOwnProperty(obj)){
          this.dataControls[obj] = data[obj];
        }        
      }
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
        fechaInicio: this.form.fechaInicio.value != null ? moment(this.form.fechaInicio.value).format("YYYY/MM/DD"):null,
        fechaFin: this.form.fechaFin.value != null ? moment(this.form.fechaFin.value).format("YYYY/MM/DD"):null,
        perfil:result.length>0?true:false,
        idUsuario:user.id,
        solicitadaTercero: this.form.solicitadaTercero.value,
        tipoTerceroId: this.form.tipoTercero.value,
        terceroNumeroContrato: this.form.terceroNumeroContrato.value,
        terceroAnioContrato: this.form.terceroAnio.value
      }

      this.dataExcel = [];

      const response = await this.apiService.post(`${environment.apiBackend}/reporte/reporte`, obj);
      if (response.success) {
        this.displayedColumns = [];
        this.dataHeader = response.data.tableHeader;
        this.data = response.data.dataList;
        if(this.data.length < 1){
          new SnackBarClass(this.snackBar, 'No se encontraron registros con los parámetros ingresados.', 'btn-warning').openSnackBar();  
        }else{
          this.dataExcel = this.data;
  
          for(let value of response.data.tableHeader){
            this.displayedColumns.push(value.nameColumn);
          }
        }

      } else {
        new SnackBarClass(this.snackBar, 'No se puede realizar esta acción.', 'btn-warning').openSnackBar();
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
    this.dataExcel = [];
    for(let obj in this.form){
      this.form[obj].value = null;
      this.form[obj].message = '';
    }
    this.validarSelectSolicitaTercero();
    this.validarTipoTercero();
  }

  validarSelectSolicitaTercero(){
    if(this.form.solicitadaTercero.value == "1"){
      this.form.tipoTercero.visible = true;
      this.form.tipoTercero.value = null;
      // this.form.tipoTercero.required = true
    }else{
      this.form.tipoTercero.value = null;
      this.form.tipoTercero.visible = false;
      // this.form.tipoTercero.required = false
    }
    this.form.terceroNumeroContrato.value = null;
    this.form.terceroNumeroContrato.visible = false;
    this.form.terceroAnio.value = null;
    this.form.terceroAnio.visible = false;
  }

  validarTipoTercero(){
    let visible = false;
    let data = this.dataControls.tipoTerceros.find(data => data.id == parseInt(this.form.tipoTercero.value));

    if(data != undefined){
      if(data.codigo == 'CTA' || data.codigo == 'PDI'){
        visible = true;
      }else{
        visible = false;
      }
    }

    if(visible){
      this.form.terceroNumeroContrato.visible = true
  
      this.form.terceroAnio.visible = true  
    }else{
      this.form.terceroNumeroContrato.value = null
      this.form.terceroNumeroContrato.visible = false
  
      this.form.terceroAnio.value = null
      this.form.terceroAnio.visible = false
    }
    
  }

}