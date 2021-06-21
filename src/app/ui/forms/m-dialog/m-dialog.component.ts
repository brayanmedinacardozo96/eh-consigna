import { Component, OnInit,Inject } from '@angular/core';
import {Mensaje} from './dialog'
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HtmlParser } from '@angular/compiler';
import { from } from 'rxjs';

@Component({
  selector: 'app-m-dialog',
  templateUrl: './m-dialog.component.html',
  styleUrls: ['./m-dialog.component.scss']
})
export class MDialogComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<MDialogComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Mensaje ) {

    }
  
  ngOnInit(): void {
    
  }
  

}
