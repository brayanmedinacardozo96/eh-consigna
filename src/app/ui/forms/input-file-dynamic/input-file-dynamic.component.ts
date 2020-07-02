import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FileValidationService } from './../../../shared/services/file-validation.service';
import { SnackBarService } from './../../../shared/services/snack-bar.service';
declare var $: any;

@Component({
  selector: 'app-input-file-dynamic',
  templateUrl: './input-file-dynamic.component.html',
  styleUrls: ['./input-file-dynamic.component.scss']
})
export class InputFileDynamicComponent implements OnInit {

  @Input() dataInputFile = [];
  @Input() package = '';
  @Output() valueChange = new EventEmitter();
  constructor(
      private fileValidation: FileValidationService,
      private snackBarService: SnackBarService
    ) { }

  ngOnInit(): void {
  }

  onFileSelected(event, idFile, position, maxSize, typeExtension){
    const files = event.target.files
    const fileName = files[0].name
    const validationFile = this.fileValidation.validateDocumentFile(event,idFile,maxSize,typeExtension);
    if(validationFile.success){
      this.dataInputFile[position].fileName = fileName;
    }else{
      this.dataInputFile[position].fileName = '';
    }
  }

  fileUp(){
    const namePackage = this.package != '' ? this.package: 'names';

    let attachedFile  = {
      files: new FormData(),
      success: true,
      message: null
    };
    
    let nameFile = [];

    let document = $('#documents');
    let fileUpload = null;

    let files = $('#documents input[type=file]');
    let size = files.length;

    for(let i = 0;i<size; i++){
      let file = files[i];
      fileUpload = file['files'][0];
      //obtiene el nombre del documento (se separa por - para obtener el nombre y si es obligatorio u opcional)
      let attrName = file['name'].split("-");
      let nameDocument = attrName[0].replace(/ /g,"-");
      let required = attrName[1];
      
      if(fileUpload != undefined){

        attachedFile.files.append("file-"+nameDocument,fileUpload,fileUpload.name);
        nameFile.push(nameDocument);

      }else if(required == 'true'){
        this.snackBarService.alert('Debe adjuntar el documento de '+attrName[0]);
        attachedFile.success = false;
        return attachedFile;
      }
    }

    attachedFile.files.append(namePackage, JSON.stringify(nameFile));
    return attachedFile;
  }

}
