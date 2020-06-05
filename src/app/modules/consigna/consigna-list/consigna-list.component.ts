import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import { ConsignaElementoListComponent } from './../consigna-elemento-list/consigna-elemento-list.component';
import { ConsignaTrabajoListComponent } from './../consigna-trabajo-list/consigna-trabajo-list.component';
import { ConsignaManiobraListComponent } from './../consigna-maniobra-list/consigna-maniobra-list.component';

@Component({
  selector: 'app-consigna-list',
  templateUrl: './consigna-list.component.html',
  styleUrls: ['./consigna-list.component.scss']
})
export class ConsignaListComponent implements OnInit {

  displayedColumns: string[] = ['numeroConsigna', 'consecutivoSnc', 'tipoZona', 'estadoConsigna','estadoEquipo', 'elementosConsignados', 'trabajosOportunidad', 'maniobras', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() set data(data: []) {
    this.init(data);
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    // this.init([]);
  }

  init(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openPdf(pathPdf) {
    window.open(`${environment.urlFiles}${pathPdf}`, '_blank');
  }

  showElementoConsignado(data){
    const dialogRef = this.dialog.open(ConsignaElementoListComponent,{
      width:'100%',
      data: {data}
    });

  }

  showTrabajoOportunidad(data){
    const dialogRef = this.dialog.open(ConsignaTrabajoListComponent,{
      width:'100%',
      data: {data}
    });
  }

  showManiobra(data){
    const dialogRef = this.dialog.open(ConsignaManiobraListComponent, {
      width:'100%',
      data: {data}
    });
  }

  imprimir(data){
    console.log(data)
  }
}
