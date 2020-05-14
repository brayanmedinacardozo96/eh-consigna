import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-box-alert-error',
  templateUrl: './box-alert-error.component.html',
  styleUrls: ['./box-alert-error.component.scss']
})
export class BoxAlertErrorComponent implements OnInit {

  @Input() message;
  @Output() messageOut = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
