import { Component, OnInit, Inject } from '@angular/core';
import { ValidationService } from './../../../../shared/services/validations.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { SnackBarService } from './../../../../shared/services/snack-bar.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {};

@Component({
  selector: 'app-consigna-new-search',
  templateUrl: './consigna-new-search.component.html',
  styleUrls: ['./consigna-new-search.component.scss']
})
export class ConsignaNewSearchComponent implements OnInit {

  form = {
    numeroConsigna:{
      label: 'Consecutivo',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: false,
    },
    codigoEstadoConsigna:{ //consultar unicamente las solicitadas
      value: 'S'
    }
  }
  data = [];

  constructor(private validations: ValidationService,
              private api: ApiService,
              private snackBar: SnackBarService,
              public dialogRef: MatDialogRef<ConsignaNewSearchComponent>,
              @Inject(MAT_DIALOG_DATA) public dataDialog: DialogData
    ) { 
      this.init(dataDialog)
    }

  ngOnInit(): void {
  }

  init(data){

  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async search(){
    const responseValidate = this.validations.validateACompleteField(this.form);
    if(responseValidate.success){
      this.data = [];
      const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, this.form);
      if(response.success){
        this.data = response.data;
        console.log(this.data);
        if(this.data.length < 1){
          this.snackBar.alert('No se encontraron registros con los parámetros consultados.',5000);
        }
      }

    }
  }

  okClick(){
    this.dialogRef.close({data:this.data});
  }

}
