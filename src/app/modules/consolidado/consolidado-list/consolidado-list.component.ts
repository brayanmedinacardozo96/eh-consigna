import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsolidadoConsignaListComponent } from './../consolidado-consigna-list/consolidado-consigna-list.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from './../../../ui/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import { ApiService } from './../../../shared/services/api.service';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-consolidado-list',
  templateUrl: './consolidado-list.component.html',
  styleUrls: ['./consolidado-list.component.scss']
})
export class ConsolidadoListComponent implements OnInit {

  @Input() data;
  @Output() refresh = new EventEmitter();
  
  constructor(private dialogConfirm: MatDialog,
    private api: ApiService,
    private notifier: NotifierService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async openVerConsignas(id){
    let params = {id:id}
    let consignas = []
    const response = await this.api.post(`${environment.apiBackend}/consolidado-prensa/get-consignacion-list`,params);
    console.log(response.data)
    if(response.success){
      for(let value of response.data){
        for(let consigna of value.consignaciones){
          consignas.push(consigna)
        }
      }
      const dialogRef = this.dialogConfirm.open(ConsolidadoConsignaListComponent,{
        width:'100%',
        data: {consignas}
      });
    }
  }

}
