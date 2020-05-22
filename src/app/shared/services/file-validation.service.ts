import { Injectable } from '@angular/core';
import {SnackBarService} from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class FileValidationService {

  constructor(private snackBarService: SnackBarService) { }

  /**
     * Función que se encarga validar el tamaño y extension del archivo
     */
    validateDocumentPdf(event, maxSize = 1, typeExtension = null) {
      let state = true;
      let file = event.target.files[0];
      let extDoc = file.name;
      extDoc = extDoc.slice((extDoc.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
      let message = null;

      /* console.log(file);
      console.log(extDoc);
      console.log(typeof(typeExtension));
      console.log(typeExtension); */

      //extensión
      if(typeExtension != null ){
        var stateExtension = false;
        var nameExtension = '';

        if(typeof(typeExtension) === 'object'){
          for(let value of typeExtension){
            nameExtension = nameExtension+value+' ';
            if(value === extDoc){
              stateExtension = true;
            }
          }
        }else{
          nameExtension = typeExtension;
          if (typeExtension === extDoc) {
            stateExtension = true;  
          }
        }
        message = !stateExtension ? 'El archivo debe ser de tipo ' + nameExtension: null;
      }
      //tamaño maximo (MB)
      if (file.size >= maxSize * 1024 * 1024) {
          message = 'El archivo a adjuntar supera ' + maxSize + ' MB de tamaño permitido';
      }

      if (message != null) {
        this.snackBarService.alert(message,'',5000);
          return state = false;
      }

      return state;
  }
}
