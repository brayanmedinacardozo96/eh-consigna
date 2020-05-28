import { Component, OnInit } from '@angular/core';
import {MDialogComponent} from '../../ui/forms/m-dialog/m-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Mensaje} from '../../ui/forms/m-dialog/dialog';

@Component({
  selector: 'app-maniobra',
  templateUrl: './maniobra.component.html',
  styleUrls: ['./maniobra.component.scss']
})
export class ManiobraComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  form = {
    numeroConsigna: {
      label: 'Consignación No.',
      name: 'numeroConsigna',
      value: null,
      messages: null,
      required: false,
      url: "https://jsonplaceholder.typicode.com/users"
    },
    descripcion: {
      label: 'Descripción',
      name: 'descripcion',
      value: null,
      messages: null,
      required: false,
    },

  }

  ngOnInit(): void {
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  dialogConsigna()
  {
    this.dialog.open(MDialogComponent, {
      data: new Mensaje('Consigna #'+this.form.numeroConsigna.value,"<strong>hola</strong>")
    });
  }

}
