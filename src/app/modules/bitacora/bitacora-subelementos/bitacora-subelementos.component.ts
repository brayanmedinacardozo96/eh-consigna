import {Component, Inject, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as moment from "moment";

@Component({
  selector: 'app-bitacora-subelementos',
  templateUrl: './bitacora-subelementos.component.html',
  styleUrls: ['./bitacora-subelementos.component.scss']
})
export class BitacoraSubelementosComponent implements OnInit {

  data: any;
  horasPadre: any;
  env = environment;
  selectAllSwitch = false;
  selectAllSwitches = false;
  selectAllTransfor = false;
  selectAllRecloser = false;

  constructor(private api: ApiService,
              private notifier: NotifierService,
              private dialogRef: MatDialogRef<BitacoraSubelementosComponent>,
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

  validateRangeHour(horaInicioFormat, horaFinFormat) {
    if (horaInicioFormat != null && horaFinFormat != null
      && this.horasPadre.hora_inicio != null && this.horasPadre.hora_fin != null) {
      let horaInicio = moment(horaInicioFormat, 'h:mm a');
      let horaFinal = moment(horaFinFormat, 'h:mm a');
      let horaInicioPadre = moment(this.horasPadre.hora_inicio, 'h:mm a');
      let horaFinPadre = moment(this.horasPadre.hora_fin, 'h:mm a');

      if (horaInicio > horaFinal) {
        this.notifier.notify('error', '¡La hora inicio es mayor a la hora fin!');
        return false;
      }

      if (!(horaInicio >= horaInicioPadre && horaInicio <= horaFinPadre)) {
        this.notifier.notify('error', `¡La hora inicio debe estar entre ${this.horasPadre.hora_inicio} y ${this.horasPadre.hora_fin}!`);
        return false;
      }

      if (!(horaFinal >= horaInicioPadre && horaFinal <= horaFinPadre)) {
        this.notifier.notify('error', `¡La hora final debe estar entre ${this.horasPadre.hora_inicio} y ${this.horasPadre.hora_fin}!`);
        return false;
      }

    }
    return true;
  }

  setDinamicData(group, name, event, index) {
    this.data[group][index].form[name].value = event;
  }

  close() {
    this.dialogRef.close(this.data);
  }

}
