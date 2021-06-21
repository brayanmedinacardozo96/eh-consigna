import { Component, Inject, OnInit } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-bitacora-subelemento',
  templateUrl: './modal-bitacora-subelemento.component.html',
  styleUrls: ['./modal-bitacora-subelemento.component.scss']
})
export class ModalBitacoraSubelementoComponent implements OnInit {

  data: any;
  horasPadre: any;
  selectAllSwitch = false;
  selectAllSwitches = false;
  selectAllTransfor = false;
  selectAllRecloser = false;

  constructor(private notifier: NotifierService,
              private dialogRef: MatDialogRef<ModalBitacoraSubelementoComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data.data;

    this.horasPadre = data.horas;
    this.updateHours(this.horasPadre.hora_inicio, this.horasPadre.hora_fin);

  }

  ngOnInit(): void {

  }

  checkAll(group, value) {
    for (let obj of this.data[group]) {
      obj.form.completado = value;
    }
  }

  updateHours(horaInicioFormat, HoraFinFormat) {
    if (this.data.SWITCH) {
      for (let value of this.data.SWITCH) {
        if (!value.form.completado) {
          value.form.hora_inicio.value = horaInicioFormat;
          value.form.hora_fin.value = HoraFinFormat;
        }
      }
    }

    if (this.data.SWITCHES) {
      for (let value of this.data.SWITCHES) {
        if (!value.form.completado) {
          value.form.hora_inicio.value = horaInicioFormat;
          value.form.hora_fin.value = HoraFinFormat;
        }
      }
    }

    if (this.data.TRANSFOR) {
      for (let value of this.data.TRANSFOR) {
        if (!value.form.completado) {
          value.form.hora_inicio.value = horaInicioFormat;
          value.form.hora_fin.value = HoraFinFormat;
        }
      }
    }

    if (this.data.RECLOSER) {
      for (let value of this.data.RECLOSER) {
        if (!value.form.completado) {
          value.form.hora_inicio.value = horaInicioFormat;
          value.form.hora_fin.value = HoraFinFormat;
        }
      }
    }

  }

  setDinamicData(group, name, event, index) {
    this.data[group][index].form[name].value = event;
  }

  close() {
    this.dialogRef.close(this.data);
  }

}
