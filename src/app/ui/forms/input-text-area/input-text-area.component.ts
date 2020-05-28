import { Component,EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss']
})
export class InputTextAreaComponent implements OnInit {

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

}
