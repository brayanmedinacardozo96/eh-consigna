import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

declare var $: any;

@Component({
  selector: 'app-generate-invoices-list',
  templateUrl: './generate-invoices-list.component.html',
  styleUrls: ['./generate-invoices-list.component.scss']
})
export class GenerateInvoicesListComponent implements OnInit {

  checked = false;
  JSON = JSON;
  displayedColumns: string[] = ['check', 'account_complete', 'cycle', 'month', 'year', 'email'];
  dataSource: MatTableDataSource<any>;

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
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getChecks() {
    const dataSend = [];
    $(`input[name='invoices[]']:checked`).each((index, obj) => {
      const data = JSON.parse($(obj).val());
      dataSend.push(data);
    });
    return dataSend;
  }

}
