import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Mensaje} from '../../ui/forms/m-dialog/dialog';
import { ValidationService } from '../../shared/services/validations.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../shared/services/api.service';
import { Scroll } from '../../ui/forms/scroll/scroll';
import { SnackBarClass } from '../../ui/snack-bar/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileValidationService } from '../../shared/services/file-validation.service';
import {ModalConfirmComponent} from "../../ui/forms/modal-confirm/modal-confirm.component";
import { TableManiobraComponent } from './table-maniobra/table-maniobra.component';
import { InputFileComponent } from './../../ui/forms/input-file/input-file.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-maniobra',
  templateUrl: './maniobra.component.html',
  styleUrls: ['./maniobra.component.scss']
})
export class ManiobraComponent implements OnInit {

  @Output() setRegistroManiobra = new EventEmitter();
  @Input() registroManiobra = [];
  @ViewChild(TableManiobraComponent) tableTrabajoManiobra: TableManiobraComponent;
  @ViewChild(InputFileComponent) inputFileComponent: InputFileComponent;
  
  constructor(
    public dialog: MatDialog,
    private validations: ValidationService,
    private apiService: ApiService,
    private fileValidation: FileValidationService,
    private dialogo: MatDialog,
    private api: ApiService,
    private notifier: NotifierService
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
      length: 500,
      required: true,
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
  fileName= '';
  inputFile: any;
  isDivVisible=true;
  fileUpload = {
    success: null,
    message: null,
    files: new FormData()
  };
  dataManiobra = [
    /* {
      id:null,
      descripcion: '',
      documento: '',

    }, */
  ];

  boton = {
    value: 'Adicionar',
    color: 'btn-primary',
  };



  ngOnInit(): void {

    this.form.consigna.value=8;
    // this.select();
  }

  setDataTable(data, event){
    this.dialogo
      .open(ModalConfirmComponent, {
      data: new Mensaje("Eliminar:","¿Está seguro de eliminar el registro?")
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.eliminar(event[1]);
      }
    });

    

    /* if (event[0] == 'select') {

       this.form.descripcion.value=event[1].descripcion;
       this.form.id.value=event[1].id;
       this.isDivVisible=false;
       this.boton.color = "btn-success";
       this.boton.value = "Actualizar";
       new Scroll('0');
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

    } */

  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async select() {
    const response = await this.apiService.get(
      `${environment.apiBackend}/maniobra/getManiobra/${this.form.consigna.value}`
    );

    if (response.success) {
      this.dataManiobra = response.data;
    }else{
      this.notifier.notify('warning', response.message);
    }
  }

  adicionar() {
    var response;
    var message = 'Faltan campos a diligenciar.';
    let success = false;
    this.fileUpload = this.fileValidation.fileUp(this.inputFile);
    
    if (this.validateEmptyFields() && this.fileUpload.success) {
  
        success = true;
  
        let file = this.inputFile.target.files[0];
  
        let formData: FormData = new FormData();
        formData= this.fileUpload.files;
  
        formData = this.fileUpload.files;
        formData.append('form',JSON.stringify(this.form));
        formData.append('descripcion',JSON.stringify(this.form.descripcion.value));
        formData.append('consigna_id', JSON.stringify(this.form.consigna.value) );
        
        let document = this.inputFile.target.files[0].name.replace(/ /g,"-").toLowerCase().split('.');
  
        let obj = {
          id: null,
          consignacion_id: null,
          descripcion: this.form.descripcion.value,
          relacion: document[0],
          nombre_documento: this.inputFile.target.files[0].name,
          url_documento: null,
          file: this.inputFile.target.files[0]
        }

        this.registroManiobra.push(obj);    
        this.tableTrabajoManiobra.init(this.registroManiobra);
  
        this.setRegistroManiobra.emit(this.registroManiobra);
  
        this.limpiar();
      }
  
        /* if(this.boton.value == "Actualizar")
        {
  
            response = await this.apiService.post(
              `${environment.apiBackend}/maniobra/putManiobra`,
              {
                id:this.form.id.value,
                descripcion:this.form.descripcion.value,
                consignacion_id:this.form.consigna.value
              }
            );
  
            mensaje = ['Registro actualizado', 'btn-success'];
  
            this.evaluar(response, mensaje);
  
        }else{
  
          this.fileUpload = this.fileValidation.fileUp(this.inputFile);
  
          if (this.fileUpload.success) {
  
  
            let formData: FormData = new FormData();
            formData= this.fileUpload.files;
  
            formData = this.fileUpload.files;
            formData.append('form',JSON.stringify(this.form));
            formData.append('descripcion',JSON.stringify(this.form.descripcion.value));
            formData.append('consigna_id', JSON.stringify(this.form.consigna.value) );
  
              response = await this.apiService.post(
                `${environment.apiBackend}/maniobra/postManiobra`,
                formData
              );
  
              mensaje = ['Guardado con éxito', 'btn-primary'];
  
              this.evaluar(response, mensaje);
  
          }
  
        } */

    if(!success){
      this.notifier.notify('warning', message);
    }
  }

  async testManiobra(){
    let formData: FormData = new FormData();
    let response = this.guardar();

    formData = response.formData;

    const responseManiobra = await this.api.post(
      `${environment.apiBackend}/maniobra/postManiobra`,
      formData
    );
  }

  guardar(){
    let response = {
      formData: new FormData(),
      success: true,
      message: null
    }

    for(let value of this.registroManiobra){
      response.formData.append("file-"+value.relacion,value.file);
    }

    response.formData.append('form',JSON.stringify(this.registroManiobra));
    return response;
  }

  /* async eliminar(key) {
    var mensaje = [];
    var response = await this.apiService.post(`${environment.apiBackend}/maniobra/deleteManiobra`, {
      id: key.id,
      consignacion_id:key.consignacion_id,
      url_documento:key.url_documento
    });

    mensaje = ["Registro eliminado", "btn-default"];

    this.evaluar(response, mensaje);

  } */

  validateEmptyFields() {
    let success = true;

    if (!this.validations.validateEmptyFields(this.form).success) {
      success = false;
    }

    return success;
  }

  limpiar() {
    this.boton = {
      value: "Adicionar",
      color: "btn-primary"
    }
    this.isDivVisible=true;
    new Scroll('0');
    this.validations.cleanFields(this.form);
    // this.fileValidation.fileUp(this.inputFile);
    this.inputFile = undefined;
    this.inputFileComponent.setFileName('');
  }

  setInput(event){
    this.inputFile = event;
  }

  eliminar(key){
    for(let i in this.registroManiobra){
      if(this.registroManiobra[i].url_documento == key.url_documento && this.registroManiobra[i].consignacion_id == key.consignacion_id){
        this.registroManiobra.splice(parseInt(i,10),1);
        this.tableTrabajoManiobra.init(this.registroManiobra);
        return;
      }
    }    
  }

  setDataRegistroManibra(data){
    this.registroManiobra = data;
    this.tableTrabajoManiobra.init(this.registroManiobra);
  }

  cleanAllFields(){
    this.registroManiobra = [];
    this.tableTrabajoManiobra.init(this.registroManiobra);
    this.limpiar();
  }

}
