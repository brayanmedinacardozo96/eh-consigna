import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../shared/services/session.service';
import { ApiService } from '../../shared/services/api.service';
import {environment} from '../../../environments/environment';
import {ValidationService} from '../../shared/services/validations.service';
import { Auth } from '../../shared/auth';
import { User } from '../../shared/models/user';
import {SnackBarClass} from '../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Mensaje} from '../../ui/forms/modal-confirm/mensaje';
import {ModalConfirmComponent} from "../../ui/forms/modal-confirm/modal-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.scss']
})
export class AutorizarComponent implements OnInit {

  user: User = Auth.getUserDataPerson();

  constructor(private activeRoute: ActivatedRoute,
    private session: SessionService,
    private api: ApiService,
    private validations: ValidationService,
    private snackBar: MatSnackBar,
    private dialogo: MatDialog
    ) {
    this.activeRoute.params.subscribe(params => {

      if (params.id !== undefined && params.id !== null) {

         this.buscarConsigna(  { consignacion_id:{value: params.id}} );

      }

    });
   }

  urlAutoComletar=`${environment.apiBackend}/consigna/getAutoCompletarConsigna/S/null`;

  form = {
    id:{
      value:null
    },
    estado_actual:{
      value:null
    },
    numeroConsigna: {
      label: 'Consigna en estado de solicitud.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
      url: this.urlAutoComletar
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
    observacion: {
      label: 'Observación',
      name: 'observacion',
      value: null,
      messages: null,
      required: true,
      disable:true,
    },
    estadoConsigna: {
      label: 'Estado consigna',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: true,
    }
  }

  dataControls={
    estadoConsigna:[]
  }

  dataElementoCalidad=[
    {elemento:"xxx", sDesconexion:"100", desMax:"10", feMax:"10", deHora:"10",feHora:"10"}
  ]
  viewList = false;
  data = [];

  ngOnInit(): void {

    this.form.usuario.id=this.user.id;
    this.form.usuario.value = `${this.user.first_name} ${this.user.second_name} ${this.user.first_lastname} ${this.user.second_lastname}`;
    this.getDataSelectConsigna();

  }

  limpiar()
  {
    this.data=null;
    this.form.numeroConsigna.value=null;
    this.form.observacion.value=null;
    this.form.estadoConsigna.value=null;

  }

  setData(name, event) {
    this.form[name].value = event;
  }

  setSelect()
  {

    var result=this.session.getItem('estadoConsigna').filter(b=>{
      return (b.nombre!="Ejecutada" && b.nombre!="Solicitada" )
    });

    this.dataControls.estadoConsigna = result;
  }

  async getDataSelectConsigna(){
    if(this.session.getItem('estadoConsigna') == null){
      const response = await this.session.getDataSelectConsigna();
      if(response.success){
        this.setSelect();
      }
    }else{
      this.setSelect();
    }
  }

  async buscarConsigna(params){

    const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, params);
    if(response.success){

      this.viewList = true;
      this.data = response.data;
      this.form.numeroConsigna.value=this.data[0].codigo;
      this.form.id.value=this.data[0].consignacion_id;
      this.form.estado_actual.value= this.data[0].estado_id;

      if(this.data.length < 1){
       // this.snackBar.alert('No se encontraron registros con los parámetros consultados.',5000);
      }

    }

  }

   guardar()
  {

    if (this.validateEmptyFields()) {

      var textEstado = ((document.getElementById("ddlEstadoConsigna")) as HTMLSelectElement).textContent;

      this.dialogo
        .open(ModalConfirmComponent, {
          data: new Mensaje("Consigna #"+ this.form.numeroConsigna.value,"Cambiar a: "+ textEstado )
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.realizarCambio();
          }
        });

    }

  }

  validateEmptyFields() {

    let success = true;

    if (!this.validations.validateEmptyFields(this.form).success) {
      success = false;
    }

    return success;
  }

  async realizarCambio(){

    var mensaje=["Algo ha ocurrido", "btn-danger"];

    let params = {
      estado_consignacion_id:this.form.estadoConsigna.value,
      id:this.form.id.value,
      usuario_id:this.form.usuario.id,
      observacion:this.form.observacion.value,
      estado_actual:this.form.estado_actual.value
    }
    const response = await this.api.post(`${environment.apiBackend}/consigna/putActualizarEstado`, params);
    if(response.message==null)
    {
      mensaje = ["Se realizo el cambio de estado de forma exitosa.", "btn-success"];
      this.limpiar();
    }

    new SnackBarClass(this.snackBar, mensaje[0], mensaje[1]).openSnackBar();
  }

  async buscar()
  {
    this.buscarConsigna(  { numeroConsigna:{value: this.form.numeroConsigna.value }} );

  }

}
