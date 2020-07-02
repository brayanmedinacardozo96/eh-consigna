import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FileValidationService } from './../../../shared/services/file-validation.service';
import { SnackBarService } from './../../../shared/services/snack-bar.service';
import { environment } from 'src/environments/environment';
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

  onFileSelected(event, idFile, position){
    const tempFilename = this.dataInputFile[position].fileName;
    const files = event.target.files
    const fileName = files[0].name
    const validationFile = this.fileValidation.validateDocumentFile(event,idFile,this.dataInputFile[position].maxSize,this.dataInputFile[position].typeExtension);
    if(validationFile.success){
      this.dataInputFile[position].fileName = fileName;
    }else{
      let validateUrlName = this.validateNameAndUrl(position)
      if(validateUrlName.success){
        this.dataInputFile[position].fileName = validateUrlName.nameFile;        
      }else{
        this.dataInputFile[position].fileName = '';
      }
      this.dataInputFile[position].messages = validationFile.message;
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

      //para validar si es actualizar un archivo
      let validateUrlAndName = this.validateNameAndUrl(i);
      if(!validateUrlAndName.success){
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
          let message = 'Debe adjuntar el documento de '+attrName[0];
          this.snackBarService.alert(message);
          this.dataInputFile[i].messages = message;
          attachedFile.success = false;
          return attachedFile;
        }
      }
      
    }

    attachedFile.files.append(namePackage, JSON.stringify(nameFile));
    return attachedFile;
  }

  openDocument(fileUrl){
    window.open(`${environment.urlFiles}/public/${fileUrl}`, '_blank');
  }

  //valida si el nombre del documento es igual al nombre que contiene la url
  validateNameAndUrl(position){
    this.dataInputFile[position].messages = '';
    let response = {
      nameFile:'',
      success:false
    };
    const tempFilename = this.dataInputFile[position].fileName;

    if(this.dataInputFile[position].fileUrl != null && this.dataInputFile[position].fileUrl != undefined
      && this.dataInputFile[position].fileUrl != ''){

      const urlDocumento = this.dataInputFile[position].fileUrl.split('/');
      if(tempFilename == urlDocumento[urlDocumento.length-1]){
        response.nameFile = tempFilename;
        response.success = true;
      }
    }
    return response;
  }
}
