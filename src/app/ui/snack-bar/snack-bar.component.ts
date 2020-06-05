/*
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
*/

export class SnackBarClass {

 // private _snackBar:MatSnackBar;

  constructor(private mensaje:String) { }
/*
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
*/


  openSnackBar() {


   /* this._snackBar.open('Cannonball!!', 'X', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['btn-success']
    });*/
  }

}
