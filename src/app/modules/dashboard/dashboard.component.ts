import {Component, OnInit} from '@angular/core';
import {Auth} from '../../shared/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  options = [
    /*{
      title: 'Opcion 1',
      description: 'descripcion 1',
      icon: 'check',
      path: '/test'
    },
    {
      title: 'Opcion 2',
      description: 'descripcion 2',
      icon: 'check',
      path: '/test'
    },*/
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions() {
    this.options = [];
    const dataApp = Auth.getDataApp();

    for (const module of dataApp) {
      for (const form of module.forms) {
        this.options.push({
          title: form.name,
          description: form.description,
          icon: form.data,
          path: form.url
        });
      }
    }
  }

}
