import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsignaNewComponent } from './../consigna-new/consigna-new.component';
import { TrabajoOportunidadComponent } from './../../trabajo-oportunidad/trabajo-oportunidad.component';
import { ManiobraComponent } from './../../maniobra/maniobra.component';

@Component({
  selector: 'app-consigna-tabs',
  templateUrl: './consigna-tabs.component.html',
  styleUrls: ['./consigna-tabs.component.scss']
})
export class ConsignaTabsComponent implements OnInit {

  action = 'Guardar';
  nameTab = 'Nueva';
  consignacionId = null;

  @ViewChild(ConsignaNewComponent) consigna: ConsignaNewComponent;
  @ViewChild(TrabajoOportunidadComponent) trabajoOportunidad: TrabajoOportunidadComponent;
  @ViewChild(ManiobraComponent) maniobra: ManiobraComponent;


  constructor(private activeRoute: ActivatedRoute) {
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

  saveConsigna(){
    this.consigna.guardarConsigna();
  }

}
