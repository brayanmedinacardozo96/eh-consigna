import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsignaNewComponent } from './../consigna-new/consigna-new.component';
import { TrabajoOportunidadComponent } from './../../trabajo-oportunidad/trabajo-oportunidad.component';
import { ManiobraComponent } from './../../maniobra/maniobra.component';
import { ApiService } from './../../../shared/services/api.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-consigna-tabs',
  templateUrl: './consigna-tabs.component.html',
  styleUrls: ['./consigna-tabs.component.scss']
})
export class ConsignaTabsComponent implements OnInit {

  elementos = [];
  trabajosOportunidad = [];
  action = 'Guardar';
  nameTab = 'Nueva';
  consignacionId = null;

  @ViewChild(ConsignaNewComponent) consigna: ConsignaNewComponent;
  @ViewChild(TrabajoOportunidadComponent) trabajoOportunidad : TrabajoOportunidadComponent;
  @ViewChild(ManiobraComponent) maniobra: ManiobraComponent;


  constructor(private activeRoute: ActivatedRoute,
    private api: ApiService) {
    this.activeRoute.params.subscribe(params => {

      if (params.id !== undefined && params.id !== null) {
        this.consignacionId = params.id;
        this.action = 'Editar';
        this.nameTab = 'Editar';
      }

    });
   }

  ngOnInit(): void {
  }

  async saveConsigna(){
    let formData: FormData = new FormData();
       

    let dataConsigna = this.consigna.guardarConsigna();
    for (const key in dataConsigna) {
      if (dataConsigna.hasOwnProperty(key)) {
          if(key == 'success'){
            if(!dataConsigna[key]){
              return
            }
          }
          if(key == 'formData'){
            formData = dataConsigna[key]
          }else{
            formData.append(key,dataConsigna[key])
          }
      }
    }
    formData.append('trabajoOportunidad', JSON.stringify(this.trabajoOportunidad.getTrabajosOportunidad()));

    const response = await this.api.post(`${environment.apiBackend}/consigna/save-consigna`, formData);
    let success = response.success;
    let message = response.message;

    console.log('hooooola');


  }

  setElemento(data){
    this.elementos.push(data);
  }

  setTrabajoOportunidad(data){
    this.trabajosOportunidad = data;
  }

}
