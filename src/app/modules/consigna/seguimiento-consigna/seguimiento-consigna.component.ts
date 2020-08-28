import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { ApiService } from '../../../shared/services/api.service';
import {SnackBarClass} from '../../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SessionService } from '../../../shared/services/session.service';
import * as moment from 'moment';

@Component({
  selector: 'app-seguimiento-consigna',
  templateUrl: './seguimiento-consigna.component.html',
  styleUrls: ['./seguimiento-consigna.component.scss']
})
export class SeguimientoConsignaComponent implements OnInit {
  
  urlAutoComletar=`${environment.apiBackend}/consigna/getAutoCompletarConsigna/null/null`;
  

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private session: SessionService,
    ) { }

  form = {
    numeroConsigna: {
      label: 'Número de consigna.',
      name: 'numeroConsigna',
      value: "",
      messages: null,
      required: true,
      url: this.urlAutoComletar
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
    },estadoConsigna: {
      label: 'Estado consigna',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: true,
      valor:null
    },

  }

  dataSeguimiento=[
    // {created_at:"", usuario:"", observacion:""}
  ]
  
  dataHeader=[
    {name:'Consigna', nameColumn:'codigo'},
    {name:'Fecha solicitud', nameColumn:'fecha_solicitud'},
    {name:'Fecha modificación', nameColumn:'created_at'},
    {name:'Usuario', nameColumn:'usuario'},
    {name:'Observacion', nameColumn:'observacion'}
  ]

  dataControls={
    estadoConsigna:[]
  }

  fechaInicio=null;

  panelOpenState = false;

  ngOnInit(): void {
    this.getDataSelectConsigna();
  }

  setData(name, event) {

    
      this.form[name].value = event;
    
    if (this.form[name].name == "fechaInicio") {
      this.form.fechaFin.value = event;
      this.fechaInicio=event;
    }

    if (this.form[name].name == "fechaFin") {
      if (this.form.fechaInicio.value == null) {
        this.form.fechaInicio.value = event;
      }
      if (moment(this.form.fechaFin.value) < moment(this.form.fechaInicio.value)) {
        this.form.fechaFin.messages = "Fecha no puede ser menor a la inicial";
      } else {
        this.form.fechaFin.messages = "";
      }
    }

  }

  async buscar()
  {
   
    this.form.numeroConsigna.value=this.form.numeroConsigna.value==null?"":this.form.numeroConsigna.value;
    
    if(this.form.numeroConsigna.value.trim()!="")
    {
      this.dataSeguimiento=[];
      this.form.fechaInicio.value=null;
      this.form.fechaFin.value=null;
      this.form.estadoConsigna.value=null;

      this.buscarConsigna(   this.form.numeroConsigna.value  );
    }else{
      new SnackBarClass(this.snackBar, 'Debe ingresar un número de consigna.',"btn-warning").openSnackBar();
    }
    
  }

  async buscarConsigna(params){

    var response = await this.api.get(`${environment.apiBackend}/consigna/getSeguimiento/${params}`);
    if(response.success){

      this.dataSeguimiento = response.data;
      if(response.data.length ==0){
        new SnackBarClass(this.snackBar, 'No se encontraron registros con los parámetros consultados.',"btn-warning").openSnackBar();
      }
     
    }

  }

  async Consultar() {

    if (this.panelOpenState) {

      if (this.form.estadoConsigna.value == null && this.form.fechaInicio.value == null) {
        new SnackBarClass(this.snackBar, 'Seleccione un filtro.', "btn-warning").openSnackBar();
        return;
      }

      if (moment(this.form.fechaFin.value) < moment(this.form.fechaInicio.value)) {
        this.form.fechaFin.messages = "Fecha no puede ser menor a la inicial";
      } else {

        this.form.numeroConsigna.value = null;
        this.form.fechaFin.messages = "";
        var fechaIni = this.form.fechaInicio.value == null ? null : moment(this.form.fechaInicio.value).format("YYYY-MM-DD");
        var fechaFinal = this.form.fechaFin.value == null ? null : moment(this.form.fechaFin.value).format("YYYY-MM-DD");

        var parametro = '{ "estado" : "' + this.form.estadoConsigna.value + '"';
        parametro += ' ,"fechaInicioSolcitud" : "' + fechaIni + '"';
        parametro += ' ,"fechaFinSolcitud" : "' + fechaFinal + '"}';
        this.buscarConsigna(parametro);

      }

    } else {
      this.buscar();
    }
  }

  setSelect()
  {
    this.dataControls.estadoConsigna = this.session.getItem('estadoConsigna');
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

  limpiar()
  {
    this.form.fechaInicio.value=null;
    this.form.fechaFin.value=null;
    this.form.numeroConsigna.value=null;
    this.form.estadoConsigna.value=null;
    this.dataSeguimiento=[];
    this.form.fechaFin.messages="";
    this.panelOpenState=false;
    
  }

}
