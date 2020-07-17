import { Injectable } from '@angular/core';

@Injectable()
export class DateValidationervice {

  constructor() { }

  getYearMounthDay(date){
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  validateDateRequest(){
    var date = new Date('2020-17-07');

    
  }
}
