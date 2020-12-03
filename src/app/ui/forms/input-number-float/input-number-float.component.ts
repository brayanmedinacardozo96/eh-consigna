import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-input-number-float',
  templateUrl: './input-number-float.component.html',
  styleUrls: ['./input-number-float.component.scss']
})
export class InputNumberFloatComponent implements OnInit {

  
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
    var re = /^-?\d+(?:,\d+)?$/;
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
      }else{
        if (event[value] == ".") {
          text += "."
        }
      }
    }

    console.log(text)
    this.value = text;
    $('#'+this.id).val(this.value);
    this.valueChange.emit(this.value);
  }

  

}
