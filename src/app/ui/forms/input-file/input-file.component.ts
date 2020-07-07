import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { FileValidationService } from './../../../shared/services/file-validation.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFileComponent implements OnInit {

  @Input() fileName = '';
  @Input() fileUrl = '';
  @Input() typeExtension;
  @Input() maxSize;
  @Input() placeholder;
  @Input() messages = '';
  @Output() valueChange = new EventEmitter();
  constructor(private fileValidation: FileValidationService) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    let urlTemp = this.fileName;
    this.messages = ''
    var files = event.target.files
    this.fileName = files [0].name
    const validationFile = this.fileValidation.validateDocument(event,this.maxSize,this.typeExtension)
    
    if(!validationFile.success){
      this.fileName = this.fileUrl != '' ? urlTemp : '';
      this.messages = validationFile.message
      event = undefined;
    }else{
      this.fileUrl = '';
    }
    this.valueChange.emit(event)
  }

  setMessage(message){

  }

  openDocument(){
    window.open(`${environment.urlFiles}/public/${this.fileUrl}`, '_blank');
  }

  setFileName(data){
    //form-file
    let file = ((document.getElementById("form-file")) as HTMLSelectElement);
    this.fileName = '';
  }

  getIdFile(){
    return $('#document-file input[type=file]')[0].files;
  }

}
