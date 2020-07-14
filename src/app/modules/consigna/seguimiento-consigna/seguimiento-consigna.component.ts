import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { ApiService } from '../../../shared/services/api.service';
import {SnackBarClass} from '../../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-seguimiento-consigna',
  templateUrl: './seguimiento-consigna.component.html',
  styleUrls: ['./seguimiento-consigna.component.scss']
})
export class SeguimientoConsignaComponent implements OnInit {
  
  urlAutoComletar=`${environment.apiBackend}/consigna/getAutoCompletarConsigna/null/null`;

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    ) { }

  form = {
    
    numeroConsigna: {
      label: 'Consigna en estado de solicitud.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
      url: this.urlAutoComletar
    },
   
  }

  dataSeguimiento=[
    {created_at:"", usuario:"", observacion:""}
  ]

  ngOnInit(): void {
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async buscar()
  {
    this.buscarConsigna(   this.form.numeroConsigna.value  );

  }

  async buscarConsigna(params){

    var response = await this.api.get(`${environment.apiBackend}/consigna/getSeguimiento/${params}`);
    if(response.success){

      this.dataSeguimiento = response.data;
      console.log(response.data.length );
      if(response.data.length ==0){
        new SnackBarClass(this.snackBar, 'No se encontraron registros con los parámetros consultados.',"btn-warning").openSnackBar();
      }
     
    }

  }

}
