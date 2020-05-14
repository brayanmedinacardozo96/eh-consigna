import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiService} from '../../shared/services/api.service';
import {Validations} from '../../shared/validations';
import {Auth} from '../../shared/auth';
import {GenerateInvoicesListComponent} from './generate-invoices-list/generate-invoices-list.component';

@Component({
  selector: 'app-generate-invoices',
  templateUrl: './generate-invoices.component.html',
  styleUrls: ['./generate-invoices.component.scss']
})
export class GenerateInvoicesComponent implements OnInit {

  success: any;
  message: any;
  package: any;
  numberInvoices: any;
  dataControls: any;
  form = {
    cycle: {
      label: 'Seleccione el ciclo',
      name: 'cycle',
      value: null,
      messages: null,
      required: true,
    },
  };
  data = [];
  @ViewChild(GenerateInvoicesListComponent) list: GenerateInvoicesListComponent;

  constructor(private api: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadControls();
  }

  async loadControls() {
    const response = await this.api.get(`${environment.apiBackend}/invoice-massive/load-controls`);
    this.dataControls = response.data;
  }

  async search() {

    const responseValidate = Validations.validateEmptyFields(this.form);
    if (!responseValidate.success) {
      return false;
    }

    const params = `cycle=${this.form.cycle.value}`;
    const response = await this.api.get(`${environment.apiBackend}/invoice-massive/search?${params}`);
    this.data = response.data;
  }

  async generate() {

    const dataSend = this.list.getChecks();

    this.message = '';
    if (dataSend.length === 0) {
      this.success = false;
      this.message = 'Debe seleccionar al menos una factura';
      return false;
    }

    const params = {
      data: dataSend,
      user: Auth.getUser(),
    };
    const response = await this.api.post(`${environment.apiBackend}/invoice-massive/save`, params);
    this.success = response.success;
    this.message = response.message;
    this.package = response.package;
    this.numberInvoices = response.number_invoices;
    if (this.success) {
      this.clean();
    }
  }

  clean() {
    this.data = [];
  }

}
