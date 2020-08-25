import { Component, OnInit } from '@angular/core';
import { User } from './../../../shared/models/user';
import { Auth } from './../../../shared/auth';
import { ApiService } from './../../../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { SessionService } from './../../../shared/services/session.service';
import { ValidationService } from './../../../shared/services/validations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarClass } from './../../../ui/snack-bar/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-asignacion-solicitudes-new',
  templateUrl: './asignacion-solicitudes-new.component.html',
  styleUrls: ['./asignacion-solicitudes-new.component.scss']
})
export class AsignacionSolicitudesNewComponent implements OnInit {
  
  selectAllElementos = false;
  dataConsigna = {
    tipoZona: []
  };
  data = [];
  formCompletado = {
    completado: {
      label: '¿La consigna se cumplió por completo?',
      name: 'completado',
      value: null,
      messages: null,
      required: false,
    },
    causalIncumplimiento: {
      label: 'Seleccione la razón del incumplimiento',
      name: 'causalIncumplimiento',
      value: null,
      messages: null,
      required: false,
    },
    observacionCausalIncumplimiento: {
      label: 'Observación',
      name: 'observacionCausalIncumplimiento',
      value: null,
      messages: null,
      required: false,
    },
  };

  dataControls = {
    usuario: [],
    tipoAsignacionUsuario: [],
  };
  form = {
    id:{
      value: null
    },
    usuario: {
      label: 'Usuario',
      name: 'usuario',
      value: null,
      messages: null,
      required: true,
    },
    tipoAsignacion: {
      label: 'Rol Usuario',
      name: 'tipoAsignacion',
      value: null,
      messages: null,
      required: true,
    },
  }

  boton = {
    value: "Guardar",
    color: "btn-primary"
  }

  user: User = Auth.getUserDataPerson();

  constructor(private api: ApiService,
              private session: SessionService,
              private validations: ValidationService,
              private snackBar: MatSnackBar,
              private activeRoute: ActivatedRoute
            ) { 
              this.activeRoute.params.subscribe(params => {
                if (params.iduser !== undefined && params.iduser !== null && params.rol !== undefined && params.rol !== null) {
                    this.form.usuario.value = parseInt(params.iduser);
                    this.form.tipoAsignacion.value = parseInt(params.rol);
                    this.getUsuariosAsignados();

                }
              });
            }

  ngOnInit(): void {
    this.getDataSelectConsigna();
  }

  async select(){
    if(this.validations.validateEmptyFields(this.form).success){
      this.getUsuariosAsignados();      
    }
  }

  async getUsuariosAsignados(){
    var dataResponse = null;
    const response = await this.api.post(`${environment.apiBackend}/asignacion-usuario/get-usuarios-asignados`,this.form);
      if(response.success){
        dataResponse =  response.data;
        for(let i in dataResponse){
          dataResponse[i].estado = dataResponse[i].estado == 1 ? true : false 
        }
        this.dataConsigna.tipoZona = dataResponse;
      }
  }

  setCumplioCompleto() {

    const totalElementos = this.dataConsigna.tipoZona.length;
    let elementosSeleccionados = 0;
    for (let obj of this.dataConsigna.tipoZona) {
      if (obj.estado) {
        elementosSeleccionados++;
      }
    }

    if (totalElementos == elementosSeleccionados) {
      this.formCompletado.completado.value = 1;
    } else {
      this.formCompletado.completado.value = 0;
    }

  }

  checkAll() {
    for (let obj of this.dataConsigna.tipoZona) {
      obj.estado = this.selectAllElementos;
    }
    this.setCumplioCompleto();
  }

  async getDataSelectConsigna(){
    if(this.session.getItem('tipoAsignacionUsuario') == null){
      const response = await this.session.getDataSelectConsigna();
      if(response.success){
        if(this.session.getItem('usuario') == null){
          this.updateUsuariosAplicacion();
        }else{
          this.setSelect();
        }
      }
    }else{
      this.setSelect();
    }
  }

  async updateUsuariosAplicacion(){
    const response = await this.api.get(`${environment.apiBackend}/usuario-aplicacion/update-info?key=${environment.keyTransverseSecurity}`);
    var usuario = [];
    let success = response.success;
    if(success){
      this.session.setItem('usuario',response.data.personSeguridadTransversal);
      this.setSelect();
    }
  }

  setTipoZona(){
    this.dataConsigna.tipoZona = [];
  }

  setSelect(){
    this.dataControls.tipoAsignacionUsuario = this.session.getItem('tipoAsignacionUsuario');
    this.dataControls.usuario = this.session.getPersona();
  }

  async guardar(){
    const response = await this.api.post(`${environment.apiBackend}/asignacion-usuario/save`, this.dataConsigna.tipoZona);
    if(response.success){
      new SnackBarClass(this.snackBar, response.message,  "btn-success", 2500).openSnackBar();
    }else{
      new SnackBarClass(this.snackBar, 'Ocurrió un error, por favor vuelva a intentarlo', "btn-warning", 2500).openSnackBar();
    }
  }



}
