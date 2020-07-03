import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FileValidationService } from './../../../shared/services/file-validation.service';
import { environment } from 'src/environments/environment';
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

  constructor(private fileValidation: FileValidationService) { }

  ngOnInit(): void {
  }

  onFileSelected(event,idFile){
    this.messages = '';
    const validationFile = this.fileValidation.validateDocumentFile(event,idFile,this.maxSize,this.typeExtension);
    if(validationFile.success){
      this.fileName = validationFile.numberFiles+' Documento(s) adjunto(s).';
    }else{
      this.fileName = '';
      this.messages = validationFile.message;
    }
  }

  openDocument(){
    window.open(`${environment.urlFiles}/public/${this.fileUrl}`, '_blank');
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
    let files = $('#document-file-multiple input[type=file]')[0].files;
    console.log(files);
    for(let i = 0;i< files.length; i++){
      let fileUpload = files[i];
      attachedFile.files.append(this.package+"[]", fileUpload);
    }

    if(this.required && files.length < 1){
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

}
