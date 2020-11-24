import { Component, OnInit } from '@angular/core';
import { SessionService } from './../../shared/services/session.service';

@Component({
  selector: 'app-indicador-zona',
  templateUrl: './indicador-zona.component.html',
  styleUrls: ['./indicador-zona.component.scss']
})
export class IndicadorZonaComponent implements OnInit {

  constructor(
    private session: SessionService,
  ) { }

  form = {
    tipoZona: {
      label: 'Tipo zona',
      name: 'tipoZona',
      value: null,
      messages: null,
      required: false
    },
    anio: {
      label: 'Año',
      name: 'anio',
      value: null,
      messages: null,
      required: false
    },
    enero: {
      label: 'Asignado',
      name: 'enero',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    eneroTrabajado: {
      label: 'Trabajado',
      name: 'eneroTrabajado',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
  }

  dataControls = {
    tipoZona:[],
    anio:[]
  };

  anioInicio=2020;

  ngOnInit(): void {
    this.getDataSelectConsigna();
  }

  //Llena los selects del formulario
  async getDataSelectConsigna(){
    if(this.session.getItem('tipoZona') == null){
      const response = await this.session.getDataSelectConsigna();
      if(response.success){
        this.setSelect();
      }
    }else{
      this.setSelect();
    }
  }

  setSelect(){
    this.dataControls.tipoZona = this.session.getItem('tipoZona');
    this.cargarAnio();
  }


  cargarAnio()
  {
       
       var anio=new Date().getFullYear()+1

        for (let index = 0;  this.anioInicio<=anio ; index++) {
          
          var obj={"id":0,"nombre":0,"codigo":0}

          obj.codigo=this.anioInicio;
          obj.id=this.anioInicio;
          obj.nombre=this.anioInicio;

          this.dataControls.anio.push(obj);

          this.anioInicio++;
          
          
        }
  }

  setData(name, event) {
    this.form[name].value = event;
  }

}
