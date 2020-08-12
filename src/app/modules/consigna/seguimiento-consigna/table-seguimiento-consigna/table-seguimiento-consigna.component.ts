import { Component, OnInit,ViewChild,Output,EventEmitter,Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {environment} from '../../../../../environments/environment';
import {SnackBarClass} from '../../../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-table-seguimiento-consigna',
  templateUrl: './table-seguimiento-consigna.component.html',
  styleUrls: ['./table-seguimiento-consigna.component.scss']
})
export class TableSeguimientoConsignaComponent implements OnInit {

  constructor( 
    private snackBar: MatSnackBar,
    private api: ApiService
    ) { }
  
  displayedColumns: string[] = ['codigo','fecha_solicitud','fecha', 'usuario', 'observacion','html'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() valueChange = new EventEmitter();
  @Input() set data(data: []) {
    this.init(data);
  }

  ngOnInit(): void {
  }

  init(data) {
    // console.log(data);
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
        new SnackBarClass(this.snackBar,'Ocurrió un error, por favor vuelva a intentarlo o contáctese con el administrador.', 'btn-warning').openSnackBar();
      }
  }

}
