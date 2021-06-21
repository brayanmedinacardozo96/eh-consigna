import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { SessionService } from './../../../shared/services/session.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
export interface DialogData {};


@Component({
  selector: 'app-consolidado-consigna-list',
  templateUrl: './consolidado-consigna-list.component.html',
  styleUrls: ['./consolidado-consigna-list.component.scss']
})
export class ConsolidadoConsignaListComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'estado_consignacion', 'tipo_consignacion', 'tipo_solicitud', 'fecha_solicitud'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private session: SessionService) { 
    this.init(data)
  }
   
  ngOnInit(): void {
  }

  init(data) {
    this.dataSource = new MatTableDataSource(data.consignas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
