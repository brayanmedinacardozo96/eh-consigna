import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../shared/services/session.service';
import {ApiService} from '../../shared/services/api.service';
import {environment} from '../../../environments/environment';
import {ValidationService} from '../../shared/services/validations.service';
import {Auth} from '../../shared/auth';
import {User} from '../../shared/models/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Mensaje} from '../../ui/forms/modal-confirm/mensaje';
import {ModalConfirmComponent} from "../../ui/forms/modal-confirm/modal-confirm.component";
import {MDialogComponent} from "../../ui/forms/m-dialog/m-dialog.component"
import {MatDialog} from "@angular/material/dialog";
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';


@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.scss']
})
export class AutorizarComponent implements OnInit {

  user: User = Auth.getUserDataPerson();

  constructor(private activeRoute: ActivatedRoute,
              private session: SessionService,
              private api: ApiService,
              private validations: ValidationService,
              private notifier: NotifierService,
              private dialogo: MatDialog
  ) {
    this.activeRoute.params.subscribe(params => {


      if (params.id !== undefined && params.id !== null && params.id != "") {

        if(params.tipo=="v")
        {
          document.getElementById("vtoolbar").style.visibility='hidden';
        }

        if (isNaN(parseInt(params.id))) {
          this.buscarConsigna({numeroConsigna: {value: params.id}});
        } else {
          this.buscarConsigna({consignacion_id: {value: params.id}});
        }
      }


    });
  }

  urlAutoComletar = `${environment.apiBackend}/consigna/getAutoCompletarConsigna/S|R/null`;

  form = {
    id: {
      value: null
    },
    estado_actual: {
      value: null
    },
    numeroConsigna: {
      label: 'Consigna en estado de solicitud.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: true,
      url: this.urlAutoComletar,
      fechaSolicitud: null,
    },
    usuario: {
      id: null,
      label: 'Autorizador',
      name: 'autorizador',
      value: null,
      messages: null,
      required: true,
      disable: true,
    },
    observacion: {
      label: 'Observaci??n',
      name: 'observacion',
      value: null,
      messages: null,
      required: true,
      length: 1000,
      disable: true,
    },
    estadoConsigna: {
      label: 'Estado consigna',
      name: 'estadoConsigna',
      value: null,
      messages: null,
      required: true,
      valor: null,
      disabled: false,
    },
    causalEstado: {
      label: 'Causa',
      name: 'causalEstado',
      value: null,
      messages: null,
      required: false,
      valor: null
    },
    fechaSolicitud: {
      label: 'Fecha ejecuci??n',
      name: 'fechaSolicitud',
      value: null,
      messages: "",
      required: false,
    },
  }

  dataControls = {
    estadoConsigna: [],
    causalEstado: []
  }

  dataElementoCalidad = [
    {elemento: "xxx", sDesconexion: "100", desMax: "10", feMax: "10", deHora: "10", feHora: "10"}
  ]
  valor = null;
  viewList = false;
  data = [];
  permitir = true;
  tipo_solicitud = "";
  causal = false;
  plazoReprogramar=null;


  ngOnInit(): void {

    this.form.usuario.id = this.user.id;
    let nombreUsuario = `${this.user.first_name} `;
    nombreUsuario += `${this.user.second_name != null && this.user.second_name != undefined && this.user.second_name != '' ? this.user.second_name : '' } `;
    nombreUsuario += `${this.user.first_lastname != null && this.user.first_lastname != undefined && this.user.first_lastname != '' ? this.user.first_lastname : '' } `;
    nombreUsuario += `${this.user.second_lastname != null && this.user.second_lastname != undefined && this.user.second_lastname != '' ? this.user.second_lastname : ''}`;

    this.form.usuario.value = nombreUsuario;
    this.getDataSelectConsigna();
    this.session.remove('estadoConsigna');

  }

  limpiar() {
    this.data = [];
    this.form.numeroConsigna.value = null;
    this.form.observacion.value = null;
    this.form.estadoConsigna.value = null;
    this.form.estadoConsigna.messages = null;
    this.form.observacion.messages = null;
    this.form.estadoConsigna.disabled=false;
    this.causal=false;
    this.dataControls.causalEstado=[];

  }

  setData(name, event) {
    this.form[name].value = event;
    this.validarFecha( this.form[name],event);

  }

  validarFecha(item,event)
  {
    var t=moment().format('YYYY-MM-DD');
    var fecha = moment(t);
    var plazo = moment(event, 'YYYY-MM-DD');

    if (item.name == "fechaSolicitud") {
      if (plazo < fecha) {
        item.messages = "Fecha es menor a la actual"
      } else {
        item.messages = "";
      }

      if (this.plazoReprogramar != null) {
        var fe = fecha.year() + '-0' + (fecha.month() + 1) + '-' + this.plazoReprogramar;
        if (plazo > moment(fe)) {
          item.messages = "Fecha l??mite para reprogramar es " + fe;
        }
      }
    }
  }

  async getCausal() {
    const response = await this.api.get(`${environment.apiBackend}/consigna/getCausal`);
    if (response.success) {
      this.dataControls.causalEstado = response.data;
    }else{
      this.notifier.notify('warning', response.message);
    }
  }

  async getPlazoReprogramada(){
    const response = await this.api.get(`${environment.apiBackend}/parametro/getPlazoReprogramada`);
    if (response.success) {
       this.plazoReprogramar = response.data;
    }else{
      this.notifier.notify('warning', response.message);
    }
  }


  setDataEstado(name, event) {

    this.form[name].value = event;

    var estado = this.dataControls.estadoConsigna.filter(b => {
      return (b.id == event)
    });
    
    this.valor = estado[0].valor;
    this.validarEstados(estado);

    this.causal = false;
    this.form.causalEstado.required = false;
    if (estado[0].nombre == "Cancelada") {
      this.form.causalEstado.required = true;
      this.causal = true;
      this.getCausal();
    }

    if(estado[0].nombre == "Reprogramada")
    {
      this.getPlazoReprogramada();
    }

  }

  
  validarEstados(estado) {

    this.permitir = true;

    if (this.tipo_solicitud == "Emergencia") {
      return;
    }
   
    if (this.valor != null) {

      var plazo = moment(this.form.numeroConsigna.fechaSolicitud).add(-this.valor, 'days').format('YYY-MM-DD');
      var fecha = moment().format('YYYY-MM-DD');

       var tfecha = moment(fecha);
       var tplazo = moment(plazo);
      if (tfecha > tplazo) {
        this.permitir = false;
        this.dialogo
          .open(MDialogComponent, {
            data: new Mensaje("Consigna", `El tiempo para el estado ${estado[0].nombre} ha terminado. Plazo m??ximo era hasta ${plazo} `)
          });
      }
    }


  }

  setSelect() {
    var result = this.session.getItem('estadoConsigna').filter(b => {
      return (b.codigo == "A" || b.codigo == "R" || b.codigo == "C")
    });
    this.dataControls.estadoConsigna = result;
  }

  async getDataSelectConsigna() {
    if (this.session.getItem('estadoConsigna') == null) {
      const response = await this.session.getDataSelectConsigna();
      if (response.success) {
        this.setSelect();
      }
    } else {
      this.setSelect();
    }
  }

  async buscarConsigna(params) {
    this.data = [];

    const response = await this.api.post(`${environment.apiBackend}/consigna/get-list-aprobar`, params);
    if (response.success && response.data.length > 0) {
      this.permitir = true;
      this.viewList = true;
      this.data = response.data;
      this.form.numeroConsigna.value = this.data[0].codigo;
      this.form.id.value = this.data[0].consignacion_id;
      this.form.estado_actual.value = this.data[0].estado_id;
      this.form.numeroConsigna.fechaSolicitud = this.data[0].fecha_solicitud;
      this.tipo_solicitud = this.data[0].tipo_solicitud;
      this.form.estadoConsigna.disabled = false;

      if (this.data[0].estado_consigna != "Solicitada" && this.data[0].estado_consigna != "Reprogramada" &&  this.data[0].estado_consigna != "Aprobada") {
        this.permitir = false;
        this.form.estadoConsigna.disabled=true;
        this.notifier.notify('warning', 'Acci??n no permitida para esta consigna.');
      }

    }else{
      this.notifier.notify('warning', 'No se encontraron registros.');
    }
  }

  guardar() {
    var textEstado = ((document.getElementById("ddlEstadoConsigna")) as HTMLSelectElement).textContent;

    if (textEstado == "Reprogramada") {
      this.form.fechaSolicitud.required = true;
      if (this.form.fechaSolicitud.messages != "") {
        return;
      }
    }

    if (this.validateEmptyFields()) {

      this.dialogo
        .open(ModalConfirmComponent, {
          data: new Mensaje("Consigna # " + this.form.numeroConsigna.value, "Cambiar el estado a: " + textEstado)
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.realizarCambio(textEstado);
          }
        });

    }

  }

  validateEmptyFields() {

    let success = true;

    if (!this.validations.validateEmptyFields(this.form).success) {
      success = false;
    }

    return success;
  }

  async realizarCambio(textEstado = null) {

    if (textEstado == "Cancelada") { // Se verifica si existen consignas hijas o trabajos de oportunidad

      const response = await this.api.post(`${environment.apiBackend}/consigna/validar-consignas-hijas`, {consignacion_id: this.form.id.value});
      if (response.success) {
        if (response.hijas.length > 0) { // Si la consigna tiene otras consignas hijas
          this.dialogo
            .open(ModalConfirmComponent, {
              data: new Mensaje("Confirmar", response.message)
            })
            .afterClosed()
            .subscribe((confirmado: Boolean) => {
              if (confirmado) {

                this.actualizarEstado(this.form.id.value); // Actualizo el padre

                for (let id of response.hijas) { // Actualizo las hijas
                  this.actualizarEstado(id);
                }

                this.notifier.notify('success', 'Se realizo el cambio de estado de forma exitosa.');
                this.limpiar();

              }
            });
        } else {

          this.actualizarEstado(this.form.id.value).then();

        }
      }


    }

    if (textEstado != "Cancelada") {
      this.actualizarEstado(this.form.id.value).then();
    }

  }

  async actualizarEstado(id) {

    let params = {
      estado_consignacion_id: this.form.estadoConsigna.value,
      id: id,
      usuario_id: this.form.usuario.id,
      usurioNombre: this.form.usuario.value,
      observacion: this.form.observacion.value,
      estado_actual: this.form.estado_actual.value,
      fechaSolicitud: moment(this.form.fechaSolicitud.value).format("YYYY/MM/DD"),
      fechaSolicitudActual: moment(this.form.numeroConsigna.fechaSolicitud).format("YYYY/MM/DD"),
      causal: this.form.causalEstado.value
    }

    const response = await this.api.post(`${environment.apiBackend}/consigna/putActualizarEstado`, params);
    if (response.success) {
      if (document.getElementById("vtoolbar").style.visibility == 'hidden') {
        document.getElementById("vtoolbar").style.visibility == "visible"
        window.close();
      }
      this.limpiar();
      this.notifier.notify('success', 'Se realizo el cambio de estado de forma exitosa.');
    }else{
      this.notifier.notify('warning', response.message);
    }
  }

  async buscar() {

    if (this.form.numeroConsigna.value !== undefined && this.form.numeroConsigna.value !== null && this.form.numeroConsigna.value != "") {
      this.buscarConsigna({numeroConsigna: {value: this.form.numeroConsigna.value}});
    }
  }

}
