import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { FileValidationService } from './../../../shared/services/file-validation.service';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFileComponent implements OnInit {

  fileName='';
  @Input() typeExtension;
  @Input() maxSize;
  @Input() placeholder;
  @Input() messages = '';
  @Output() valueChange = new EventEmitter();
  constructor(private fileValidation: FileValidationService) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    this.messages = ''
    var files = event.target.files
    this.fileName = files [0].name
    const validationFile = this.fileValidation.validateDocument(event,this.maxSize,this.typeExtension)
    
    if(!validationFile.success){
      this.fileName = ''
      this.messages = validationFile.message
      event = undefined;
    }
    this.valueChange.emit(event)
  }

  setMessage(message){

  }

}
