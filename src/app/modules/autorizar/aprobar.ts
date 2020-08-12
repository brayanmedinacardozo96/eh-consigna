import { Injectable } from '@angular/core';
import {Auth} from "../../shared/auth";

@Injectable({
  providedIn: 'root'
})

export class Aprobar
{

   validarPermiso() {
     var datoUsuario = Auth.getLogin();
     var result = datoUsuario.data_app[0].forms.filter(b => {
       return (b.code == "aprobar")
     });

     return result;
   }

}
