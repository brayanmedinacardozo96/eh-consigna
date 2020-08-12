import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from './../../../../environments/environment';
import {MatSort} from '@angular/material/sort';
export interface DialogData {};


@Component({
  selector: 'app-consigna-list-documents',
  templateUrl: './consigna-list-documents.component.html',
  styleUrls: ['./consigna-list-documents.component.scss']
})
export class ConsignaListDocumentsComponent implements OnInit {

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
    this.dataSource = new MatTableDataSource(data.dataListUrl);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  showUrl(url){
    window.open(`${environment.urlFiles}/public/${url}`);
  }

}
