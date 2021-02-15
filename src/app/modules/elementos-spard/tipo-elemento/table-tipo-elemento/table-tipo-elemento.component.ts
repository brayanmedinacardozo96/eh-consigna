import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table-tipo-elemento',
  templateUrl: './table-tipo-elemento.component.html',
  styleUrls: ['./table-tipo-elemento.component.scss']
})
export class TableTipoElementoComponent implements OnInit {

  displayedColumns: string[] = ['nombre','codigo_spard','red_electrica', 'subestacion','fecha_creacion','fecha_actualizacion','acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() valueChange = new EventEmitter();
  @Input() set data(data: []) {
    this.init(data);
  }
  @Input() temporales;

  constructor() { }

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

  seleccionar(row) {
    let obj = {...row, zona_id: row.subestacion.zona_id}
    this.valueChange.emit(["select",obj]);
  }

  getRedElectrica(id){
    let redElectrica = this.temporales.redElectrica.find(data => data.value == id);
    return redElectrica.nombre;
  }

  getSubestacion(id){
    let subestacion = this.temporales.subestacion.find(data => data.id == id);
    return subestacion.nombre;
  }

}
