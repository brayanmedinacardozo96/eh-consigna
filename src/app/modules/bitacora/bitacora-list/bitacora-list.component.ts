import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {BitacoraDocumentosComponent} from "../bitacora-documentos/bitacora-documentos.component";
import {environment} from "../../../../environments/environment";
import {BitacoraElementosComponent} from "../bitacora-elementos/bitacora-elementos.component";

@Component({
  selector: 'app-bitacora-list',
  templateUrl: './bitacora-list.component.html',
  styleUrls: ['./bitacora-list.component.scss']
})
export class BitacoraListComponent implements OnInit {

  @Input() data;

  constructor(private dialogConfirm: MatDialog,
              private api: ApiService,
              private notifier: NotifierService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  async verElementos(obj) {
    const response = await this.api.get(`${environment.apiBackend}/bitacora/get-elementos/${obj.id}`);
    let data = [];
    if (response.success) {
      data = response.data;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 1300;
    dialogConfig.minHeight = 500;
    dialogConfig.data = data;
    this.dialog.open(BitacoraElementosComponent, dialogConfig);

  }

  verDocumentos(obj) {
    const jsonFiles = JSON.parse(obj.json_files);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 800;
    dialogConfig.minHeight = 500;
    dialogConfig.data = jsonFiles;
    this.dialog.open(BitacoraDocumentosComponent, dialogConfig);

  }

}
