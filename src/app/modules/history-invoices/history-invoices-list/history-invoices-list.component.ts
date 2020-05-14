import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-history-invoices-list',
  templateUrl: './history-invoices-list.component.html',
  styleUrls: ['./history-invoices-list.component.scss']
})
export class HistoryInvoicesListComponent implements OnInit {

  displayedColumns: string[] = ['package', 'account_complete', 'invoice_number', 'cycle', 'month', 'year', 'email', 'creation_date', 'status', 'error_message'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() set data(data: []) {
    this.init(data);
  }

  constructor() {

  }

  ngOnInit() {
    this.init([]);
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

  openPdf(pathPdf) {
    window.open(`${environment.urlFiles}${pathPdf}`, '_blank');
  }
}
