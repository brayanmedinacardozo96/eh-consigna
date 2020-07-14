import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../ui/confirm-dialog/confirm-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {ClientesAfectadosComponent} from "../clientes-afectados/clientes-afectados.component";

@Component({
  selector: 'app-comunicado-prensa-list',
  templateUrl: './comunicado-prensa-list.component.html',
  styleUrls: ['./comunicado-prensa-list.component.scss']
})
export class ComunicadoPrensaListComponent implements OnInit {

  @Input() data;
  @Output() refresh = new EventEmitter();

  constructor(private dialogConfirm: MatDialog,
              private api: ApiService,
              private notifier: NotifierService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  eliminar(obj) {
    const dialogData = new ConfirmDialogModel('Confirmar', `¿Está seguro(a) de borrar el comunicado de prensa?`);
    const dialogRef = this.dialogConfirm.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const params = {
          id: obj.id,
        };
        const response = await this.api.post(`${environment.apiBackend}/comunicado-prensa/delete`, params);
        if (response.success) {
          this.notifier.notify('success', response.message);
          this.refresh.emit();
        }
      }
    });

  }

  async openVerClientes(comunicadoPrensa) {

    const response = await this.api.get(`${environment.apiBackend}/comunicado-prensa/get-clientes-afectados/${comunicadoPrensa.id}`);
    let data = [];
    if (response.success) {
      data = response.data;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 900;
    dialogConfig.minHeight = 600;
    dialogConfig.disableClose = true;
    dialogConfig.data = data;
    this.dialog.open(ClientesAfectadosComponent, dialogConfig);
  }

}
