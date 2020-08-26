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
  messageValidation = '';
  dataConsigna = {
    tipoZona: []
  };
  data = [];

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

  async consultar(){
    this.messageValidation = ''
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

    this.validateJefeZonaAsignado()
  }

  async validateJefeZonaAsignado(){
    //valida que solo sea un jefe de zona por zona
    let codeRolUsuario = '';
    for(let value of this.dataControls.tipoAsignacionUsuario){
      if(parseInt(value.id) == parseInt(this.form.tipoAsignacion.value)){
        codeRolUsuario = value.codigo;
      }
    }
    
    //se valida que el select seleccionado sea jefe de zona(JDZ)
    if(codeRolUsuario == 'JDZ'){
      this.messageValidation = '';
      var request = {
        estado: 1,
        tipoAsignacionCodigo: 'JDZ',
        diferenteUsuario: this.form.usuario.value
      };
      const response = await this.api.post(`${environment.apiBackend}/asignacion-usuario/get-list-jefe-zona`,request);
      if(response.success){
        for(let tipoZona of this.dataConsigna.tipoZona){
          if(tipoZona.estado){
            for(let dataValidacion of response.data){
              if(tipoZona.zona_id == dataValidacion.zona_id && dataValidacion.estado == '1'){
                this.messageValidation += 'No se puede activar para la <b>'+dataValidacion.zona_nombre+'</b> debido a que ya se encuentra activa para el usuario <b>'+dataValidacion.usuario_nombre_completo+'</b><br>';
                tipoZona.estado = false;
              }
            }
          }
        }
      }
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
