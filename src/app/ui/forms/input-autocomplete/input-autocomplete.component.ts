import {Component,EventEmitter,Input,OnInit,Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable,of} from 'rxjs';
import {tap, startWith, debounceTime, distinctUntilChanged, switchMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
//import {ApiService} from '../../../shared/services/api.service';


@Component({
selector: 'app-input-autocomplete',
templateUrl: './input-autocomplete.component.html',
styleUrls: ['./input-autocomplete.component.scss']
})


export class InputAutocompleteComponent implements OnInit {

@Input() label;
@Input() value;
@Input() name;
@Input() messages;
@Input() style;
@Input() disable;
@Input() urlApi;
@Input() display;
@Input() upperCase = false;
@Output() valueChange = new EventEmitter();

  url:"";
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  filter(val: string): Observable<any[]> {
    return this.getData(this.url)
     .pipe(
       map(response => response.filter(option => {
         return option.name.toLowerCase().indexOf(val.toLowerCase()) > -1
       }))
     )

   }

   autoComplete(){

     if (this.url != "") {
       this.filteredOptions = this.myControl.valueChanges.pipe(
         startWith(''),
         debounceTime(400),
         distinctUntilChanged(),
         switchMap(val => {
            return this.filter(val || '')
         })
       )
     }

    }

    setUrl(link)
    {

      this.url=link;
      this.autoComplete();

    }

    opt = [];

  getData(urlApi) {
//urlApi
    return this.opt.length ?
      of(this.opt) :
      this.http.get<any>(urlApi).pipe(tap(data => this.opt = data));
     // return this.apiService.get("https://jsonplaceholder.typicode.com/users");

  }

  checkPattern(event){
    if(this.upperCase && this.value != null){
      this.value = this.value.toUpperCase();
    }
    this.valueChange.emit(this.value);
  }

}
