import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {};

@Component({
  selector: 'app-consolidado-comunicado-list',
  templateUrl: './consolidado-comunicado-list.component.html',
  styleUrls: ['./consolidado-comunicado-list.component.scss']
})
export class ConsolidadoComunicadoListComponent implements OnInit {

  contentComunicado = ''
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    this.init(data)
  }

  ngOnInit(): void {
  }

  init(data) {
    this.contentComunicado = data.comunicado
  }

}
