import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-table-trabajo-oportunidad',
  templateUrl: './table-trabajo-oportunidad.component.html',
  styleUrls: ['./table-trabajo-oportunidad.component.scss']
})
export class TableTrabajoOportunidadComponent implements OnInit {

  displayedColumns: string[] = ['elemento', 'trabajo', 'medida_seguridad', 'jefe_trabajo', 'telefono','acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() valueChange = new EventEmitter();
  @Input() set data(data: []) {
    this.init(data);
  }

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

  imprimir(data){
    // console.log(data)
  }

  seleccionar(row)
  {
    this.valueChange.emit(["select",row]);
  }

  eliminar(row)
  {
    this.valueChange.emit(["delete",row]);
  }


}
