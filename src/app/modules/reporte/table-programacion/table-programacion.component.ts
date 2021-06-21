import { Component, OnInit,ViewChild,Output,EventEmitter,Input  } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DynamicDialogComponent, DynamicDialogModel } from './../../../ui/dynamic-dialog/dynamic-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-programacion',
  templateUrl: './table-programacion.component.html',
  styleUrls: ['./table-programacion.component.scss']
})
export class TableProgramacionComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() valueChange = new EventEmitter();
  @Input() set data(data: []) {
    this.init(data);
  }

  @Input() set setDisplayedColumns(data){
    this.displayedColumns = data;
  }

  @Input() tableHeader;

  constructor(private dialog: MatDialog) { }

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

  verInformcion(name, data){
    const dialogData = new DynamicDialogModel(`<div class="title-modal"><b>${name}</b></div>`, data, 'Aceptar', null, 'end');
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      maxWidth: '90%',
      data: dialogData
    });
  }

}
