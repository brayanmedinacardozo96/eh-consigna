import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ApiService } from 'src/app/shared/services/api.service';
import {NotifierService} from "angular-notifier";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { TableBitacoraElementosComponent } from './table-bitacora-elementos/table-bitacora-elementos.component';
import { DynamicDialogComponent, DynamicDialogModel } from './../../../ui/dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-table-ejecucion',
  templateUrl: './table-ejecucion.component.html',
  styleUrls: ['./table-ejecucion.component.scss']
})
export class TableEjecucionComponent implements OnInit {

  displayedColumns: string[] = ['consigna_codigo','estado','fecha_solicitud','elementos', 'completado','acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() valueChange = new EventEmitter();
  @Input() set data(data: []) {
    this.init(data);
  }

  constructor(
    private api: ApiService,
    private notifier: NotifierService,
    private dialog: MatDialog,
  ) { }

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

  verBitacoraElementos(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100vw';
    dialogConfig.height = '100vh';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.data = data;
    this.dialog.open(TableBitacoraElementosComponent, dialogConfig);
  }

  showCausal(data){
    let table = `<table class="custom-table"><tr><th>Causal</th><td>${data.causal}</td><tr>`;
    table += `<tr><th>Observación</th><td>${data.observacion_causal_incum}</td></tr></table>`
    const dialogData = new DynamicDialogModel('<div class="title-modal"><b>Información Causal</b></div>', table, 'Aceptar', null, 'end');
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      maxWidth: '90%',
      data: dialogData
    });
  }

}
