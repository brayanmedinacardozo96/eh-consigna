import {Component, Input, OnInit,ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {BitacoraDocumentosComponent} from "../bitacora-documentos/bitacora-documentos.component";
import {environment} from "../../../../environments/environment";
import {BitacoraElementosComponent} from "../bitacora-elementos/bitacora-elementos.component";
import {Router} from "@angular/router";
import { SessionService } from '../../../shared/services/session.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BitacoraSubelementosVistaComponent} from "../bitacora-subelementos-vista/bitacora-subelementos-vista.component";
import * as moment from 'moment';
import {SnackBarClass} from '../../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-bitacora-list',
  templateUrl: './bitacora-list.component.html',
  styleUrls: ['./bitacora-list.component.scss']
})
export class BitacoraListComponent implements OnInit {

  //@Input() data;
  @Input() set data(data: []) {
    this.init(data);
  }
  displayedColumns: string[] = ['tipo','codigo', 'circuito','elementos', 'fecha_solicitud','hora_inicio_prog', 'hora_inicio', 'hora_entrega', 'hora_devolucion', 'hora_maniobra','hora_fin','hora_final_prog','comentario','acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  colors;

  constructor(private dialogConfirm: MatDialog,
              private api: ApiService,
              private notifier: NotifierService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private session: SessionService,
              private router: Router) {
              
                
  }

  ngOnInit(): void {
    
  }

  init(data) {
    this.colors=JSON.parse(this.session.getItem("colorEjecucion"));
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async verElementos(obj) {
    
    const response = await this.api.get(`${environment.apiBackend}/bitacora/get-elementos/${obj.id}`);
    let data = [];
    if (response.success) {
      data = response.data;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 1300;
    dialogConfig.minHeight = 500;
    dialogConfig.data = data;
    this.dialog.open(BitacoraElementosComponent, dialogConfig);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ejecutar(value)
  {
    
    this.router.navigateByUrl(`bitacora/new/${value.codigo}`);
  }

  verDocumentos(obj) {

    const jsonFiles = JSON.parse(obj);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 800;
    dialogConfig.minHeight = 500;
    dialogConfig.data = jsonFiles;
    this.dialog.open(BitacoraDocumentosComponent, dialogConfig);

  }

  async showPdf(id){
    
    const response = await this.api.post(`${environment.apiBackend}/file/generate-pdf`, {consignacionId: id.id} );
      let success = response.success;
      let message = response.message;
      if(success){
        window.open(`${environment.urlFiles}/${response.path}`);
      }else{
        new SnackBarClass(this.snackBar,'Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.', 'btn-warning').openSnackBar();
      }
  }

  abrirSubelementos(obj) {

    if (!obj.json_elemento_intervenir) {
      this.notifier.notify('error', 'El elemento seleccionado no contiene subelementos.');
      return false;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 500;
    dialogConfig.minHeight = 650;
    dialogConfig.data = {
      data: obj.json_elemento_intervenir,
      
    };
    this.dialog.open(BitacoraSubelementosVistaComponent, dialogConfig);
  }

  abrirSubelementosCortoTiempo(obj) {

    if (!obj.json_elemento_intervenir_corto) {
      this.notifier.notify('error', 'El elemento seleccionado no contiene subelementos.');
      return false;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 500;
    dialogConfig.minHeight = 650;
    dialogConfig.data = {
      data: obj.json_elemento_intervenir_corto,
    };
    this.dialog.open(BitacoraSubelementosVistaComponent, dialogConfig);
  }

  vencio(horaFinal)
  {

   var retorno='';
   var actual= moment().format('YYYY/MM/DD, HH:mm:ss');
   var fechaFinal=`${moment().format('YYYY/MM/DD')}, ${horaFinal}`;
   var a = new Date( actual );
   var b = new Date( fechaFinal );
   var result=(b.getHours()-a.getHours());
   
   if(result<=0)
   {
     retorno=this.colors.vencida;
   }

   if(result==1)
   {
    var resultm=a.getMinutes()-b.getMinutes();
    if(resultm>=30)
    {
      retorno=this.colors.cierre30;
    }
    if(resultm>=45)
    {
      retorno=this.colors.cierre15;
    }
  
   }
   
    return retorno;
  } 

  comentario(row)
  {
    if(row.estado=="Solicitada")
    {
       return "No aprobada";
    }else{
      return row.comentario;
    }
  
  }

  cambiarEstado(row)
  {
    window.open(`${environment.urlapp}autorizar/${row.id}/v`,"MsgWindow", "width=1200,height=600");
  }

}
