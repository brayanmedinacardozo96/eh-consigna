import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Aprobar
{

   validarPermiso() {
     var datoUsuario = JSON.parse(localStorage.getItem('token'));
     var result = datoUsuario.data_app[0].forms.filter(b => {
       return (b.code == "aprobar")
     });

     return result;
   }

}
