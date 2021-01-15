import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import { ConsignaElementoListComponent } from './../consigna-elemento-list/consigna-elemento-list.component';
import { ConsignaTrabajoListComponent } from './../consigna-trabajo-list/consigna-trabajo-list.component';
import { ConsignaManiobraListComponent } from './../consigna-maniobra-list/consigna-maniobra-list.component';
import { ConsignaListDocumentsComponent } from './../consigna-list-documents/consigna-list-documents.component';
import { ConsignaTerceroListComponent } from './../consigna-tercero-list/consigna-tercero-list.component';
import { ApiService } from 'src/app/shared/services/api.service';
import {Router} from "@angular/router";
import { SnackBarService } from './../../../shared/services/snack-bar.service';
import { ModalConfirmComponent } from './../../../ui/forms/modal-confirm/modal-confirm.component';
import { Mensaje } from './../../../ui/forms/m-dialog/dialog';
import {Aprobar} from '../../autorizar/aprobar';
import { Auth } from './../../../shared/auth';
import { User } from './../../../shared/models/user';

@Component({
  selector: 'app-consigna-list',
  templateUrl: './consigna-list.component.html',
  styleUrls: ['./consigna-list.component.scss']
})
export class ConsignaListComponent implements OnInit {
  number = Number;
  user: User = Auth.getUserDataPerson();

  displayedColumns: string[] = ['numeroConsigna', 'consecutivoSnc','fecha_creacion','fecha_solicitud', 'tipoFormato', 'tipoZona', 'estadoConsigna','estadoEquipo', 'tipo_consignacion', 'solicitante', 'consignaPadre', 'elementosConsignados', 'maniobras', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() set data(data: []) {
    this.init(data);
  }

  isVisible=false;

  constructor(private api: ApiService,
              public dialog: MatDialog,
              private router: Router,
              private snackBar: SnackBarService,
              private aprobar:Aprobar ) { }

  ngOnInit() {
    // this.init([]);
    this.consignaAprobar();
  }


  init(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    const response = await this.api.post(`${environment.apiBackend}/lista-elemento/get-list`, {consignaId: id});

    const dialogRef = this.dialog.open(ConsignaElementoListComponent,{
      width:'100%',
      data: {response}
    });

  }

  async showTrabajoOportunidad(id){
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-trabajo-list`,{consignaId: id})

    const dialogRef = this.dialog.open(ConsignaTrabajoListComponent,{
      width:'100%',
      data: {response}
    });
  }

  async showManiobra(id){
    const response = await this.api.post(`${environment.apiBackend}/consigna/get-registro-maniobra-list`,{consignaId: id})
    const dialogRef = this.dialog.open(ConsignaManiobraListComponent, {
      width:'100%',
      data: {response}
    });
  }

  generatePdf(id){
     this.dialog
      .open(ModalConfirmComponent, {
        data: new Mensaje("Imprimir:","Desea imprimir la consigna ")
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
            this.showPdf(id);
        }
      });

  }

  editarElemento(id){
    this.router.navigateByUrl('consigna/editar/'+id+"/n");
  }

  async showPdf(id){
    const response = await this.api.post(`${environment.apiBackend}/file/generate-pdf`, {consignacionId: id} );
      let success = response.success;
      let message = response.message;
      if(success){
        window.open(`${environment.urlFiles}/${response.path}`);
      }else{
        this.snackBar.alert('Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.',10000)
      }
  }


  aprobarConsigna(id){
    this.router.navigateByUrl('autorizar/'+id+'/n');
  }

  async consignaAprobar()
  {

    var result=this.aprobar.validarPermiso();

    if(result.length>0)
    {
      this.isVisible=true;
    }

  }

  async verDocumentos(id){
    const response = await this.api.get(`${environment.apiBackend}/consigna/get/${id}`);
    let success = response.success;
    let message = response.message;
    let dataListUrl = [];

    if(response.success){
      let dataResponse = response.data[0];
      let dataUrl = null;

      for(let value in dataResponse){
        if(value.includes('url') && value.toLowerCase() != 'url_mapa'){
          if(dataResponse[value] !=  null && dataResponse[value] != undefined){
            if(dataResponse[value].includes('[') && dataResponse[value].includes('[')){
              dataUrl = JSON.parse(dataResponse[value]);
              for(let url of dataUrl){
                dataListUrl.push(this.getListUrl(url,value));
              }
            }else{
              dataUrl = dataResponse[value];
              dataListUrl.push(this.getListUrl(dataUrl,value));
            }

          }
        }
      }

      for(let maniobra of dataResponse.registro_maniobra){
        for(let value in maniobra){
          if(value.includes('url')){
            if(maniobra[value] !=  null && maniobra[value] != undefined){
              dataUrl = maniobra[value];
              dataListUrl.push(this.getListUrl(dataUrl,'registro_maniobras'));
            }
          }
        }
      }
    }

    const dialogRef = this.dialog.open(ConsignaListDocumentsComponent, {
      width:'100%',
      data: {dataListUrl}
    });
  }

  recorrerUrl(){

  }

  getListUrl(data, type){
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
  }

  viewFormJefeZona(codigo){
    this.router.navigateByUrl('jefe-zona/autorizar/'+codigo);
  }

  async showSolicitadaTercero(id){
    const response = await this.api.get(`${environment.apiBackend}/consigna/get/${id}`);
    let success = response.success;
    let message = response.message;
    let dataListTercero = null;

    if(success){
      dataListTercero = response.data
      const dialogRef = this.dialog.open(ConsignaTerceroListComponent, {
        width:'100%',
        data: {dataListTercero}
      });
    }

  }

}
