import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  @Input() label;
  @Input() value;
  @Input() name;
  @Input() messages;
  @Input() style;
  @Input() disable;
  @Input() required;
  @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  change(){
  }

  setValue(data){
    this.value = data;
  }

}