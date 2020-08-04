import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


export class SnackBarClass {

 private horizontalPosition: MatSnackBarHorizontalPosition='right';
 private verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private _snackBar: MatSnackBar, private mensaje:string,private panelClass:string, private duration = 1500) {

   }

  ngOnInit(): void {
  }

  openSnackBar() {

    this._snackBar.open(this.mensaje, 'X', {
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [this.panelClass]
    });
  }

}
