import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { Mensaje } from '../../ui/forms/m-dialog/dialog';
import { ApiService } from '../../shared/services/api.service';
import { ValidationService } from '../../shared/services/validations.service';
import { Scroll } from '../../ui/forms/scroll/scroll';
import { SnackBarClass } from '../../ui/snack-bar/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ModalConfirmComponent} from "../../ui/forms/modal-confirm/modal-confirm.component";


@Component({
  selector: 'app-trabajo-oportunidad',
  templateUrl: './trabajo-oportunidad.component.html',
  styleUrls: ['./trabajo-oportunidad.component.scss'],
})
export class TrabajoOportunidadComponent implements OnInit {


  constructor(
    private dialogo: MatDialog,
    private apiService: ApiService,
    private validations: ValidationService,
    private snackBar: MatSnackBar
  ) {}

  panelOpenState = false;
  customCollapsedHeight: string = '25px';
  customExpandedHeight: string = '25px';

  form = {
    id: {
      value: null,
    },
    trabajo: {
      label: 'Trabajos',
      name: 'trabajo',
      value: null,
      messages: null,
      required: true,
    },
    medidaSeguridad: {
      label: 'Medidas de seguridad',
      name: 'medidaSeguridad',
      value: null,
      messages: null,
      required: true,
    },
    jefeTrabajo: {
      label: 'Jefe de trabajos',
      name: 'jefeTrabajo',
      value: null,
      messages: null,
      required: true,
    },
    telefono: {
      label: 'Telefono',
      name: 'telefono',
      value: null,
      messages: null,
      required: true,
    },
    elemento: {
      lista_elemento_id: null,
      label: 'Elemento',
      name: 'elemento',
      value: null,
      messages: null,
      required: true,
    },
  };

  dataControls = {
    elemento: [{ nombre: '', lista_elemento_id: '' }],
  };

  dataTrabajo = [
    {
      elemento: '',
      trabajo: '',
      medida_seguridad: '',
      jefe_trabajo: '',
      telefono: '',
      lista_elemento_id:null,
      id:null,
      consignacion_id:null,
    },
  ];

  boton = {
    value: 'Guardar',
    color: 'btn-primary',
  };

  consignacion_id = 8;

  ngOnInit(): void {
    this.getElemento();
    this.select();
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  setDataTable(data, event) {

    if (event[0] == 'select') {
      this.form.id.value=event[1].id;
      this.form.trabajo.value = event[1].trabajo;
      this.form.medidaSeguridad.value =event[1].medida_seguridad;
      this.form.telefono.value = event[1].telefono;
      this.form.jefeTrabajo.value = event[1].jefe_trabajo;
      this.form.elemento.lista_elemento_id = event[1].lista_elemento_id;
      this.boton.color = "btn-success";
      this.boton.value = "Actualizar";
      new Scroll('0');
    }

    if(event[0]=="delete")
    {
      this.dialogo
      .open(ModalConfirmComponent, {
        data: new Mensaje("Eliminar:","Trabajo a realizar para el elemento "+ event[1].elemento)
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminar(event[1]);
        }
      });
    }

  }

  limpiar() {
    this.form.trabajo.value = '';
    this.form.medidaSeguridad.value = '';
    this.form.telefono.value = '';
    this.form.jefeTrabajo.value = '';
    this.form.elemento.value = '';
    this.boton = {
      value: "Guardar",
      color: "btn-primary"
    }
    new Scroll('0');
  }

  async getElemento() {
    const response = await this.apiService.get(
      `${environment.apiBackend}/trabajos-oportunidad/getTrabajoOportunidadElemento/${this.consignacion_id}`
    );

    if (response.message == null) {
      this.dataControls.elemento = response.data;
    }
  }

  async guardar() {
    if (this.validateEmptyFields()) {
      var obj = {
        id:this.form.id.value,
        consignacion_id: this.consignacion_id,
        trabajo: this.form.trabajo.value,
        medidaSeguridad: this.form.medidaSeguridad.value,
        jefeTrabajo: this.form.jefeTrabajo.value,
        telefono: this.form.telefono.value,
        lista_elemento_id: this.form.elemento.lista_elemento_id,
      };

      var response;
      var mensaje = [];

      if (this.boton.value == 'Guardar') {
        response = await this.apiService.post(
          `${environment.apiBackend}/trabajos-oportunidad/postTrabajoOportunidad`,
          obj
        );
        mensaje = ['Guardado con éxito', 'btn-primary'];
      } else {
        response = await this.apiService.post(
          `${environment.apiBackend}/trabajos-oportunidad/putTrabajoOportunidad`,
          obj
        );
        mensaje = ['Registro actualizado', 'btn-success'];
      }

      this.evaluar(response, mensaje);
    }
  }

  validateEmptyFields() {
    let success = true;

    if (!this.validations.validateEmptyFields(this.form).success) {
      success = false;
    }

    return success;
  }

  evaluar(response, mensaje) {
    if (response.message == null) {
      this.dataTrabajo = response.data;
      this.limpiar();
    } else {
      mensaje = ['Algo ha ocurrido.', 'btn-danger'];
    }

    new SnackBarClass(this.snackBar, mensaje[0], mensaje[1]).openSnackBar();
  }

  async select() {
    const response = await this.apiService.get(
      `${environment.apiBackend}/trabajos-oportunidad/getTrabajoOportunidad/${this.consignacion_id}`
    );

    if (response.message == null) {
      this.dataTrabajo = response.data;
    }
  }

  async eliminar(key) {
    var mensaje = [];
    var response = await this.apiService.post(`${environment.apiBackend}/trabajos-oportunidad/deleteTrabajoOportunidad`, {
      id: key.id,
      consignacion_id:key.consignacion_id
    });

    mensaje = ["Registro eliminado", "btn-default"];

    this.evaluar(response, mensaje);

  }
}
