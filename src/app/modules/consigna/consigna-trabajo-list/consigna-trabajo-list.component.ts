import { Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {};

@Component({
  selector: 'app-consigna-trabajo-list',
  templateUrl: './consigna-trabajo-list.component.html',
  styleUrls: ['./consigna-trabajo-list.component.scss']
})
export class ConsignaTrabajoListComponent implements OnInit {
  
  displayedColumns: string[] = ['consecutivo', 'descripcion', 'nombre_elemento', 'trabajos', 'medidas_seguridad', 'jefe_trabajo', 'telefono'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.init(data)
  }

  ngOnInit(): void {
  }

  init(data) {
    this.dataSource = new MatTableDataSource(data.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
