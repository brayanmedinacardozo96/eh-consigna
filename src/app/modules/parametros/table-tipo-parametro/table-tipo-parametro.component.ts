import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table-tipo-parametro',
  templateUrl: './table-tipo-parametro.component.html',
  styleUrls: ['./table-tipo-parametro.component.scss']
})
export class TableTipoParametroComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'codigo','acciones'];
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


  seleccionar(row)
  {

    this.valueChange.emit(["select",row]);

  }

  eliminar(row)
  {
     this.valueChange.emit(["delete",row]);
  }

}
