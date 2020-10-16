import { Component, OnInit,Input } from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {environment} from 'src/environments/environment';
import {SnackBarClass} from '../../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmComponent} from "../../../ui/forms/modal-confirm/modal-confirm.component";
import {Mensaje} from '../../../ui/forms/modal-confirm/mensaje';
import {ValidationService} from '../../../shared/services/validations.service';
import {Scroll} from '../../../ui/forms/scroll/scroll';

@Component({
  selector: 'app-parametros-registro',
  templateUrl: './parametros-registro.component.html',
  styleUrls: ['./parametros-registro.component.scss']
})
export class ParametrosRegistroComponent implements OnInit {


  @Input() set data(data: String) {
    if(data=="Parametros")
    {
      this.tipoParametro();
    }
  }

  constructor(private apiService: ApiService,
              private snackBar: MatSnackBar,
              private dialogo: MatDialog,
              private validations: ValidationService,
              ) {}



  form = {
    id: {
      value: null,
    },
    nombre: {
      label: 'Nombre',
      name: 'nombre',
      value: null,
      messages: null,
      length: 100,
      required: true,
    },
    descripcion: {
      label: 'Descripción',
      name: 'descripcion',
      value: null,
      messages: null,
      length: 1000,
      required: true,
    },tipo: {
      id:null,
      label: 'Tipo',
      name: 'tipo',
      value: null,
      messages: null,
      required: true,
    },codigo: {
      label: 'Código',
      name: 'codigo',
      value: null,
      messages: null,
      required: true,
      length: 10,
      disabled: false
    },
    valor: {
      label: 'Valor',
      name: 'valor',
      value: null,
      messages: null,
      length: 20,
      required: false,
    },
    abreviatura: {
      label: 'Abreviatura',
      name: 'abreviatura',
      value: null,
      messages: null,
      length: 20,
      required: false,
    }

  }

  dataControls = {
    tipo: [{
      nombre: "",
      id: ""
    }, ],
    data: [{
      tp_nombre:"",
      tipo:"",
      nombre: "",
      codigo: "",
      descripcion: "",
      valor:"",
      abreviatura:"",
    }]
  }

  boton = {
    value: "Guardar",
    color: "btn-primary"
  }

  ngOnInit(): void {
    this.select();
    this.tipoParametro();

  }

  setData(name, event) {
    this.form[name].value = event;
  }

  setDataTable(data, event) {


    if (event[0] == "select") {

      this.form.nombre.value = event[1].nombre;
      this.form.descripcion.value = event[1].descripcion;
      this.form.id = event[1].id;
      this.form.tipo.id= parseInt( event[1].tp_id );
      this.form.codigo.value=event[1].codigo;
      this.form.valor.value=event[1].valor;
      this.form.tipo.value=parseInt( event[1].tp_id );
      this.form.abreviatura.value = event[1].abreviatura;
      this.boton.color = "btn-success";
      this.boton.value = "Actualizar";
      this.form.codigo.disabled=true;
      new Scroll("0");
    }

    if (event[0] == "delete") {
      this.dialogo
        .open(ModalConfirmComponent, {
          data: new Mensaje("Eliminar:", event[1].nombre)
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.eliminar(event[1]);
          }
        });

    }


  }

  async tipoParametro()
  {
    const response = await this.apiService.get(`${environment.apiBackend}/tipo-parametro/getTipoParametro`);

    if (response.length > 0) {
      this.dataControls.tipo = response;
    }
  }

  limpiar() {
    this.boton = {
      value: "Guardar",
      color: "btn-primary"
    }
    this.form.nombre.value = "";
    this.form.nombre.messages = "";
    this.form.descripcion.value = "";
    this.form.descripcion.messages="";
  //  this.form.tipo.id=null;
    this.form.tipo.messages="";
    this.form.codigo.value="";
    this.form.codigo.messages="";
    this.form.valor.value="";
    this.form.valor.messages="";
    this.form.abreviatura.messages="";
    this.form.abreviatura.value="";
    this.form.codigo.disabled=false;
    new Scroll("0");

  }


  async guardar() {

    if (this.validateEmptyFields()) {
      var obj = {
        id: this.form.id,
        nombre: this.form.nombre.value,
        descripcion: this.form.descripcion.value,
        tipo_parametro_id: this.form.tipo.id,
        codigo: this.form.codigo.value,
        valor:this.form.valor.value,
        abreviatura:this.form.abreviatura.value
      }

      var response;
      var mensaje = [];

      if (this.boton.value == "Guardar") {
        response = await this.apiService.post(`${environment.apiBackend}/parametro/postParametro`, obj);
        mensaje = ["Guardado con éxito", "btn-primary"];

        if(response.message!=null)
        {
          var codigo = response.message.split('-');
          if (codigo[0] == "961202") {
            response.message=null;
            mensaje[0] = codigo[1];
            mensaje[1]="btn-danger";
          }
        }
        

      } else {

        response = await this.apiService.post(`${environment.apiBackend}/parametro/putParametro`, obj);
        mensaje = ["Registro actualizado", "btn-success"];
  
      }

      this.evaluar(response.data, mensaje);
    }

  }

  async select() {

    var api = `${environment.apiBackend}/parametro/getParametro`;

    if(this.form.tipo.id!=null)
    {
       api = `${environment.apiBackend}/parametro/getParametro/${this.form.tipo.id}`;
       new Scroll("1000");

    }

    const  response = await this.apiService.get(api);

    if (response.messages==null) {
      this.dataControls.data = response.data;
    }

  }

  async eliminar(key) {
    var mensaje = [];

    var response = await this.apiService.post(`${environment.apiBackend}/parametro/deleteParametro`, {
      id: key.id,
      tipo_parametro_id:key.tp_id
    });

    mensaje = ["Registro eliminado", "btn-default"];

    this.evaluar(response.data, mensaje);

  }


  evaluar(response, mensaje) {

    if (response.message == null) {

      this.dataControls.data = response.data;
      this.limpiar();

    } else {
        mensaje = ["Algo ha ocurrido", "btn-danger"];
    }

    new SnackBarClass(this.snackBar, mensaje[0], mensaje[1]).openSnackBar();
    
  }

  validateEmptyFields() {

    let success = true;

    if (!this.validations.validateEmptyFields(this.form).success) {
      success = false;
    }

    return success;
  }



}
