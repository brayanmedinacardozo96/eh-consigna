import { Component, OnInit, Inject } from '@angular/core';
import { ValidationService } from './../../../../shared/services/validations.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { SnackBarService } from './../../../../shared/services/snack-bar.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {};
import { SessionService } from './../../../../shared/services/session.service';
import { DateValidationervice } from './../../../../shared/services/date-validations.service';

@Component({
  selector: 'app-consigna-new-search',
  templateUrl: './consigna-new-search.component.html',
  styleUrls: ['./consigna-new-search.component.scss']
})
export class ConsignaNewSearchComponent implements OnInit {

  form = {
    numeroConsigna:{
      label: 'Consecutivo',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: false,
    },
    codigoEstadoConsigna:{ //consultar unicamente las solicitadas
      value: 'S'
    },
    ejecutadoCompletamente: {
      value: null
    },
    consigna_padre_id: {
      value: 'null'
    }
  }
  data = [];
  listaElemento = [];
  nombreTipoFormato = '';
  descripcion = '';
  codigoTipoFormato = null;

  constructor(private validations: ValidationService,
              private api: ApiService,
              private snackBar: SnackBarService,
              public dialogRef: MatDialogRef<ConsignaNewSearchComponent>,
              @Inject(MAT_DIALOG_DATA) public dataDialog: DialogData,
              private session: SessionService,
              private dateValidation: DateValidationervice,
    ) { 
      this.init(dataDialog)
    }

  ngOnInit(): void {
  }

  init(data){
    this.codigoTipoFormato = data;
    this.getDescripcionFormato(data);
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async search(){
    //identificar si es una consigna hija o trabajo de oportunidad
    if(this.codigoTipoFormato == 'CH'){
      this.form.codigoEstadoConsigna.value = 'E';
      this.form.ejecutadoCompletamente.value = 0;
    }else{
      this.form.codigoEstadoConsigna.value = 'S';
      this.form.ejecutadoCompletamente.value = null;
    }

    const responseValidate = this.validations.validateACompleteField(this.form);
    if(responseValidate.success){
      this.listaElemento = [];
      this.data = [];
      const response = await this.api.post(`${environment.apiBackend}/consigna/get-list`, this.form);
      if(response.success){
        this.data = response.data;
        if(this.data.length < 1){
          this.snackBar.alert('No se encontraron registros con los parámetros consultados.',5000);
        }

        if(response.lista_elemento != undefined){
          for(let value of response.lista_elemento){
            const elemento = {
              id:               {value: value.id},
              tipoElemento:     {name: value.elemento.tipo_elemento.nombre,                                     value: value.elemento.tipo_elemento.id},
              elemento:         {name: value.elemento.nombre,                                                   value: value.elemento.id},
              ramal:            {name: value.ramal == '1' ? 'Si' : 'No',                                        value: value.ramal},
              afectaUsuarios:   {name: value.afecta_usuarios == '1' ? 'Si' : 'No',                              value: value.afecta_usuarios},
              fechaInicio:      {name: this.dateValidation.getYearMounthDay(new Date(value.fech_inicio_prog)),  value: value.fech_inicio_prog },
              horaInicio:       {name: value.hora_inicio_prog,                                                  value: value.hora_inicio_prog },
              fechaFinal:       {name: this.dateValidation.getYearMounthDay(new Date(value.fech_final_prog)),   value: value.fech_final_prog},
              horaFinal:        {name: value.hora_final_prog,                                                   value: value.hora_final_prog},
              jsonAreaAfectada: {name:'jsonAreaAfectada',                                                       value: value.json_area  },
              jsonPersona:      {name:'jsonPersona',                                                            value: response.data[0].json_persona},
              jsonElementoMapa: {name:'jsonElementoMapa',                                                       value: value.json_elemento_mapa}
            }
            this.listaElemento.push(elemento);
          }
        }
      }

    }
  }

  okClick(){
    this.dialogRef.close({data:this.data, listaElemento: this.listaElemento});
  }

  getDescripcionFormato(data){
    var tipoFormato = this.session.getItem('tipoFormatoConsigna');
    for(let value of tipoFormato){
      if(value.codigo == data){
        this.descripcion = value.descripcion;
        this.nombreTipoFormato = 'Para '+value.nombre;
      }
    }
  }


}