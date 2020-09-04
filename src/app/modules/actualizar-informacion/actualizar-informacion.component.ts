import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/services/api.service';
import { NotifierService } from 'angular-notifier';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-actualizar-informacion',
  templateUrl: './actualizar-informacion.component.html',
  styleUrls: ['./actualizar-informacion.component.scss']
})
export class ActualizarInformacionComponent implements OnInit {

  constructor(private api: ApiService,
    private notifier: NotifierService
    ) { }

  tableHead = []
  tableBody = []
  tableIssues = ''

  ngOnInit(): void {
  }

  async updateSpard(url){
    const response = await this.api.get(`${environment.apiBackend}/${url}`);

    if(response.success){
      this.notifier.notify('success',response.message)
      if(response.issues.length > 0 ){
        this.generateIssues(response.issues);
      }

    }else{
      this.notifier.notify('error','Ocurrió un error, por favor vuelva intentarlo.')
    }
  }

  generateIssues(data){
    //obtener los objetos para el header
    this.tableHead = []
    for(let value in data[0]){
      this.tableHead.push(value)
    }

    let table = '<h1>Issues</h1>'
    table += '<table border="1px solid" class="custom-table">'
    table += '<thead><tr>'
    for(let value of this.tableHead){
      table += '<th>'+value+'</th>'
    }
    table += '</tr></thead>'
    table += '</tbody>'
    for(let value of data){
      table += '<tr>'
      for(let column of this.tableHead){
        table += '<td>'
        if(value[column] != null && value[column] != 'null' && value[column] != undefined){
          table += value[column]
        }else{
          table += ''
        }
        table += '</td>'
      }
      table += '</tr>'
    }
    table += '</tbody>'
    table += '</table>'
    this.tableIssues =  table;
  }

}
