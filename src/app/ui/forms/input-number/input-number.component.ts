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
  @Input() maxLength = null;
  @Input() required;
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  checkPattern(event){    
    var re = /^[0-9]+$/;
    var text = '';
    var count = 0

    for(let value in event){
      count += 1;
      if(re.test(event[value])){
        if(this.maxLength != null){
          if(count <= this.maxLength){
            text += event[value];
          }
        }else{
          text += event[value];
        }
      }
    }

    this.value = text;
    $('#'+this.id).val(this.value);
    this.valueChange.emit(this.value);
  }
}
