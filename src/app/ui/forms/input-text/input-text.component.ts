import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() label;
  @Input() value;
  @Input() name;
  @Input() messages;
  @Input() style;
  @Input() disable;
  @Input() required;
  @Input() length;
  @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
