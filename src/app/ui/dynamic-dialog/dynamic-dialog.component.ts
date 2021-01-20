import { Component,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent {

  title: string;
  content: string;
  enterButton: string = null;
  cancelButton: string = null;
  alignButtons: string;

  constructor(public dialogRef: MatDialogRef<DynamicDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DynamicDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.content = data.content;
    this.enterButton = data.enterButton;
    this.cancelButton = data.cancelButton;
    this.alignButtons = data.alignButtons;
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class DynamicDialogModel {

  constructor(public title: string, public content: string
    ,public enterButton: string = null, public cancelButton: string = null
    , public alignButtons: string = 'left') {
  }
}