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
    ) { }

  consignacion_id = 8;

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
      descripcion: 'ok',
      documento: 'ok',

    },
  ];

  boton = {
    value: 'Guardar',
    color: 'btn-primary',
  };


  ngOnInit(): void {
  }

  setDataTable(data, event){

  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async guardar() {

    this.fileUpload = this.fileValidation.fileUp(this.inputFile);

    if (this.validateEmptyFields() &&  this.fileUpload.success) {

      let formData: FormData = new FormData();
      formData= this.fileUpload.files;

      var obj = {
        id:this.form.id.value,
        consignacion_id: this.consignacion_id,
        descripcion: this.form.descripcion.value,
        url_documento: formData,

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

}
