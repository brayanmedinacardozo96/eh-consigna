import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ValidationService } from './../../shared/services/validations.service';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { SessionService } from './../../shared/services/session.service';
import { environment } from 'src/environments/environment';

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
  }
  constructor(private api: ApiService,
            private validations: ValidationService,
            private snackBar: SnackBarService,
            private session: SessionService) { }

  ngOnInit(): void {
    this.getDataSelectConsigna();
  }

  //Llena los selects del formulario
  async getDataSelectConsigna(){
    if(this.session.getItem('tipoZona') == null || this.session.getItem('tipoAsignacionUsuario') == null){
      const response = await this.session.getDataSelectConsigna();
      if(response.success){
        if(this.session.getItem('usuario') == null){
          this.setSelect();
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
    const response = await this.api.post(`${environment.apiBackend}/asignacion-usuario/get-list-usuarios-asignados`, this.form);
    if(response.success){
      this.data = response.data;
    }else{
      this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo', 5000);
    }
  }

  editarAsignacion(id){
    console.log(id);
  }

}
