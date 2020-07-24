import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import {environment} from '../../../../environments/environment';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Aprobar} from '../../autorizar/aprobar';
import { SnackBarService } from './../../../shared/services/snack-bar.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-consigna-solicitud-estado',
  templateUrl: './consigna-solicitud-estado.component.html',
  styleUrls: ['./consigna-solicitud-estado.component.scss']
})
export class ConsignaSolicitudEstadoComponent implements OnInit {

  number = Number;

  displayedColumns: string[] = ['codigo', 'fecha_solicitud','fecha_aprobar','fecha_reprogramar','fecha_cancelar','acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() set data(data: []) {
    this.init(data);
  }

  isVisible=false;
  fecha = moment().format("YYYY/MM/DD");

  constructor(private api: ApiService,
              public dialog: MatDialog,
              private router: Router,
              private snackBar: SnackBarService,
              private aprobar:Aprobar ) { }

  ngOnInit() {
    // this.init([]);
    //this.consignaAprobar();
  }


   init(data) {
     if (data.data != undefined) {
       this.consignaAprobar();
       var dt = this.validar(data);
       this.dataSource = new MatTableDataSource(dt);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     }
   }

  validar(data)
  {
    var parametro = data.parametro;
    var aprobada;
    var reprogramada;
    var cancelada;
    //SE REALIZA POR SI CAMBIA EL ORDEN DEL RESULT DEL API
    for (let index = 0; index < parametro.length; index++) {
      var element = parametro[index];
      switch (element.nombre) {
        case "Aprobada":
          aprobada = element.valor;
          break;
        case "Reprogramada":
          reprogramada = element.valor;
          break;
        case "Cancelada":
          cancelada = element.valor;
          break;
        default:
          break;
      }
    }


    var resultado=[];
    var fecha_aprobar;
    var fecha_reprogramar;
    var fecha_cancelar;

    for (let index = 0; index < data.data.length; index++) {
      var element = data.data[index];

       if(aprobada!=null && aprobada!="")
       {
          fecha_aprobar = moment(element.fecha_solicitud).add(-aprobada, 'days').format('YYYY/MM/DD');
       }
       if(reprogramada!=null && reprogramada!="")
       {
        fecha_reprogramar = moment(element.fecha_solicitud).add(-reprogramada, 'days').format('YYYY/MM/DD');
       }
       if(cancelada!=null && cancelada!="")
       {
        fecha_cancelar = moment(element.fecha_solicitud).add(-cancelada, 'days').format('YYYY/MM/DD');
       }

      resultado.push({
        id:element.id,
        codigo: element.codigo,
        fecha_solicitud: moment(element.fecha_solicitud).format('YYYY/MM/DD'),
        fecha_aprobar:fecha_aprobar,
        fecha_reprogramar:fecha_reprogramar,
        fecha_cancelar:fecha_cancelar
      })
      
    }

    return resultado;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openPdf(pathPdf) {
    window.open(`${environment.urlFiles}${pathPdf}`, '_blank');
  }

  async showElementoConsignado(id){
   

  }

  async showTrabajoOportunidad(id){
   
  }

  async showManiobra(id){
    
  }

  generatePdf(html){
     /*this.dialog
      .open(ModalConfirmComponent, {
        data: new Mensaje("Imprimir:","Desea imprimir la consigna ")
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
            this.showPdf(html);
        }
      });*/

  }

  editarElemento(id){
    this.router.navigateByUrl('consigna/editar/'+id);
  }

  async showPdf(html){
    const response = await this.api.post(`${environment.apiBackend}/file/generate-pdf`, {html: html} );
      let success = response.success;
      let message = response.message;
      if(success){
        window.open(`${environment.urlFiles}/${response.path}`);
      }else{
        this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
      }
  }


  aprobarConsigna(id){
    this.router.navigateByUrl('autorizar/'+id);
  }

  async consignaAprobar()
  {

    var result=this.aprobar.validarPermiso();
    console.log(result);
    if(result.length>0)
    {
      this.isVisible=true;
    }

  }



  /*getListUrl(data, type){
    type = type.replace(/^url_/, "");
    type = type.replace("_", " ");
    let response = {
      type: type.toUpperCase(),
      nameFile:'',
      url:''
    }
    
    let listUrl = data.split('/');
    response.nameFile = listUrl[listUrl.length-1];
    response.url = data;

    return response;
  }*/

}
