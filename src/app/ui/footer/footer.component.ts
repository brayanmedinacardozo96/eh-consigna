import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  companyName = null;
  year = null;

  constructor() {
    this.companyName = environment.companyName;
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}
