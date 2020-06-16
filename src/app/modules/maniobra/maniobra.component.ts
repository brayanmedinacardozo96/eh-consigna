import { Component, OnInit } from '@angular/core';
import {MDialogComponent} from '../../ui/forms/m-dialog/m-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Mensaje} from '../../ui/forms/m-dialog/dialog';
import {TableManiobraComponent} from './table-maniobra/table-maniobra.component';
import { ValidationService } from '../../shared/services/validations.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../shared/services/api.service';
import { Scroll } from '../../ui/forms/scroll/scroll';
import { SnackBarClass } from '../../ui/snack-bar/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileValidationService } from '../../shared/services/file-validation.service';
import {ModalConfirmComponent} from "../../ui/forms/modal-confirm/modal-confirm.component";

@Component({
  selector: 'app-maniobra',
  templateUrl: './maniobra.component.html',
  styleUrls: ['./maniobra.component.scss']
})
export class ManiobraComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private validations: ValidationService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private fileValidation: FileValidationService,
    private dialogo: MatDialog,
    ) { }


  form = {
    id: {
      value: null,
    },
    descripcion: {
      label: 'Descripción',
      name: 'descripcion',
      value: null,
      messages: null,
      required: false,
    },
    url_documento:{
      value: null,
    },
    consigna:{
      label: 'Consigna',
      name: 'consigna',
      value: null,
      messages: null,
      required: false,
    }
  }
  inputFile: any;
  fileUpload = {
    success: null,
    message: null,
    files: new FormData()
  };
  dataManiobra = [
    {
      descripcion: '',
      documento: '',

    },
  ];

  boton = {
    value: 'Guardar',
    color: 'btn-primary',
  };



  ngOnInit(): void {

    this.form.consigna.value=8;
    this.select();
  }

  setDataTable(data, event){

    if (event[0] == 'select') {

    }

    if (event[0] == 'delete') {

      this.dialogo
      .open(ModalConfirmComponent, {
        data: new Mensaje("Eliminar:","Este registro.")
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminar(event[1]);
        }
      });

    }

  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async select() {

    const response = await this.apiService.get(
      `${environment.apiBackend}/maniobra/getManiobra/${this.form.consigna.value}`
    );

    if (response.message == null) {

      this.dataManiobra = response.data;

    }
  }

  async guardar() {

    this.fileUpload = this.fileValidation.fileUp(this.inputFile);

    if (this.validateEmptyFields() &&  this.fileUpload.success) {


      let formData: FormData = new FormData();
      formData= this.fileUpload.files;

      formData = this.fileUpload.files;
      formData.append('form',JSON.stringify(this.form));
      formData.append('descripcion',JSON.stringify(this.form.descripcion.value));
      formData.append('consigna_id', JSON.stringify(this.form.consigna.value) );

      var response;
      var mensaje = [];

      if (this.boton.value == 'Guardar') {
        response = await this.apiService.post(
          `${environment.apiBackend}/maniobra/postManiobra`,
          formData
        );
        mensaje = ['Guardado con éxito', 'btn-primary'];
      } else {
        response = await this.apiService.post(
          `${environment.apiBackend}/maniobra/putManiobra`,
          formData
        );
        mensaje = ['Registro actualizado', 'btn-success'];
      }

      this.evaluar(response, mensaje);
    }
  }

  async eliminar(key) {
    var mensaje = [];
    var response = await this.apiService.post(`${environment.apiBackend}/maniobra/deleteManiobra`, {
      id: key.id,
      consignacion_id:key.consignacion_id
    });

    mensaje = ["Registro eliminado", "btn-default"];

    this.evaluar(response, mensaje);

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
      this.dataManiobra = response.data;
      this.limpiar();
    } else {
      mensaje = ['Algo ha ocurrido.', 'btn-danger'];
    }

    new SnackBarClass(this.snackBar, mensaje[0], mensaje[1]).openSnackBar();
  }

  limpiar() {
    this.form.descripcion.value = '';
    this.form.url_documento.value = '';
    this.boton = {
      value: "Guardar",
      color: "btn-primary"
    }
    new Scroll('0');
  }

  setInput(event){
    this.inputFile = event;
  }

}
