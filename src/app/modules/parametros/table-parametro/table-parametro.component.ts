import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiService} from '../../../shared/services/api.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-table-parametro',
  templateUrl: './table-parametro.component.html',
  styleUrls: ['./table-parametro.component.scss']
})
export class TableParametroComponent implements OnInit {

  displayedColumns: string[] = ['tp_nombre','codigo','nombre', 'descripcion','valor','estado','acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() valueChange = new EventEmitter();
  @Input() set data(data: []) {
    this.init(data);
  }

  constructor(
    private apiService: ApiService,
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


  seleccionar(row)
  {

    this.valueChange.emit(["select",row]);

  }

  async setEstado(row,checkbox) 
  {
      var obj = {
        id: row.id,
        estado: checkbox?"1":"0"
      }

      var response = await this.apiService.post(`${environment.apiBackend}/parametro/putUpdateEstado`, obj);
  }

  eliminar(row)
  {
     this.valueChange.emit(["delete",row]);
  }

}
