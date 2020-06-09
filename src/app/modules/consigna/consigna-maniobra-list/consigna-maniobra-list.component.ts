import { Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
export interface DialogData {};


@Component({
  selector: 'app-consigna-maniobra-list',
  templateUrl: './consigna-maniobra-list.component.html',
  styleUrls: ['./consigna-maniobra-list.component.scss']
})
export class ConsignaManiobraListComponent implements OnInit {
  
  displayedColumns: string[] = ['consecutivo', 'descripcion', 'url'];
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
  
  showUrl(url){
    window.open(`${environment.urlFiles}/public/${url}`);
  }

}
