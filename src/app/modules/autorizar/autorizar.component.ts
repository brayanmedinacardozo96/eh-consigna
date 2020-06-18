import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.scss']
})
export class AutorizarComponent implements OnInit {


  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {

      if (params.id !== undefined && params.id !== null) {

      }

    });
   }

  form = {
    numeroConsigna: {
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: false,
      url: "https://jsonplaceholder.typicode.com/users"
    },
    usuario: {
      label: 'Autorizador',
      name: 'autorizador',
      value: "Brayan Herney Medina",
      messages: null,
      required: false,
      disable:true,
    },
    observacion: {
      label: 'Observación',
      name: 'observacion',
      value: "",
      messages: null,
      required: false,
      disable:true,
    }
  }

  dataElementoCalidad=[
    {elemento:"xxx", sDesconexion:"100", desMax:"10", feMax:"10", deHora:"10",feHora:"10"}
  ]

  ngOnInit(): void {
  }

  limpiar()
  {

  }

  setData(name, event) {
    this.form[name].value = event;
  }

}
