import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotifierService} from 'angular-notifier';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModalBitacoraSubelementoComponent } from './../modal-bitacora-subelemento/modal-bitacora-subelemento.component';

@Component({
  selector: 'app-table-bitacora-elementos',
  templateUrl: './table-bitacora-elementos.component.html',
  styleUrls: ['./table-bitacora-elementos.component.scss']
})
export class TableBitacoraElementosComponent implements OnInit {

  data: any;

  constructor(
    private notifier: NotifierService,
    private dialogRef: MatDialogRef<TableBitacoraElementosComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data) {
      this.data = data;
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(this.data);
  }

  abrirSubelementos(obj) {
    
    if (!obj.json_elemento_mapa) {
      this.notifier.notify('error', 'El elemento seleccionado no contiene subelementos.');
      return false;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 500;
    dialogConfig.minHeight = 650;
    dialogConfig.data = {
      data: obj.json_elemento_mapa,
      horas: {
        hora_inicio: obj.form.hora_entrega.value,
        hora_fin: obj.form.hora_devolucion.value,
      },
    };
    this.dialog.open(ModalBitacoraSubelementoComponent, dialogConfig);
  }

  abrirSubelementosCortoTiempo(obj) {
  
    if (!obj.json_elemento_mapa_corto) {
      this.notifier.notify('error', 'El elemento seleccionado no contiene subelementos.');
      return false;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 500;
    dialogConfig.minHeight = 650;
    dialogConfig.data = {
      data: obj.json_elemento_mapa_corto,
      horas: {
        hora_inicio: obj.form.hora_entrega.value,
        hora_fin: obj.form.hora_devolucion.value,
      },
    };
    this.dialog.open(ModalBitacoraSubelementoComponent, dialogConfig);
  }

}
