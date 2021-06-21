import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DynamicDialogComponent, DynamicDialogModel } from './../../../ui/dynamic-dialog/dynamic-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-errores-api-list',
  templateUrl: './errores-api-list.component.html',
  styleUrls: ['./errores-api-list.component.scss']
})
export class ErroresApiListComponent implements OnInit {

  displayedColumns: string[] = ['conexion', 'fecha', 'metodo','linea_error','error'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() set data(data: []) {
    this.init(data);
  }

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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

  verError(data){
    const dialogData = new DynamicDialogModel(`<div class="title-modal"><b>Error</b></div>`, data, 'Aceptar', null, 'end');
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      maxWidth: '90%',
      data: dialogData
    });
  }

}
