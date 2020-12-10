import { Component, OnInit } from '@angular/core';
import { SessionService } from './../../shared/services/session.service';
import {ApiService} from '../../shared/services/api.service';
import {environment} from 'src/environments/environment';
import {SnackBarClass} from '../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-indicador-zona',
  templateUrl: './indicador-zona.component.html',
  styleUrls: ['./indicador-zona.component.scss']
})
export class IndicadorZonaComponent implements OnInit {

  constructor(
    private session: SessionService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
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
      disable:true,
      maxLength: 20,
    },
    febrero: {
      label: 'Asignado',
      name: 'febrero',
      value: null,
      messages: null,
      required: false,
      maxLength: 20,
    },
    febreroTrabajado: {
      label: 'Trabajado',
      name: 'febreroTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    }, marzo: {
      label: 'Asignado',
      name: 'marzo',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    }, marzoTrabajado: {
      label: 'Trabajado',
      name: 'marzoTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },abril: {
      label: 'Asignado',
      name: 'abril',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    }, abrilTrabajado: {
      label: 'Trabajado',
      name: 'abrilTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },mayo: {
      label: 'Asignado',
      name: 'mayo',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    }, mayoTrabajado: {
      label: 'Trabajado',
      name: 'mayoTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },junio: {
      label: 'Asignado',
      name: 'junio',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    junioTrabajado: {
      label: 'Trabajado',
      name: 'junioTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },julio: {
      label: 'Asignado',
      name: 'julio',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    julioTrabajado: {
      label: 'Trabajado',
      name: 'julioTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },agosto: {
      label: 'Asignado',
      name: 'agosto',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    agostoTrabajado: {
      label: 'Trabajado',
      name: 'agostoTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },
    septiembre: {
      label: 'Asignado',
      name: 'septiembre',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    septiembreTrabajado: {
      label: 'Trabajado',
      name: 'septiembreTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },
    octubre: {
      label: 'Asignado',
      name: 'octubre',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    octubreTrabajado: {
      label: 'Trabajado',
      name: 'octubreTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },
    noviembre: {
      label: 'Asignado',
      name: 'noviembre',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    noviembreTrabajado: {
      label: 'Trabajado',
      name: 'noviembreTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },
    diciembre: {
      label: 'Asignado',
      name: 'diciembre',
      value: null,
      messages: null,
      required: false,
      maxLength: 20
    },
    diciembreTrabajado: {
      label: 'Trabajado',
      name: 'diciembreTrabajado',
      value: null,
      messages: null,
      required: false,
      disable:true,
      maxLength: 20,
    },
  }

  dataControls = {
    tipoZona:[],
    anio:[]
  };

  mesKey=[['enero',1],['febrero',2],['marzo',3],['abril',4],['mayo',5],['junio',6],['julio',7],['agosto',8],['septiembre',9],['octubre',10],['noviembre',11],['diciembre',12]]
   tipoZona=null;
   anio=null;

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

  async cargarTabla(name, event) 
  {
    
    if(name=="tipoZona")
    {
      this.tipoZona=event;
    }
    if(name=="anio")
    {
      this.anio=event;
    }
    
    if(this.tipoZona!=null && this.anio!=null)
    {
      const response = await this.apiService.get(`${environment.apiBackend}/indicador-zona/getIndicadorZonaAnio/${this.anio}/${this.tipoZona}`);
      if (response.message == null && response.data!=null) {
        
        response.data.forEach(element => {

          var mes=this.mesKey[element.mes-1];
          var key=mes[0]
          var keyTrabajado=`${key}Trabajado`.trim()

          this.form[key].value=element.asignado
          this.form[keyTrabajado].value=element.trabajado

        }); 
      
    }

  }
}

  async guardar() 
  {
    
  
    var obj=[];

     this.mesKey.forEach(element=>{

    obj.push(
        {
          id:null,
          zona: this.form.tipoZona.value,
          anio: this.form.anio.value,
          mes: element[1],
          asignado: this.form[element[0]].value == null ? 0  : this.form[element[0]].value 
        }
      )
     })

      var response;
      var mensaje = [];

        response = await this.apiService.post(`${environment.apiBackend}/indicador-zona/postIndicadorZona`,{data:obj});
        mensaje = ["Guardado con éxito", "btn-primary"];

        if(response.message!=null)
        {
          mensaje = ["Problemas con la ejecución", "btn-primary"];
          console.log(response.message)
        }
        
        new SnackBarClass(this.snackBar, mensaje[0], mensaje[1]).openSnackBar();
      } 

      

  }




