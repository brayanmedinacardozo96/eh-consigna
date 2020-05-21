import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {AppDateAdapter, APP_DATE_FORMATS} from '../../../shared/format-datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class DatepickerComponent implements OnInit {

  @Input() label;
  @Input() value;
  @Input() name;
  @Input() messages;
  @Input() style;
  @Input() id;
  @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
}
