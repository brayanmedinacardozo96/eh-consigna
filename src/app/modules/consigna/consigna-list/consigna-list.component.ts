import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import { ConsignaElementoListComponent } from './../consigna-elemento-list/consigna-elemento-list.component';
import { ConsignaTrabajoListComponent } from './../consigna-trabajo-list/consigna-trabajo-list.component';
import { ConsignaManiobraListComponent } from './../consigna-maniobra-list/consigna-maniobra-list.component';
import { ApiService } from 'src/app/shared/services/api.service';
import {Router} from "@angular/router";
import { SnackBarService } from './../../../shared/services/snack-bar.service';
import { ModalConfirmComponent } from './../../../ui/forms/modal-confirm/modal-confirm.component';
import { Mensaje } from './../../../ui/forms/m-dialog/dialog';
import {Aprobar} from '../../autorizar/aprobar';

@Component({
  selector: 'app-consigna-list',
  templateUrl: './consigna-list.component.html',
  styleUrls: ['./consigna-list.component.scss']
})
export class ConsignaListComponent implements OnInit {

  displayedColumns: string[] = ['numeroConsigna', 'consecutivoSnc', 'tipoZona', 'estadoConsigna','estadoEquipo', 'elementosConsignados', 'trabajosOportunidad', 'maniobras', 'acciones'];
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

  generatePdf(html){
     this.dialog
      .open(ModalConfirmComponent, {
        data: new Mensaje("Imprimir:","Desea imprimir la consigna ")
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
            this.showPdf(html);        
        }
      });
    
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

    if(result.length>0)
    {
      this.isVisible=true;
    }

  }

}
