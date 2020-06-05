import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


export class SnackBarClass {

 private horizontalPosition: MatSnackBarHorizontalPosition='right';
 private verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private _snackBar: MatSnackBar, private mensaje:string,private panelClass:string) {

   }

  ngOnInit(): void {
  }

  openSnackBar() {

    this._snackBar.open(this.mensaje, 'X', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [this.panelClass]
    });
  }

}
