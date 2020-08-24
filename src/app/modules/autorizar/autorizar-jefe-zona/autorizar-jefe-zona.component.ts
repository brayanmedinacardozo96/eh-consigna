import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from './../../../shared/auth';
import { User } from './../../../shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { SnackBarClass } from '../../../ui/snack-bar/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from "@angular/material/dialog";
import { ValidationService } from './../../../shared/services/validations.service';
import {ModalConfirmComponent} from "../../../ui/forms/modal-confirm/modal-confirm.component";
import {Mensaje} from '../../../ui/forms/modal-confirm/mensaje';
import * as moment from 'moment';

@Component({
  selector: 'app-autorizar-jefe-zona',
  templateUrl: './autorizar-jefe-zona.component.html',
  styleUrls: ['./autorizar-jefe-zona.component.scss']
})
export class AutorizarJefeZonaComponent implements OnInit {

  user: User = Auth.getUserDataPerson();
  data = [];
  validationDate = null;
  message = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService, 
    private snackBar: MatSnackBar,
    private dialogo: MatDialog,
    private validations: ValidationService,
    ) { 
      this.activeRoute.params.subscribe(params => {

        if (params.id !== undefined && params.id !== null && params.id!="") {
          console.log(params.id);
          if(isNaN(parseInt(params.id))){
            this.buscarConsigna(  {numeroConsigna:{value: params.id}, codigoEstadoConsigna: { value: 'A'}} );
            this.form.numeroConsigna.value = params.id;
          }else{
            this.buscarConsigna(  {consignacion_id:{value: params.id}, codigoEstadoConsigna: { value: 'A'}} );
          }
        }
      });
    }
  
  dataControls = {
    aprobo:[
      {nombre: 'Si', id: 1},{nombre: 'No', id: 0}
    ]
  }

  form = {
    id:{
      value:null
    },
    numeroConsigna: {
      label: 'Consecutivo de la consigna.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
      fechaSolicitud:null,
    },
    usuario: {
      id:null,
      label: 'Autorizador',
      name: 'autorizador',
      value: null,
      messages: null,
      required: true,
      disable:true,
    },
    aprobo: {
      label: '¿Desea confirmar el conocimiento de la consigna relacionada?',
      name: 'aprobo',
      disabled: false,
      value: null,
      messages: null,
      required: true,
    }
  }

  ngOnInit(): void {
    this.form.usuario.id=this.user.id;
    this.form.usuario.value = `${this.user.first_name} ${this.user.second_name} ${this.user.first_lastname} ${this.user.second_lastname}`;
    // this.getlistParametros();
  }

  //obtiene los parametros para validar el tiempo limite de VoBo
  async getlistParametros(){
    let params = {
      tipoParametroCodigo:{value:'VDF'},
      parametroCodigo:{value:'AJZCE'}
    };
    const response = await this.api.post(`${environment.apiBackend}/parametro/get-list-parametros`, params);
    if(response.success){
      for(let value of response.data){
        console.log(value);
        if(value.estado == '1'){
          this.validationDate = parseInt(value.valor);
        }
      }
    }
  }

  async buscarConsigna(params){
    var estado = true;
    let fechaSolicitud = null;
    let fechaActual = moment();
    let difHoras = 0;
    this.message = '';
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, params);

    if(response.success && response.data.length > 0){
      this.data = response.data;
      this.form.numeroConsigna.value = this.data[0].codigo;

      if(this.data[0].tipo_solicitud_codigo != 'E' ){
        estado = false;
        this.message = 'No se encontraron registros.';
      }
      if(this.data[0].jefe_zona_aprobo != null){
        estado = false;
        this.message = 'La consignación fue aprobada por el jefe de zona.';
      }
      
      if(parseInt(this.data[0].jefe_zona_id) != parseInt(this.user.id)){
        estado = false;
        this.message = 'Solamente el jefe de zona asignado puede aprobar la consigna';
      }

      /* if(this.validationDate != null){
        fechaSolicitud = moment(this.data[0].fecha_solicitud);
        difHoras = (fechaSolicitud.diff(fechaActual, 'minutes')) / 60;  
        if(estado && this.validationDate > difHoras){
          estado = false;
          this.message = 'No se puede guardar la información debido a que el límite de tiempo para realizarlo era de '+this.validationDate+' Horas ';
          this.message += 'con referencia a la fecha de solicitud('+fechaSolicitud.format('YYYY/MM/DD')+') de la consigna '+this.form.numeroConsigna.value;
        }
      } */

      if(estado){
        this.form.id.value = this.data[0].consignacion_id;
      }else{
        this.data = [];
        new SnackBarClass(this.snackBar, this.message, 'btn-warning', 5000).openSnackBar();
      }
    }

    if(response.data.length < 1){
      new SnackBarClass(this.snackBar,'No se encontraron registros.', 'btn-warning', 5000).openSnackBar();
    }

  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async buscar()
  {    
    if (this.form.numeroConsigna.value  !== undefined && this.form.numeroConsigna.value  !== null && this.form.numeroConsigna.value !="") {
      this.buscarConsigna(  { numeroConsigna:{value: this.form.numeroConsigna.value }, codigoEstadoConsigna: { value: 'A'}} );
    }
  }

  guardar(){
    if (this.validations.validateEmptyFields(this.form).success) {    
      var validar = this.form.aprobo.value == 0 ? 'NO' : '';   
      this.dialogo
        .open(ModalConfirmComponent, {
          data: new Mensaje("Consigna #"+ this.form.numeroConsigna.value,"¿Desea "+validar+" dar el visto bueno?")
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.realizarCambio();
          }
        });
    }else{
      new SnackBarClass(this.snackBar,'Faltan campos a diligenciar.', 'btn-warning', 2000).openSnackBar();
    }
  }

  async realizarCambio(){
    var mensaje=["Algo ha ocurrido", "btn-danger"];
    
    const response = await this.api.post(`${environment.apiBackend}/consigna/update-autoriza-jefe-zona`, this.form);
    if(response.success)
    {
      mensaje = ["Se realizo el cambio de estado(jefe de zona) de forma exitosa.", "btn-success"];
      this.limpiar();
    }

    new SnackBarClass(this.snackBar, mensaje[0], mensaje[1], 5000).openSnackBar();
  }

  limpiar()
  {
    this.data = [];
    this.form.numeroConsigna.value=null;
  }

}
