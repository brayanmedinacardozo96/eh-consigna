import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) {
  }

  alert(message = '', actions = '',durations = 2000, horizontalPosition = null, verticalPosition = null) {
    
    this._snackBar.open(message, actions, {
        duration: durations,
        horizontalPosition: horizontalPosition != null ? horizontalPosition : 'end',
        verticalPosition: verticalPosition != null ? verticalPosition : 'top',
        panelClass: ['snackbar-alert']
    });
  }
}