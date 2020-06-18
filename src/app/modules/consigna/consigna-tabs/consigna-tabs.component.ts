import { Component, OnInit, ViewChild } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ConsignaNewComponent } from './../consigna-new/consigna-new.component';
import { TrabajoOportunidadComponent } from './../../trabajo-oportunidad/trabajo-oportunidad.component';
import { ManiobraComponent } from './../../maniobra/maniobra.component';
import { ApiService } from './../../../shared/services/api.service';
import {environment} from '../../../../environments/environment';
import { DateValidationervice } from './../../../shared/services/date-validations.service';
import { MatDialog } from '@angular/material/dialog';
import { ConsignaNewMessageComponent } from './../consigna-new-message/consigna-new-message.component';
import { SnackBarService } from './../../../shared/services/snack-bar.service';
import { SessionService } from './../../../shared/services/session.service';


@Component({
  selector: 'app-consigna-tabs',
  templateUrl: './consigna-tabs.component.html',
  styleUrls: ['./consigna-tabs.component.scss']
})
export class ConsignaTabsComponent implements OnInit {

  elementos = [];
  trabajosOportunidad = [];
  action = 'Guardar';
  nameTab = 'Nueva';
  consignacionId = null;

  @ViewChild(ConsignaNewComponent) consigna: ConsignaNewComponent;
  @ViewChild(TrabajoOportunidadComponent) trabajoOportunidad : TrabajoOportunidadComponent;
  @ViewChild(ManiobraComponent) maniobra: ManiobraComponent;


  constructor(private activeRoute: ActivatedRoute,
    private api: ApiService,
    private dateValidation: DateValidationervice,
    private snackBar: SnackBarService,
    private router: Router,
    public dialog: MatDialog,
    private session: SessionService) {
    this.activeRoute.params.subscribe(params => {

      if (params.id !== undefined && params.id !== null) {
        this.consignacionId = params.id;
        this.action = 'Editar';
        this.nameTab = 'Editar';
        this.search(this.consignacionId).then();
      }

    });
   }

  ngOnInit(): void {
  }

  async search(id){
    const response = await this.api.get(`${environment.apiBackend}/consigna/get/${id}`);
    if(response.success){
      let dataResponse = response.data[0];
      this.consigna.fileUrl = dataResponse.url_diagrama;
      let urlDocument = this.consigna.fileUrl.split('/');
      this.consigna.form.solicitante.label='Usuario';

      this.consigna.form.tipoZona.value = parseInt(dataResponse.zona_id);
      this.consigna.form.tipoSolicitud.value = parseInt(dataResponse.tipo_solicitud_id);
      this.consigna.form.fechaSolicitud.value = new Date(dataResponse.fecha_solicitud);
      this.consigna.form.tipoConsignacion.value = parseInt(dataResponse.tipo_consignacion_id);
      this.consigna.form.numeroConsigna.value = dataResponse.codigo;
      this.consigna.form.consecutivoSnc.value = dataResponse.codigo_snc;
      this.consigna.form.estadoConsigna.value = parseInt(dataResponse.estado_consignacion_id);
      this.consigna.form.estadoEquipo.value = parseInt(dataResponse.estado_equipo_id);
      this.consigna.form.subestacion.value = parseInt(dataResponse.lista_elemento[0].subestacion_id);
      this.consigna.form.tipoMantenimiento.value = parseInt(dataResponse.tipo_mantenimiento_id);
      this.consigna.form.trabajoEfectuar.value = dataResponse.trabajo_efectuar;
      this.consigna.form.justificacion.value = dataResponse.justificacion;
      this.consigna.form.observacionOpeyman.value = dataResponse.observacion_opeyman;
      this.consigna.form.consignaOperativa.value = dataResponse.consigna_operativa;
      this.consigna.form.medidasSeguiridad.value = dataResponse.medida_seguridad;
      this.consigna.form.jefeTrabajo.value = dataResponse.jefe_trabajo;
      this.consigna.form.telefonoJefeTrabajo.value = dataResponse.telefono_jefe_trabajo;
      this.consigna.form.jefeTrabajoContratista.value = dataResponse.jefe_contratista;
      this.consigna.form.telJefeTrabajoContratista.value = dataResponse.telefono_jefe_contratista;
      this.consigna.form.moviles.value = dataResponse.movil;
      this.consigna.fileName = urlDocument[urlDocument.length-1];

      this.consigna.dataElementos = [];
      this.trabajosOportunidad = [];

      for(let value of dataResponse.lista_elemento){
        const elemento = {
          id:           {value: value.id},
          tipoElemento: {name: value.elemento.tipo_elemento.nombre,                                     value: value.elemento.tipo_elemento.id},
          elemento:     {name: value.elemento.nombre,                                                   value: value.elemento.id},
          ramal:        {name: value.ramal == '1' ? 'Si' : 'No',                                        value: value.ramal},
          fechaInicio:  {name: this.dateValidation.getYearMounthDay(new Date(value.fech_inicio_prog)),  value: value.fech_inicio_prog },
          horaInicio:   {name: value.hora_inicio_prog,                                                  value: value.hora_inicio_prog },
          fechaFinal:   {name: this.dateValidation.getYearMounthDay(new Date(value.fech_final_prog)),   value: value.fech_final_prog},
          horaFinal:    {name: value.hora_final_prog,                                                   value: value.hora_final_prog},
        }
        this.consigna.dataElementos.push(elemento);
        this.setElemento(elemento.elemento)

        if(value.trabajo_oportunidad.length > 0){
          for(let valueTrabajo of value.trabajo_oportunidad){

            let dataTrabajo = {
              id: valueTrabajo.id,
              consignacion_id: id,
              trabajo: valueTrabajo.trabajo,
              medida_seguridad: valueTrabajo.medida_seguridad,
              jefe_trabajo: valueTrabajo.jefe_trabajo,
              telefono: valueTrabajo.telefono,
              elemento_id: value.elemento.id,
              elemento: value.elemento.nombre //nombre del elemento
            }
            this.trabajosOportunidad.push(dataTrabajo);
          }         
        }

      }

      this.trabajoOportunidad.setDataTrabajosOportunidad(this.trabajosOportunidad);
    }
  }

  async saveConsigna(){
    let formData: FormData = new FormData();
       

    let dataConsigna = this.consigna.guardarConsigna();
    for (const key in dataConsigna) {
      if (dataConsigna.hasOwnProperty(key)) {
          if(key == 'success'){
            if(!dataConsigna[key]){
              return
            }
          }
          if(key == 'formData'){
            formData = dataConsigna[key]
          }else{
            formData.append(key,dataConsigna[key])
          }
      }
    }
    formData.append('trabajoOportunidad', JSON.stringify(this.trabajoOportunidad.getTrabajosOportunidad()));

    const response = await this.api.post(`${environment.apiBackend}/consigna/save-consigna`, formData);
    let success = response.success;
    let message = response.message;
    if(success){
      this.consigna.cleanAllFields();
      this.dialog.open(ConsignaNewMessageComponent,{
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop: false,
        data: {response}
      });
      //si es editar vuelve a redireccionar al inicio
      if(this.consignacionId != null){
        this.router.navigate(['consigna']);
        this.session.setItem('dataConsigna',null);
      }
    }else{
      this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
    }

  }

  setElemento(data){
    this.elementos.push(data);
  }

  setTrabajoOportunidad(data){
    this.trabajosOportunidad = data;
  }

}
