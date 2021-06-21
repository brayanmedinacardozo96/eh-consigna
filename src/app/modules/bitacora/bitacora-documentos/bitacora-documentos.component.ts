import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-bitacora-documentos',
  templateUrl: './bitacora-documentos.component.html',
  styleUrls: ['./bitacora-documentos.component.scss']
})
export class BitacoraDocumentosComponent implements OnInit {

  data: any;
  env = environment;

  constructor(private api: ApiService,
              private notifier: NotifierService,
              private dialogRef: MatDialogRef<BitacoraDocumentosComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close(this.data);
  }


}
