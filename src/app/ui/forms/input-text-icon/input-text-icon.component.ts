import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-text-icon',
  templateUrl: './input-text-icon.component.html',
  styleUrls: ['./input-text-icon.component.scss']
})
export class InputTextIconComponent implements OnInit {

  @Input() label;
  @Input() value;
  @Input() name;
  @Input() icon;
  @Input() messages;
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
