import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FileValidationService } from './../../../shared/services/file-validation.service';
import { TableInputFileMultipleComponent } from './table-input-file-multiple/table-input-file-multiple.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;

@Component({
  selector: 'app-input-file-multiple',
  templateUrl: './input-file-multiple.component.html',
  styleUrls: ['./input-file-multiple.component.scss']
})
export class InputFileMultipleComponent implements OnInit {

  @Input() fileName = '';
  @Input() fileUrl = '';
  @Input() typeExtension;
  @Input() maxSize;
  @Input() placeholder;
  @Input() messages = '';
  @Input() package = '';
  @Input() required: boolean = false;
  @Output() valueChange = new EventEmitter();
  files = undefined;
  constructor(
    private fileValidation: FileValidationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onFileSelected(event,idFile){
    this.messages = '';
    const validationFile = this.fileValidation.validateDocumentFile(event,idFile,this.maxSize,this.typeExtension);
    if(validationFile.success){
      this.fileName = validationFile.numberFiles+' Documento(s) adjunto(s).';
      this.files = event.target.files;
    }else{
      this.fileName = '';
      this.messages = validationFile.message;
    }
  }

  openDocument(){
    let responseData = [];
    for(let i = 0; i < this.fileUrl.length; i++){
      let urlFile = this.fileUrl[i].split('/');
      let data = {
        index: i+1,
        nameFile: urlFile[urlFile.length-1],
        url: this.fileUrl[i]
      }
      responseData.push(data);
    }
    const dialogRef = this.dialog.open(TableInputFileMultipleComponent,{
      width:'100%',
      data: responseData
    });
  }

  setFileName(data){
    //form-file
    let file = ((document.getElementById("form-file")) as HTMLSelectElement);
    this.fileName = '';
  }

  fileUp(){
    this.messages = '';
    let attachedFile  = {
      files: new FormData(),
      success: true,
      message: null
    };

    const namePackage = this.package != '' ? this.package: 'files';
    // let files = this.getIdFile();
    if(this.files != undefined){
      for(let i = 0; i< this.files.length; i++){
        let fileUpload = this.files[i];
        attachedFile.files.append(this.package+"[]", fileUpload);
      }
    }

    if(this.required && this.files.length < 1){
      attachedFile.files = new FormData();
      attachedFile.success = false;
      this.messages = 'Debe ingresar al menos un archvio.'
      attachedFile.message = this.messages;
    }

    return attachedFile;
  }

  getIdFile(){
    return $('#document-file-multiple input[type=file]')[0].files;
  }

  getFiles(){
    return this.files;
  }

  cleanFiles(){
    $('#file-multiple').val('');
    this.fileName = '';
  }

}
