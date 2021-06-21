import { Component,Inject, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-bitacora-subelementos-vista',
  templateUrl: './bitacora-subelementos-vista.component.html',
  styleUrls: ['./bitacora-subelementos-vista.component.scss']
})
export class BitacoraSubelementosVistaComponent implements OnInit {

  data: any;
  horasPadre: any;
  env = environment;
  selectAllSwitch = false;
  selectAllSwitches = false;
  selectAllTransfor = false;
  selectAllRecloser = false;

  constructor(private api: ApiService,
              private notifier: NotifierService,
              private dialogRef: MatDialogRef<BitacoraSubelementosVistaComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data.data;
    //this.horasPadre = data.horas;
    //this.updateHours(this.horasPadre.hora_inicio, this.horasPadre.hora_fin);

  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(this.data);
  }


}
