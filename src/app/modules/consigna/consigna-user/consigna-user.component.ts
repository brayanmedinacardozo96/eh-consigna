import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consigna-user',
  templateUrl: './consigna-user.component.html',
  styleUrls: ['./consigna-user.component.scss']
})
export class ConsignaUserComponent implements OnInit {

  data = [
    {numeroConsigna:'1234',tipoZona:'ZN',estadoConsigna:'Pendiente',
      elementosConsignados:[
        {tipo_elemento:'Tp E 1', elemento: 'Elemento 2', ramal: 1, fecha_hora_inicio: '2020-01-20 3:40 PM',  fecha_hora_final: '2020-01-21 10:00 AM'}
      ],trabajosOportunidad:[
        {consecutivo: '854123', descripcion:'La descripción ...',nombre_elemento: 'El elemento 1', trabajos: 'se realizarán trabajos de los desarrollos ', medidas_seguridad:'se aplicarán las 5 reglas de oro', jefe_trabajo: 'Hector Mauricio Coronado', telefono:'3102451024'}
      ],
      maniobras:[
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'La Tercera Descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Cuarta Descripción',url:'aa'},
      ],
      acciones:''
    },
    {numeroConsigna:'536',tipoZona:'ZS',estadoConsigna:'Ejecutada',
      elementosConsignados:[
        {tipo_elemento:'Tp E 4', elemento: 'Elemento 1', ramal: 5, fecha_hora_inicio: '2020-03-30 8:00 AM',  fecha_hora_final: '2020-03-30 10:00 AM'}
      ],
      //'consecutivo', 'descripcion', 'nombre_elemento', 'trabajos', 'medidas_seguridad', 'jefe_trabajo', 'telefono'
      trabajosOportunidad: [
        {consecutivo: '17155', descripcion:'La descripción',nombre_elemento: 'El elemento 2', trabajos: 'se realizarán trabajos de ...', medidas_seguridad:'se aplicarán las 5 reglas de oro', jefe_trabajo: 'Brayan Medina Cardozo', telefono:'3134587856'}
      ],
      maniobras:[
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
        {consecutivo:123, descripcion:'la descripción',url:'aaa'},{consecutivo:3458, descripcion:'La Segunda Descripción',url:'aa'},
      ],
      acciones:''
    },
  ];

  viewList = false;

  constructor() {
    this.viewList = false;
   }

  ngOnInit(): void {
  }

  buscarConsigna(){
    this.viewList = true;
  }

}
