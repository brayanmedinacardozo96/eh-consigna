import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from './../../../../environments/environment';
import { SessionService } from './../../../shared/services/session.service';
import {MatSort} from '@angular/material/sort';
export interface DialogData {};

@Component({
  selector: 'app-consigna-tercero-list',
  templateUrl: './consigna-tercero-list.component.html',
  styleUrls: ['./consigna-tercero-list.component.scss']
})
export class ConsignaTerceroListComponent implements OnInit {

  displayedColumns: string[] = ['solicitada_tercero', 'tipo_tercero_id', 'tercero_descripcion', 'tercero_anio', 'tercero_numero_contrato'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  form = {
    tipoTercero: {
      label: ' ',
      name: 'tipoTercero',
      value: null,
      messages: null,
      required: false,
      disabled: true,
      visible: false
    },
  }

  tipoTercero = null;

  dataControls = {
    tipoTercerosConsigna:[]
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private session: SessionService) {
    this.init(data)
  }

  ngOnInit(): void {
    this.setDataSelect()
  }

  init(data) {
    this.dataSource = new MatTableDataSource(data.dataListTercero);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setTipoTercero(data)
  }

  async setDataSelect(){
    if(this.session.getItem('tipoTercerosConsigna') == undefined){
      const response = await this.session.getDataSelectConsigna();
      if(response.success){
        this.dataControls.tipoTercerosConsigna = this.session.getItem('tipoTercerosConsigna');
      }
    }else{
      this.dataControls.tipoTercerosConsigna = this.session.getItem('tipoTercerosConsigna');
    }
  }

  setTipoTercero(data){
    for(let value of data.dataListTercero){
      this.tipoTercero = parseInt(value.tipo_tercero_id)
    }
  }
  
}
