import { Component,Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-consigna-elemento-list',
  templateUrl: './consigna-elemento-list.component.html',
  styleUrls: ['./consigna-elemento-list.component.scss']
})
export class ConsignaElementoListComponent implements OnInit {

  displayedColumns: string[] = ['numeroConsigna', 'tipoZona', 'estadoConsigna', 'elementosConsignados', 'trabajosOportunidad', 'maniobras', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() { }

  @Input() set data(data: []) {
    this.init(data);
  }

  ngOnInit(): void {
  }

  init(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
