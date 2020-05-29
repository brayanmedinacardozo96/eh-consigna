import {Injectable} from '@angular/core';
import {SnackBarService} from './snack-bar.service';

@Injectable()
export class ValidationService {

  constructor(private snackBarService: SnackBarService) {
  }

  validateEmptyFields(form, snackBar = true) {
    const response = {success: true, data: null};
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        if (form[key].required) {
          if (String(form[key].value).trim() === '' || form[key].value === null) {
            form[key].messages = 'Este campo es requerido.';
            response.success = false;
          } else {
            form[key].messages = null;
          }
        }
      }
    }

    if(snackBar && !response.success){
        //message,actions,durations,horizontalPosition,verticalPosition
        this.snackBarService.alert('Faltan campos a diligenciar.');
    }
    response.data = form;
    return response;
  }

  
  validateACompleteField(form, snackBar = true){
    const response = {success: false, data: null};
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
          if (String(form[key].value).trim() !== '' && form[key].value !== null) {
            response.success = true;
            break;
          } 
      }
    }

    if(snackBar && !response.success){
      this.snackBarService.alert('Ingrese al menos un valor en los campos para realizar la consulta.',5000)
    }

    response.data = form;
    return response;
  }

}