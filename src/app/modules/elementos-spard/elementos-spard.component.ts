import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-elementos-spard',
  templateUrl: './elementos-spard.component.html',
  styleUrls: ['./elementos-spard.component.scss']
})
export class ElementosSpardComponent implements OnInit {

  data="";
  dataControls = {
    tipoZona: [],
    tipoElementos: [],
    subestacion: [],
    redElectrica: [],
    redElectricaElementos: [], //para el formulario de elementos (se ignora Linea)
    estado: [],
    contieneSubestacion: [],
  }

  temporales = {
    tipoZona: [],
    tipoElementos: [],
    subestacion: [],
    redElectrica: [],
    redElectricaElementos: [], //para el formulario de elementos (se ignora Linea)
    estado: [],
    contieneSubestacion: [],
  }

  constructor(
    private api: ApiService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.getDataControls();
  }

  estado(event)
  {
    this.data=event.tab.textLabel;
  }

  async getDataControls(){
    const response = await this.api.get(`${environment.apiBackend}/elemento/get-data-controls`);
    if(response.success){
      let data = response.data;
      for(let obj in data){
        if(data.hasOwnProperty(obj)){
          this.dataControls[obj] = data[obj];
          
          if(this.temporales[obj] != undefined){//se asigna a las temporales
            this.temporales[obj] = data[obj];
          }
        }
      }
      
      let redElectrica = this.dataControls.redElectrica;
      this.dataControls.redElectricaElementos = redElectrica.filter(data => data.value != 1);
      this.temporales.redElectricaElementos = this.dataControls.redElectricaElementos;
    }else{
      this.notifier.notify('warning',response.message);
    }
  }

  setDataTable(data){
    if(data.success){
      this.getDataControls();
    }
  }

}
