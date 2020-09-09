import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmDialogComponent, ConfirmDialogModel } from './../../../ui/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import { ApiService } from './../../../shared/services/api.service';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-consolidado-list',
  templateUrl: './consolidado-list.component.html',
  styleUrls: ['./consolidado-list.component.scss']
})
export class ConsolidadoListComponent implements OnInit {

  @Input() data;
  @Output() refresh = new EventEmitter();
  
  constructor(private dialogConfirm: MatDialog,
    private api: ApiService,
    private notifier: NotifierService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
