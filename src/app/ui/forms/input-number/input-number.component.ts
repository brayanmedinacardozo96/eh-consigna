import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {

  @Input() id;
  @Input() label;
  @Input() value;
  @Input() name;
  @Input() messages;
  @Input() style;
  @Input() required;
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  checkPattern(event){    
    var re = /^[0-9]+$/;
    var text = '';

    for(let value in event){
      if(re.test(event[value])){
        text += event[value];
      }
    }

    this.value = text;
    $('#'+this.id).val(this.value);
    this.valueChange.emit(this.value);
  }
}
