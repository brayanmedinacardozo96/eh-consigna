import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ApiService} from "../../../shared/services/api.service";
import {NotifierService} from "angular-notifier";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-bitacora-list',
  templateUrl: './bitacora-list.component.html',
  styleUrls: ['./bitacora-list.component.scss']
})
export class BitacoraListComponent implements OnInit {

  @Input() data;

  constructor(private dialogConfirm: MatDialog,
              private api: ApiService,
              private notifier: NotifierService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  async verElementos(obj) {
    
  }

  verDocumentos(obj) {
    
  }


}
