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
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-consigna-tabs',
  templateUrl: './consigna-tabs.component.html',
  styleUrls: ['./consigna-tabs.component.scss']
})
export class ConsignaTabsComponent implements OnInit {

  elementos = [];
  trabajosOportunidad = [];
  registroManiobra = [];
  action = 'Guardar';
  nameTab = 'Nueva';
  consignacionId = null;
  showBotonGuardar = true; 

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

  selectedIndexChange(event){
    if(event != 0){
      this.showBotonGuardar = false;
    }else{
      this.showBotonGuardar = true;
    }
  }

  async search(id){
    const response = await this.api.get(`${environment.apiBackend}/consigna/get/${id}`);
    this.consigna.dataControls.estadoConsigna = this.session.getItem('estadoConsigna');//obtener los estados de la consigna
    if(response.success){
      let dataResponse = response.data[0];
      //topologia inicio
      this.consigna.dataInputFile[0].fileUrl = 
        (dataResponse.url_topologia_inicio != null && dataResponse.url_topologia_inicio != undefined
          && dataResponse.url_topologia_inicio != '')
        ?dataResponse.url_topologia_inicio : '';
      let urlDocumento = this.consigna.dataInputFile[0].fileUrl.split('/');
      this.consigna.dataInputFile[0].fileName = 
        (urlDocumento[urlDocumento.length-1] != null && urlDocumento[urlDocumento.length-1] != undefined)
        ? urlDocumento[urlDocumento.length-1] : '';
      //topologia fin
      this.consigna.dataInputFile[1].fileUrl = 
      (dataResponse.url_topologia_fin != null && dataResponse.url_topologia_fin != undefined
        && dataResponse.url_topologia_fin != '')
      ?dataResponse.url_topologia_fin : '';;
      urlDocumento = this.consigna.dataInputFile[1].fileUrl.split('/');
      this.consigna.dataInputFile[1].fileName = 
        (urlDocumento[urlDocumento.length-1] != null && urlDocumento[urlDocumento.length-1] != undefined)
        ? urlDocumento[urlDocumento.length-1] : '';

      this.consigna.form.solicitante.label='Usuario';
      this.consigna.form.divisionArea.value = dataResponse.division_area_id != null ? parseInt(dataResponse.division_area_id): null;
      this.consigna.form.tipoZona.value = parseInt(dataResponse.zona_id);
      this.consigna.getSubestaciones(this.consigna.form.tipoZona.value);
      this.consigna.form.tipoSolicitud.value = parseInt(dataResponse.tipo_solicitud_id);
      this.consigna.form.fechaSolicitud.value = new Date(dataResponse.fecha_solicitud);
      this.consigna.form.tipoConsignacion.value = parseInt(dataResponse.tipo_consignacion_id);
      this.consigna.form.numeroConsigna.value = dataResponse.codigo;
      this.consigna.form.consecutivoSnc.value = dataResponse.codigo_snc;
      this.consigna.form.estadoConsigna.value = parseInt(dataResponse.estado_consignacion_id);
      this.consigna.form.estadoEquipo.value = parseInt(dataResponse.estado_equipo_id);
      this.consigna.form.subestacion.value = parseInt(dataResponse.lista_elemento[0].subestacion_id);
      this.consigna.getTipoElementos(this.consigna.form.subestacion.value);
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
      this.consigna.form.urlMapa.value = (dataResponse.url_mapa != null && dataResponse.url_mapa != undefined && dataResponse.url_mapa != '')
       ? JSON.parse(dataResponse.url_mapa) : [];
      //file Anexos
      if(dataResponse.url_anexos != null && dataResponse.url_anexos != undefined){
        this.consigna.fileAnexos.fileUrl = 
        (dataResponse.url_anexos != null && dataResponse.url_anexos != undefined) ? JSON.parse(dataResponse.url_anexos): null;
        if(this.consigna.fileAnexos.fileUrl.length > 0){
          this.consigna.fileAnexos.fileName = this.consigna.fileAnexos.fileUrl.length+' Documento(s) adjunto(s)';
        }
      }
      console.log(this.consigna.form.urlMapa.value);

      this.consigna.dataElementos = [];
      this.trabajosOportunidad = [];

      for(let value of dataResponse.lista_elemento){
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
          jsonPersona:      {name:'jsonPersona',                                                            value: dataResponse.json_persona},
          jsonElementoMapa: {name:'jsonElementoMapa',                                                       value: value.json_elemento_mapa}
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

      this.registroManiobra = [];
      for(let value of dataResponse.registro_maniobra){
        let urlManiobra = value.url_documento.split('/');
        let maniobra = {
          id: value.id,
          consignacion_id: value.consignacion_id,
          descripcion: value.descripcion,
          relacion: null,
          nombre_documento: urlManiobra[urlManiobra.length-1],
          url_documento: value.url_documento,
          file: null
        }
        this.registroManiobra.push(maniobra);
      }

      this.maniobra.setDataRegistroManibra(this.registroManiobra);
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

      if(this.registroManiobra.length > 0){
        formData = new FormData();
        let dataManiobra = this.maniobra.guardar();
        formData = dataManiobra.formData;

        let obj = {
          consignacion_id: response.consignacion_id,
          consigna_codigo: response.consecutivo,
        }
        formData.append('consigna',JSON.stringify(obj))
        
        const responseManiobra = await this.api.post(
          `${environment.apiBackend}/maniobra/postManiobra`,
          formData
        );

        if(!responseManiobra.success){
          this.snackBar.alert('Ocurrió un error guardando el registro de maniobra');
        }
        this.showDialog(response);
      }else{
        this.showDialog(response);
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

  setRegistroManiobra(data){
    this.registroManiobra = data;
  }

  showDialog(response){
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
  }

}
