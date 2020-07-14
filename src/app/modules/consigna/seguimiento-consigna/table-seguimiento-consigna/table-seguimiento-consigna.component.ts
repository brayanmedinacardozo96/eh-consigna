import { Component, OnInit,ViewChild,Output,EventEmitter,Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table-seguimiento-consigna',
  templateUrl: './table-seguimiento-consigna.component.html',
  styleUrls: ['./table-seguimiento-consigna.component.scss']
})
export class TableSeguimientoConsignaComponent implements OnInit {

  constructor() { }
  
  displayedColumns: string[] = ['fecha', 'usuario', 'observacion'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() valueChange = new EventEmitter();
  @Input() set data(data: []) {
    this.init(data);
  }

  ngOnInit(): void {
  }

  init(data) {
    // console.log(data);
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

}
