import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {AppDateAdapter, APP_DATE_FORMATS} from '../../../shared/format-datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    {provide: DateAdapter, useClass: AppDateAdapter},
  ]
})
export class DatepickerComponent implements OnInit {

  @Input() label;
  @Input() value;
  @Input() name;
  @Input() messages;
  @Input() style;
  @Input() id;
  @Input() required;
  @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  change(){
    console.log(this.value)
    let day: string = this.value.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month: string = (this.value.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    let year = this.value.getFullYear();
    let date = `${year}-${month}-${day}`;
    this.value = date;
    console.log(this.value)
  }

  first(event, x= null) {
    let day: string = event.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month: string = (event.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    let year = event.getFullYear();
    let date = `${year}-${month}-${day}`;
    this.value = date;

    this.valueChange.emit(this.value);
    
  }
}
