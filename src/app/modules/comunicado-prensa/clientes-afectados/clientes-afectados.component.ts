import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-clientes-afectados',
  templateUrl: './clientes-afectados.component.html',
  styleUrls: ['./clientes-afectados.component.scss']
})

export class ClientesAfectadosComponent implements OnInit {

  data: any;

  displayedColumns: string[] = ['count', 'cuenta', 'nombre', 'emails'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataHeader = [
    {name:'#', nameColumn:'count'},
    {name:'Cuenta', nameColumn:'cuenta'},
    {name:'Nombre', nameColumn:'nombre'},
    {name:'Correos', nameColumn:'emails'},
  ]

  constructor(private api: ApiService,
              private notifier: NotifierService,
              private dialogRef: MatDialogRef<ClientesAfectadosComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
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

  close() {
    this.dialogRef.close(this.data);
  }

}
