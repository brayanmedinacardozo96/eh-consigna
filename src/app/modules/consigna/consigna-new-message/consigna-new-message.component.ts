import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from './../../../../environments/environment';
import { ApiService } from './../../../shared/services/api.service';
import { SnackBarService } from './../../../shared/services/snack-bar.service';
export interface DialogData {};

@Component({
  selector: 'app-consigna-new-message',
  templateUrl: './consigna-new-message.component.html',
  styleUrls: ['./consigna-new-message.component.scss']
})
export class ConsignaNewMessageComponent implements OnInit {

  message = '';
  html = '';
  consignacionId = '';
  constructor(private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: SnackBarService) { 
    this.init(data)
  }

  ngOnInit(): void {
  }

  init(data) {
    this.message = data.response.message;
    this.consignacionId = data.response.consignacion_id;
  }

  async generatePdf(){
    const response = await this.api.post(`${environment.apiBackend}/file/generate-pdf`, {consignacionId: this.consignacionId} );
      let success = response.success;
      let message = response.message;
      if(success){
        window.open(`${environment.urlFiles}/${response.path}`);
      }else{
        this.snackBar.alert(message,10000)
      }
  }

}
