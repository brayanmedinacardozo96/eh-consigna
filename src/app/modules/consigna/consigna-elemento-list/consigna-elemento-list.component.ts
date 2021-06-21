import { Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {};

@Component({
  selector: 'app-consigna-elemento-list',
  templateUrl: './consigna-elemento-list.component.html',
  styleUrls: ['./consigna-elemento-list.component.scss']
})
export class ConsignaElementoListComponent implements OnInit {

  displayedColumns: string[] = ['tipo_elemento', 'elemento', 'ramal', 'fecha_hora_inicio', 'fecha_hora_final'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.init(data)
  }

  ngOnInit(): void {
  }

  init(data) {
    this.dataSource = new MatTableDataSource(data.response.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
