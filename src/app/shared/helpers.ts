import {Auth} from './auth';

export class Helpers {

  constructor() {
  }

  formatDate(date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }


  getMinuteDifferenceBetweenTwoDates(date1: Date, date2: Date) {
    const diffMs = (date2.getTime() - date1.getTime()); // milliseconds between
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffMins;
  }

  validateActionUser(action) {
    let hasPermssion = false;

    // Obtiene las acciones que tenga el usuario logueado
    const actions = Auth.getActions();
    for (const value of actions) {
      if (action === value) {
        hasPermssion = true;
        break;
      }
    }

    return hasPermssion;
  }

}
