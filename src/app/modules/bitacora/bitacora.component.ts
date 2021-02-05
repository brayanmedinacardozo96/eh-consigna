import {
  Component,
  OnInit
} from '@angular/core';
import {
  Helpers
} from "../../shared/helpers";
import {
  ApiService
} from "../../shared/services/api.service";
import {
  NotifierService
} from "angular-notifier";
import {
  ValidationService
} from "../../shared/services/validations.service";
import {
  environment
} from "../../../environments/environment";
import * as moment from 'moment';
import {
  element
} from 'protractor';
import { SessionService } from '../../shared/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {

  helpers = new Helpers();
  data = [];
  dataHeader = [{
      name: 'Consigna',
      nameColumn: 'codigo'
    },
    {
      name: 'Circuito',
      nameColumn: 'circuito'
    },
    {
      name: 'F.Ejecu',
      nameColumn: 'fecha_solicitud'
    },
    {
      name: 'H.Inicio',
      nameColumn: 'hora_inicio'
    },
    {
      name: 'H.Entrega',
      nameColumn: 'hora_entrega'
    },
    {
      name: 'H.Devolución',
      nameColumn: 'hora_devolucion'
    },
    {
      name: 'H.Maniobra',
      nameColumn: 'hora_maniobra'
    },
    {
      name: 'H.Finaliza',
      nameColumn: 'hora_fin'
    }
  ];
  dataExcel = [];
  form = {
    numeroConsigna: {
      label: 'Consigna No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
    },
    fechaInicio: {
      label: 'Fecha ejecución',
      name: 'fechaInicio',
      value: null,
      messages: null,
      required: true,
    },
    fechaFin: {
      label: 'Fecha fin creación',
      name: 'fechaFin',
      value: null,
      messages: null,
      required: true,
    },
    estadoConsigna: {
      label: 'Estado consigna',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: true,
      valor: null,
      disabled: false,
    },
  };

  fecha = [];
  panelOpenState = false;
  panelOpenStateFiltro = false;
  panelOpenStateResumen=false;
  public color: string = '#2889e9';
  colorid = "";
  colorNuevo="";
  colors = {
    riesgo: "#fcf8f8",
    maniobras: "#fcf8f8",
    pendiente: "#fcf8f8",
    inicializada: "#fcf8f8",
    finalizada: "#fcf8f8",
    cierre30: "#fcf8f8",
    cierre15: "#fcf8f8",
    vencida: "#fcf8f8",
  }

  dataControls = {
    estadoConsigna: [],
  }

  dataResumen={
    norte:0,
    sur:0,
    occidente:0,
    centro:0,
    nacional:0
  }

  constructor(private api: ApiService,
    private notifier: NotifierService,
    private session: SessionService,
    private validations: ValidationService, ) {}

  ngOnInit(): void {
    this.searchLoad();
    this.getParametroColor();
    this.setDelay();

    this.dataControls.estadoConsigna=[{id:"A",nombre:"Aprobada"},{id:"T",nombre:"Todas"}]

    this.form.estadoConsigna.value="A"

  }

  setDelay() {
    
    setTimeout(()=>{
      var item=window.location.href.split('/'); 
      if(this.form.fechaInicio.value==null)
      {
        this.searchLoad();
      }
      if(item[item.length-1]=="bitacora")
      {
        this.setDelay();
      }
      
    }, 60000);
  }

  getParams() {

    let fechaInicio = null;
    if (this.form.fechaInicio.value) {
      fechaInicio = this.helpers.formatDate(this.form.fechaInicio.value);
    }

    let fechaFin = null;
    if (this.form.fechaFin.value) {
      fechaFin = this.helpers.formatDate(this.form.fechaFin.value);
    }
   
    if(fechaInicio==null)
    {
      var f = moment();
      this.fecha[0] = f.format('YYYY-MM-DD');
      this.fecha[1] = f.format('YYYY-MM-DD');
      fechaInicio=this.fecha[0];
    }

    const params = {
      codigo: this.form.numeroConsigna.value,
      fechaIni: fechaInicio,
      fechaFin: fechaFin,
      estadoConsigna:this.form.estadoConsigna.value
    };

    this.fecha[0] = fechaInicio;
    this.fecha[1] = fechaFin;

    return JSON.stringify(params);
  }

  async search() {

    const responseValidate = this.validations.validateACompleteField(this.form);
    if (!responseValidate.success) {
      return false;
    }

    const params = this.getParams();
    //const response = await this.api.get(`${environment.apiBackend}/bitacora/get-all?params=${params}`);
    const response = await this.api.get(`${environment.apiBackend}/bitacora/getListEjecucion/${params}`);

    this.data = response.data;
    this.setDataExcel();
    this.resumen();
    if (this.data.length === 0) {
      this.notifier.notify('info', 'No se encontraron registros...');
    }

  }

  async searchLoad() {

    var f = moment();
    this.fecha[0] = f.format('YYYY-MM-DD');
    this.fecha[1] = f.format('YYYY-MM-DD');

    const params = {
      codigo: this.form.numeroConsigna.value,
      fechaIni: this.fecha[0],
      fechaFin: this.fecha[1],
      estadoConsigna:this.form.estadoConsigna.value
    };

    const response = await this.api.getnoLoad(`${environment.apiBackend}/bitacora/getListEjecucion/${JSON.stringify(params)}`);

    this.data = response.data;
    this.setDataExcel();
    this.resumen();
    if (this.data.length === 0) {
     // this.notifier.notify('info', 'No se encontraron registros...');
    }

  }

  resumen()
  {
    this.dataResumen.norte=this.filtroZona("Zona Norte");
    this.dataResumen.centro=this.filtroZona("Zona Centro");
    this.dataResumen.occidente=this.filtroZona("Zona Occidente");
    this.dataResumen.sur=this.filtroZona("Zona Sur");
    this.dataResumen.nacional=this.data.filter(b => {
      return (b.tipocodigo == "A")
    }).length;
          
  }

  filtroZona(zona){
   var result= this.data.filter(b => {
      return (b.zona == zona)
    });
    return result.length
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  cleanFields() {
    this.validations.cleanFields(this.form);
    this.data = [];
    this.setDataExcel();
    this.searchLoad();
  }

  setDataExcel() {
    this.dataExcel = [];
    for (let value of this.data) {
      this.dataExcel.push({
        codigo: value.codigo,
        completado: value.completado === '1' ? 'SI' : 'NO',
        nombre: value.causal_incumplimiento != null ? value.causal_incumplimiento.nombre : '',
        obser_causal_incum: value.completado === '0' ? value.obser_causal_incum : '',
        cerrado: value.cerrado === '1' ? 'SI' : 'NO',
        fecha_cierre: value.fecha_cierre,
        created_at: value.created_at
      })
    }
  }

  onColor(elemento,parametro) {

    var t = document.querySelector('div[class="color-picker open"]');
    document.querySelector('div[class="color-picker open"]');
    var css = "position:fixed;top:20%;left: 40%;";
    t.setAttribute("style", `${t.getAttribute("style")};${css}`)
    this.colorid = parametro;

  }

  onChangeColor(a) {

  }

  async onOkColor(a) 
  {
    var obj = {
      codigo: this.colorid,
      valor: a
    }

    var response = await this.api.post(`${environment.apiBackend}/parametro/updateValor`, obj);
    await this.getParametroColor();
    await this.searchLoad();
    
  }

  async getParametroColor() {
    const response = await this.api.get(`${environment.apiBackend}/parametro/getParametroCodigoTipo/colEj`);

    var color = response.data;

    if (color.length === 0) {
      this.notifier.notify('info', 'No se encontraron registros...');
    } else {
      color.forEach(element => {
        switch (element.codigo) {
          case "ClCierre15":
            this.colors.cierre15 = element.valor;
            break;
          case "ClCierre30":
            this.colors.cierre30 = element.valor;
            break;
          case "CrRies":
            this.colors.riesgo = element.valor;
            break;
          case "CLFinaliz":
            this.colors.finalizada = element.valor;
            break;
          case "CLInicia":
            this.colors.inicializada = element.valor;
            break;
          case "ClManio":
            this.colors.maniobras = element.valor;
            break;
          case "ClPendient":
            this.colors.pendiente = element.valor;
            break;
          case "ClVencida":
            this.colors.vencida = element.valor;
            break;
          default:
            break;
        }
      });
       this.session.setItem("colorEjecucion",JSON.stringify(this.colors));
    }
  }

  setDataEstado(name, event) {

    this.form[name].value = event;

  }
 

}
