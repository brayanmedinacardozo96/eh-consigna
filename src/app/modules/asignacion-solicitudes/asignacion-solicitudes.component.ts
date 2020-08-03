import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ValidationService } from './../../shared/services/validations.service';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { SessionService } from './../../shared/services/session.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignacion-solicitudes',
  templateUrl: './asignacion-solicitudes.component.html',
  styleUrls: ['./asignacion-solicitudes.component.scss']
})
export class AsignacionSolicitudesComponent implements OnInit {

  data = [];

  dataControls = {
    tipoZona:[],
    usuario: [],
    tipoAsignacionUsuario: [],
    estado: [{nombre: 'Activo', id: 1},{nombre:'Inactivo', id:0}],
  };
  form = {
    usuario: {
      label: 'Usuario',
      name: 'usuario',
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
    tipoAsignacion: {
      label: 'Rol Usuario',
      name: 'tipoAsignacion',
      value: null,
      messages: null,
      required: false,
    },
    estado: {
      label: 'Estado',
      name: 'estado',
      value: null,
      messages: null,
      required: false,
    },
  }
  constructor(private api: ApiService,
            private validations: ValidationService,
            private snackBar: SnackBarService,
            private session: SessionService,
            private router: Router) { }

  ngOnInit(): void {
    this.getDataSelectConsigna();
  }

  //Llena los selects del formulario
  async getDataSelectConsigna(){
    if(this.session.getItem('tipoZona') == null || this.session.getItem('tipoAsignacionUsuario') == null){
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
    const response = await this.api.get(`${environment.apiBackend}/usuario-aplicacion/update-info/${environment.keyTransverseSecurity}`);
    var usuario = [];
    let success = response.success;
    if(success){
      this.session.setItem('usuario',response.data.personSeguridadTransversal);
      this.setSelect();
    }
  }

  setSelect(){
    this.dataControls.tipoZona = this.session.getItem('tipoZona');
    this.dataControls.tipoAsignacionUsuario = this.session.getItem('tipoAsignacionUsuario');
    this.dataControls.usuario = this.session.getPersona();
  }

  async search(){
    const responseValidate = this.validations.validateACompleteField(this.form);
    if(responseValidate.success){
      this.data = [];
      const response = await this.api.post(`${environment.apiBackend}/asignacion-usuario/get-list-usuarios-asignados`, this.form);
      if(response.success){
        this.data = response.data;
        if(this.data.length < 1){
          this.snackBar.alert('No se encontraron registros con los parámetros consultados.', 5000);
        }
      }else{
        this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo', 5000);
      }
    }
  }

  cleanFields(){
    this.validations.cleanFields(this.form);
    this.data = [];
  }

  editarAsignacion(id){
    var dataConsigna = this.data.filter(b => {
      return (b.id == id)
    });
    this.router.navigateByUrl('asignacion-solicitudes/editar/'+dataConsigna[0].usuario_id+'/'+dataConsigna[0].tipo_asignacion_id);
  }

}
