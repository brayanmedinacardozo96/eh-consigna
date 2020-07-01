import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input-file-dynamic',
  templateUrl: './input-file-dynamic.component.html',
  styleUrls: ['./input-file-dynamic.component.scss']
})
export class InputFileDynamicComponent implements OnInit {

  @Input() dataInputFile = [];
  @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    // let urlTemp = this.fileName;
    // this.messages = ''
    // var files = event.target.files
    // this.fileName = files [0].name
    // const validationFile = this.fileValidation.validateDocument(event,this.maxSize,this.typeExtension)
    
    // if(!validationFile.success){
    //   this.fileName = this.fileUrl != '' ? urlTemp : '';
    //   this.messages = validationFile.message
    //   event = undefined;
    // }else{
    //   this.fileUrl = '';
    // }
    // this.valueChange.emit(event)
  }

}
