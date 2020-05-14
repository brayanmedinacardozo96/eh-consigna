import {Component, OnInit} from '@angular/core';
import {GlobalConstants} from '../../shared/global-constants';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constants = GlobalConstants;

  constructor() {
  }

  ngOnInit(): void {
  }

}
