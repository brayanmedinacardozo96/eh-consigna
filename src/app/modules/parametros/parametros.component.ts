import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss']
})
export class ParametrosComponent implements OnInit {

  constructor() { }

  data="";

  ngOnInit(): void {
  }

  estado(event)
  {
    this.data=event.tab.textLabel;
  }
}
