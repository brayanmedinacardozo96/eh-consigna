import { Component, OnInit,ViewChild,Output,Input,EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table-maniobra',
  templateUrl: './table-maniobra.component.html',
  styleUrls: ['./table-maniobra.component.scss']
})
export class TableManiobraComponent implements OnInit {

  displayedColumns: string[] = ['descripcion','documento','acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() valueChange = new EventEmitter();
  @Input() set data(data: []) {
    this.init(data);
  }

  constructor() { }

  ngOnInit(): void {
      console.log(this.valueChange);
  }

  init(data) {
    console.log(data);
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
    console.log(data)
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
