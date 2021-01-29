import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import { ConsignaElementoListComponent } from '../../consigna/consigna-elemento-list/consigna-elemento-list.component';
import { ConsignaTrabajoListComponent } from '../../consigna/consigna-trabajo-list/consigna-trabajo-list.component';
import { ConsignaManiobraListComponent } from '../../consigna/consigna-maniobra-list/consigna-maniobra-list.component';
import { ApiService } from 'src/app/shared/services/api.service';
import {SnackBarClass} from '../../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";

@Component({
  selector: 'table-aprobar-consigna',
  templateUrl: './table-aprobar-consigna.component.html',
  styleUrls: ['./table-aprobar-consigna.component.scss']
})
export class TableAprobarConsignaComponent implements OnInit {

  number = Number;
  displayedColumns: string[] = ['fecha_solicitud','numeroConsigna', 'consecutivoSnc', 'tipoZona', 'estadoConsigna','estadoEquipo', 'elementosConsignados', 'maniobras','html_documento'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() set data(data: []) {
    this.init(data);
  }

  isVisible=false;

  constructor(private api: ApiService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router,
             ) { }

  ngOnInit() {

  }


  init(data) {
    if (data != null) {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } 
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

  showUrl(url)
  {
    window.open(`${environment.urlFiles}/public/${url}`);
  }

  editarElemento(id){   
   window.open(`${environment.urlapp}/consigna/editar/${id}/v`,"MsgWindow", "width=1200,height=600");
  //this.router.navigateByUrl('consigna/editar/'+id);
  }

  generatePdf(id)
  {
    this.showPdf(id);
  }

  async showPdf(id){
    const response = await this.api.post(`${environment.apiBackend}/file/generate-pdf`, {consignacionId: id} );
      let success = response.success;
      let message = response.message;
      if(success){
        window.open(`${environment.urlFiles}/${response.path}`);
      }else{
        new SnackBarClass(this.snackBar,message, 'btn-warning').openSnackBar();
      }
  }


}
