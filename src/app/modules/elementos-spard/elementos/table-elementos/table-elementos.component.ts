import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table-elementos',
  templateUrl: './table-elementos.component.html',
  styleUrls: ['./table-elementos.component.scss']
})
export class TableElementosComponent implements OnInit {

  displayedColumns: string[] = ['nombre','grupo','codigo_creg', 'codigo_spard','latitud','longitud','fecha_creacion','red_electrica','tipo_elemento','zona','subestacion','estado','acciones'];
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

  getRedElectrica(id){
    let redElectrica = this.temporales.redElectrica.find(data => data.value == id);
    return redElectrica.nombre;
  }

  getEstado(id){
    let estado = this.temporales.estado.find(data => data.value == id);
    return estado.nombre;
  }

  getDataInfo(nameObj, id){
    let data = this.temporales[nameObj].find(data => data.id == id);
    return data.nombre;
  }

  getZona(idSubestacion){
    let dataSubestacion = this.temporales.subestacion.find(data => data.id == idSubestacion);
    let dataZona = this.temporales.tipoZona.find(data => data.id == dataSubestacion.zona_id);
    return dataZona.nombre;
  }

}
