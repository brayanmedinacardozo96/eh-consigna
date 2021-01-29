import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import {NotifierService} from "angular-notifier";
import { Router } from '@angular/router';
import { DynamicDialogComponent, DynamicDialogModel } from './../../../ui/dynamic-dialog/dynamic-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-indicadores-power-bi',
  templateUrl: './indicadores-power-bi.component.html',
  styleUrls: ['./indicadores-power-bi.component.scss']
})
export class IndicadoresPowerBiComponent implements OnInit {

  constructor(private api: ApiService,
    private notifier: NotifierService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUrl();
  }

  async getUrl(){
    const response = await this.api.get(`${environment.apiBackend}/indicador-power-bi/get-url`);
    if(response.success){
      this.getDialogInfo(response);
    }else{
      this.notifier.notify('warning', response.message);
    }
    this.router.navigate(['/dashboard']);
  }


  getDialogInfo(response){
    const message = response.message;
    let url = response.data.url;
    const dialogData = new DynamicDialogModel('<div class="title-modal"><b>Atención</b></div>', message, 'Ingresar', 'Cancelar', 'end');
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      maxWidth: '90%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        window.open(url, '_blank');
      }
    });
  }

}
