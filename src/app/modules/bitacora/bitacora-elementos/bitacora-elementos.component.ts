import {Component, Inject, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-bitacora-elementos',
  templateUrl: './bitacora-elementos.component.html',
  styleUrls: ['./bitacora-elementos.component.scss']
})
export class BitacoraElementosComponent implements OnInit {

  data: any;
  env = environment;

  constructor(private api: ApiService,
              private notifier: NotifierService,
              private dialogRef: MatDialogRef<BitacoraElementosComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close(this.data);
  }



}
