import {Component, Inject, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-bitacora-subelementos',
  templateUrl: './bitacora-subelementos.component.html',
  styleUrls: ['./bitacora-subelementos.component.scss']
})
export class BitacoraSubelementosComponent implements OnInit {

  data: any;
  env = environment;
  selectAllSwitch = false;
  selectAllSwitches = false;
  selectAllTransfor = false;
  selectAllRecloser = false;

  constructor(private api: ApiService,
              private notifier: NotifierService,
              private dialogRef: MatDialogRef<BitacoraSubelementosComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
    console.log(this.data);
  }

  ngOnInit(): void {

  }

  checkAll(group, value) {
    for (let obj of this.data[group]) {
      obj.form.completado = value;
    }
  }

  setDinamicData(group, name, event, index) {
    this.data[group][index].form[name].value = event;
  }

  close() {
    this.dialogRef.close(this.data);
  }

}
