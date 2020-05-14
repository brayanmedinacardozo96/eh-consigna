import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-box-alert-success',
  templateUrl: './box-alert-success.component.html',
  styleUrls: ['./box-alert-success.component.scss']
})
export class BoxAlertSuccessComponent implements OnInit {

  @Input() message;
  @Output() messageOut = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
