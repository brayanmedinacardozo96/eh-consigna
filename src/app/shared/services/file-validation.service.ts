import { Injectable } from '@angular/core';
import {SnackBarService} from './snack-bar.service';
declare var $: any;

@Injectable()
export class FileValidationService {

  constructor(private snackBarService: SnackBarService) { }

  /**
     * Función que se encarga validar el tamaño y extension del archivo
     */
    validateDocument(event, maxSize = 1, typeExtension = null) {
      let response = {success: true, message: null, data: null};
      let file = event.target.files[0];
      let extDoc = file.name;
      extDoc = extDoc.slice((extDoc.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();

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
        response.message = !stateExtension ? 'El archivo debe ser de tipo ' + nameExtension: null;
      }
      //tamaño maximo (MB)
      if (file.size >= maxSize * 1024 * 1024) {
        response.message = 'El archivo a adjuntar supera ' + maxSize + ' MB de tamaño permitido';
      }

      if (response.message != null) {
        this.snackBarService.alert(response.message,5000);
        response.success = false;
      }

      return response;
  }

  validateDocumentFile(event, idFile, maxSize = 1, typeExtension = null) {
    let response = {success: true, message: null, data: null, fileNames: '', numberFiles: 0};
    let file = []
    file = event.target.files;
    response.numberFiles = file.length;

    for(let i = 0; i < file.length; i++){
      let extDoc = file[i].name;
      response.fileNames += (i != file.length-1) ? (extDoc+'; ') : extDoc;
      extDoc = extDoc.slice((extDoc.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
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
        response.message = !stateExtension ? 'El(los) archivo debe ser de tipo ' + nameExtension: null;
      }
      //tamaño maximo (MB)
      if (file[i].size >= maxSize * 1024 * 1024) {
        response.message = 'El(los) archivo a adjuntar supera ' + maxSize + ' MB de tamaño permitido';
      }

      if (response.message != null) {
        this.snackBarService.alert(response.message,5000);
        response.success = false;
        $('#'+idFile).val('');
        return response;
      }
    }

    return response;
}

  fileUp(eventFile, snackbar = false){
    let response = {
      files: new FormData(),
      success: false,
      message: null
    }
    let nameFile = [];
    if(eventFile != undefined ){
      let files = eventFile.target.files;
      let size = files.length;
      let fileUpload = null;

      for(let i = 0; i<size; i++){
        let file = files[i];
        let document = file.name.replace(/ /g,"-").toLowerCase().split('.');
        let nameDocument = document[0];

        response.files.append("file-"+nameDocument,file,file.name);
        nameFile.push(nameDocument);
      }
      response.files.append("nameFiles",JSON.stringify(nameFile));
      response.success = true;
    }else{
      response.message = 'Debe adjuntar un documento';
      if(snackbar){
        this.snackBarService.alert(response.message,5000);
      }
      response.success = false;
    }

    return response;
  }

  cleanFile(event){
    event.value= '';
  }
}
