import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table-subestaciones',
  templateUrl: './table-subestaciones.component.html',
  styleUrls: ['./table-subestaciones.component.scss']
})
export class TableSubestacionesComponent implements OnInit {

  displayedColumns: string[] = ['nombre','codigo','latitud','longitud', 'codigo_creg', 'zona','fecha_creacion','fecha_actualizacion','acciones'];
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
    let obj = {...row}
    this.valueChange.emit(["select",obj]);
  }

  getDataInfo(nameObj, id){
    let data = this.temporales[nameObj].find(data => data.id == id);
    return data.nombre;
  }

}
