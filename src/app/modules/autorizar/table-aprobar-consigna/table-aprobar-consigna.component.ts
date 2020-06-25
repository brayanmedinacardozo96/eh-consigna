import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import { ConsignaElementoListComponent } from '../../consigna/consigna-elemento-list/consigna-elemento-list.component';
import { ConsignaTrabajoListComponent } from '../../consigna/consigna-trabajo-list/consigna-trabajo-list.component';
import { ConsignaManiobraListComponent } from '../../consigna/consigna-maniobra-list/consigna-maniobra-list.component';
import { ApiService } from 'src/app/shared/services/api.service';



@Component({
  selector: 'table-aprobar-consigna',
  templateUrl: './table-aprobar-consigna.component.html',
  styleUrls: ['./table-aprobar-consigna.component.scss']
})
export class TableAprobarConsignaComponent implements OnInit {

  displayedColumns: string[] = ['numeroConsigna', 'consecutivoSnc', 'tipoZona', 'estadoConsigna','estadoEquipo', 'elementosConsignados', 'trabajosOportunidad', 'maniobras','archivo'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() set data(data: []) {
    this.init(data);
  }

  isVisible=false;

  constructor(private api: ApiService,
              public dialog: MatDialog,
             ) { }

  ngOnInit() {

  }


  init(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async showElementoConsignado(id){
    const response = await this.api.post(`${environment.apiBackend}/lista-elemento/get-list`, {consignaId: id});

    const dialogRef = this.dialog.open(ConsignaElementoListComponent,{
      width:'100%',
      data: {response}
    });

  }

  async showTrabajoOportunidad(id){
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-trabajo-list`,{consignaId: id})

    const dialogRef = this.dialog.open(ConsignaTrabajoListComponent,{
      width:'100%',
      data: {response}
    });
  }

  async showManiobra(id){
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-registro-maniobra-list`,{consignaId: id})
    const dialogRef = this.dialog.open(ConsignaManiobraListComponent, {
      width:'100%',
      data: {response}
    });
  }

  showUrl(url)
  {
    window.open(`${environment.urlFiles}/public/${url}`);
  }


}
