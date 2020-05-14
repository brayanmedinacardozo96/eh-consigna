import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiService} from '../../shared/services/api.service';
import {Validations} from '../../shared/validations';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-history-invoices',
  templateUrl: './history-invoices.component.html',
  styleUrls: ['./history-invoices.component.scss']
})
export class HistoryInvoicesComponent implements OnInit {

  data = [];
  completeProcess = false;
  totalRecords: any;
  successRecords: any;
  failedsRecords: any;
  idSetInterval: any;
  form = {
    package: {
      label: 'Nro. Lote',
      name: 'package',
      value: null,
      messages: null,
      required: true,
    },
  };
  seconds = 10;

  constructor(private api: ApiService,
              private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {

      if (params.package !== undefined && params.package !== null) {
        this.form.package.value = params.package;
        this.search().then();
      }

    });
  }

  async ngOnInit(): Promise<void> {

  }

  syncAutomatic(event) {
    if (event.checked) {
      this.createInterval();
    } else {
      this.deleteInterval();
    }
  }

  createInterval() {
    this.idSetInterval = setInterval(() => {
      this.search().then();
    }, (this.seconds * 1000));
  }

  deleteInterval() {
    clearInterval(this.idSetInterval);
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async search() {

    const responseValidate = Validations.validateEmptyFields(this.form);
    if (!responseValidate.success) {
      return false;
    }

    const params = `package=${this.form.package.value}`;
    const response = await this.api.get(`${environment.apiBackend}/invoice-massive/get-data?${params}`);
    this.data = response.data;
    this.completeProcess = response.complete_process;
    this.totalRecords = response.total_records;
    if (this.completeProcess) {
      this.successRecords = response.success_records;
      this.failedsRecords = response.faileds_records;
      this.deleteInterval();
    }
  }

  download() {
    const params = `package=${this.form.package.value}`;
    window.open(`${environment.apiBackend}/invoice-massive/download?${params}`);
  }

}
