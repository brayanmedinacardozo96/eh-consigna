import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-password-icon',
  templateUrl: './input-password-icon.component.html',
  styleUrls: ['./input-password-icon.component.scss']
})
export class InputPasswordIconComponent implements OnInit {

  hide = true;

  @Input() label;
  @Input() value;
  @Input() name;
  @Input() messages;
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
