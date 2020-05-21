import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {

  fileName='';
  @Input() maxSize;
  @Input() placeholder;
  @Input() disable;;
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    var files = event.target.files;
    this.fileName = files [0].name
  }

}
