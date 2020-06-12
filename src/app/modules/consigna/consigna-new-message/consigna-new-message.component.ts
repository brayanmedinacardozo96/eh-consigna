import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {};

@Component({
  selector: 'app-consigna-new-message',
  templateUrl: './consigna-new-message.component.html',
  styleUrls: ['./consigna-new-message.component.scss']
})
export class ConsignaNewMessageComponent implements OnInit {

  message = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    this.init(data)
  }

  ngOnInit(): void {
  }

  init(data) {
    this.message = data.response.message;
  }

}
