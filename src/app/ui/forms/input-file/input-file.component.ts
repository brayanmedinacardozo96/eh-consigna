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
  constructor(private fileValidation: FileValidationService) { }

  ngOnInit(): void {
  }

  onFileSelected(event,id){
    var files = event.target.files;
    this.fileName = files [0].name

    var stateValidation = this.fileValidation.validateDocumentPdf(event,this.maxSize,this.typeExtension)
    if(!stateValidation){
      this.fileName = '';
    }
  }

}
